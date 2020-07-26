import React from "react";
import "./Auth.scss";
import Logo from "../../components/logo/Logo";
import RegisterForm from "../../components/forms/RegisterForm";
import { Link } from "react-router-dom";
export default function Register() {
  return (
    <div className="auth">
      <div className="content">
        <Logo></Logo>
        <div className="title">
          <h1>Sign up</h1>
          <span>
            to continue to <span className="netflix">netflix</span>
          </span>
        </div>
        <RegisterForm></RegisterForm>
        <Link className='switch-auth-mode' to="/login">Already a member? Click here to login</Link>
      </div>
    </div>
  );
}
