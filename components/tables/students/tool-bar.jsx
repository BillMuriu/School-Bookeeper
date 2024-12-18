"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import DataTableFacetedFilter from "./data-table-faceted-filter";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DataTableToolbar({ table }) {
  const gradeClassLevelOptions = [
    { label: "Level 1", value: "1" },
    { label: "Level 2", value: "2" },
    { label: "Level 3", value: "3" },
    { label: "Level 4", value: "4" },
  ];

  return (
    <div className="flex items-center py-4 gap-4">
      {/* Filter by Name */}
      <Input
        type="text"
        placeholder="Filter By Name..."
        value={table.getColumn("name")?.getFilterValue() || ""}
        onChange={(e) =>
          table.getColumn("name")?.setFilterValue(e.target.value)
        }
        className="max-w-sm"
      />

      {/* Filter by Grade Class Level */}
      <DataTableFacetedFilter
        column={table.getColumn("gradeClassLevel")}
        title="Grade Level"
        options={gradeClassLevelOptions}
        className="h-8"
      />

      {/* View Options */}
      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            <EyeOpenIcon className="mr-2 h-4 w-4" />
            View
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu> */}
    </div>
  );
}
