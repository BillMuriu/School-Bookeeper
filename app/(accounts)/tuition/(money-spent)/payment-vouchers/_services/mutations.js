// mutation.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/app/constants";

// Create Tuition Payment Voucher
export function useCreateTuitionPaymentVoucher() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `${BASE_URL}/tuition-payment-vouchers/`, // Updated to tuition payment voucher endpoint
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
      await queryClient.invalidateQueries(["tuitionPaymentVouchers"]);

      toast.success("Tuition payment voucher created!", {
        description: "The new payment voucher has been successfully created.",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error(`Error creating tuition payment voucher: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}

// Edit Tuition Payment Voucher
export function useEditTuitionPaymentVoucher() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await axios.put(
        `${BASE_URL}/tuition-payment-vouchers/${id}/`, // Updated to tuition payment voucher endpoint
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
      await queryClient.invalidateQueries(["tuitionPaymentVouchers"]);

      toast.success("Tuition payment voucher updated!", {
        description: "The payment voucher has been successfully updated.",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error(`Error updating tuition payment voucher: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}

// Delete Tuition Payment Voucher
export function useDeleteTuitionPaymentVoucher() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(
        `${BASE_URL}/tuition-payment-vouchers/${id}/`, // Updated to tuition payment voucher endpoint
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries(["tuitionPaymentVouchers"]);

      toast.success("Tuition payment voucher deleted!", {
        description: "The payment voucher has been successfully deleted.",
        duration: 3000,
      });

      // Redirect to the payment vouchers list page after deletion
      router.push("/tuition-payment-vouchers");
    },

    onError: (error) => {
      toast.error(`Error deleting tuition payment voucher: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}
