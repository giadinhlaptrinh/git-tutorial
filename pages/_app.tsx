// import "highlight.js/styles/a11y-light.css";
import "highlight.js/styles/base16/darcula.css";
// import 'highlight.js/styles/default.css'
import "../styles/globals.css";
import "../styles/lesson-content.scss";

import type { AppProps } from "next/app";
import { AppLayout } from "../layouts/app-layout";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppLayout>
      <Head>
        <link
          rel="icon"
          type="image/x-icon"
          href={`${process.env.BASE_URL}/favicon.ico`}
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${process.env.BASE_URL}/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${process.env.BASE_URL}/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${process.env.BASE_URL}/favicon-16x16.png`}
        />
        <link
          rel="manifest"
          href={`${process.env.BASE_URL}/site.webmanifest`}
        />
      </Head>

      <Component {...pageProps} />
    </AppLayout>
  );
}
