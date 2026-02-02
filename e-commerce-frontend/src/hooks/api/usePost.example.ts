/**
 * Example of how to update your usePost hook to work with Clerk
 * This shows the key changes needed in your usePost.ts file
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

export const usePost = <TResponse, TRequest>(
  url: string,
  {
    invalidateQueries,
    onSuccess,
    onError,
  }: {
    invalidateQueries?: string[][];
    onSuccess?: (data: TResponse) => void;
    onError?: (error: any) => void;
  } = {}
) => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth(); // Get Clerk token function

  return useMutation({
    mutationFn: async (data: TRequest) => {
      try {
        // Get the Clerk token
        const clerkToken = await getToken();

        // Prepare headers with Clerk token if available
        const headers: any = {
          "Content-Type": "application/json",
        };

        if (clerkToken) {
          headers.Authorization = `Bearer ${clerkToken}`;
        }

        // Make the API call
        const response = await axios.post(url, data, { headers });
        return response.data as TResponse;
      } catch (error) {
        throw error;
      }
    },

    onSuccess: (data) => {
      // Invalidate queries if provided
      if (invalidateQueries) {
        invalidateQueries.forEach((query) => {
          queryClient.invalidateQueries({ queryKey: query });
        });
      }

      // Call the custom onSuccess callback
      if (onSuccess) {
        onSuccess(data);
      }
    },

    onError: (error) => {
      if (onError) {
        onError(error);
      }
    },
  });
};
