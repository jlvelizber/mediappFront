import { AuthProvider } from "../context/AuthContext";
import "../styles/globals.css";
import type { AppProps } from "next/app";

export default function Page  ({ Component, pageProps }: AppProps)  {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};