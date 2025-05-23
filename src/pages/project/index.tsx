import { Geist, Geist_Mono } from "next/font/google";
import styles from "./Project.module.css";
import React from "react";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Footer from "../../components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Project() {
  return (
    <div className={styles.container}>
      <NavigationBar />
      <div className={styles.content}>
        <p className={styles.title}>New Project</p>
      </div>
      <Footer />
    </div>
  );
}
