"use client";

import { cn } from "@/lib/utils";
import {
  faAnglesLeft,
  faAnglesRight,
  faChevronLeft,
  faChevronRight,
  faSort,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export type Column<T> = {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
  className?: string;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string | number;
  onRowClick?: (item: T) => void;
  itemsPerPage?: number;
  searchable?: boolean;
  emptyMessage?: string;
};

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  itemsPerPage = 10,
  searchable = false,
  emptyMessage = "Không có dữ liệu",
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = searchable
    ? data.filter((item) =>
        Object.values(item as any).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      )
    : data;

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;

    const aValue = (a as any)[sortColumn];
    const bValue = (b as any)[sortColumn];

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnKey);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (columnKey: string) => {
    if (sortColumn !== columnKey) return faSort;
    return sortDirection === "asc" ? faSortUp : faSortDown;
  };

  return (
    <div className="w-full space-y-4">
      {searchable && (
        <div className="flex items-center gap-4">
          <input
            type="search"
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="max-w-sm rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-500">
            Tìm thấy {filteredData.length} kết quả
          </span>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    "px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500",
                    column.sortable && "cursor-pointer hover:bg-gray-100",
                    column.className,
                  )}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span>{column.label}</span>
                    {column.sortable && (
                      <FontAwesomeIcon
                        icon={getSortIcon(column.key)}
                        className="h-3 w-3"
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-sm text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((item) => (
                <tr
                  key={keyExtractor(item)}
                  onClick={() => onRowClick?.(item)}
                  className={cn(
                    "transition-colors",
                    onRowClick && "cursor-pointer hover:bg-gray-50",
                  )}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn(
                        "whitespace-nowrap px-6 py-4 text-center text-sm",
                        column.className,
                      )}
                    >
                      {column.render
                        ? column.render(item)
                        : String((item as any)[column.key] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages >= 1 && (
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-sm text-gray-500">
            Hiển thị <span className="font-medium">{startIndex + 1}</span> -{" "}
            <span className="font-medium">
              {Math.min(startIndex + itemsPerPage, sortedData.length)}
            </span>{" "}
            trong tổng số{" "}
            <span className="font-medium">{sortedData.length}</span>
          </div>
          <div className="flex items-center gap-2">
            {/* First Page */}
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1 || totalPages <= 1}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              title="Trang đầu"
            >
              <FontAwesomeIcon icon={faAnglesLeft} className="h-4 w-4" />
            </button>

            {/* Previous Page */}
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1 || totalPages <= 1}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              title="Trang trước"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-1">
              {totalPages > 0
                ? (() => {
                    const pages: (number | string)[] = [];
                    const maxVisible = 5;

                    if (totalPages <= maxVisible) {
                      for (let i = 1; i <= totalPages; i++) {
                        pages.push(i);
                      }
                    } else {
                      const initialStartPage = Math.max(
                        1,
                        currentPage - Math.floor(maxVisible / 2),
                      );
                      const initialEndPage = Math.min(
                        totalPages,
                        initialStartPage + maxVisible - 1,
                      );

                      const startPage =
                        initialEndPage - initialStartPage < maxVisible - 1
                          ? Math.max(1, initialEndPage - maxVisible + 1)
                          : initialStartPage;
                      const endPage = initialEndPage;

                      if (startPage > 1) {
                        pages.push(1);
                        if (startPage > 2) {
                          pages.push("...");
                        }
                      }

                      for (let i = startPage; i <= endPage; i++) {
                        pages.push(i);
                      }

                      if (endPage < totalPages) {
                        if (endPage < totalPages - 1) {
                          pages.push("...");
                        }
                        pages.push(totalPages);
                      }
                    }

                    return pages.map((page, index) => {
                      if (page === "...") {
                        return (
                          <span
                            key={`ellipsis-${index}`}
                            className="px-2 py-2 text-sm text-gray-500"
                          >
                            ...
                          </span>
                        );
                      }
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page as number)}
                          disabled={totalPages <= 1}
                          className={cn(
                            "min-w-[2.5rem] rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                            currentPage === page
                              ? "border-blue-500 bg-blue-50 text-blue-600"
                              : "border-gray-300 text-gray-700 hover:bg-gray-50",
                            totalPages <= 1 && "disabled:opacity-50",
                          )}
                        >
                          {page}
                        </button>
                      );
                    });
                  })()
                : null}
            </div>

            {/* Next Page */}
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages || totalPages <= 1}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              title="Trang sau"
            >
              <FontAwesomeIcon icon={faChevronRight} className="h-4 w-4" />
            </button>

            {/* Last Page */}
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages || totalPages <= 1}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              title="Trang cuối"
            >
              <FontAwesomeIcon icon={faAnglesRight} className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
