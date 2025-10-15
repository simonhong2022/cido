import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import Footer from '../components/Footer/Footer';
import styles from '../styles/Register.module.css';

const RegisterPage = () => {
  const router = useRouter();

  const handleKakaoLogin = () => {
    // 카카오 로그인 로직 (추후 구현)
    console.log('카카오 로그인');
  };

  const handleEmailRegister = () => {
    // 이메일 회원가입으로 이동
    router.push('/register/basic-info');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>회원가입 - Cido</title>
        <meta name="description" content="Cido 회원가입" />
      </Head>

      <NavigationBar />

      <main className={styles.main}>
        <div className={styles.contentWrapper}>
          {/* 로고 */}
          <div className={styles.logoContainer}>
            <div className={styles.logo}>
              {/* 로고 이미지 또는 텍스트 */}
              <img src="/logo.svg" alt="Cido" className={styles.logoImage} />
            </div>
          </div>

          {/* 타이틀 */}
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>
              cido 회원가입으로<br />
              cido의 디자인 콘텐츠를 편하게 이용하세요!
            </h1>
          </div>

          {/* 카카오 간편 가입 버튼 */}
          <button 
            className={styles.kakaoButton}
            onClick={handleKakaoLogin}
          >
            <span className={styles.kakaoButtonText}>카카오로 3초만에 가입하기</span>
          </button>

          {/* 구분선 */}
          <div className={styles.divider}>
            <span className={styles.dividerText}>또는</span>
          </div>

          {/* 이메일로 가입하기 버튼 */}
          <button 
            className={styles.emailButton}
            onClick={handleEmailRegister}
          >
            <span className={styles.emailButtonText}>이메일로 가입하기</span>
          </button>

          {/* 로그인 링크 */}
          <div className={styles.loginLink}>
            <span className={styles.loginText}>cido을 이미 하셨나요?</span>
            <button 
              className={styles.loginButton}
              onClick={handleLogin}
            >
              로그인하기
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RegisterPage;

