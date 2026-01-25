/**
 * usePost Hook - Makes POST requests to the API
 * 
 * This hook is used to send data to the backend via POST requests
 * and handles success/error responses automatically.
 * 
 * @param url - The API endpoint (e.g., "/api/v1/auth/register")
 * @param options - Configuration options for the request
 * 
 * @example
 * const { mutate, isPending } = usePost("/api/v1/auth/login", {
 *   onSuccess: () => toast.success("Login successful"),
 *   onError: (error) => toast.error(error.response.data.message)
 * })
 */

import { api } from "@/utils/axios";
import {useMutation, useQueryClient, type QueryKey } from "@tanstack/react-query";
import type { AxiosError } from "axios";

/**
 * Configuration options for the POST request
 */
interface UsePostOptions<TData = any, TVariables = any> {
  /** Function called when request succeeds */
  onSuccess?: (data: TData, variables: TVariables) => void;
  
  /** Function called when request fails */
  onError?: (error: AxiosError, variables: TVariables) => void;
  
  /** Cache keys to refresh after successful request */
  invalidateQueries?: QueryKey[];
  
  showSuccessMessage?: boolean;
  showErrorMessage?: boolean;
}

export const usePost =  <TData = any, TVariables = any>(
  url: string | ((payload: TVariables) => string),
  options: UsePostOptions<TData, TVariables> = {}
) => {
  // Get React Query's cache manager
  const queryClient = useQueryClient()

  // Extract options with default values
  const {
    invalidateQueries = [],
    showSuccessMessage = false,
    showErrorMessage = true,
  } = options;

  return useMutation({
  
    mutationFn: async(payload: TVariables) => {
      const endpoint = typeof url === "function" ? url(payload) : url
      
      const response = await api.post(endpoint, payload)
      return response
    },
   
    onSuccess: async(data) => {

      invalidateQueries.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey });
      });

      if (showSuccessMessage) {
        console.log("✓", (data as any)?.data?.message || (data as any)?.message || "Success");
      }

      if (options.onSuccess) {
        options.onSuccess((data as any)?.data, undefined as any);
      }
    },

    onError: async(error: AxiosError) => {
      if (showErrorMessage) {
        const errorData = (error.response?.data as any);
        const message = errorData?.message || error.message || "Failed";
        console.error("✗", message);
      }

      if (options.onError) {
        options.onError(error, undefined as any);
      }
    },
  })
}