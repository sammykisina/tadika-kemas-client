import React, { Fragment, useRef } from "react";
import {
  useExpanded,
  useFilters,
  useGlobalFilter,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import { GlobalFilter } from "@/components";
import { sortIcons } from "@/assets";

const Table = ({
  columns,
  data,
  // renderRowSubComponent,
  show_filters,
  table_height,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
    state: { globalFilter },
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      autoResetSortBy: false,
      autoResetPage: false,
      autoResetExpanded: false,
      pagination: false,
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    useRowSelect
  );
  const { SortIcon, SortDownIcon, SortUpIcon } = sortIcons;

  return (
    <section className="pb-2 ">
      {show_filters && (
        <section
          className={`flex flex-col items-start justify-start  gap-3 px-2 xs:flex-col  sm:flex-col sm:items-start md:flex-col lg:flex-row lg:items-center `}
        >
          {/* the global search section */}
          <GlobalFilter
            pre_global_filtered_rows={preGlobalFilteredRows}
            global_filter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />

          {/* the filter by role section */}
          <div
            className={`flex w-fit  items-center gap-1 duration-300 sm:flex-col md:flex-row lg:flex-col xl:flex-row`}
          >
            {headerGroups.map((headerGroup) =>
              headerGroup.headers.map((column) =>
                column.Filter ? (
                  <div key={column.id}>{column.render("Filter")}</div>
                ) : null
              )
            )}
          </div>
        </section>
      )}

      {/* tabel */}
      <section
        className={`mt-4 flex w-auto flex-col  overflow-y-scroll scrollbar-hide  ${
          show_filters ? table_height : "h-fit"
        }`}
      >
        <div
          className={`border-c_gray/50 w-full overflow-y-scroll  rounded-[2rem] border  scrollbar-hide `}
        >
          <table
            {...getTableProps()}
            className="divide-c_gray mx-auto w-full  min-w-full max-w-4xl divide-y overflow-hidden whitespace-nowrap    bg-white"
          >
            {/* the table head */}
            <thead className=" ">
              {headerGroups.map((header_group, header_group_index) => (
                <tr
                  key={header_group_index}
                  {...header_group.getHeaderGroupProps()}
                >
                  {header_group.headers.map((column, column_index) => (
                    <th
                      key={column_index}
                      scope="col"
                      className="text-c_dark/50 group px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      <div className="flex items-center justify-start">
                        {column.render("Header")}
                        {/* Add a sort direction indicator */}
                        <span>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <SortDownIcon class_name="h-5 w-5 text-gray" />
                            ) : (
                              <SortUpIcon class_name="h-5 w-5 text-gray" />
                            )
                          ) : (
                            <SortIcon class_name="h-5 w-5  text-c_gray opacity-0 group-hover:opacity-100" />
                          )}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {/* the table body */}
            <tbody
              {...getTableBodyProps()}
              className="divide-gray divide-y bg-white duration-300"
            >
              {rows.map((row, i) => {
                // new
                prepareRow(row);
                return (
                  <Fragment key={i}>
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell, cell_index) => {
                        return (
                          <td
                            key={cell_index}
                            {...cell.getCellProps()}
                            className="text-dark/80 w-[325px] max-w-[325px] truncate whitespace-nowrap px-6 py-2 text-sm font-semibold first-letter:capitalize hover:break-words"
                            role="cell"
                          >
                            {cell.column.Cell.name === "defaultRenderer" ? (
                              <div className="text-sm text-gray-500 ">
                                {cell.render("Cell")}
                              </div>
                            ) : (
                              cell.render("Cell")
                            )}
                          </td>
                        );
                      })}
                    </tr>

                    {row.isExpanded ? (
                      <tr>
                        <td colSpan={visibleColumns.length}>
                          {renderRowSubComponent({ row })}
                        </td>
                      </tr>
                    ) : null}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
};

export default Table;
