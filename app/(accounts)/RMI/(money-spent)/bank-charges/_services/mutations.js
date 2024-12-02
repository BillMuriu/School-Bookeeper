import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/app/constants";

export function useCreateRmiBankCharge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(`${BASE_URL}/rmi-bank-charges/`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries(["rmiBankCharges"]); // Adjust query key if needed

      toast.success("RMI bank charge created!", {
        description: "The new RMI bank charge has been successfully created.",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error(`Error creating RMI bank charge: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}

export function useEditRmiBankCharge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await axios.put(
        `${BASE_URL}/rmi-bank-charges/${id}/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries(["rmiBankCharges"]); // Adjust query key if needed

      toast.success("RMI bank charge updated!", {
        description: "The RMI bank charge has been successfully updated.",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error(`Error updating RMI bank charge: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}

export function useDeleteRmiBankCharge() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(
        `${BASE_URL}/rmi-bank-charges/${id}/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries(["rmiBankCharges"]); // Adjust query key if needed

      toast.success("RMI bank charge deleted!", {
        description: "The RMI bank charge has been successfully deleted.",
        duration: 3000,
      });

      // Redirect to the RMI bank charges list page after deletion
      router.push("/rmi-bank-charges");
    },

    onError: (error) => {
      toast.error(`Error deleting RMI bank charge: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}
