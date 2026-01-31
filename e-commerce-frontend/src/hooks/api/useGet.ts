import api from "@/utils/axios";
import { useQuery, type QueryKey } from "@tanstack/react-query";
import { useEffect } from "react";

/**
 * Configuration options for the GET request
 * @interface UseGetOptions<TData = any>
 * @param {Record<string, any>} [params] - Query parameters to include in the request
 * @param {boolean} [enabled=true] - Whether the query should be enabled
 * @param {(data: TData) => void} [onSuccess] - Callback for successful response
 * @param {(error: any) => void} [onError] - Callback for error response
 */
interface UseGetOptions<TData = any> {
   params?: Record<string, any>;
  enabled?: boolean;
  onSuccess?: (data: TData) => void;
  onError?: (error: any) => void;
}

export const useGet =  <TData = any>(
  queryKey: QueryKey,
  url: string,
  options: UseGetOptions<TData> = {}
) => {

  
  const { params, enabled = true, onSuccess, onError } = options;

  const query = useQuery({
    queryKey: [...queryKey, params],
    queryFn: async () => {
      const { data } = await api.get(url, { params });
      return data;
    },
    enabled,
  });

  // Handle side effects for success and error
  useEffect(() => {
   if(query.isSuccess && onSuccess) {
      onSuccess(query.data as TData);
    }
  }, [query.isSuccess, query.data]);

  useEffect(() => {
    if (query.isError && onError) {
      onError(query.error);
     }
    }, [query.error, onError]);

  return query;
}