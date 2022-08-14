import * as React from "react";
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import ReactPaginate from "react-paginate";

export interface PaginationProps {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  disableInitialCallback: boolean;
  initialPage?: number;
  onPageChange: (t: number) => any;
}

const containerClass = "flex justify-center h-auto align-center items-center";
const activeClass =
  "px-4 py-2 text-white bg-gray-400 border  border-gray-400 cursor-pointer text-body-1 hover:bg-gray-500";
const inActiveClass =
  "px-4 py-2 bg-white border border-r-0 border-slate-300  cursor-pointer text-slate-700 text-body-1 hover:bg-gray-200";
const leftLinkClassName = `relative flex items-center justify-center p-2 py-[8.5px] ml-0 bg-white border border-r-0 border-slate-300  cursor-pointer text-slate-700 hover:bg-gray-200`;
const rightLinkClassName = `relative flex items-center justify-center p-2 py-[8.5px] ml-0 bg-white border border-r-0  border-slate-300  cursor-pointer text-slate-700 hover:bg-gray-200`;

const getPageNumbers = (totalItems: number, itemsPerPage: number): number =>
  Math.ceil(totalItems / itemsPerPage) >> 0;

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  disableInitialCallback = false,
  initialPage = 0,
}: PaginationProps) => {
  const handleOnPageChange = React.useCallback(
    ({ selected = 0 }) => onPageChange(selected),
    [onPageChange]
  );
  const pageCount = React.useMemo(
    () => getPageNumbers(totalItems, itemsPerPage),
    [totalItems, itemsPerPage]
  );
  return (
    <div className="flex items-center">
      <button
        type="button"
        className="relative flex items-center justify-center p-2 py-[8.5px] ml-0 bg-white border rounded-l border-r-0 border-slate-300  cursor-pointer hover:bg-gray-200 text-slate-800"
        onClick={() => onPageChange(initialPage)}
      >
        <HiChevronDoubleLeft className="w-5 h-5 text-slate-700" />
      </button>
      <ReactPaginate
        containerClassName={containerClass}
        previousLabel={<HiChevronLeft className="w-5 h-5 text-slate-700" />}
        previousLinkClassName={leftLinkClassName}
        nextLabel={<HiChevronRight className="w-5 h-5 text-slate-700" />}
        nextLinkClassName={rightLinkClassName}
        breakLinkClassName={inActiveClass}
        activeLinkClassName={activeClass}
        pageLinkClassName={inActiveClass}
        onPageChange={handleOnPageChange}
        pageRangeDisplayed={2}
        marginPagesDisplayed={3}
        disableInitialCallback={disableInitialCallback}
        pageCount={pageCount}
        renderOnZeroPageCount={() => null}
        forcePage={currentPage}
      />
      <button
        type="button"
        className="relative flex items-center justify-center p-2 py-[8.5px] ml-0 bg-white border rounded-r border-slate-300  cursor-pointer text-slate-700 hover:bg-gray-200"
        onClick={() => onPageChange(pageCount - 1)}
      >
        <HiChevronDoubleRight className="w-5 h-5 text-slate-700" />
      </button>
    </div>
  );
};

export default Pagination;
