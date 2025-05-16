import React from "react";
import styles from "../styles/NavigationBar.module.css";
const navLinks = [
  { label: "Project", href: "#" },
  { label: "About", href: "/about" },
  { label: "Designers", href: "#" },
  { label: "Community", href: "#" },
];

export default function NavigationBar() {
  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <a href="/" style={{ display: "flex", alignItems: "center" }}>
        <img
          src="/Frame 38.svg"
          alt="cido logo"
          style={{ height: 50, width: "auto", display: "block" }}
        />
      </a>

      {/* Navigation Links */}
      <div style={{ display: "flex", gap: 48 }}>
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            style={{
              color: "white",
              fontWeight: 700,
              fontSize: 20,
              textDecoration: "none",
              fontFamily: "Montserrat, Arial, sans-serif",
            }}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Icons */}
      <div style={{ display: "flex", gap: 32 }}>
        {/* Search Icon */}
        <svg
          width="32"
          height="32"
          fill="none"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        {/* User Icon */}
        <svg
          width="32"
          height="32"
          fill="none"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 8-4 8-4s8 0 8 4" />
        </svg>
      </div>
    </nav>
  );
}
