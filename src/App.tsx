import React, { useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { Octokit } from "octokit";

const octokit = new Octokit({});

function App() {
  const [dates, setDates] = useState<Array<Date>>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

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
      <div>
        <button onClick={() => getStargazers("twitter", "scrooge")}>
          getStargazers
        </button>
        {renderChart()}
      </div>
    );
  };

  const renderChart = (): React.ReactElement => {
    const commonProperties = {
      margin: { top: 20, right: 20, bottom: 60, left: 80 },
      pointSize: 8,
      pointColor: { theme: "background" },
      pointBorderWidth: 2,
      pointBorderColor: { theme: "background" },
    };

    const data = [...dates].map((value, index) => {
      return { x: value.toLocaleDateString(), y: index };
    });

    if (isFetching) {
      return <div>Is fetching...</div>;
    } else if (data.length > 0) {
      return (
        <div style={{ height: 600, width: 800 }}>
          <ResponsiveLine
            {...commonProperties}
            data={[
              {
                id: "fake corp. A",
                data: data,
              },
            ]}
            xScale={{
              type: "time",
              format: "%m/%d/%Y",
              precision: "day",
            }}
            xFormat="time:%m/%d/%Y"
            yScale={{
              type: "linear",
              stacked: false,
            }}
            axisLeft={{
              legend: "Stars",
              legendOffset: 12,
            }}
            axisBottom={{
              format: "%b %Y",
              legend: "Date",
              legendOffset: -12,
            }}
            enablePointLabel={false}
            enableArea={true}
            pointSize={5}
            pointBorderWidth={1}
            pointBorderColor={{
              from: "color",
              modifiers: [["darker", 0.3]],
            }}
            useMesh={true}
            enableSlices={false}
            curve="monotoneX"
          />
        </div>
      );
    } else {
      return <div>No data!</div>;
    }
  };

  return render();
}

export default App;
