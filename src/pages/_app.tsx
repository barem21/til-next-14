import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <header>상단</header>
      <Component {...pageProps} />
      <footer>하단</footer>
    </>
  );
}
