"use client";

import React, { useState } from "react";
import { useOperationsCashbook } from "./_services/queries";
import DataTableSkeleton from "@/components/datatable-seleton-loader";

const Cashbook = () => {
  // State for the form inputs
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  // State to track when to trigger the query
  const [submitted, setSubmitted] = useState(false);

  // Conditionally invoke the query only after form submission
  const { data, isLoading, isError } = useOperationsCashbook(
    { month, year },
    {
      enabled: submitted, // This disables the query until 'submitted' is true
    }
  );

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (month && year) {
      // Trigger the query
      setSubmitted(true);
    }
  };

  if (isLoading) {
    return <DataTableSkeleton className="w-full h-40" />;
  }

  if (isError) {
    return <div>Error loading cashbook data.</div>;
  }

  return (
    <div>
      <h1>Cashbook</h1>

      {/* Form for month and year selection */}
      <form onSubmit={handleSubmit}>
        <label>
          Month:
          <input
            type="number"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            min={1}
            max={12}
            required
          />
        </label>
        <label>
          Year:
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            min={2000}
            max={3000}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      {/* Display the fetched data */}
      {submitted && data && (
        <div>
          <h2>
            Cashbook for {month}/{year}
          </h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Cashbook;
