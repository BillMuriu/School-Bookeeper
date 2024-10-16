import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  renderToStream,
} from "@react-pdf/renderer";
import { NextResponse } from "next/server";

// Enhanced styles for a vibrant look
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#f0f0f0", // Light background for the entire page
  },
  table: {
    display: "table",
    width: "auto",
    margin: "auto",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#e0e0e0",
    borderRadius: 10, // Rounded corners for the table
    overflow: "hidden",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "14.2%", // For 7 columns
    padding: 10,
    backgroundColor: "#4CAF50", // Bold green background for headers
    borderStyle: "solid",
    borderColor: "#388E3C",
    borderWidth: 1,
  },
  tableCol: {
    width: "14.2%", // For 7 columns
    padding: 10,
    borderStyle: "solid",
    borderColor: "#dddddd",
    borderWidth: 1,
  },
  tableCellHeader: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#ffffff", // White text for the header
    textAlign: "center",
  },
  tableCell: {
    fontSize: 10,
    textAlign: "center",
    color: "#212121",
  },
  oddRow: {
    backgroundColor: "#f7f7f7", // Light gray background for odd rows
  },
  evenRow: {
    backgroundColor: "#fff", // White background for even rows
  },
});

// Simulating long table data with 25 rows
const longTableData = Array.from({ length: 25 }, (_, i) => ({
  col1: `Row ${i + 1} Col 1`,
  col2: `Col 2`,
  col3: `Col 3`,
  col4: `Col 4`,
  col5: `Col 5`,
  col6: `Col 6`,
  col7: `Col 7`,
}));

// Function to render the table headers
const renderTableHeader = () => (
  <View style={styles.tableRow}>
    <View style={styles.tableColHeader}>
      <Text style={styles.tableCellHeader}>Header 1</Text>
    </View>
    <View style={styles.tableColHeader}>
      <Text style={styles.tableCellHeader}>Header 2</Text>
    </View>
    <View style={styles.tableColHeader}>
      <Text style={styles.tableCellHeader}>Header 3</Text>
    </View>
    <View style={styles.tableColHeader}>
      <Text style={styles.tableCellHeader}>Header 4</Text>
    </View>
    <View style={styles.tableColHeader}>
      <Text style={styles.tableCellHeader}>Header 5</Text>
    </View>
    <View style={styles.tableColHeader}>
      <Text style={styles.tableCellHeader}>Header 6</Text>
    </View>
    <View style={styles.tableColHeader}>
      <Text style={styles.tableCellHeader}>Header 7</Text>
    </View>
  </View>
);

// Function to render the table rows with alternating row colors
const renderTableRows = (data) => {
  return data.map((row, index) => (
    <View
      style={[
        styles.tableRow,
        index % 2 === 0 ? styles.evenRow : styles.oddRow, // Alternate row colors
      ]}
      key={index}
    >
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>{row.col1}</Text>
      </View>
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>{row.col2}</Text>
      </View>
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>{row.col3}</Text>
      </View>
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>{row.col4}</Text>
      </View>
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>{row.col5}</Text>
      </View>
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>{row.col6}</Text>
      </View>
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>{row.col7}</Text>
      </View>
    </View>
  ));
};

// Splitting the table rows into two pages manually
const MyDocument = () => (
  <Document>
    {/* First page */}
    <Page style={styles.page}>
      <Text style={{ marginBottom: 20, fontSize: 16, color: "#333" }}>
        Table - Page 1
      </Text>
      <View style={styles.table}>
        {renderTableHeader()}
        {renderTableRows(longTableData.slice(0, 15))} {/* First 15 rows */}
      </View>
    </Page>

    {/* Second page */}
    <Page style={styles.page}>
      <Text style={{ marginBottom: 20, fontSize: 16, color: "#333" }}>
        Table - Page 2
      </Text>
      <View style={styles.table}>
        {renderTableHeader()} {/* Repeat the table headers */}
        {renderTableRows(longTableData.slice(15))} {/* Remaining rows */}
      </View>
    </Page>
  </Document>
);

export async function GET() {
  const stream = await renderToStream(<MyDocument />);
  return new NextResponse(stream);
}
