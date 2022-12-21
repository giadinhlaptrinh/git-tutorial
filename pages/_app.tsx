// import "highlight.js/styles/a11y-light.css";
import "highlight.js/styles/base16/darcula.css";
// import 'highlight.js/styles/default.css'
import "../styles/globals.css";
import "../styles/lesson-content.scss";

import type { AppProps } from "next/app";
import { AppLayout } from "../layouts/app-layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  );
}
