import React from "react";
import "./Header.scss";
import Logo from "../logo/Logo";
import Navbar from "../navbar/Navbar";
export default function Header() {
  return (
    <header className="header">
      <Logo></Logo>
      <Navbar></Navbar>
    </header>
  );
}
