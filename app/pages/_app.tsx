import "styles/globals.css";
import "styles/nProgress.css";
import type { AppProps } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

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
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
