import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Footer from "../../components/Footer/Footer";
import styles from "./RegisterComplete.module.css";

const RegisterCompletePage = () => {
  const router = useRouter();

  const goHome = () => {
    router.push("/");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>회원가입 완료 - Cido</title>
        <meta name="description" content="Cido 회원가입 완료" />
      </Head>

      <NavigationBar />

      <main className={styles.main}>
        <div className={styles.contentWrapper}>
          <div className={styles.brandLine}>
            <img src="/logo.svg" alt="cido" className={styles.brandLogo} />
          </div>

          <h1 className={styles.title}>
            가입이 완료 되었습니다! cido에 오신걸 환영합니다
          </h1>

          <img
            src="https://www.figma.com/api/mcp/asset/fac2f647-3769-42bf-893f-f01f9ef2fd18"
            alt="가입 축하 코인"
            className={styles.coinImage}
          />

          <p className={styles.pointsText}>
            회원가입 기념으로 500 포인트를 지급해드렸어요!
          </p>

          <button className={styles.homeButton} onClick={goHome}>
            홈으로
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RegisterCompletePage;
