import { AppProps } from "next/app";
import "../styles/globals.css";
import Layout from "../components/layout/layout";
import { NextSeo } from "next-seo";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { Analytics } from '@vercel/analytics/react';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GoogleAnalytics trackPageViews />
      <Analytics />
      <NextSeo
        titleTemplate="%s - Steam Tools"
        description="A place with cool features for Steam! Find mutual games with friends on Steam for starters!"
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
