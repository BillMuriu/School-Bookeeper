"use client";

import React from "react";
import { StudentsDataTable } from "@/components/tables/students-datatable";
import { columns } from "../../_components/student-columns";
import { useStudents } from "../../_services/queries";
import DataTableSkeleton from "@/components/datatable-seleton-loader";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const StudentsPage = () => {
  const { data: students, isLoading, error } = useStudents();

  if (isLoading) return <DataTableSkeleton />;
  if (error) return <p>Error: {error.message}</p>;
  if (!students) return <p>No students found</p>;

  console.log(students);

  return (
    <div>
      <h1>All Students</h1>
      <ScrollArea className="w-[32rem] whitespace-nowrap rounded-md border">
        <StudentsDataTable columns={columns} data={students} />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default StudentsPage;
