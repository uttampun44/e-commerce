import { useQuery, type QueryKey } from "@tanstack/react-query";
import { useEffect } from "react";
import { graphqlApi } from "@/utils/axios";
import type { DocumentNode } from "graphql";

/**
 * Configuration options for GraphQL queries
 */
interface UseGraphQLOptions<TData = any> {
  variables?: Record<string, any>;
  enabled?: boolean;
  onSuccess?: (data: TData) => void;
  onError?: (error: any) => void;
}

/**
 * Custom hook for GraphQL queries using React Query
 * @param queryKey - Unique key for caching
 * @param query - GraphQL query string or DocumentNode
 * @param options - Configuration options
 */
export const useGraphQL = <TData = any>(
  queryKey: QueryKey,
  query: string | DocumentNode,
  options: UseGraphQLOptions<TData> = {}
) => {
  const { variables, enabled = true, onSuccess, onError } = options;

  const graphqlQuery = useQuery({
    queryKey: [...queryKey, variables],
    queryFn: async () => {
      const response = await graphqlApi.post("/graphql", {
        query: typeof query === "string" ? query : query,
        variables,
      });

      // Handle GraphQL errors
      if (response.data.errors) {
        throw new Error(response.data.errors[0]?.message || "GraphQL error");
      }

      return response.data.data;
    },
    enabled,
  });

  // Handle side effects
  useEffect(() => {
    if (graphqlQuery.isSuccess && onSuccess) {
      onSuccess(graphqlQuery.data as TData);
    }
  }, [graphqlQuery.isSuccess, graphqlQuery.data, onSuccess]);

  useEffect(() => {
    if (graphqlQuery.isError && onError) {
      onError(graphqlQuery.error);
    }
  }, [graphqlQuery.isError, graphqlQuery.error, onError]);

  return graphqlQuery;
};
