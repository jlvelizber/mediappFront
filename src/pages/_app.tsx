import { AuthProvider, LayoutProvider } from "@/app/context";
import "@/app/globals.css";
import type { AppProps } from "next/app";

export default function Page({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <LayoutProvider>
        <Component {...pageProps} />
      </LayoutProvider>
    </AuthProvider>
  );
};