import { useMutation } from "@tanstack/react-query";
import { api } from "@/utils/axios";

interface UseImageUploadOptions {
  onSuccess?: (imagePath: string, imageUrl: string) => void;
  onError?: (error: Error) => void;
}

export const useImageUpload = (options: UseImageUploadOptions = {}) => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("image", file);

      const response = await api.post("/products/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    },
    onSuccess: (data) => {
      if (options.onSuccess) {
        options.onSuccess(data.imagePath, data.imageUrl);
      }
    },
    onError: (error) => {
      if (options.onError) {
        options.onError(error as Error);
      }
    },
  });
};
