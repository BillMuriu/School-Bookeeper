"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

export function DataTableToolbar({ table }) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 p-2 sm:p-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 flex-1">
        {/* Voucher Number Filter */}
        <Input
          placeholder="Search by voucher number..."
          value={table.getColumn("voucherNo")?.getFilterValue() || ""}
          onChange={(event) =>
            table.getColumn("voucherNo")?.setFilterValue(event.target.value)
          }
          className="h-8 w-full sm:w-[150px] lg:w-[250px]"
        />

        {/* Reset Filters Button */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
