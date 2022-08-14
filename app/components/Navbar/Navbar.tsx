import { MenuButton, MenuList, MenuItem, Menu } from "@reach/menu-button";
import { useMutation, useQuery } from "@tanstack/react-query";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";
import { HiDotsHorizontal, HiOutlineUserCircle } from "react-icons/hi";

import { getSessionInfo, sessionLogout } from "services/auth";
import { ROUTES } from "utils/routes";

const Navbar = () => {
  return (
    <>
      <Head>
        <title>Movie Mania</title>
        <meta name="description" content="A delightful online quiz platform" />
      </Head>
      <nav className="flex justify-start w-full px-12 py-4 bg-baseColor">
        <Link passHref href="/">
          <a className="text-lg font-bold sm:text-xl text-secondary">
            Movie Mania
          </a>
        </Link>
      </nav>
    </>
  );
};

export const SignedInNavbar = () => {
  const { api, getKey } = getSessionInfo();
  const { data } = useQuery(getKey(), api);
  const { mutateAsync } = useMutation(sessionLogout, {
    onSuccess: () => {
      router.push(ROUTES.SIGN_IN);
    },
  });
  const router = useRouter();

  const handleLogOut = () => {
    toast.promise(mutateAsync(), {
      loading: "Logging out...",
      success: "Logged out successfully",
      error: "Error logging out",
    });
  };

  return (
    <>
      <Head>
        <title>Movie Mania</title>
        <meta name="description" content="A delightful online movie platform" />
      </Head>
      <nav className="flex items-center justify-between w-full px-12 py-4 bg-white">
        <Link passHref href="/">
          <a className="text-lg font-bold sm:text-xl text-secondary text-slate-700">
            Movie Mania
          </a>
        </Link>
        <Menu className="relative ml-6">
          <MenuButton
            type="button"
            className="flex items-center p-2 -mx-2 text-gray-400 border border-transparent rounded-full hover:text-gray-500 focus:outline-none focus:ring focus:ring-slate-700"
            id="menu-0-button"
            aria-expanded="false"
            aria-haspopup="true"
          >
            <span className="sr-only">Open menu</span>

            <HiOutlineUserCircle className="w-8 h-8 text-slate-700" />
          </MenuButton>

          <MenuList
            className="absolute z-40 mt-3 overflow-hidden origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg -top-2 -right-10 w-36 ring-1 ring-black ring-opacity-5 focus:outline-none slide-down"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-0-button"
            tabIndex={-1}
          >
            {/* <div className="py-1" role="none">
              <MenuItem
                as="button"
                role="menuitem"
                tabIndex={-1}
                id="menu-0-item-0"
                className="block w-full px-4 py-2 text-base text-left text-gray-700"
                onSelect={() => router.push(ROUTES.PROFILE)}
              >
                Profile
              </MenuItem>
            </div> */}
            <div className="py-1" role="none">
              <MenuItem
                as="button"
                className="block w-full px-4 py-2 text-base text-left text-gray-700"
                role="menuitem"
                tabIndex={-1}
                id="menu-0-item-1"
                onSelect={handleLogOut}
              >
                Log out
              </MenuItem>
            </div>
          </MenuList>
        </Menu>
      </nav>
    </>
  );
};

export default Navbar;
