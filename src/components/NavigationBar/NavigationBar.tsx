import React, { useState } from "react";
import styles from "./NavigationBar.module.css";
import router from "next/router";

const navLinks = [
  { label: "Project", href: "/project" },
  { label: "About", href: "/about" },
  { label: "Designers", href: "/designers" },
  { label: "Community", href: "/community" },
];

export default function NavigationBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Placeholder for login status

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

      {/* Icons and Buttons */}
      <div className={styles.icons}>
        {/* Request Design Button */}
        <button className={`${styles.navButton} ${styles.requestDesignButton}`}>
          디자인 의뢰하기
        </button>
        <button className={`${styles.navButton} ${styles.myWorkButton}`}>
          내 작업 업로드
        </button>
        {/* Conditional Button/Icon based on login status */}
        {isLoggedIn ? (
          // Cart Icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="32"
            viewBox="0 0 34 32"
            fill="none"
            className={styles.icon}
          >
            <g clip-path="url(#clip0_235_1476)">
              <path
                d="M0 14.1586C0 15.5057 0.842016 16.3511 2.22118 16.3511H31.7643C33.1435 16.3511 34 15.5057 34 14.1586V12.0808C34 10.7338 33.1435 9.87396 31.7643 9.87396H2.22118C0.842016 9.87396 0 10.7338 0 12.0808V14.1586ZM2.78736 12.1524H31.1981C31.5175 12.1524 31.7063 12.3387 31.7063 12.6539V13.571C31.7063 13.8864 31.5175 14.087 31.1981 14.087H2.78736C2.46798 14.087 2.29376 13.8864 2.29376 13.571V12.6539C2.29376 12.3387 2.46798 12.1524 2.78736 12.1524ZM9.23313 30.7098H24.7669C28.1204 30.7098 29.1511 28.7752 29.5867 26.6973L31.895 15.7779L29.6157 15.391L27.4527 25.8233C27.0607 27.6575 26.4799 28.417 24.3604 28.417H9.63963C7.52007 28.417 6.93937 27.6575 6.5474 25.8233L4.38429 15.391L2.10504 15.7779L4.41332 26.6973C4.84885 28.7752 5.87959 30.7098 9.23313 30.7098ZM10.8155 26.855C11.3527 26.769 11.643 26.3821 11.5705 25.9235L10.3655 18.429C10.2784 17.9561 9.87191 17.6981 9.34928 17.7697C8.81213 17.8701 8.50727 18.2427 8.59437 18.7013L9.79933 26.1959C9.88643 26.6687 10.2784 26.9409 10.8155 26.855ZM14.9821 26.769C15.5047 26.7404 15.8532 26.3964 15.824 25.9235L15.3595 18.5006C15.316 18.0134 14.953 17.6838 14.4159 17.7268C13.8932 17.7697 13.5448 18.1137 13.5738 18.6009L14.0384 26.0095C14.0675 26.4968 14.4595 26.812 14.9821 26.769ZM19.0325 26.769C19.5551 26.812 19.9471 26.4968 19.9761 26.0095L20.4407 18.6009C20.4696 18.1137 20.1213 17.7697 19.5986 17.7268C19.0615 17.6838 18.6986 18.0134 18.655 18.5006L18.1905 25.9235C18.1615 26.3964 18.5098 26.7404 19.0325 26.769ZM23.1844 26.855C23.7071 26.9409 24.1135 26.6687 24.2008 26.1959L25.4201 18.7013C25.4927 18.2427 25.1878 17.8701 24.6507 17.7697C24.1282 17.6981 23.7216 17.9561 23.6345 18.429L22.4296 25.9235C22.357 26.3821 22.6473 26.769 23.1844 26.855ZM4.68916 10.4615H7.60717L12.6883 1.73453C13.0803 1.04668 12.7609 0.444825 12.2238 0.158225C11.7011 -0.114044 11.0043 -0.0710546 10.6123 0.573795L4.68916 10.4615ZM26.3929 10.4615H29.3109L23.3877 0.573795C23.0102 -0.0567245 22.3134 -0.0997145 21.7762 0.158225C21.2536 0.444825 20.9197 1.04668 21.3117 1.73453L26.3929 10.4615Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_235_1476">
                <rect width="34" height="32" fill="white" />
              </clipPath>
            </defs>
          </svg>
        ) : (
          <></>
        )}

        {/* Search Icon */}
        <svg
          className={styles.icon}
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        {/* User Icon */}
        <svg
          onClick={() => router.push("/login")}
          className={styles.icon}
          fill="none"
          strokeWidth="2"
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
