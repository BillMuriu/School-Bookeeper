"use client";

import React from "react";
import { TermPeriodTable } from "@/components/tables/term-periods-table";
import { columns } from "../_components/term-period-columns"; // Updated columns for term periods
import { useTermPeriods } from "../_services/queries"; // Updated query hook for term periods
import DataTableSkeleton from "@/components/datatable-seleton-loader";

const TermPeriodsTable = () => {
  const { data: termPeriods, isLoading, error } = useTermPeriods(); // Fetching term periods data

  if (isLoading) return <DataTableSkeleton />;
  if (error) return <p>Error: {error.message}</p>;
  if (!termPeriods) return <p>No term periods found</p>;

  return (
    <div>
      <h1>All Term Periods</h1> {/* Updated heading */}
      <TermPeriodTable columns={columns} data={termPeriods} />{" "}
      {/* Updated DataTable to use term periods */}
    </div>
  );
};

export default TermPeriodsTable;
