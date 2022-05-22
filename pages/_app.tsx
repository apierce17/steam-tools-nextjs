import { AppProps } from 'next/app';
import '../styles/globals.css'
import Head from 'next/head'
import Layout from '../components/layout/layout'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{Component.title} Steam Tools</title>        
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}