import { Rating } from "@smastrom/react-rating";
import { dehydrate, useQuery } from "@tanstack/react-query";
import { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import Button, { LinkButton } from "components/Button.tsx/Button";
import AppLayout from "components/Layouts/AppLayout";
import MovieCard from "components/MovieCard";
import { withSessionSsr } from "lib/auth/session";
import { getMovie, movieSearch } from "services/movie";
import { defaultQueryClient } from "services/queryClient";
import { ROUTES } from "utils/routes";
type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const StarDrawing = (
  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
);

const customStyles = {
  itemShapes: StarDrawing,
  activeFillColor: "#facc15",
  inactiveFillColor: "#d1d5db",
};

const Movie = ({ accessToken, user }: Props) => {
  const router = useRouter();
  const { id } = router.query;

  const { api, getKey } = getMovie(accessToken, id as string);
  const { data } = useQuery(getKey(), api);

  return (
    <div className="max-w-2xl px-4 mx-auto sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8 place-self-center">
      <div className="lg:max-w-lg lg:self-end">
        <div className="mt-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {data?.content?.title}
          </h1>
        </div>

        <section aria-labelledby="information-heading" className="mt-4">
          <div className="flex items-center">
            <div>
              <div className="flex items-center">
                <Rating
                  style={{
                    maxWidth: "162px",
                  }}
                  value={data?.content?.rating ?? 0}
                  readOnly={true}
                  itemStyles={customStyles}
                  transition="zoom"
                />
              </div>
              <p className="sr-only">{data?.content?.rating}</p>
            </div>
          </div>

          <div className="mt-4 space-y-6">
            <p className="text-base text-gray-500">
              {data?.content?.description}
            </p>
          </div>
        </section>
      </div>

      <div className="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center">
        <div className="overflow-hidden rounded-lg aspect-w-1 aspect-h-1">
          {/* eslint-disable-next-line */}
            <img
            src={data?.content?.imageLink}
            className="object-cover object-center w-full h-full"
          />
        </div>
      </div>

      <div className="mt-4 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
        <div className="mt-10 space-y-2">
          {data?.content?.id != null ? (
            <Link passHref href={ROUTES.MOVIE_EDIT(data?.content?.id)}>
              <LinkButton
                size="xl"
                href="#"
                className="justify-center w-full p-3"
              >
                Edit
              </LinkButton>
            </Link>
          ) : null}
          <Link passHref href={ROUTES.MOVIES}>
            <LinkButton
              size="xl"
              href="#"
              className="justify-center w-full p-3"
              variant="secondary"
            >
              Go Back
            </LinkButton>
          </Link>
        </div>
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
