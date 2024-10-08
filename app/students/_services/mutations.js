import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Mutation to create a student
export function useCreateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/students/", // Adjust the URL to your API endpoint
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },

    onSuccess: async (data) => {
      await queryClient.invalidateQueries(["students"]); // Invalidate the 'students' query
      toast.success("Student created!", {
        description: "The new student record has been successfully created.",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error(`Error creating student: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}

// Mutation to edit a student
export function useEditStudent() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/students/${id}/`, // Adjust URL with student ID
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },

    onSuccess: async (data) => {
      await queryClient.invalidateQueries(["students"]); // Invalidate the 'students' query
      toast.success("Student updated!", {
        description: "The student record has been successfully updated.",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error(`Error updating student: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}

// Mutation to delete a student
export function useDeleteStudent() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/students/${id}/`, // Adjust URL with student ID
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries(["students"]); // Invalidate the 'students' query
      toast.success("Student deleted!", {
        description: "The student record has been successfully deleted.",
        duration: 3000,
      });

      // Redirect to the student list page after deletion
      router.push("/students");
    },

    onError: (error) => {
      toast.error(`Error deleting student: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}
