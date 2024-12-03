"use client";

import { RhfProvider } from "@/contexts/rhf-provider";
import { studentOpeningBalanceSchema } from "../../students-opening-balance-schema";
import AddSpecificStudentOpeningBalanceForm from "../../_components/add-specific-student-opening-balance";
import { useStudent } from "@/app/(students)/students/_services/queries";
import SkeletonLoader from "@/components/skeleton-loader";

const AddStudentOpeningBalanceWrapper = ({ params }) => {
  const studentId = params?.id;

  const { data: student, isLoading, error } = useStudent(studentId);

  if (isLoading) return <SkeletonLoader />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <RhfProvider
      schema={studentOpeningBalanceSchema}
      defaultValues={{
        student: student.id ?? null, // Prepopulate with student ID
        balance: null, // Empty by default
        dateRecorded: new Date(), // Default to today's date
      }}
    >
      <AddSpecificStudentOpeningBalanceForm />
    </RhfProvider>
  );
};

export default AddStudentOpeningBalanceWrapper;
