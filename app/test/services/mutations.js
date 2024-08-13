import axios from "axios";
import omit from "lodash/omit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mapData } from "../types/mapData";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      await axios.post("http://localhost:8080/users");
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      alert("User created!");
    },
  });
}

export function useEditUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      if (data.variant === "edit") {
        await axios.put(
          `http://localhost:8080/users/${data.id}`,
          omit(mapData(data), "variant")
        );
        alert("User edited successfully!");
      }
    },

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });

      if (variables.variant === "edit") {
        await queryClient.invalidateQueries({
          queryKey: ["user", { id: variables.id }],
        });
      }
    },
  });
}
