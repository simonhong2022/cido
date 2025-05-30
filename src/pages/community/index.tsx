import { Geist, Geist_Mono } from "next/font/google";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Footer from "../../components/Footer/Footer";
import styles from "./Community.module.css";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function About() {
  return (
    <div className={styles.container}>
      <NavigationBar />
      <main className={styles.mainContainer}></main>
      <Footer />
    </div>
  );
}
