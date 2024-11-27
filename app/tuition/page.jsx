import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const TuitionAccount = () => {
  return (
    <>
      <span className="font-bold mb-9 w-full text-center text-xl">
        Operations Account Files
      </span>
      <div>
        <Link href="tuition/money-received">
          <Button variant="outline" className="w-full mt-3">
            Money Received
          </Button>
        </Link>
        <Link href="tuition/money-spent">
          <Button variant="outline" className="w-full mt-3">
            Money Spent
          </Button>
        </Link>
        <Link href="tuition/balances">
          <Button variant="outline" className="w-full mt-3">
            Balances
          </Button>
        </Link>
        <Link href="tuition/books">
          <Button variant="outline" className="w-full mt-3">
            Books
          </Button>
        </Link>
      </div>
    </>
  );
};

export default TuitionAccount;
