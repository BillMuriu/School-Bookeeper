"use client";

import { RhfProvider } from "@/contexts/rhf-provider";
import { termPeriodSchema, defaultTermPeriod } from "../../term-periods-schema"; // Updated schema and default values import
import EditTermPeriodForm from "../../_components/edit-term-period-form"; // Ensure correct file path
import { useTermPeriod } from "../../_services/queries"; // Updated query hook
import SkeletonLoader from "@/components/skeleton-loader";

const TestFormWrapper = ({ params }) => {
  const termPeriodId = params?.id;

  // Use the query to fetch term period data
  const { data: termPeriod, isLoading, error } = useTermPeriod(termPeriodId);

  if (isLoading) return <SkeletonLoader />;
  if (error) return <p>Error: {error.message}</p>;
  if (!termPeriod) return <p>No term period data found</p>;

  return (
    <RhfProvider
      schema={termPeriodSchema}
      defaultValues={{
        termName: termPeriod.term_name || defaultTermPeriod.termName, // Default value if not present
        startDate: termPeriod.start_date
          ? new Date(termPeriod.start_date)
          : defaultTermPeriod.startDate, // Parse date
        endDate: termPeriod.end_date
          ? new Date(termPeriod.end_date)
          : defaultTermPeriod.endDate, // Parse date
        year: termPeriod.year || defaultTermPeriod.year,
        fees: termPeriod.fees
          ? parseFloat(termPeriod.fees)
          : defaultTermPeriod.fees, // Ensure it's a float
      }}
    >
      <EditTermPeriodForm termPeriodId={termPeriodId} />
    </RhfProvider>
  );
};

export default TestFormWrapper;
