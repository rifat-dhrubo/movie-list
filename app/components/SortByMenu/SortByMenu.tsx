import { Menu, MenuButton, MenuList, MenuItem } from "@reach/menu-button";
import React from "react";
import { HiChevronDown } from "react-icons/hi";

import { MovieSearchInput } from "types/movie.type";

type Props = {
  handleSortBy: (sortBy: MovieSearchInput["sortBy"]) => void;
};

const SortByMenu: React.FC<Props> = ({ handleSortBy }) => {
  return (
    <Menu className="relative z-10 inline-block text-left">
      <MenuButton
        as="button"
        className="inline-flex justify-center text-sm font-medium text-gray-700 group hover:text-gray-900"
      >
        Sort
        <HiChevronDown className="flex-shrink-0 w-5 h-5 ml-1 -mr-1 text-gray-400 group-hover:text-gray-500" />
      </MenuButton>

      <MenuList className="absolute left-0 z-10 w-40 mt-2 origin-top-left bg-white rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none slide-down">
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
  );
};

export default SortByMenu;
