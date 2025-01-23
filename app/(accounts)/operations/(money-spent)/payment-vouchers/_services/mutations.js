import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/app/constants"; // Make sure to define the BASE_URL

export function useCreateOperationsPaymentVoucher() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `${BASE_URL}/operations-paymentvouchers/create/`,
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
      await queryClient.invalidateQueries(["paymentVouchers"]);
      toast.success("Payment voucher created!", {
        description: "The new payment voucher has been successfully created.",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error(`Error creating payment voucher: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}

export function useEditOperationsPaymentVoucher() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await axios.put(
        `${BASE_URL}/operations-paymentvouchers/${id}/update/`,
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
      await queryClient.invalidateQueries(["paymentVouchers"]);
      toast.success("Payment voucher updated!", {
        description: "The payment voucher has been successfully updated.",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error(`Error updating payment voucher: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}

export function useDeleteOperationsPaymentVoucher() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(
        `${BASE_URL}/operations-paymentvouchers/${id}/delete/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries(["paymentVouchers"]);
      toast.success("Payment voucher deleted!", {
        description: "The payment voucher has been successfully deleted.",
        duration: 3000,
      });
      router.push("/payment-vouchers");
    },

    onError: (error) => {
      toast.error(`Error deleting payment voucher: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}
