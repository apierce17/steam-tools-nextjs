import { useRef } from "react";
import { AppProps } from 'next/app';
import Navbar from './navbar'
import Footer from './footer'
import React from "react";

export default function Layout({ children }: any) {

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}