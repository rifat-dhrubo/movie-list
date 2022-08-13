import toast from "react-hot-toast";
import { QueryCache, QueryClient } from "react-query";

import { API_URL } from "environment";
import { isAxiosError } from "lib/error";
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
      }
    },
  },
});

export { defaultQueryClient };
