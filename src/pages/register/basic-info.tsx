import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Footer from "../../components/Footer/Footer";
import styles from "./RegisterBasicInfo.module.css";
import privacyStyles from "./PrivacyConsent.module.css";

const RegisterBasicInfoPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    userId: "",
    job: [] as string[], // 여러 개 선택 가능
    studentProof: null as File | null,
    introduction: "",
    sns: "",
    otherSites: "",
    interests: [] as string[], // 관심사 카테고리
  });

  const [showConsent, setShowConsent] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  const [over14, setOver14] = useState(false);
  const [tos, setTos] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [ads, setAds] = useState(false);

  const requiredChecked = over14 && tos && privacy;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleJobToggle = (selectedJob: string) => {
    setFormData((prev) => ({
      ...prev,
      job: prev.job.includes(selectedJob)
        ? prev.job.filter((j) => j !== selectedJob)
        : [...prev.job, selectedJob],
    }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, studentProof: e.target.files![0] }));
    }
  };

  const handleCheckDuplicate = () => {
    // 중복확인 로직 (추후 구현)
    console.log("아이디 중복확인:", formData.userId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 개인정보 수집 동의 모달 오픈
    setShowConsent(true);
  };

  const toggleAll = () => {
    const next = !allChecked;
    setAllChecked(next);
    setOver14(next);
    setTos(next);
    setPrivacy(next);
    setAds(next);
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

  const handleConsentAgree = () => {
    if (!requiredChecked) return;
    setShowConsent(false);
    // 동의 완료 후 완료 페이지로 이동
    router.push("/register/complete");
  };

  const handleConsentCancel = () => {
    setShowConsent(false);
  };

  const jobOptions = [
    "디자인전공 학생",
    "예술 관련 학생",
    "타전공 학생",
    "소상공인",
    "예술가",
    "기업",
    "직장인",
  ];

  const interestOptions = [
    "Adobe illustration",
    "Adobe illustration",
    "Adobe illustration",
    "Adobe illustration",
    "Figma",
    "HTML",
    "HTML",
    "Indesign",
    "Photoshop",
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>기본정보 입력 - Cido</title>
        <meta name="description" content="Cido 회원가입 기본정보 입력" />
      </Head>

      <NavigationBar />

      <main className={styles.main}>
        {/* 기본정보 섹션 */}
        <div className={styles.formSection}>
          <h1 className={styles.sectionTitle}>기본정보</h1>

          <div className={styles.fieldsContainer}>
            {/* 이메일 */}
            <div className={styles.fieldWrapper}>
              <div className={styles.labelRow}>
                <label className={styles.label}>
                  이메일<span className={styles.requiredDot}>●</span>
                </label>
                <p className={styles.fieldNote}>
                  *학생 디자이너 회원 가입시, 학교 이메일로 기입해야합니다
                </p>
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="예) cido@naver.com"
              />
            </div>

            {/* 비밀번호 */}
            <div className={styles.fieldWrapper}>
              <label className={styles.label}>
                비밀번호<span className={styles.requiredDot}>●</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="예) cido@naver.com"
              />
            </div>

            {/* 이름 */}
            <div className={styles.fieldWrapper}>
              <label className={styles.label}>
                이름<span className={styles.requiredDot}>●</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="이름을 입력해주세요"
              />
            </div>

            {/* 아이디 */}
            <div className={styles.fieldWrapper}>
              <div className={styles.labelRow}>
                <label className={styles.label}>
                  아이디<span className={styles.requiredDot}>●</span>
                </label>
                <span className={styles.optionText}>*하나만 골라주세요</span>
              </div>
              <div className={styles.inputWithButton}>
                <input
                  type="text"
                  name="userId"
                  value={formData.userId}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder=""
                />
                <button
                  type="button"
                  className={styles.duplicateCheckBtn}
                  onClick={handleCheckDuplicate}
                >
                  중복확인
                </button>
              </div>
            </div>

            {/* 직업 */}
            <div className={styles.fieldWrapper}>
              <div className={styles.labelRow}>
                <label className={styles.label}>
                  직업<span className={styles.requiredDot}>●</span>
                </label>
                <span className={styles.optionText}>*하나만 골라주세요</span>
              </div>
              <div className={styles.jobButtons}>
                {jobOptions.map((job) => (
                  <button
                    key={job}
                    type="button"
                    className={`${styles.jobButton} ${
                      formData.job.includes(job) ? styles.active : ""
                    }`}
                    onClick={() => handleJobToggle(job)}
                  >
                    {job}
                  </button>
                ))}
              </div>
            </div>

            {/* 학생 증명서 첨부 */}
            <div className={styles.studentProofWrapper}>
              <div className={styles.labelRow}>
                <label className={styles.label}>
                  학생 증명서 첨부<span className={styles.requiredDot}>●</span>
                </label>
              </div>
              <p className={styles.studentProofNote}>
                *학생은 재학증명서, 졸업증명서 인증 사진은 필수로 해야
                회원가입이 가능합니다.
              </p>
              <div className={styles.fileUploadArea}>
                <input
                  type="file"
                  id="studentProof"
                  accept="image/*"
                  onChange={handleFileChange}
                  className={styles.fileInput}
                />
                <label
                  htmlFor="studentProof"
                  className={styles.fileUploadButton}
                >
                  이미지업로드
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* 부가정보 섹션 */}
        <div className={styles.formSection}>
          <h1 className={styles.sectionTitle}>부가정보</h1>

          <div className={styles.fieldsContainer}>
            {/* 소개글 */}
            <div className={styles.fieldWrapper}>
              <label className={styles.label}>소개글</label>
              <p className={styles.placeholder}>
                프로필에 올라가는 자신의 간단한 소개글을 입력해주세요
              </p>
              <input
                type="text"
                name="introduction"
                value={formData.introduction}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>

            {/* SNS */}
            <div className={styles.fieldWrapper}>
              <label className={styles.label}>SNS</label>
              <p className={styles.placeholder}>
                운영하고 있는 Instargram 아이디를 입력해주세요{" "}
              </p>
              <input
                type="text"
                name="sns"
                value={formData.sns}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>

            {/* 기타 계정, 사이트 */}
            <div className={styles.fieldWrapper}>
              <label className={styles.label}>기타 계정, 사이트</label>
              <p className={styles.placeholder}>
                운영하고 있는 포트폴리오, 기업 사이트 등을 입력해주세요
              </p>
              <input
                type="text"
                name="otherSites"
                value={formData.otherSites}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>

            {/* 관심사 카테고리 */}
            <div className={styles.fieldWrapper}>
              <label className={styles.label}>관심사 카테고리</label>
              <div className={styles.interestButtons}>
                {interestOptions.map((interest, index) => (
                  <button
                    key={`${interest}-${index}`}
                    type="button"
                    className={`${styles.interestButton} ${
                      formData.interests.includes(interest) ? styles.active : ""
                    }`}
                    onClick={() => handleInterestToggle(interest)}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 신청 완료하기 버튼 */}
        <div className={styles.buttonContainer}>
          <button
            type="submit"
            className={styles.submitButton}
            onClick={handleSubmit}
          >
            신청 완료하기
          </button>
        </div>

        {/* 개인정보 수집 동의 모달 */}
        {showConsent && (
          <div
            className={privacyStyles.overlay}
            role="dialog"
            aria-modal="true"
          >
            <div className={privacyStyles.modal}>
              <h1 className={privacyStyles.title}>개인정보 수집 동의</h1>
              <div className={privacyStyles.list}>
                <label className={privacyStyles.row}>
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={toggleAll}
                    className={privacyStyles.checkbox}
                  />
                  <span className={privacyStyles.rowLabel}>전체 동의</span>
                </label>
                <div className={privacyStyles.divider} />

                <label className={privacyStyles.row}>
                  <input
                    type="checkbox"
                    checked={over14}
                    onChange={onChangeRequired(setOver14)}
                    className={privacyStyles.checkbox}
                  />
                  <span className={privacyStyles.rowText}>
                    만 14세 이상입니다
                  </span>
                  <button type="button" className={privacyStyles.viewBtn}>
                    보기
                  </button>
                </label>

                <label className={privacyStyles.row}>
                  <input
                    type="checkbox"
                    checked={tos}
                    onChange={onChangeRequired(setTos)}
                    className={privacyStyles.checkbox}
                  />
                  <span className={privacyStyles.rowText}>이용약관 동의</span>
                  <button type="button" className={privacyStyles.viewBtn}>
                    보기
                  </button>
                </label>

                <label className={privacyStyles.row}>
                  <input
                    type="checkbox"
                    checked={privacy}
                    onChange={onChangeRequired(setPrivacy)}
                    className={privacyStyles.checkbox}
                  />
                  <span className={privacyStyles.rowText}>
                    개인정보 수집, 이용 동의
                  </span>
                  <button type="button" className={privacyStyles.viewBtn}>
                    보기
                  </button>
                </label>

                <label className={privacyStyles.row}>
                  <input
                    type="checkbox"
                    checked={ads}
                    onChange={onChangeOptional(setAds)}
                    className={privacyStyles.checkbox}
                  />
                  <span className={privacyStyles.rowText}>
                    광고성 정보 수신동의 (선택)
                  </span>
                  <button type="button" className={privacyStyles.viewBtn}>
                    보기
                  </button>
                </label>
              </div>

              <div className={privacyStyles.actions}>
                <button
                  className={privacyStyles.cancelBtn}
                  onClick={handleConsentCancel}
                >
                  취소하기
                </button>
                <button
                  className={privacyStyles.agreeBtn}
                  onClick={handleConsentAgree}
                  disabled={!requiredChecked}
                >
                  동의하기
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default RegisterBasicInfoPage;
