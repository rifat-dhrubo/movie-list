import { Menu, MenuButton, MenuList, MenuItem } from "@reach/menu-button";
import React from "react";
import { HiChevronDown } from "react-icons/hi";

import { MovieSearchInput } from "types/movie.type";

type Props = {
  handleSortOrder: (sortOrder: MovieSearchInput["sortOrder"]) => void;
  sortOrder: MovieSearchInput["sortOrder"];
};

const SortOrderMenu: React.FC<Props> = ({ handleSortOrder, sortOrder }) => {
  return (
    <Menu className="flex items-baseline space-x-8">
      <div className="relative z-10 inline-block text-left">
        <div>
          <MenuButton className="inline-flex items-center justify-center text-sm font-medium text-gray-700 group hover:text-gray-900">
            <span>Sort Order</span>

            <HiChevronDown className="flex-shrink-0 w-5 h-5 ml-1 -mr-1 text-gray-400 group-hover:text-gray-500" />
          </MenuButton>
        </div>

        <MenuList className="absolute py-4 mt-2 origin-top-right bg-white rounded-md shadow-2xl -right-40 ring-1 ring-black ring-opacity-5 focus:outline-none slide-down">
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
                checked={sortOrder === "asc"}
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
                checked={sortOrder === "desc" || sortOrder == null}
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
  );
};

export default SortOrderMenu;
