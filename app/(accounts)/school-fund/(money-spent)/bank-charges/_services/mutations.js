import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useCreateOperationsBankCharge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/bank-charges/",
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
      await queryClient.invalidateQueries(["bankCharges"]); // Update the query key as needed

      toast.success("Bank charge created!", {
        description:
          "The new bank charge record has been successfully created.",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error(`Error creating bank charge: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}

export function useEditOperationsBankCharges() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/bank-charges/${id}/`,
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
      await queryClient.invalidateQueries(["operationsBankCharges"]);

      toast.success("Bank charge updated!", {
        description: "The bank charge has been successfully updated.",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error(`Error updating bank charge: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}

export function useDeleteOperationsBankCharges() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/bank-charges/${id}/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries(["operationsBankCharges"]);

      toast.success("Bank charge deleted!", {
        description: "The bank charge has been successfully deleted.",
        duration: 3000,
      });

      // Redirect to the bank charges list page after deletion
      router.push("/bank-charges");
    },

    onError: (error) => {
      toast.error(`Error deleting bank charge: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}
