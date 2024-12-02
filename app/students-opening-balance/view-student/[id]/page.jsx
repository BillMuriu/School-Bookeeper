"use client";

import { RhfProvider } from "@/contexts/rhf-provider";
import { studentOpeningBalanceSchema } from "../../students-opening-balance-schema";
import EditDeleteStudentOpeningBalanceForm from "../../_components/edit-delete-student-opening-balance";
import { useStudentOpeningBalance } from "../../_services/queries";
import SkeletonLoader from "@/components/skeleton-loader";

const OpeningBalanceWrapper = ({ params }) => {
  const openingBalanceId = params?.id;

  // Use the query to fetch opening balance data for a student
  const {
    data: openingBalance,
    isLoading,
    error,
  } = useStudentOpeningBalance(openingBalanceId);

  if (isLoading) return <SkeletonLoader />;
  if (error) return <p>Error: {error.message}</p>;
  if (!openingBalance) return <p>No opening balance data found</p>;

  return (
    <RhfProvider
      schema={studentOpeningBalanceSchema} // Use the appropriate schema for opening balance validation
      defaultValues={{
        student: openingBalance.student || "",
        balance: openingBalance.balance || "",
        dateRecorded: openingBalance.date_recorded
          ? new Date(openingBalance.date_recorded)
          : new Date(), // Default to today's date if no date is provided
      }}
    >
      <EditDeleteStudentOpeningBalanceForm
        openingBalanceId={openingBalanceId}
        studentOpeningBalanceData={openingBalance}
      />
    </RhfProvider>
  );
};

export default OpeningBalanceWrapper;
