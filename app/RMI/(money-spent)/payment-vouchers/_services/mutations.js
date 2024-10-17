// mutation.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/app/constants";
// Create RMI Payment Voucher
export function useCreateRmiPaymentVoucher() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `${BASE_URL}/rmi-payment-vouchers/create/`,
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
      await queryClient.invalidateQueries(["rmiPaymentVouchers"]);

      toast.success("RMI payment voucher created!", {
        description: "The new payment voucher has been successfully created.",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error(`Error creating RMI payment voucher: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}

// Edit RMI Payment Voucher
export function useEditRmiPaymentVoucher() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await axios.put(
        `${BASE_URL}/rmi-payment-vouchers/${id}/update/`,
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
      await queryClient.invalidateQueries(["rmiPaymentVouchers"]);

      toast.success("RMI payment voucher updated!", {
        description: "The payment voucher has been successfully updated.",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error(`Error updating RMI payment voucher: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}

// Delete RMI Payment Voucher
export function useDeleteRmiPaymentVoucher() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(
        `${BASE_URL}/rmi-payment-vouchers/${id}/delete/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries(["rmiPaymentVouchers"]);

      toast.success("RMI payment voucher deleted!", {
        description: "The payment voucher has been successfully deleted.",
        duration: 3000,
      });

      // Redirect to the payment vouchers list page after deletion
      router.push("/rmi-payment-vouchers");
    },

    onError: (error) => {
      toast.error(`Error deleting RMI payment voucher: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}
