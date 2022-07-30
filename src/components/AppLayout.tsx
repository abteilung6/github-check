import React from "react";

export interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const render = (): React.ReactElement => {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    );
  };

  return render();
};
