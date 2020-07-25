import React from "react";
import "./Logo.scss";
import { Link } from "react-router-dom";
export default function Logo() {
  return (
    <Link to="/" className="logo">
      <span>N</span>etflix
    </Link>
  );
}
