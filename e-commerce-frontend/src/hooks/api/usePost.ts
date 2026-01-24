

/**
 * Generic POST hook
 * @param {string|function} url - API endpoint or function that returns endpoint
 * @param {Object} options - Configuration options
 * @returns Mutation object
 */

import { api } from "@/utils/axios";
import {useMutation, useQueryClient, type QueryKey } from "@tanstack/react-query";
import type { AxiosError } from "axios";

interface UsePostOptions<TData = any, TVariables = any> {
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: AxiosError, variables: TVariables) => void;
  invalidateQueries?: QueryKey[];
  showSuccessMessage?: boolean;
  showErrorMessage?: boolean;
}

export const usePost =  <TData = any, TVariables = any>(url: string | ((payload: TVariables) => string),
  options: UsePostOptions<TData, TVariables> = {}) => {
  
  const queryClient = useQueryClient()

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
     
      onSuccess:  async(data) =>{
           invalidateQueries.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey });
      });

      if (showSuccessMessage) {
        console.log("✓", (data as any)?.message || "Success");
      }
  },

    onError: async(error) =>{
        
      if (showErrorMessage) {
        const message = (error.message as any)?.message || "Failed";
        console.error("✗", message);
      }
    },
  })
}