// mutation.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/app/constants";

// Create Mutation
export function useCreateSchoolFundPaymentVoucher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `${BASE_URL}/school-fund-payment-vouchers/`,
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
      await queryClient.invalidateQueries(["schoolFundPaymentVouchers"]);

      toast.success("Payment voucher created!", {
        description:
          "The new school fund payment voucher has been successfully created.",
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

// Edit Mutation
export function useEditSchoolFundPaymentVoucher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await axios.put(
        `${BASE_URL}/school-fund-payment-vouchers/${id}/`,
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
      await queryClient.invalidateQueries(["schoolFundPaymentVouchers"]);

      toast.success("Payment voucher updated!", {
        description:
          "The school fund payment voucher has been successfully updated.",
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

// Delete Mutation
export function useDeleteSchoolFundPaymentVoucher() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(
        `${BASE_URL}/school-fund-payment-vouchers/${id}/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries(["schoolFundPaymentVouchers"]);

      toast.success("Payment voucher deleted!", {
        description:
          "The school fund payment voucher has been successfully deleted.",
        duration: 3000,
      });

      router.push("/school-fund/payment-vouchers");
    },

    onError: (error) => {
      toast.error(`Error deleting payment voucher: ${error.message}`, {
        description: "Please try again later.",
      });
    },
  });
}
