"use client";

import { format } from "date-fns";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export const columns = [
  {
    accessorKey: "account",
    header: () => <div className="text-left">Account</div>, // Left align header
    cell: ({ getValue, row }) => {
      const value = getValue();
      const bankChargeId = row.original.id;
      return (
        <div className="flex items-center justify-start gap-2">
          <div className="text-left">{value}</div> {/* Left align value */}
          <Link
            href={`/operations/bank-charges/view-bankcharge/${bankChargeId}`}
            className="text-blue-500 hover:text-blue-700"
            aria-label="View Bank Charge Details"
          >
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      );
    },
  },

  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount (Shs)</div>, // Right align header
    cell: ({ getValue }) => (
      <div className="text-right">
        {parseFloat(getValue()).toFixed(2)} {/* Format amount as decimal */}
      </div>
    ),
  },
  {
    accessorKey: "chargeDate",
    header: () => <div className="text-center">Charge Date</div>, // Center align header
    cell: ({ getValue }) => (
      <div className="text-center">
        {format(new Date(getValue()), "MM/dd/yyyy")} {/* Format date */}
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: () => <div className="text-left">Description</div>, // Left align header
    cell: ({ getValue }) => {
      const value = getValue();
      const maxWords = 2; // Maximum number of words before truncation
      const words = value.split(" ");

      // Truncate and add ellipsis if the description exceeds the max words
      const truncatedDescription =
        words.length > maxWords
          ? words.slice(0, maxWords).join(" ") + "..."
          : value;

      return <div className="text-left">{truncatedDescription}</div>;
    },
  },
];
