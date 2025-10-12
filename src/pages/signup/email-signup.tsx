import { Geist, Geist_Mono } from "next/font/google";
import styles from "./Signup.module.css"; // Assuming shared styles
import React, { useState } from "react";
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

export default function EmailSignup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    id: "",
    occupation: "",
    introduction: "",
    sns: "",
    otherAccounts: "",
    interests: [] as string[], // Explicitly define as string[]
  });
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVerificationCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVerificationCode(e.target.value);
  };

  const handleInterestClick = (interest: string) => {
    setFormData((prev) => {
      const newInterests = prev.interests.includes(interest)
        ? prev.interests.filter((item) => item !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: newInterests };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerifying) {
      // Step 1: Send verification code to email
      try {
        const res = await fetch(
          "https://cidobackend-gaf0dte7ajbnfqb5.koreacentral-01.azurewebsites.net/api/users/send-verification",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key":
                process.env.NEXT_PUBLIC_CIDO_API_KEY || "YOUR_API_KEY_HERE",
            },
            body: JSON.stringify({ email: formData.email }),
          }
        );
        if (res.ok) {
          alert("인증 코드가 이메일로 전송되었습니다.");
          setIsVerifying(true);
        } else {
          const error = await res.json();
          alert(error.message || "인증 코드 전송에 실패했습니다.");
        }
      } catch (err) {
        alert("네트워크 오류가 발생했습니다.");
      }
    } else {
      // Step 2: Verify code and register
      try {
        const res = await fetch(
          "https://cidobackend-gaf0dte7ajbnfqb5.koreacentral-01.azurewebsites.net/api/users/verify-and-register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key":
                process.env.NEXT_PUBLIC_CIDO_API_KEY || "YOUR_API_KEY_HERE",
            },
            body: JSON.stringify({
              email: formData.email,
              verificationCode: verificationCode,
              username: formData.id || formData.name,
              password: formData.password,
            }),
          }
        );
        if (res.ok) {
          alert("회원가입이 완료되었습니다!");
          router.push("/login");
        } else {
          const error = await res.json();
          if (error.code === "INVALID_VERIFICATION_CODE") {
            alert("인증 코드가 올바르지 않습니다. 다시 확인해주세요.");
          } else {
            alert(error.message || "회원가입에 실패했습니다.");
          }
        }
      } catch (err) {
        alert("네트워크 오류가 발생했습니다.");
      }
    }
  };

  const interestsOptions = [
    "Adobe Illustration",
    "Adobe Photoshop",
    "Adobe Indesign",
    "Figma",
    "HTML",
    "CSS",
    "JavaScript",
  ]; // Example interests - replace with your actual list

  return (
    <div className={styles.container}>
      <NavigationBar />
      <div className={styles.content}>
        {/* Logo container */}
        <div className={styles.logoContainer}>
          <img src={CidoLogo.src} alt="Cido Logo" className={styles.mainLogo} />
        </div>

        <form className={styles.signupForm} onSubmit={handleSubmit}>
          {/* Basic Information */}
          <h2 className={styles.sectionTitle}>기본 정보</h2>

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              이메일 *
              <span className={styles.hintText}>
                •학생 디자이너 회원 가입시, 학교 이메일로 가입해야 합니다
              </span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.input}
              placeholder="예) cido@naver.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {isVerifying && (
            <div className={styles.inputGroup}>
              <label htmlFor="verificationCode" className={styles.label}>
                인증 코드 *
              </label>
              <input
                type="text"
                id="verificationCode"
                name="verificationCode"
                className={styles.input}
                placeholder="이메일로 전송된 인증 코드를 입력하세요"
                value={verificationCode}
                onChange={handleVerificationCodeChange}
                required
              />
            </div>
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              비밀번호 *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.input}
              placeholder="예) cido@naver.com"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>
              이름 *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={styles.input}
              placeholder="이름을 입력해주세요"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={`${styles.inputGroup} ${styles.idInputGroup}`}>
            {" "}
            {/* ID input group with button */}
            <label htmlFor="id" className={styles.label}>
              아이디 *
            </label>
            <div className={styles.idInputWrapper}>
              {" "}
              {/* Wrapper for input and button */}
              <input
                type="text"
                id="id"
                name="id"
                className={`${styles.input} ${styles.idInput}`}
                placeholder="아이디를 입력해주세요"
                value={formData.id}
                onChange={handleChange}
                required
              />
              <button type="button" className={styles.checkDuplicationButton}>
                중복확인
              </button>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="occupation" className={styles.label}>
              직업 *
              <span className={styles.hintText}>
                •기업으로 가입시, 인증 메일 절차가 발송될 예정입니다
              </span>
            </label>
            <input
              type="text"
              id="occupation"
              name="occupation"
              className={styles.input}
              placeholder="예) 학생 디자이너, 학생 타전공생, 소상공인, 예술가, 기업 등"
              value={formData.occupation}
              onChange={handleChange}
              required
            />
          </div>

          {/* Additional Information */}
          <h2 className={styles.sectionTitle}>부가 정보</h2>

          <div className={styles.inputGroup}>
            <label htmlFor="introduction" className={styles.label}>
              소개글
            </label>
            <textarea
              id="introduction"
              name="introduction"
              className={`${styles.input} ${styles.textarea}`}
              placeholder="프로필에 올라가는 자신의 간단한 소개글을 입력해주세요"
              value={formData.introduction}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="sns" className={styles.label}>
              SNS
            </label>
            <input
              type="text"
              id="sns"
              name="sns"
              className={styles.input}
              placeholder="운영하고 있는 Instargram 아이디를 입력해주세요"
              value={formData.sns}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="otherAccounts" className={styles.label}>
              기타 계정, 사이트
            </label>
            <input
              type="text"
              id="otherAccounts"
              name="otherAccounts"
              className={styles.input}
              placeholder="운영하고 있는 포트폴리오, 기업 사이트 등을 입력해주세요"
              value={formData.otherAccounts}
              onChange={handleChange}
            />
          </div>

          {/* Interests Category */}
          <h2 className={styles.sectionTitle}>관심사 카테고리</h2>
          <div className={styles.interestsContainer}>
            {interestsOptions.map((interest) => (
              <button
                key={interest}
                type="button"
                className={`${styles.interestButton} ${
                  formData.interests.includes(interest)
                    ? styles.interestButtonActive
                    : ""
                }`}
                onClick={() => handleInterestClick(interest)}
              >
                {interest}
              </button>
            ))}
          </div>

          {/* Complete Application Button */}
          <button type="submit" className={styles.completeSignupButton}>
            {isVerifying ? "인증 및 가입 완료" : "인증 코드 전송"}
          </button>
        </form>
      </div>
    </div>
  );
}
