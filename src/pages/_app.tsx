import React, { useEffect } from "react";
import "../styles/globals.css";
import { ThemeProvider } from "@material-ui/styles";
import Head from "next/head";
import theme from "../styles/theme";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");

    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <>
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <Head>
            <title>Planning Poker</title>
          </Head>
          <Component {...pageProps} />
        </RecoilRoot>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
