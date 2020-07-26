import React from "react";
import "./Auth.scss";
import Logo from "../../components/logo/Logo";
import LoginForm from "../../components/forms/LoginForm";
import { Link } from "react-router-dom";
export default function Register() {
  return (
    <div className="auth">
      <div className="content">
        <Logo></Logo>
        <div className="title">
          <h1>Sign in</h1>
          <span>
            to continue to <span className="netflix">netflix</span>
          </span>
        </div>
        <LoginForm></LoginForm>
        <Link to="/register" className="switch-auth-mode">
          Don't have an account? Click here to register
        </Link>
      </div>
    </div>
  );
}
