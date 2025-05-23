import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import Footer from "../components/Footer/Footer";
import styles from "./Home.module.css";
import MainVisual from "../components/Home/MainVisual/MainVisual";
import ProjectVisual from "../components/Home/ProjectVisual/ProjectVisual";
import InterviewVisual from "../components/Home/InterviewVisual/InterviewVisual";
import CommunityVisual from "../components/Home/CommunityVisual/CommunityVisual";
import ProjectCards from "../components/Home/ProjectCard/ProjectCards";
import InterviewCards from "../components/Home/InterviewCard/InterviewCards";
import CommunityCards from "../components/Home/CommunityCard/CommunityCards";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className={styles.mainBg}>
      <NavigationBar />
      <main className={styles.mainContainer}>
        <MainVisual />
        <ProjectVisual />
        <ProjectCards />
        <InterviewVisual />
        <InterviewCards />
        <CommunityVisual />
        <CommunityCards />
      </main>
      <Footer />
    </div>
  );
}
