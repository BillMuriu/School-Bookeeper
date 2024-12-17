"use client";

import { RhfProvider } from "@/contexts/rhf-provider";
import { studentSchema } from "../../students-schema";
import EditDeleteStudentForm from "../../_components/edit-delete-student";
import { useStudent } from "../../_services/queries";
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
      schema={studentSchema} // Use the appropriate schema for validation
      defaultValues={{
        admissionNumber: student.admissionNumber || "",
        firstName: student.firstName || "",
        lastName: student.lastName || "",
        dateOfBirth: student.dateOfBirth
          ? new Date(student.dateOfBirth)
          : new Date(),
        admissionDate: student.admissionDate
          ? new Date(student.admissionDate)
          : new Date(), // Set default to today's date if no admission date is provided
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
