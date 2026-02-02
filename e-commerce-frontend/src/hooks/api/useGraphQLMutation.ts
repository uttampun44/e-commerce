import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { graphqlApi } from "@/utils/axios";
import type { DocumentNode } from "graphql";

interface UseGraphQLMutationOptions<TData = any, TVariables = any>
  extends Omit<
    UseMutationOptions<TData, Error, TVariables>,
    "mutationFn"
  > {}

export const useGraphQLMutation = <TData = any, TVariables = any>(
  mutation: string | DocumentNode,
  options: UseGraphQLMutationOptions<TData, TVariables> = {}
) => {
  return useMutation<TData, Error, TVariables>({
    mutationFn: async (variables: TVariables) => {
      const response = await graphqlApi.post("/graphql", {
        query: typeof mutation === "string" ? mutation : mutation,
        variables,
      });

      // Handle GraphQL errors
      if (response.data.errors) {
        throw new Error(response.data.errors[0]?.message || "GraphQL error");
      }

      return response.data.data;
    },
    ...options,
  });
};