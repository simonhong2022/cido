import { Geist, Geist_Mono } from "next/font/google";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.css";
import MainVisual from "../components/MainVisual";
import ProjectVisual from "../components/ProjectVisual";
import InterviewVisual from "../components/InterviewVisual";
import CommunityVisual from "../components/CommunityVisual";

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
        <InterviewVisual />
        <CommunityVisual />
      </main>
      <Footer />
    </div>
  );
}
