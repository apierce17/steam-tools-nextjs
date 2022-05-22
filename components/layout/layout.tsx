import { useRef } from "react";
import Navbar from './navbar'
import Footer from './footer'
import React from "react";

export default function Layout({ children }) {

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}