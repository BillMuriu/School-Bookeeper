"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

export function DataTableToolbar({ table }) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 p-2 sm:p-4">
      {/* Cheque Number Filter */}
      <div className="flex flex-wrap items-center gap-2 flex-1">
        <Input
          placeholder="Search by cheque number..."
          value={table.getColumn("cheque_number")?.getFilterValue() || ""}
          onChange={(event) =>
            table.getColumn("cheque_number")?.setFilterValue(event.target.value)
          }
          className="h-8 w-full sm:w-[150px] lg:w-[250px]"
        />

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
