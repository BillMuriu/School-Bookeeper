"use client";

import { RhfProvider } from "@/contexts/rhf-provider";
import { schoolFundReceiptSchema } from "../../school-fund-receipt-schema";
import AddStudentReceiptForm from "../../_components/add-student-receipt-form"; // Adjust component path
import { useStudent } from "@/app/(students)/students/_services/queries";
import SkeletonLoader from "@/components/skeleton-loader";

const AddStudentReceiptWrapper = ({ params }) => {
  const studentId = params?.id;

  const { data: student, isLoading, error } = useStudent(studentId);

  if (isLoading) return <SkeletonLoader />;
  if (error) return <p>Error: {error.message}</p>;
  if (!student) return <p>No student data found</p>;

  return (
    <RhfProvider
      schema={schoolFundReceiptSchema}
      defaultValues={{
        account: "school_fund_account",
        receivedFrom: `${student.firstName} ${student.lastName}` || "",
        cashBank: "cash",
        totalAmount: null,
        student: student.id ?? null,
        date: new Date(),
      }}
    >
      <AddStudentReceiptForm />
    </RhfProvider>
  );
};

export default AddStudentReceiptWrapper;
