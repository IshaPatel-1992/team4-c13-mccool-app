import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import QuickSearchBar from "../pages/QuickSearchBar";

import "./HomePage.css";

export default function HomePage() {
  return (
    <>
      <Header />
      { /* <h1>This is our Home Page...</h1>
      <h2>This Home Page will be the first viewing page for this app</h2>
      <h3>This page will contain Quick Search Bar, User can able to search quick tips about companssionate leadership</h3>--> */ }
      <QuickSearchBar />
    </>
  );
}
