import { InferGetServerSidePropsType } from "next";
import React from "react";

import AppLayout from "components/Layouts/AppLayout";
import MovieForm from "components/MovieForm/MovieForm";
import { withSessionSsr } from "lib/auth/session";
import { ROUTES } from "utils/routes";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
const Create = ({ accessToken, user }: Props) => {
  return <MovieForm accessToken={accessToken} user={user} type="create" />;
};

Create.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <AppLayout title="Create" type="signedIn">
      {page}
    </AppLayout>
  );
};

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, query }) {
    const { user, accessToken } = req.session;

    if (user == null || accessToken == null) {
      return {
        redirect: {
          destination: `${ROUTES.SIGN_IN}?redirect=${ROUTES.MOVIES}`,
          permanent: false,
        },
        props: {
          accessToken,
          user,
        },
      };
    }

    return {
      props: {
        accessToken,
        user,
      },
    };
  }
);

export default Create;
