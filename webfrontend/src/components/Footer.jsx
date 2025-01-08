import React from "react";
import "./Footer.css";
import LoginBar from "./LoginBar"
import { WhenLoggedIn } from "../LoginContext"
import { Link } from "react-router"

export default function Footer() {
    return (
        <footer className="footer-style">
            <div className="footer-container">
                <h3>© 2021, Tara McCool. All rights reserved.</h3>
                <div className="footer-links">
                    <a href="/privacy-policy" onClick={() => setPage("PrivacyPolicy")}>Privacy Policy</a>
                    <a href="/terms-of-service" onClick={() => setPage("TermsOfService")}>Terms of Service</a>
                    <a href="/contact-us" onClick={() => setPage("ContactUs")}>Contact Us</a>
                </div>
            </div>
        </footer>
    );
}
