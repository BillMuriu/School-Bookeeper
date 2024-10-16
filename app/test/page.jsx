"use client";

import React, { useState } from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const MyCashbookPDF = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Month is 1-indexed
  const [cashbookData, setCashbookData] = useState({
    receipts: [],
    payments: [],
  });
  const [loading, setLoading] = useState(false);

  // Fetch cashbooks dynamically based on selected year and month
  const fetchCashbooks = async (year, month) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/books/cashbook/?year=${year}&month=${month}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCashbookData(data);
    } catch (error) {
      console.error("Error fetching cashbooks:", error);
    } finally {
      setLoading(false);
    }
  };

  // Call the fetchCashbooks function when year or month is changed
  const handleYearChange = (e) => setYear(e.target.value);
  const handleMonthChange = (e) => setMonth(e.target.value);

  // Call fetchCashbooks when year or month changes
  const handleFetchData = () => {
    fetchCashbooks(year, month);
  };

  // Define PDF Layout using react-pdf
  const CashbookPDF = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>
          Cashbook Report - {month}/{year}
        </Text>

        {/* Receipts Section */}
        <Text style={styles.sectionTitle}>Receipts</Text>
        {cashbookData.receipts.map((receipt, index) => (
          <View key={index} style={styles.item}>
            <Text>From: {receipt.from_whom}</Text>
            <Text>Receipt No: {receipt.receipt_no}</Text>
            <Text>Cash: {receipt.cash}</Text>
            <Text>Bank: {receipt.bank}</Text>
            <Text>RMI: {receipt.rmi}</Text>
            <Text>Other Voteheads: {receipt.other_voteheads}</Text>
          </View>
        ))}

        {/* Payments Section */}
        <Text style={styles.sectionTitle}>Payments</Text>
        {cashbookData.payments.map((payment, index) => (
          <View key={index} style={styles.item}>
            <Text>Type: {payment.type}</Text>
            <Text>Voucher No: {payment.voucher_no}</Text>
            <Text>Cheque No: {payment.cheque_no}</Text>
            <Text>Cash: {payment.cash}</Text>
            <Text>Bank: {payment.bank}</Text>
            <Text>Bank Charge: {payment.bank_charge}</Text>
            <Text>Description: {payment.description}</Text>
            <Text>Date: {new Date(payment.date).toLocaleDateString()}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );

  return (
    <div>
      {/* Year and Month Inputs */}
      <div>
        <label>
          Year:
          <input type="number" value={year} onChange={handleYearChange} />
        </label>
        <label>
          Month:
          <input
            type="number"
            min="1"
            max="12"
            value={month}
            onChange={handleMonthChange}
          />
        </label>
        <button onClick={handleFetchData}>Fetch Data</button>
      </div>

      {/* Show loading state */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        // Render the PDF Download link
        <PDFDownloadLink
          document={<CashbookPDF />}
          fileName={`cashbook-${month}-${year}.pdf`}
        >
          {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
        </PDFDownloadLink>
      )}
    </div>
  );
};

// PDF styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    marginTop: 20,
    marginBottom: 10,
  },
  item: {
    marginBottom: 10,
  },
});

export default MyCashbookPDF;
