import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="addUser">
      <h3 className="Login">Login</h3>
      <form className="addUserForm">
        <div className="inputGroup">
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
          <button type="Submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
      <div className="login">
        <p>Don't have an account?</p>
        <Link to="/signup" type="Submit" className="btn btn-success">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
