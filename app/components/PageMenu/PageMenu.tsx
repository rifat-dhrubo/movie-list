import { Menu, MenuButton, MenuList, MenuItem } from "@reach/menu-button";
import React from "react";
import { HiChevronDown } from "react-icons/hi";

import { MovieSearchInput } from "types/movie.type";

type Props = {
  handlePageSize: (pageSize: MovieSearchInput["size"]) => void;
};

const PageMenu: React.FC<Props> = ({ handlePageSize }: Props) => {
  return (
    <Menu className="relative z-10 inline-block text-left">
      <MenuButton
        as="button"
        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded shadow border-slate-200 group hover:text-gray-900"
      >
        Page size
        <HiChevronDown className="flex-shrink-0 w-5 h-5 ml-1 -mr-1 text-gray-400 group-hover:text-gray-500" />
      </MenuButton>

      <MenuList className="absolute z-10 w-40 mt-2 origin-top-left bg-white rounded-md shadow-2xl -left-20 ring-1 -top-60 ring-black ring-opacity-5 focus:outline-none slide-up">
        <div className="flex flex-col-reverse py-1" role="none">
          <MenuItem
            as="button"
            onSelect={() => handlePageSize(1)}
            className="block w-full px-4 py-2 text-sm font-medium text-left text-gray-900 cursor-pointer"
          >
            1
          </MenuItem>

          <MenuItem
            as="button"
            onSelect={() => handlePageSize(10)}
            className="block w-full px-4 py-2 text-sm font-medium text-left text-gray-900 cursor-pointer"
          >
            10
          </MenuItem>

          <MenuItem
            as="button"
            onSelect={() => handlePageSize(15)}
            className="block w-full px-4 py-2 text-sm font-medium text-left text-gray-900 cursor-pointer"
          >
            15
          </MenuItem>

          <MenuItem
            as="button"
            onSelect={() => handlePageSize(20)}
            className="block w-full px-4 py-2 text-sm font-medium text-left text-gray-900 cursor-pointer"
            role="menuitem"
            tabIndex={-1}
            id="mobile-menu-item-2"
          >
            20
          </MenuItem>
          <MenuItem
            as="button"
            onSelect={() => handlePageSize(30)}
            className="block w-full px-4 py-2 text-sm font-medium text-left text-gray-900 cursor-pointer"
            role="menuitem"
            tabIndex={-1}
            id="mobile-menu-item-2"
          >
            30
          </MenuItem>
        </div>
      </MenuList>
    </Menu>
  );
};

export default PageMenu;
