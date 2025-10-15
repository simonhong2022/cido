import { Geist, Geist_Mono } from "next/font/google";
import styles from "./Login.module.css";
import React, { useState } from "react";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import { useRouter } from "next/router";
import CidoLogo from "./asset/cido.svg";
import EllipseSvg from "./asset/ellipse.svg";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic here
    console.log("Login attempt with:", formData);
  };

  return (
    <div className={styles.container}>
      <NavigationBar />
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <img src={CidoLogo.src} alt="Cido Logo" className={styles.logo} />
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.input}
              placeholder="이메일 주소를 입력해 주세요"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.input}
              placeholder="비밀번호를 입력해 주세요"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className={styles.loginButton}>
            로그인하기
          </button>
        </form>

        <div className={styles.linkGroup}>
          <a href="/find-email">이메일(아이디) 찾기</a>
          <a href="/find-password">비밀번호 찾기</a>
        </div>

        <div className={styles.snsLogin}>
          SNS 계정으로 로그인하기
          <div className={styles.ellipseContainer}>
            <img
              src={EllipseSvg.src}
              alt="Ellipse"
              className={styles.ellipse}
            />
          </div>
        </div>

        <div className={styles.signupSection}>
          아직 cido회원이 아니신가요? <a href="/signup">회원가입하기</a>
        </div>
      </div>
    </div>
  );
}
