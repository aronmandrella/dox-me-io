import "./_app.scss";

import type { AppProps } from "next/app";

import Head from "next/head";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>DoxMe.io</title>
        <meta name="author" content="Aron Mandrella" />
        <meta name="description" content="DoxMe.io - Doxing people since 2022" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
