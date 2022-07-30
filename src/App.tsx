import React, { useState } from "react";
import { Octokit } from "octokit";

import { AppLayout } from "./components/AppLayout";
import { TextInput } from "./components/TextInput/TextInput";
import { Button } from "./components/Button/Button";
import { TimeChart } from "./components/TimeChart/TimeChart";

const octokit = new Octokit({});

function App() {
  const [owner, setOwner] = useState("");
  const [repository, setRepository] = useState("");
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [dates, setDates] = useState<Array<Date>>([]);

  const getStargazers = async (owner: string, repo: string) => {
    setDates([]);
    setIsFetching(true);
    const stargazers = await octokit.paginate(
      octokit.rest.activity.listStargazersForRepo,
      {
        owner: owner,
        repo: repo,
        per_page: 100,
        headers: {
          accept: "application/vnd.github.star",
        },
      }
    );
    setIsFetching(false);
    setDates(stargazers.map((_) => new Date(_!.starred_at!)));
  };

  const render = (): React.ReactElement => {
    return (
      <AppLayout>
        {renderInputs()}
        {renderChart()}
      </AppLayout>
    );
  };

  const renderInputs = (): React.ReactElement => {
    return (
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-3">
          <TextInput
            label="Owner"
            value={owner}
            disabled={isFetching}
            onChange={(event) => setOwner(event.currentTarget.value)}
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <TextInput
            label="Repository"
            value={repository}
            disabled={isFetching}
            onChange={(event) => setRepository(event.currentTarget.value)}
          />
        </div>
        <div className="col-span-6">
          <Button
            variant="primary"
            className="w-full"
            disabled={isFetching}
            onClick={() => getStargazers(owner, repository)}
          >
            View Star History
          </Button>
        </div>
      </div>
    );
  };

  const renderChart = (): React.ReactElement => {
    const data = [...dates].map((value, index) => {
      return { x: value.toLocaleDateString(), y: index };
    });

    if (isFetching) {
      return <div>Is fetching...</div>;
    } else if (data.length > 0) {
      return (
        <div className="h-96 mt-8">
          <TimeChart data={data} />
        </div>
      );
    } else {
      return <div>No data!</div>;
    }
  };

  return render();
}

export default App;
