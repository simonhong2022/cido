import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Footer from "../../components/Footer/Footer";
import styles from "./Login.module.css";
import { useAuth } from "../../contexts/AuthContext";
import {
  initKakao,
  loginWithKakao as getKakaoAccessToken,
  authorizeWithKakaoRedirect,
} from "../../utils/kakao";

const LoginPage = () => {
  const router = useRouter();
  const { login, loginWithKakao, user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    initKakao();
    if (user && !loading) {
      router.push("/");
    }
  }, [user, loading, router]);

  const handleLogin = async () => {
    setSubmitting(true);
    setError("");
    const ok = await login(email, password);
    setSubmitting(false);
    if (ok) router.push("/");
    else setError("이메일 또는 비밀번호가 올바르지 않습니다.");
  };

  const goRegister = () => {
    router.push("/register");
  };

  const findEmail = () => {
    console.log("find email");
  };

  const findPassword = () => {
    console.log("find password");
  };

  const onKakaoLogin = async () => {
    setSubmitting(true);
    setError("");
    try {
      const token = await getKakaoAccessToken();
      const ok = await loginWithKakao(token);
      if (ok) router.push("/");
      else setError("카카오 로그인에 실패했습니다.");
    } catch (e) {
      // Fallback to redirect flow
      await authorizeWithKakaoRedirect();
    } finally {
      setSubmitting(false);
    }
  };

  const loginWithGoogle = () => {
    console.log("google login");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>로그인 - Cido</title>
        <meta name="description" content="Cido 로그인" />
      </Head>

      <NavigationBar />

      <main className={styles.main}>
        <div className={styles.formContainer}>
          {/* 브랜드 라인: 로고 */}
          <div className={styles.brandLine}>
            <img src="/logo.svg" alt="cido" className={styles.brandLogo} />
          </div>

          {/* 입력 필드 */}
          {error && <div className={styles.errorMessage}>{error}</div>}
          <div className={styles.fields}>
            <input
              type="email"
              className={styles.input}
              placeholder="이메일 주소를 입력해 주세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className={styles.input}
              placeholder="비밀번호를 입력해 주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* 로그인 버튼 */}
          <button
            className={styles.loginButton}
            onClick={handleLogin}
            disabled={submitting}
          >
            {submitting ? "로그인 중..." : "로그인하기"}
          </button>

          {/* 하단 링크와 SNS 로그인 */}
          <div className={styles.helperLinks}>
            <button className={styles.linkBtn} onClick={findEmail}>
              이메일(아이디) 찾기
            </button>
            <button className={styles.linkBtn} onClick={findPassword}>
              비밀번호 찾기
            </button>
          </div>

          <p className={styles.snsTitle}>SNS 계정으로 로그인하기</p>
          <div className={styles.snsButtons}>
            <button
              className={styles.snsBtn}
              onClick={onKakaoLogin}
              aria-label="카카오 로그인"
            >
              <img
                src="https://www.figma.com/api/mcp/asset/83c6e292-0e7c-4b61-95b4-a3c5f716b658"
                alt="kakao background"
                className={styles.snsFrame}
              />
              <img
                src="https://www.figma.com/api/mcp/asset/199f9556-a225-4da4-a53c-1586ce7e8475"
                alt="kakao"
                className={styles.snsIcon}
              />
            </button>
            <button
              className={styles.snsBtn}
              onClick={loginWithGoogle}
              aria-label="구글 로그인"
            >
              <img
                src="https://www.figma.com/api/mcp/asset/41507208-9db9-4299-8d16-6414c32036e6"
                alt="google background"
                className={styles.snsFrame}
              />
              <img
                src="https://www.figma.com/api/mcp/asset/360157d7-af2b-4f6b-8fe9-4117720565dc"
                alt="google"
                className={styles.snsIcon}
              />
            </button>
          </div>

          <div className={styles.bottomJoin}>
            <span className={styles.bottomHint}>
              아직 cido회원이 아니신가요?
            </span>
            <button className={styles.joinLink} onClick={goRegister}>
              회원가입하기
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LoginPage;
