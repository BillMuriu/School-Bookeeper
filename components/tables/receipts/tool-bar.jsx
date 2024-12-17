"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DataTableFacetedFilter from "./data-table-faceted-filter";

import { X } from "lucide-react";

export function DataTableToolbar({ table }) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex flex-1 items-center space-x-2">
        {/* Search by receivedFrom field */}
        <Input
          placeholder="Search by receivedFrom..."
          value={table.getColumn("receivedFrom")?.getFilterValue() || ""}
          onChange={(event) =>
            table.getColumn("receivedFrom")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {/* Cash/Bank Filter */}
        {table.getColumn("cashBank") && (
          <DataTableFacetedFilter
            column={table.getColumn("cashBank")}
            title="Cash/Bank"
            options={[
              { label: "Bank", value: "bank" },
              { label: "Cash", value: "cash" },
              { label: "Transfer", value: "transfer" },
            ]}
          />
        )}

        {/* Reset Filters Button */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset <X />
          </Button>
        )}
      </div>
    </div>
  );
}
