import Head from "next/head";
import React from "react";

import Navbar, { SignedInNavbar } from "components/Navbar/Navbar";

type Props = {
  children: React.ReactNode;
  title: string;
  type: "signedOut" | "signedIn";
};

const AppLayout = ({ children, title, type = "signedOut" }: Props) => {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Movie Mania</title>
        <meta name="description" content="A delightful online movie platform" />
      </Head>
      <>
        {type === "signedOut" ? <Navbar /> : <SignedInNavbar />}
        {children}
      </>
    </div>
  );
};

export default AppLayout;
