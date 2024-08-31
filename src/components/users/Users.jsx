import axios from "axios";
import { Fragment, useEffect, useMemo, useState } from "react";
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { sortTypeCaseIgnore } from "../../lib/table";
import { USER_ROLE } from "../signup/useSignup";
import Pagination from "../../common/Pagination";
import Loading from "../../common/Loading";
import { useAuth } from "../../lib/AuthContext";

function prepareColumns() {
  return [
    {
      Header: "firstName",
      accessor: "firstName",
      headerClassName:
        "px-6 py-3 w-4/12 bg-pmcolor-100 text-left text-xs leading-4 font-medium text-pmcolor-900 uppercase tracking-wider",
      headerTextClassName: "inline-flex justify-left cursor-pointer",
      cellClassName: "px-6 py-4 align-top leading-5 text-gray-700",
      Cell: ({ row }) => {
        const original = row.original || {};

        return (
          <div className=" flex flex-col gap-1">
            <div className=" font-semibold text-gray-600  ">
              {original.firstName} {original.lastName}
            </div>

            <div className="   text-sm text-gray-600  ">
              {original.email || "--"}
            </div>
          </div>
        );
      },
      sortType: sortTypeCaseIgnore,
    },

    {
      Header: "mobile",
      accessor: "mobile",
      headerClassName:
        "px-6 py-3 w-4/12 bg-pmcolor-100 text-left text-xs leading-4 font-medium text-pmcolor-900 uppercase tracking-wider",
      headerTextClassName: "inline-flex justify-left cursor-pointer",
      cellClassName: "px-6 py-4 align-top leading-5 text-gray-700",
      Cell: ({ row }) => {
        const original = row.original || {};

        return (
          <div className=" hidden md:block leading-10">
            <div className=" leading-5 mt-1  text-sm text-gray-600  ">
              {original?.mobile || "--"}
            </div>
          </div>
        );
      },
      sortType: sortTypeCaseIgnore,
    },

    {
      Header: "role",
      accessor: "role",
      headerClassName:
        "px-6 py-3 w-4/12 bg-pmcolor-100 text-left text-xs leading-4 font-medium text-pmcolor-900 uppercase tracking-wider",
      headerTextClassName: "inline-flex justify-left cursor-pointer",
      cellClassName: "px-6 py-4 align-top leading-5 text-gray-700",
      Cell: ({ row }) => {
        const original = row.original || {};

        return (
          <div className=" hidden md:block leading-10">
            <div className=" leading-5 mt-1  text-sm text-gray-600  ">
              {original?.role || "--"}
            </div>
          </div>
        );
      },
      sortType: sortTypeCaseIgnore,
    },
  ];
}

function getUsersList(setUserList) {
  setUserList({ loading: true });

  const url = `http://localhost:5000/api/users`;

  return axios
    .get(url)
    .then((res) => {
      setUserList({
        loading: false,
        success: true,
        error: false,
        message: "User Register Successfully",
        data: res?.data || [],
      });
    })
    .catch((err) => {
      setUserList({
        loading: false,
        success: false,
        error: true,
        message:
          err.response?.data?.message || err.request?.message || err.message,
      });
    });
}

export default function Users() {
  const { logout } = useAuth();

  const [userList, setUserList] = useState({
    loading: false,
    error: false,
    message: "",
    success: false,
    data: [],
  });

  useEffect(() => {
    getUsersList(setUserList);
  }, []);

  const columns = useMemo(() => prepareColumns(), []);

  const data = useMemo(() => userList?.data || [], [userList?.data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    rows,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    setGlobalFilter,
    setFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: 10,
        sortBy: useMemo(() => [{ id: "Name" }], []),
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination
  );

  if (userList.loading) {
    return <Loading />;
  }

  return (
    <div className="shadow rounded-md bg-white border border-gray-50">
      <div className="px-4 pt-4 flex justify-between items-center">
        <div className="py-2 w-full space-y-3 sm:flex sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0">
          <h2 className="text-2xl w-full leading-8 font-semibold font-display text-gray-900 sm:text-3xl sm:leading-9">
            Users
          </h2>

          <button
            type="button"
            onClick={logout}
            className={` bg-violet-700 text-white font-semibold, text-lg mt-10 flex h-12 w-32 items-center justify-center rounded
                      `}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="px-4 sm:flex sm:items-center justify-between my-4">
        <div className="w-8/12 sm:grid sm:grid-cols-4 sm:gap-4 sm:items-start">
          <div className="mt-1 sm:mt-0 sm:col-span-8 md:flex  ">
            <div className=" w-1/2 items-center gap-3 flex">
              <div className="w-full rounded-md shadow-sm">
                <input
                  placeholder="Type to Search..."
                  className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  onChange={(e) => {
                    setGlobalFilter(e.target.value || undefined);
                  }}
                />
              </div>

              <div className={``}>
                <div className="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                  <select
                    onChange={(e) => {
                      const selectedOption =
                        e.target.options[e.target.selectedIndex];
                      const Role = selectedOption.getAttribute("data-fyid");
                      setFilter("role", Role || undefined);
                    }}
                    className=" border h-10 w-32 p-1 rounded-md border-gray-300 focus:outline-none"
                  >
                    <option value="">ALL Years</option>
                    {USER_ROLE.map((role, index) => (
                      <option
                        key={index}
                        value={role.value}
                        data-fyid={role.label}
                      >
                        {role.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="-my-2 py-2 overflow-x-auto p-4 mb-1" {...getTableProps()}>
        <div className="border rounded-md border-gray-100">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              {headerGroups.map((headerGroup, idx) => (
                <tr key={idx} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, cid) => (
                    <th
                      key={cid}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className={column.headerClassName}
                    >
                      <div className={column.headerTextClassName}>
                        {column.render("Header")}
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <svg
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              className="-mr-1 h-5 w-5"
                            >
                              <path
                                fillRule="evenodd"
                                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          ) : (
                            <svg
                              className="-mr-1 h-5 w-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          )
                        ) : (
                          <svg
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            className="-mr-1 h-5 w-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody
              {...getTableBodyProps()}
              className="bg-white divide-y divide-gray-200"
            >
              {page.length === 0 ? (
                <tr>
                  <td
                    colSpan="3"
                    className="px-6 py-4 text-base leading-5 text-gray-700"
                  >
                    <Fragment>No data found</Fragment>
                  </td>
                </tr>
              ) : null}
              {page.map((row, index) => {
                prepareRow(row);
                return (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  >
                    {row.cells.map((cell, index) => (
                      <td
                        key={index}
                        {...cell.getCellProps()}
                        className={cell.column.cellClassName}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>

            <Pagination
              totalRecords={rows.length}
              gotoPage={gotoPage}
              previousPage={previousPage}
              nextPage={nextPage}
              canPreviousPage={canPreviousPage}
              canNextPage={canNextPage}
              pageCount={pageCount}
              pageOptions={pageOptions}
              pageIndex={pageIndex}
              currentPageRecordCount={page.length}
              pageSize={pageSize}
              setPageSize={setPageSize}
              rows={rows}
            />
          </table>
        </div>
      </div>
    </div>
  );
}
