import type { AppProps } from "next/app";

// @ts-expect-error Bootstrap CSS is loaded by Next.js at runtime.
import "bootstrap/dist/css/bootstrap.min.css";
// @ts-expect-error Global CSS is loaded by Next.js at runtime.
import "@/styles/theme.css";

import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Navbar />

      <main className="container py-4">
        <Component {...pageProps} />
      </main>

      <Footer />
    </AuthProvider>
  );
}
