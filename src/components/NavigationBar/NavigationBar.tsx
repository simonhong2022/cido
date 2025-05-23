import React from "react";
import styles from "./NavigationBar.module.css";

const navLinks = [
  { label: "Project", href: "/project" },
  { label: "About", href: "/about" },
  { label: "Designers", href: "/designers" },
  { label: "Community", href: "/community" },
];

export default function NavigationBar() {
  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <a href="/" className={styles.logo}>
        <img
          src="/Frame 38.svg"
          alt="cido logo"
          style={{ height: "100%", width: "auto", display: "block" }}
        />
      </a>

      {/* Navigation Links */}
      <div className={styles.navLinks}>
        {navLinks.map((link) => (
          <a key={link.label} href={link.href} className={styles.navLink}>
            {link.label}
          </a>
        ))}
      </div>

      {/* Icons */}
      <div className={styles.icons}>
        {/* Search Icon */}
        <svg
          className={styles.icon}
          fill="none"
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
          className={styles.icon}
          fill="none"
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
