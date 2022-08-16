import "styles/globals.css";
import "styles/nProgress.css";
import "@smastrom/react-rating/style.css";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

import { defaultQueryClient } from "services/queryClient";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => defaultQueryClient);

  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());

  // Use the layout defined at the page level, if available
  const getLayout = (Component as any).getLayout || ((page: any) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        {getLayout(<Component {...pageProps} />)}
        <Toaster />
      </Hydrate>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
}

export default MyApp;
