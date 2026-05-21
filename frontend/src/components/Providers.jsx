"use client";

import {
  QueryClientProvider,
} from
"@tanstack/react-query";

import {
  Toaster,
} from "react-hot-toast";

import queryClient from
"../lib/queryClient";

export default function Providers({
  children,
}) {

  return (

    <QueryClientProvider
      client={queryClient}
    >

      {children}

      <Toaster />

    </QueryClientProvider>

  );

}