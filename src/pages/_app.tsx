import { AuthProvider } from "@/app/context";
import "@/app/globals.css";
import type { AppProps } from "next/app";

export default function Page  ({ Component, pageProps }: AppProps)  {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};