import { Geist, Geist_Mono } from "next/font/google";
import styles from "./Signup.module.css";
import React from "react";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Footer from "../../components/Footer/Footer";
import { useRouter } from "next/router";
import CidoLogo from "../login/asset/cido.svg";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Signup() {
  const router = useRouter();

  const handleEmailSignupClick = () => {
    router.push("/signup/email-signup");
  };

  return (
    <div className={styles.container}>
      <NavigationBar />
      <div className={styles.content}>
        <div className={styles.step1Container}>
          <div className={styles.logoContainer}>
            <img
              src={CidoLogo.src}
              alt="Cido Logo"
              className={styles.mainLogo}
            />
          </div>
          <p className={styles.description1}>cido 회원가입으로</p>
          <p className={styles.description2}>
            cido의 디자인 콘텐츠를 편하게 이용하세요!
          </p>

          <button className={styles.kakaoButton}>
            카카오로 3초만에 가입하기
          </button>

          <div className={styles.snsIcons}>
            <div className={styles.snsIcon}></div>
            <div className={styles.snsIcon}></div>
            <div className={styles.snsIcon}></div>
            <div className={styles.snsIcon}></div>
          </div>

          <p className={styles.orText}>또는</p>

          <button
            className={styles.emailSignupButton}
            onClick={handleEmailSignupClick}
          >
            이메일로 가입하기
          </button>

          <div className={styles.loginLink}>
            이미 회원이신가요? <a href="/login">로그인하기</a>
          </div>
        </div>
      </div>
    </div>
  );
}
