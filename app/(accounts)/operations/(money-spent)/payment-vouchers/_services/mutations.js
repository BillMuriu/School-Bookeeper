// mutation.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useCreateOperationsPaymentVoucher() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/operations-paymentvouchers/create/",
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
      //   const voucherId = data.id;
      //   router.push(`/payment-vouchers/view/${voucherId}`);

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
        `http://127.0.0.1:8000/api/operations-paymentvouchers/${id}/update/`,
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
      //   const voucherId = data.id;
      //   router.push(`/payment-vouchers/view/${voucherId}`);

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
        `http://127.0.0.1:8000/api/operations-paymentvouchers/${id}/delete/`,
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

      // Redirect to the payment vouchers list page after deletion
      router.push("/payment-vouchers");
    },

    onError: (error) => {
      toast.error(`Error deleting payment voucher: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}
