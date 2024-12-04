import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CashbookPDF from "./components/CashbookPDF";

const CashBookForm = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [formData, setFormData] = useState(null); // Store form data for the PDF
  const [cashbookData, setCashbookData] = useState({
    receipts: [],
    payments: [],
  }); // Store fetched cashbook data

  const onSubmit = (e) => {
    e.preventDefault();
    const parsedData = {
      month: Number(month),
      year: Number(year),
    };

    console.log("Parsed data:", parsedData);
    setFormData(parsedData); // Store the form data
    fetchCashbooks(parsedData.year, parsedData.month);
  };

  const fetchCashbooks = async (year, month) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/operations-cashbooks/cashbook/?year=${year}&month=${month}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Fetched cashbooks data:", data);
      setCashbookData(data); // Set the fetched data
    } catch (error) {
      console.error("Error fetching cashbooks:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col h-screen w-screen">
      <form onSubmit={onSubmit} className="flex flex-col space-y-4">
        <div className="flex justify-between space-x-4">
          {/* Month Field */}
          <div className="flex-1">
            <label>Month</label>
            <Input
              type="number"
              placeholder="Enter month (1-12)"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              required
            />
          </div>

          {/* Year Field */}
          <div className="flex-1">
            <label>Year</label>
            <Input
              type="number"
              placeholder="Enter year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </div>
        </div>

        <Button type="submit">Submit</Button>
      </form>

      {loading && <p>Loading cashbooks...</p>}

      {/* Show fetched cashbook data */}
      {cashbookData.receipts.length > 0 || cashbookData.payments.length > 0 ? (
        <pre className="mt-4 bg-gray-100 p-4 rounded">
          {JSON.stringify(cashbookData, null, 2)}
        </pre>
      ) : null}

      {/* PDF Download Link, only if there are receipts or payments */}
      {formData &&
        (cashbookData.receipts.length > 0 ||
          cashbookData.payments.length > 0) && (
          <Button className="mt-4">
            <div>
              <PDFDownloadLink
                document={
                  <CashbookPDF
                    month={formData.month}
                    year={formData.year}
                    cashbookData={cashbookData} // Pass the fetched data
                  />
                }
                fileName={`cashbook_${formData.month}_${formData.year}.pdf`}
              >
                {({ loading }) =>
                  loading ? "Preparing document..." : "Download Cashbook PDF"
                }
              </PDFDownloadLink>
            </div>
          </Button>
        )}
    </div>
  );
};

export default CashBookForm;
