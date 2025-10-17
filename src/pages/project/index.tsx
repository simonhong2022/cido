import React from "react";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Footer from "../../components/Footer/Footer";
import NewProjectBanner from "../../components/Project/NewProjectBanner/NewProjectBanner";
import ProjectHeader from "../../components/Project/ProjectHeader/ProjectHeader";
import ProjectGrid from "../../components/Project/ProjectGrid/ProjectGrid";
import styles from "./Project.module.css";

const ProjectPage = () => {
  return (
    <div className={styles.projectBg}>
      <NavigationBar />
      <main className={styles.projectContainer}>
        <NewProjectBanner />
        <ProjectHeader />
        <ProjectGrid />
        <div className={styles.loadMoreContainer}>
          <button className={styles.loadMoreButton}>+ more</button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectPage;
