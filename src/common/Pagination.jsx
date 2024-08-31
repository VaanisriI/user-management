
const DEFAULT_PAGE_CSS =
  "-ml-px relative inline-flex items-center px-4 py-2 border border-gray-200 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-700 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150";

const ACTIVE_PAGE_CSS =
  "-ml-px relative inline-flex items-center px-4 py-2 border border-indigo-200 bg-pmcolor-200 text-sm leading-5 font-medium hover:text-pmcolor-500 hover:bg-white focus:z-10 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo active:bg-white active:text-indigo-700 transition ease-in-out duration-150";

function getPageNumbersToDisplay(pageIndex, totalPages, paginationPageCount) {
  const halfPoint = Math.floor(paginationPageCount / 2);
  let pageStartIndex = pageIndex - halfPoint;
  let startOffset = 0;
  if (pageStartIndex < 0) {
    startOffset = 0 - pageStartIndex;
    pageStartIndex = 0;
  }
  let pageEndIndex = pageIndex + halfPoint;
  let endOffset = 0;
  if (pageEndIndex >= totalPages) {
    endOffset = totalPages - pageEndIndex;
    pageEndIndex = totalPages - 1;
  }
  pageStartIndex = Math.max(0, pageStartIndex + endOffset);
  pageEndIndex = Math.min(totalPages - 1, pageEndIndex + startOffset);
  const pages = [];
  for (let indx = pageStartIndex; indx <= pageEndIndex; indx++) {
    pages.push(indx);
  }
  return pages;
}

function Pagination({
  canPreviousPage,
  previousPage,
  nextPage,
  canNextPage,
  totalRecords,
  pageSize,
  pageIndex,
  gotoPage,
  pageCount,
  setPageSize,
  currentPageRecordCount,
  paginationPageCount,
}) {
  if (totalRecords === 0) {
    return null;
  }

  const startRecord = pageIndex * pageSize + 1;
  const endRecord = startRecord + currentPageRecordCount - 1;

  paginationPageCount = paginationPageCount || 7;

  return (
    <div className="bg-white px-4 py-4 flex items-center justify-between border-t border-gray-200 sm:px-6 ">
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="relative inline-flex items-center px-4 py-2 border border-gray-200 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
        >
          Previous
        </button>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-200 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm leading-5">
            Showing
            <span className="font-medium mx-1 text-gray-500 hover:text-gray-700">
              {startRecord}
            </span>
            to
            <span className="font-medium mx-1 text-gray-500 hover:text-gray-700">
              {endRecord}
            </span>
            of
            <span className="font-medium mx-1 text-gray-500 hover:text-gray-700">
              {totalRecords}
            </span>
            results
          </p>
        </div>
        <div>
          <select
            className="form-select h-full py-1 pl-3 pr-8 border-gray-200 text-gray-500 sm:text-sm sm:leading-5"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20, 30, 40, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div>
          <span className="relative z-0 inline-flex shadow-sm">
            <button
              type="button"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-200 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-200 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
            >
              Previous
            </button>
            {getPageNumbersToDisplay(
              pageIndex,
              pageCount,
              paginationPageCount
            ).map((pageNumber) => {
              return (
                <button
                  type="button"
                  key={pageNumber}
                  onClick={() => gotoPage(pageNumber)}
                  className={
                    pageNumber === pageIndex
                      ? ACTIVE_PAGE_CSS
                      : DEFAULT_PAGE_CSS
                  }
                >
                  {pageNumber + 1}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-200 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
            >
              Next
            </button>
            <button
              type="button"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-200 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
