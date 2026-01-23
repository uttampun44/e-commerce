
/**
 * Generic POST hook
 * @param {string|function} url - API endpoint or function that returns endpoint
 * @param {Object} options - Configuration options
 * @returns Mutation object
 */

import { api } from "@/utils/axios";
import {useMutation, useQueryClient } from "@tanstack/react-query";


export const usePost = (url: string, options = {}) => {
  
  const queryClient = useQueryClient()

  return useMutation({
      mutationFn: async(payload) => {
       
        const endpoint = typeof url === "function" ? url(payload) : url
        const response = await api.post(endpoint, payload)
        return response
      },
      onMutate: async(payload) => {
          
      },
      onError: async(payload) =>{

      },
      onSuccess:  async(payload) =>{

      }
  })
}