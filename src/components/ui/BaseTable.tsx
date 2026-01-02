"use client";

import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import "../../style/basetable.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
type CommonTableProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData>[];
  tableTotal?: number;
  totalPages?: number;
  activePage?: number;
  setActivePage?: React.Dispatch<React.SetStateAction<number>>;

  loading?: boolean;
};

export default function CommonTable<TData>({
  data,
  columns,
  tableTotal = 0,
  totalPages = 0,
  activePage = 1,
  setActivePage,
  loading = false,
}: CommonTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  // const [activePage, setActivePage] = useState<number>(5);
  // const pages = [1, 2, 3, 4, 5, 99]; // dummy pagination
  const getPaginationPages = (currentPage: number, totalPages: number) => {
    const pages: (number | string)[] = [];

    // If total pages are small → show all
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    // ---- DEFAULT: show first 5 ----
    if (currentPage <= 5) {
      for (let i = 1; i <= 5; i++) pages.push(i);

      if (totalPages > 5) {
        pages.push("...");
        pages.push(totalPages);
      }

      return pages;
    }

    // ---- AFTER PAGE 5 ----
    // Always show first 4
    pages.push(1, 2, 3, 4);
    pages.push("...");

    // Current + next (only if exists)
    pages.push(currentPage);

    if (currentPage + 1 <= totalPages) {
      pages.push(currentPage + 1);
    }

    return pages;
  };
  const pages = getPaginationPages(activePage, totalPages);
  const skeletonRows = 10; // Number of skeleton rows
  return (
    <div className="table-responsive">
      <table className="table table-hover table-bordered">
        <thead className="thead-light">
          {loading ? (
            <tr>
              {columns.map((_, index) => (
                <th key={index}>
                  <Skeleton height={20} width={80} />
                </th>
              ))}
            </tr>
          ) : (
            table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))
          )}
        </thead>
        <tbody>
          {loading
            ? [...Array(skeletonRows)].map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((_, colIndex) => (
                    <td key={colIndex}>
                      <Skeleton height={20} width="80%" />
                    </td>
                  ))}
                </tr>
              ))
            : table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>
        {/* pagination */}

        {loading ? (
          <tfoot>
            <tr className="table-pagination-row">
              <td colSpan={columns.length} className="px-0">
                <div className="pagination-container">
                  <span className="results-text">
                    <Skeleton width={170} height={18} />
                  </span>

                  <div className="pagination-controls d-flex align-items-center gap-2">
                    <Skeleton width={90} height={36} borderRadius={6} />

                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <Skeleton
                        key={i}
                        width={36}
                        height={36}
                        borderRadius={6}
                      />
                    ))}

                    <Skeleton width={70} height={36} borderRadius={6} />
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        ) : (
          <tfoot>
            <tr className="table-pagination-row">
              <td colSpan={columns.length} className="px-0">
                <div className="pagination-container">
                  <span className="results-text">
                    Showing {data.length} of {tableTotal} results
                  </span>

                  <div className="pagination-controls">
                    <button
                      className="page-btn d-flex align-items-center gap-2"
                      disabled={activePage === 1}
                      onClick={() => setActivePage?.((p) => Math.max(p - 1, 1))}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="9"
                        height="15"
                        viewBox="0 0 9 15"
                        fill="none"
                      >
                        <path
                          d="M7.18945 0.0390625C7.42816 0.0390625 7.65738 0.133946 7.82617 0.302734C7.99497 0.471529 8.08984 0.700741 8.08984 0.939453C8.08976 1.17798 7.99479 1.40649 7.82617 1.5752L2.24121 7.16113L2.21387 7.18848L2.24121 7.21582L7.82617 12.8027C7.99497 12.9715 8.08984 13.2007 8.08984 13.4395C8.08976 13.678 7.99479 13.9065 7.82617 14.0752C7.65738 14.244 7.42816 14.3389 7.18945 14.3389C6.95087 14.3388 6.72242 14.2439 6.55371 14.0752L0.303711 7.8252C0.219953 7.74173 0.152768 7.64241 0.107422 7.5332C0.0622563 7.42424 0.0391054 7.30741 0.0390625 7.18945C0.0390625 7.07129 0.0621397 6.95387 0.107422 6.84473C0.152768 6.73552 0.219953 6.6362 0.303711 6.55273L6.55371 0.302734C6.72241 0.134116 6.95094 0.0391546 7.18945 0.0390625Z"
                          fill="#8A8D93"
                          stroke="#8A8D93"
                          strokeWidth="0.078125"
                        />
                      </svg>
                      Previous
                    </button>

                    {pages.map((page, index) =>
                      page === "..." ? (
                        <span key={`dots-${index}`} className="dots">
                          ...
                        </span>
                      ) : (
                        <button
                          key={`${page}-${index}`}
                          className={`page-btn ${
                            activePage === page ? "active" : ""
                          }`}
                          onClick={() => setActivePage?.(Number(page))}
                        >
                          {page}
                        </button>
                      )
                    )}

                    <button
                      className="page-btn d-flex align-items-center gap-2"
                      disabled={activePage === totalPages}
                      onClick={() =>
                        setActivePage?.((p) => Math.min(p + 1, totalPages))
                      }
                    >
                      Next
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="9"
                        height="15"
                        viewBox="0 0 9 15"
                        fill="none"
                      >
                        <path
                          d="M0.94043 0.0390625C1.05862 0.0390625 1.17596 0.0621977 1.28516 0.107422C1.39436 0.152654 1.49357 0.219156 1.57715 0.302734L7.82715 6.55273C7.9108 6.63629 7.97725 6.73548 8.02246 6.84473C8.06768 6.95399 8.09096 7.07121 8.09082 7.18945C8.09068 7.30768 8.06695 7.42504 8.02148 7.53418C7.97601 7.64322 7.90898 7.7419 7.8252 7.8252L1.5752 14.0752C1.40648 14.2439 1.17805 14.3388 0.939453 14.3389C0.700741 14.3389 0.471529 14.244 0.302734 14.0752C0.134118 13.9065 0.0391491 13.678 0.0390625 13.4395C0.0390625 13.2007 0.13394 12.9715 0.302734 12.8027L5.88965 7.21777L5.91699 7.18945L5.88965 7.16211L0.304688 1.5752C0.221109 1.49162 0.154607 1.3924 0.109375 1.2832C0.0642457 1.17417 0.0410585 1.05746 0.0410156 0.939453C0.0410156 0.821255 0.0641426 0.703927 0.109375 0.594727C0.154607 0.485545 0.221121 0.3863 0.304688 0.302734C0.388225 0.219248 0.487564 0.152619 0.59668 0.107422C0.70568 0.0623371 0.822472 0.0390964 0.94043 0.0390625Z"
                          fill="#8A8D93"
                          stroke="#8A8D93"
                          strokeWidth="0.078125"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
