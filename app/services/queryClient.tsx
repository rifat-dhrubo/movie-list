import { QueryCache, QueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { API_URL } from "environment";
import { isAxiosError } from "lib/error";
import { ErrorResponseDto } from "types/auth.type";
import { ROUTES } from "utils/routes";

const defaultQueryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err, query) => {
      if (isAxiosError(err)) {
        if (err?.response?.status === 401 && typeof window !== "undefined") {
          // redirect to sign in page
          // get path from window.location
          const path = window.location.pathname;
          window.location.href = `${ROUTES.SIGN_IN}?redirect=${path}`;
          return;
        }
        if (
          err.response &&
          err.response?.status >= 400 &&
          err.response?.status < 500
        ) {
          const data = err.response.data as ErrorResponseDto;
          const { message } = data;
          if (typeof message === "string") {
            toast.error(message);
          } else {
            message.forEach((m) => toast.error(m));
          }
          return;
        }
      }
    },
  }),
});

defaultQueryClient.setDefaultOptions({
  queries: {
    staleTime: 0,
    notifyOnChangeProps: ["data", "error"],
  },
  mutations: {
    onError: (err, mutation) => {
      if (isAxiosError(err)) {
        if (err?.response?.status === 401 && typeof window !== "undefined") {
          // redirect to sign in page
          // get path from window.location
          const path = window.location.pathname;
          window.location.href = `${ROUTES.SIGN_IN}?redirect=${path}`;
          return;
        }
        if (
          err.response &&
          err.response?.status >= 400 &&
          err.response?.status < 500
        ) {
          const data = err.response.data as ErrorResponseDto;
          const { message } = data;
          if (typeof message === "string") {
            toast.error(message);
          } else {
            message.forEach((m) => toast.error(m));
          }
          return;
        }
      }
    },
  },
});

export { defaultQueryClient };
