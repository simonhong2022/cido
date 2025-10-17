import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Footer from "../../components/Footer/Footer";
import styles from "./PrivacyConsent.module.css";

const PrivacyConsentPage = () => {
  const router = useRouter();
  const [allChecked, setAllChecked] = useState(false);
  const [over14, setOver14] = useState(false);
  const [tos, setTos] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [ads, setAds] = useState(false);

  const requiredChecked = over14 && tos && privacy;

  const toggleAll = () => {
    const next = !allChecked;
    setAllChecked(next);
    setOver14(next);
    setTos(next);
    setPrivacy(next);
    setAds(next);
  };

  const handleAgree = () => {
    if (!requiredChecked) return;
    router.push("/register/complete");
  };

  const handleCancel = () => {
    router.back();
  };

  const onChangeRequired =
    (setter: (v: boolean) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.checked);
      const nextAll = e.target.checked && tos && privacy && over14 && ads;
      setAllChecked(nextAll);
    };

  const onChangeOptional =
    (setter: (v: boolean) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.checked);
      const nextAll = e.target.checked && tos && privacy && over14;
      setAllChecked(nextAll);
    };

  return (
    <div className={styles.container}>
      <Head>
        <title>개인정보 수집 동의 - Cido</title>
        <meta name="description" content="Cido 개인정보 수집 동의" />
      </Head>

      <NavigationBar />

      <main className={styles.main}>
        <div className={styles.modal}>
          <h1 className={styles.title}>개인정보 수집 동의</h1>

          <div className={styles.list}>
            {/* 전체 동의 */}
            <label className={styles.row}>
              <input
                type="checkbox"
                checked={allChecked}
                onChange={toggleAll}
                className={styles.checkbox}
              />
              <span className={styles.rowLabel}>전체 동의</span>
            </label>
            <div className={styles.divider} />

            {/* 만 14세 이상입니다 */}
            <label className={styles.row}>
              <input
                type="checkbox"
                checked={over14}
                onChange={onChangeRequired(setOver14)}
                className={styles.checkbox}
              />
              <span className={styles.rowText}>만 14세 이상입니다</span>
              <button type="button" className={styles.viewBtn}>
                보기
              </button>
            </label>

            {/* 이용약관 동의 */}
            <label className={styles.row}>
              <input
                type="checkbox"
                checked={tos}
                onChange={onChangeRequired(setTos)}
                className={styles.checkbox}
              />
              <span className={styles.rowText}>이용약관 동의</span>
              <button type="button" className={styles.viewBtn}>
                보기
              </button>
            </label>

            {/* 개인정보 수집, 이용 동의 */}
            <label className={styles.row}>
              <input
                type="checkbox"
                checked={privacy}
                onChange={onChangeRequired(setPrivacy)}
                className={styles.checkbox}
              />
              <span className={styles.rowText}>개인정보 수집, 이용 동의</span>
              <button type="button" className={styles.viewBtn}>
                보기
              </button>
            </label>

            {/* 광고성 정보 수신동의 (선택) */}
            <label className={styles.row}>
              <input
                type="checkbox"
                checked={ads}
                onChange={onChangeOptional(setAds)}
                className={styles.checkbox}
              />
              <span className={styles.rowText}>
                광고성 정보 수신동의 (선택)
              </span>
              <button type="button" className={styles.viewBtn}>
                보기
              </button>
            </label>
          </div>

          <div className={styles.actions}>
            <button className={styles.cancelBtn} onClick={handleCancel}>
              취소하기
            </button>
            <button
              className={styles.agreeBtn}
              onClick={handleAgree}
              disabled={!requiredChecked}
            >
              동의하기
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyConsentPage;
