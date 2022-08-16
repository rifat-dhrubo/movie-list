import { type } from "os";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Menu, MenuButton, MenuItem, MenuList } from "@reach/menu-button";
import { dehydrate, useQuery } from "@tanstack/react-query";
import { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { HiChevronDown } from "react-icons/hi";
import { useDebounce } from "react-use";

import { LinkButton } from "components/Button.tsx";
import AppLayout from "components/Layouts/AppLayout";
import MovieCard from "components/MovieCard";
import PageMenu from "components/PageMenu";
import Pagination from "components/Pagination/Pagination";
import SortByMenu from "components/SortByMenu";
import SortOrderMenu from "components/SortOrderMenu/SortOrderMenu";
import { withSessionSsr } from "lib/auth/session";
import { movieSearch } from "services/movie";
import { defaultQueryClient } from "services/queryClient";
import { MovieSearchInput } from "types/movie.type";
import { ROUTES } from "utils/routes";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Movie = ({ accessToken }: Props) => {
  const [parent] = useAutoAnimate<HTMLDivElement>();
  const router = useRouter();
  const { sortBy, sortOrder, search, page, size } = router.query;
  const [searchTerm, setSearchTerm] = React.useState<string | null>(() =>
    typeof search === "string" && search != null ? search : null
  );
  const [debouncedSearchTerm, setDebouncedSearchTerm] = React.useState<
    string | null
  >(null);
  const [, cancel] = useDebounce(
    () => {
      if (searchTerm != null) {
        router.push({
          pathname: ROUTES.MOVIES,
          query: {
            ...router.query,
            search: searchTerm,
          },
        });
        setDebouncedSearchTerm(searchTerm);
      }
    },
    500,
    [searchTerm]
  );
  const { api, getKey } = movieSearch(accessToken, {
    sortBy: sortBy as MovieSearchInput["sortBy"],
    sortOrder: sortOrder as MovieSearchInput["sortOrder"],
    page: page as MovieSearchInput["page"],
    size: size as MovieSearchInput["size"],
    search:
      debouncedSearchTerm != null
        ? debouncedSearchTerm
        : (undefined as MovieSearchInput["search"]),
  });
  const { data, status } = useQuery(getKey(), api, {
    staleTime: 10000,
    keepPreviousData: true,
    refetchOnMount: false,
  });

  const handleSortBy = (sortBy: MovieSearchInput["sortBy"]) => {
    router.query = {
      ...router.query,
      sortBy,
    };
    router.push(router);
  };

  const handleSortOrder = (sortOrder: MovieSearchInput["sortOrder"]) => {
    router.query = {
      ...router.query,
      sortOrder,
    };
    router.push(router);
  };

  const handlePageChange = (page: MovieSearchInput["page"]) => {
    if (page == null) return;
    router.query = {
      ...router.query,
      page: page.toString(),
    };
    router.push(router);
  };
  const handleSizeChange = (size: MovieSearchInput["size"]) => {
    if (size == null) return;
    router.query = {
      ...router.query,
      size: size.toString(),
    };
    router.push(router);
  };

  React.useEffect(() => {
    if (page != null && Number(page) >= 1 && data?.content?.length === 0) {
      router.push({
        pathname: ROUTES.MOVIES,
        query: {
          ...router.query,
          page: 0,
        },
      });
    }
  }, [data?.content?.length, page, router]);

  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4 py-4 mx-auto sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex flex-col">
          <Link href={ROUTES.MOVIE_CREATE}>
            <LinkButton className="mb-6 ml-auto cursor-pointer max-w-fit">
              Add Another
            </LinkButton>
          </Link>
          <div className="relative">
            <input
              type="text"
              className=" input input__base"
              placeholder={status === "loading" ? "Loading..." : "Search..."}
              onChange={(e) => setSearchTerm(e.target.value)}
              defaultValue={
                typeof search === "string" && search != null
                  ? search
                  : undefined
              }
            />
            {status === "loading" ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="absolute w-6 h-6 mr-2 text-white right-3 bottom-2 animate-spin fill-slate-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : null}
          </div>
        </div>
        <section className="py-6 mt-4 border-t border-gray-200">
          <h2 id="filter-heading" className="sr-only">
            Movies filters
          </h2>
          <div className="flex items-center justify-start gap-8">
            <SortByMenu handleSortBy={handleSortBy} />

            <SortOrderMenu
              sortOrder={sortOrder as any}
              handleSortOrder={handleSortOrder}
            />
          </div>
        </section>

        <div
          className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8"
          ref={parent}
        >
          {data?.content?.map((movie, index) => (
            <MovieCard movie={movie} key={movie.description ?? index} />
          ))}
        </div>

        {data?.meta != null ? (
          <div className="fixed flex flex-wrap items-center justify-end w-full gap-4 pl-8 mt-8 right-4 bottom-8">
            <PageMenu handlePageSize={handleSizeChange} />
            <Pagination
              totalItems={data?.meta?.total}
              currentPage={data?.meta?.currentPage}
              itemsPerPage={data?.meta?.size}
              initialPage={0}
              onPageChange={handlePageChange}
              disableInitialCallback={true}
            />
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
  async function getServerSideProps({ req, query }) {
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

    const { sortBy, sortOrder, search, page, size } = query;

    const { api, getKey } = movieSearch(accessToken, {
      sortBy: sortBy as MovieSearchInput["sortBy"],
      sortOrder: sortOrder as MovieSearchInput["sortOrder"],
      search: search != null ? String(search) : undefined,
      page: page != null ? Number(page) : undefined,
      size: size != null ? Number(size) : undefined,
    });
    try {
      await queryClient.prefetchQuery(getKey(), api);
    } catch (error) {
      console.error(
        "🚀 ~ file: index.tsx ~ line 261 ~ getServerSideProps ~ error",
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
