"use client";

import { RhfProvider } from "@/contexts/rhf-provider";
import { form1StudentSchema } from "../../students-schema";
import EditDeleteStudentForm from "@/app/students/_components/edit-delete-student";
import { useStudent } from "@/app/students/_services/queries";
import SkeletonLoader from "@/components/skeleton-loader";

const StudentWrapper = ({ params }) => {
  const studentId = params?.id;

  // Use the query to fetch student data
  const { data: student, isLoading, error } = useStudent(studentId);

  if (isLoading) return <SkeletonLoader />;
  if (error) return <p>Error: {error.message}</p>;
  if (!student) return <p>No student data found</p>;

  return (
    <RhfProvider
      schema={form1StudentSchema} // Use the appropriate schema for validation
      defaultValues={{
        admissionNumber: student.admissionNumber || "",
        firstName: student.firstName || "",
        lastName: student.lastName || "",
        dateOfBirth: student.dateOfBirth
          ? new Date(student.dateOfBirth)
          : new Date(),
        gender: student.gender || "male", // Set default to 'male' or your preferred value
        gradeClassLevel: student.gradeClassLevel || "form1", // Default to form1 or your preferred value
        guardiansName: student.guardiansName || "",
        guardiansPhoneNumber: student.guardiansPhoneNumber || "",
      }}
    >
      <EditDeleteStudentForm studentId={studentId} studentData={student} />
    </RhfProvider>
  );
};

export default StudentWrapper;
