import React from "react";
import "./layout.css";

function Navbar({ children }) {
  return <nav>{children}</nav>;
}

function Body({ children }) {
  return <main>{children}</main>;
}

function Footer({ children }) {
  return <footer>{children}</footer>;
}

function Layout({ children }) {
  return children;
}

Layout.Navbar = Navbar;
Layout.Body = Body;
Layout.Footer = Footer;

export default Layout;
