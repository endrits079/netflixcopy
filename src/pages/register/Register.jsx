import React from "react";
import "./Register.scss";
import Logo from "../../components/logo/Logo";
import RegisterForm from "../../components/registerform/RegisterForm";
export default function Register() {
  return (
    <div className="register">
      <div className="content">
        <Logo></Logo>
        <div className="title">
          <h1>Sign up</h1>
          <span>to continue to <span class='netflix'>netflix</span></span>
        </div>
        <RegisterForm></RegisterForm>
      </div>
    </div>
  );
}
