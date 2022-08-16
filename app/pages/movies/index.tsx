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
  const { data } = useQuery(getKey(), api);

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
          <input
            type="text"
            className="input input__base"
            placeholder="Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
            defaultValue={
              typeof search === "string" && search != null ? search : undefined
            }
          />
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
          <div className="fixed flex flex-wrap pl-8 justify-end gap-4 items-center w-full mt-8 right-4 bottom-8">
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
