import React from "react";
import "./Signup.css";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="addUser">
      <h3>Sign Up</h3>
      <form className="addUserForm">
        <div className="inputGroup">
          <label htmlFor="name"></label>
          <input type="text" id="name" autoComplete="off" placeholder="name" />
          <label htmlFor="email"></label>
          <input
            type="email"
            id="email"
            autoComplete="off"
            placeholder="email"
          />
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            autoComplete="off"
            placeholder="password"
          />
          <button type="Submit" className="btn btn-success">
            Sign Up
          </button>
        </div>
      </form>
      <div className="login">
        <p>Already have an account?</p>
        <Link to="/login" type="Submit" className="btn btn-primary">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
