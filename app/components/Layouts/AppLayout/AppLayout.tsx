import React from "react";

import CustomHead from "components/CustomHead";

type Props = {
  children: React.ReactNode;
  title: string;
};

const AppLayout = ({ children, title }: Props) => {
  return (
    <div>
      <CustomHead />
      <div>
        <div className="flex h-screen overflow-hidden bg-white">
          <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto bg-merchaint-grey-100">
            <h1>This is a demo layout. Please customize</h1>
            <main className="relative">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
