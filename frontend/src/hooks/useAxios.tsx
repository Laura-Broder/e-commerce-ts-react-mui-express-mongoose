import { useCallback, useEffect } from "react";
import { AxiosInstance, getToken } from "../utils/axios";

export const useAxios = (withAuthHeaders?: boolean) => {
  useEffect(() => {
    if (withAuthHeaders) {
      AxiosInstance.defaults.headers.common["Authorization"] = getToken();
    }
  }, [withAuthHeaders]);

  const get = useCallback(
    (url: string, params?: any) => AxiosInstance.get(url, { params }),
    []
  );
  const post = useCallback(
    (url: string, data?: any) => AxiosInstance.post(url, { data }),
    []
  );
  const patch = useCallback(
    (url: string, data?: any) => AxiosInstance.patch(url, { data }),
    []
  );
  const del = useCallback(
    (url: string, params?: any) => AxiosInstance.delete(url, { params }),
    []
  );

  return { get, post, patch, del };
};
