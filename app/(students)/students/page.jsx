"use client";

import React from "react";
// import { StudentsDataTable } from "@/components/tables/students-datatable";
import { StudentsDataTable } from "@/components/tables/students/advanced-students-data-table";
import { columns } from "./_components/student-columns";
import { useStudents } from "./_services/queries";
import DataTableSkeleton from "@/components/datatable-seleton-loader";

const StudentsTable = () => {
  const { data: students, isLoading, error } = useStudents();

  if (isLoading) return <DataTableSkeleton />;
  if (error) return <p>Error: {error.message}</p>;
  if (!students || students.length === 0) return <p>No students found</p>;

  return (
    <div>
      <h1>All Students</h1>
      <StudentsDataTable columns={columns} data={students} />
    </div>
  );
};

export default StudentsTable;
