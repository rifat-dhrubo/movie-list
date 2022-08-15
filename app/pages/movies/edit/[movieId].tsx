import { dehydrate, useQuery } from "@tanstack/react-query";
import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import React from "react";

import AppLayout from "components/Layouts/AppLayout";
import MovieForm from "components/MovieForm/MovieForm";
import { withSessionSsr } from "lib/auth/session";
import { getMovie } from "services/movie";
import { defaultQueryClient } from "services/queryClient";
import { ROUTES } from "utils/routes";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const UpdateMovie = ({ accessToken, user }: Props) => {
  const router = useRouter();
  const { movieId } = router.query;

  const { api, getKey } = getMovie(accessToken, movieId as string);
  const { data } = useQuery(getKey(), api);
  return (
    <MovieForm
      accessToken={accessToken}
      user={user}
      type="edit"
      movie={data?.content}
    />
  );
};

export default UpdateMovie;

UpdateMovie.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <AppLayout title="Update Movie" type="signedIn">
      {page}
    </AppLayout>
  );
};

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, query, params }) {
    const { user, accessToken } = req.session;
    const queryClient = defaultQueryClient;

    if (user == null || accessToken == null) {
      return {
        redirect: {
          destination: `${ROUTES.SIGN_IN}?redirect=${ROUTES.MOVIE_EDIT(
            Number(params?.movieId)
          )}`,
          permanent: false,
        },
        props: {
          accessToken,
          user,
          dehydratedState: dehydrate(queryClient),
        },
      };
    }

    const { api, getKey } = getMovie(accessToken, String(params?.movieId));
    try {
      await queryClient.prefetchQuery(getKey(), api);
    } catch (error) {
      console.log(
        "🚀 ~ file: movies.tsx ~ line 67 ~ getServerSideProps ~ error",
        error
      );
    }

    return {
      props: {
        accessToken,
        user,
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
);
