import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Menu, MenuButton, MenuItem, MenuList } from "@reach/menu-button";
import { dehydrate, useQuery } from "@tanstack/react-query";
import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import React from "react";
import { HiChevronDown } from "react-icons/hi";
import { useDebounce } from "react-use";

import AppLayout from "components/Layouts/AppLayout";
import MovieCard from "components/MovieCard";
import Pagination from "components/Pagination/Pagination";
import { withSessionSsr } from "lib/auth/session";
import { movieSearch } from "services/movie";
import { defaultQueryClient } from "services/queryClient";
import { MovieSearchInput } from "types/movie.type";
import { ROUTES } from "utils/routes";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Movie = ({ accessToken, user }: Props) => {
  const [parent] = useAutoAnimate<HTMLDivElement>();
  const router = useRouter();
  const { sortBy, sortOrder, search, page, size } = router.query;
  const [searchTerm, setSearchTerm] = React.useState<string | null>(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = React.useState<
    string | null
  >(null);
  const [, cancel] = useDebounce(
    () => {
      setDebouncedSearchTerm(searchTerm);
    },
    500,
    [searchTerm]
  );
  const { api, getKey } = movieSearch(accessToken, {
    sortBy: sortBy as MovieSearchInput["sortBy"],
    sortOrder: sortOrder as MovieSearchInput["sortOrder"],
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

  const handlePageChange = (page: number) => {
    router.query = {
      ...router.query,
      page: page.toString(),
    };
    router.push(router);
  };

  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 id="movies-heading" className="sr-only">
          Movies List
        </h2>

        <input
          type="text"
          className="input input__base"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <section className="py-6 mt-4 border-t border-gray-200">
          <h2 id="filter-heading" className="sr-only">
            Movies filters
          </h2>
          <div className="flex items-center justify-between">
            <Menu className="relative z-10 inline-block text-left">
              <MenuButton
                as="button"
                className="inline-flex justify-center text-sm font-medium text-gray-700 group hover:text-gray-900"
              >
                Sort
                <HiChevronDown className="flex-shrink-0 w-5 h-5 ml-1 -mr-1 text-gray-400 group-hover:text-gray-500" />
              </MenuButton>

              <MenuList className="absolute left-0 z-10 w-40 mt-2 origin-top-left bg-white rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1" role="none">
                  <MenuItem
                    as="button"
                    onSelect={() => handleSortBy("title")}
                    className="block w-full px-4 py-2 text-sm font-medium text-left text-gray-900 cursor-pointer"
                  >
                    Title
                  </MenuItem>

                  <MenuItem
                    as="button"
                    onSelect={() => handleSortBy("rating")}
                    className="block w-full px-4 py-2 text-sm font-medium text-left text-gray-900 cursor-pointer"
                  >
                    Rating
                  </MenuItem>

                  <MenuItem
                    as="button"
                    onSelect={() => handleSortBy("createdAt")}
                    className="block w-full px-4 py-2 text-sm font-medium text-left text-gray-900 cursor-pointer"
                  >
                    Created at
                  </MenuItem>

                  <MenuItem
                    as="button"
                    onSelect={() => handleSortBy("updatedAt")}
                    className="block w-full px-4 py-2 text-sm font-medium text-left text-gray-900 cursor-pointer"
                    role="menuitem"
                    tabIndex={-1}
                    id="mobile-menu-item-2"
                  >
                    Updated at
                  </MenuItem>
                </div>
              </MenuList>
            </Menu>

            <Menu className="flex items-baseline space-x-8">
              <div className="relative z-10 inline-block text-left">
                <div>
                  <MenuButton className="inline-flex items-center justify-center text-sm font-medium text-gray-700 group hover:text-gray-900">
                    <span>Sort Order</span>

                    <HiChevronDown className="flex-shrink-0 w-5 h-5 ml-1 -mr-1 text-gray-400 group-hover:text-gray-500" />
                  </MenuButton>
                </div>

                <MenuList className="absolute py-4 mt-2 origin-top-right bg-white rounded-md shadow-2xl -right-32 ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="space-y-4">
                    <MenuItem
                      onSelect={() => handleSortOrder("asc")}
                      className="flex items-center px-3 py-2 cursor-pointer"
                    >
                      <input
                        id="filter-category-0"
                        name="sortOrder"
                        value="asc"
                        type="radio"
                        className="w-4 h-4 py-2 text-indigo-600 border-gray-300 rounded cursor-pointer focus:ring-indigo-500"
                        onChange={() => handleSortOrder("asc")}
                        checked={sortOrder === "asc" || sortOrder == null}
                      />
                      <label
                        htmlFor="filter-category-0"
                        className="pr-6 ml-3 text-sm font-medium text-gray-900 cursor-pointer whitespace-nowrap"
                      >
                        Ascending
                      </label>
                    </MenuItem>

                    <MenuItem
                      onSelect={() => handleSortOrder("desc")}
                      className="flex items-center px-3 py-2 cursor-pointer"
                    >
                      <input
                        id="filter-category-2"
                        name="sortOrder"
                        value="desc"
                        type="radio"
                        className="w-4 h-4 py-2 text-indigo-600 border-gray-300 rounded cursor-pointer focus:ring-indigo-500"
                        onChange={() => handleSortOrder("desc")}
                        checked={sortOrder === "desc"}
                      />
                      <label
                        htmlFor="filter-category-2"
                        className="pr-6 ml-3 text-sm font-medium text-gray-900 cursor-pointer whitespace-nowrap"
                      >
                        Descending
                      </label>
                    </MenuItem>
                  </div>
                </MenuList>
              </div>
            </Menu>
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
          <div className="flex justify-end w-full mt-8">
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
