import { dehydrate, useQuery } from "@tanstack/react-query";
import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import React from "react";

import AppLayout from "components/Layouts/AppLayout";
import MovieCard from "components/MovieCard";
import { withSessionSsr } from "lib/auth/session";
import { getMovie, movieSearch } from "services/movie";
import { defaultQueryClient } from "services/queryClient";
import { ROUTES } from "utils/routes";
type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Movie = ({ accessToken, user }: Props) => {
  const router = useRouter();
  const { id } = router.query;

  const { api, getKey } = getMovie(accessToken, id as string);
  const { data } = useQuery(getKey(), api);

  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 id="products-heading" className="sr-only">
          Products
        </h2>

        {data?.content != null ? (
          <div className="grid max-w-lg grid-cols-1 mx-auto">
            <MovieCard movie={data?.content} type="detail" />
          </div>
        ) : null}
      </div>
    </div>
  );
};

Movie.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <AppLayout title="Movie" type="signedIn">
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
          destination: `${ROUTES.SIGN_IN}?redirect=${ROUTES.MOVIES}`,
          permanent: false,
        },
        props: {
          accessToken,
          user,
          dehydratedState: dehydrate(queryClient),
        },
      };
    }

    const { api, getKey } = getMovie(accessToken, params?.id as string);
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

export default Movie;
