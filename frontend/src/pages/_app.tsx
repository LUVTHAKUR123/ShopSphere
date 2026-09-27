import type { AppProps } from "next/app";

// @ts-ignore Bootstrap's CSS is bundled by Next.js; it has no TypeScript module declaration.
import "bootstrap/dist/css/bootstrap.min.css";
// @ts-ignore Next.js handles global CSS imports without TypeScript declarations.
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
