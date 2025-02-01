"use client";

import { useState, useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DataTablePagination } from "../pagination";
import { DataTableToolbar } from "./tool-bar";

export function TuitionPettyCashDataTable({ columns, data }) {
  const [columnFilters, setColumnFilters] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const table = useReactTable({
    data,
    columns,
    state: { columnFilters },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // Detect screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    // Initialize screen size on component mount
    handleResize();

    // Set up event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderTableHeader = (headerGroup) => (
    <TableRow key={headerGroup.id}>
      {headerGroup.headers.map((header) => {
        const isLeftAligned = header.column.columnDef.header === "Voucher No";
        return (
          <TableHead
            key={header.id}
            className={isLeftAligned ? "text-left" : "text-center"}
          >
            {header.isPlaceholder
              ? null
              : flexRender(header.column.columnDef.header, header.getContext())}
          </TableHead>
        );
      })}
    </TableRow>
  );

  const renderTableBody = () => (
    <TableBody>
      {table.getRowModel().rows.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
            {row.getVisibleCells().map((cell) => {
              const isLeftAligned =
                cell.column.columnDef.header === "Voucher No";
              return (
                <TableCell
                  key={cell.id}
                  className={isLeftAligned ? "text-left" : "text-center"}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              );
            })}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );

  return (
    <div>
      {/* Data Table Toolbar */}
      <DataTableToolbar table={table} />

      {/* Conditionally render ScrollArea width based on screen size */}
      <ScrollArea
        className={`w-${
          isSmallScreen ? "[350px]" : "full"
        } rounded-md border overflow-x-auto`}
      >
        <Table className="text-xs sm:text-sm">
          <TableHeader>
            {table.getHeaderGroups().map(renderTableHeader)}
          </TableHeader>
          {renderTableBody()}
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* Pagination */}
      <DataTablePagination table={table} />
    </div>
  );
}
