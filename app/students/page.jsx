import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const OperationAccount = () => {
  return (
    <>
      <span className="font-bold mb-9 w-full text-center text-xl">
        Student Information
      </span>
      <div>
        <Link href="students/form1">
          <Button variant="outline" className="w-full mt-3">
            Form 1
          </Button>
        </Link>
        <Link href="students/form2">
          <Button variant="outline" className="w-full mt-3">
            Form 2
          </Button>
        </Link>
        <Link href="students/form3">
          <Button variant="outline" className="w-full mt-3">
            Form 3
          </Button>
        </Link>
        <Link href="students/form4">
          <Button variant="outline" className="w-full mt-3">
            Form 4
          </Button>
        </Link>
      </div>
    </>
  );
};

export default OperationAccount;
