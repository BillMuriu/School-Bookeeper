"use client";

import { Input } from "@/components/ui/input";
import DataTableFacetedFilter from "./data-table-faceted-filter";
import { Separator } from "@/components/ui/separator";

export function DataTableToolbar({ table }) {
  const gradeClassLevelOptions = [
    { label: "Level 1", value: "1" },
    { label: "Level 2", value: "2" },
    { label: "Level 3", value: "3" },
    { label: "Level 4", value: "4" },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-2 sm:p-4">
      {/* Filter by Admission Number */}
      <div className="flex flex-wrap items-center gap-2 flex-1">
        {/* Filter by Grade Class Level */}
        <DataTableFacetedFilter
          column={table.getColumn("gradeClassLevel")}
          title="Grade Level"
          options={gradeClassLevelOptions}
          className="h-8 mb-1"
        />
        <Input
          type="text"
          placeholder="Filter By Admission Number..."
          value={table.getColumn("admissionNumber")?.getFilterValue() || ""}
          onChange={(e) =>
            table.getColumn("admissionNumber")?.setFilterValue(e.target.value)
          }
          className="h-8 w-full sm:w-[150px] lg:w-[250px]"
        />
      </div>
    </div>
  );
}
