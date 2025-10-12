import { Geist, Geist_Mono } from "next/font/google";
import styles from "./Signup.module.css";
import React, { useState } from "react";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import { useRouter } from "next/router";
import CidoLogo from "../login/asset/cido.svg";
import { useAuth } from "../../contexts/AuthContext";
import { initKakao, loginWithKakao as getKakaoToken } from "../../utils/kakao";

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
  const { user, loginWithKakao } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    initKakao();

    // Redirect if already logged in
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleEmailSignupClick = () => {
    router.push("/signup/email-signup");
  };

  const handleKakaoSignup = () => {
    // Use redirect method instead of popup
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${
      process.env.NEXT_PUBLIC_KAKAO_JS_KEY
    }&redirect_uri=${encodeURIComponent(
      "http://localhost:8080/api/auth/kakao/callback"
    )}&response_type=code`;
    window.location.href = kakaoAuthUrl;
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

          <button className={styles.kakaoButton} onClick={handleKakaoSignup}>
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
