import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

import "./HomePage.css";

export default function Coaching() {
  return (
    <>
      <Header />
      <h1>Welcome to our 1/1 or Group Coaching Session Booking Page</h1>
      <h2>This page should be accessible from Home page (Quick Search Bar Result Section) as well as from hamburger menu</h2>
      <h3>User can able to book 1-1 Weekly / Bi-Weekly or Group Coaching sessions with us!</h3>
      <p>Let's Get Started!!!!</p>
      <Footer />
    </>
  );
}
