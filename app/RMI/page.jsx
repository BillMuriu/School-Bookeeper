import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const OperationAccount = () => {
  return (
    <>
      <span className="font-bold mb-9 w-full text-center text-xl">Operations Account Files</span>
      <div>
        <Link
          href="operations/money-received"
        >
          <Button
            variant="outline"
            className="w-full mt-3"
          >
            Money Received
          </Button>
        </Link>
        <Link
          href="operations/money-spent"
        >
          <Button
            variant="outline"
            className="w-full mt-3"
          >
            Money Spent
          </Button>
        </Link>
        <Link
          href="operations/balances"
        >
          <Button
            variant="outline"
            className="w-full mt-3"
          >
            Balances
          </Button>
        </Link>
        <Link
          href="operations/books"
        >
          <Button
            variant="outline"
            className="w-full mt-3"
          >
            Books
          </Button>
        </Link>
      </div>
    </>
  );
};

export default OperationAccount;
