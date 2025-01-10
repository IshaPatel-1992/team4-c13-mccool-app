import React, { useState } from "react";

import "./Coaching.css";

export default function Coaching() {
  return (
    <>

      <h1>Welcome to our 1/1 or Group Coaching Session Booking Page</h1>
      <h2>This page should be accessible from Home page (Quick Search Bar Result Section) as well as from hamburger menu</h2>
      <h3>User can able to book 1-1 Weekly / Bi-Weekly or Group Coaching sessions with us!</h3>
      <div class="cta-container">
        <button class="cta-button" aria-label="Lets get startes">
          Let's get Started
        </button>
      </div>

    </>
  );
}
