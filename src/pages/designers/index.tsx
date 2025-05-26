import { Geist, Geist_Mono } from "next/font/google";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Footer from "../../components/Footer/Footer";
import styles from "./Designers.module.css";
import React from "react";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function DesignersPage() {
  return (
    <div className={styles.container}>
      <NavigationBar />
      <div className={styles.designer}>
      			<b className={styles.b}>시도와 함께하는 디자이너들</b>
      			<b className={styles.b1}>시도는 멈추지 않는다</b>
      			<div className={styles.wrapperVector5}>
        				<Image className={styles.wrapperVector5Child} fill alt="" src="/Vector 5.svg" />
      			</div>
      			<div className={styles.designerChild} />
      			<div className={styles.designerItem} />
      			<div className={styles.wrapperImageParent}>
        				<div className={styles.wrapperImage}>
          					<Image className={styles.imageIcon} fill alt="" src="/designer1.png" />
        				</div>
        				<div className={styles.wrapperImage}>
          					<Image className={styles.imageIcon} fill alt="" src="/designer2.png" />
        				</div>
        				<div className={styles.wrapperImage}>
          					<Image className={styles.imageIcon} fill alt="" src="/designer3.png" />
        				</div>
        				<div className={styles.frameChild} />
      			</div>
      			<div className={styles.div2}>최근 핫한 디자이너들을 만나보세요!</div>
      			<div className={styles.hotDesigners}>Hot Designers</div>
      			<div className={styles.rectangleParent}>
        				<div className={styles.frameItem} />
        				<b className={styles.b3}>필터</b>
      			</div>
      			<div className={styles.frameParent}>
        				<div className={styles.frameGroup}>
          					<div className={styles.wrapper04Parent} >
            						<div className={styles.wrapper04}>
              							<Image className={styles.icon} fill alt="" src="/최림_04.png" />
            						</div>
            						<div className={styles.frameWrapper}>
              							<div className={styles.parent}>
                								<div className={styles.div3}>여명대학교</div>
                								<div className={styles.brandingUxui}>Branding, UXUI</div>
              							</div>
            						</div>
          					</div>
          					<div className={styles.wrapperRectangle34626411Parent}>
            						<div className={styles.wrapperRectangle34626411}>
              							<Image className={styles.wrapperRectangle34626411Child} fill alt="" src="/Rectangle 34626411.png" />
            						</div>
            						<div className={styles.frameWrapper}>
              							<div className={styles.parent}>
                								<div className={styles.div3}>심현영</div>
                								<div className={styles.branding}>{`Branding, `}</div>
              							</div>
            						</div>
          					</div>
          					<div className={styles.wrapperRectangle34626411Parent}>
            						<div className={styles.wrapperRectangle34626411}>
              							<Image className={styles.wrapperRectangle34626411Child} fill alt="" src="/Rectangle 34626412.png" />
            						</div>
            						<div className={styles.frameWrapper}>
              							<div className={styles.parent}>
                								<div className={styles.div3}>여명대학교</div>
                								<div className={styles.branding}>{`Branding, `}</div>
              							</div>
            						</div>
          					</div>
        				</div>
        				<div className={styles.frameGroup}>
          					<div className={styles.wrapperRectangle34626411Parent}>
            						<div className={styles.wrapperRectangle34626411}>
              							<Image className={styles.wrapperRectangle34626411Child} fill alt="" src="/Rectangle 34626411.png" />
            						</div>
            						<div className={styles.frameWrapper}>
              							<div className={styles.parent}>
                								<div className={styles.div3}>심현영</div>
                								<div className={styles.branding}>{`Branding, `}</div>
              							</div>
            						</div>
          					</div>
          					<div className={styles.wrapperRectangle34626411Parent}>
            						<div className={styles.wrapperRectangle34626411}>
              							<Image className={styles.wrapperRectangle34626411Child} fill alt="" src="/Rectangle 89.png" />
            						</div>
            						<div className={styles.frameWrapper}>
              							<div className={styles.parent}>
                								<div className={styles.div3}>박소현</div>
                								<div className={styles.brandingUxui}>Branding, UXUI</div>
              							</div>
            						</div>
          					</div>
          					<div className={styles.wrapperRectangle34626411Parent}>
            						<div className={styles.wrapperRectangle34626411}>
              							<Image className={styles.wrapperRectangle34626411Child} fill alt="" src="/Rectangle 34626412.png" />
            						</div>
            						<div className={styles.frameWrapper}>
              							<div className={styles.parent}>
                								<div className={styles.div3}>여명대학교</div>
                								<div className={styles.branding}>{`Branding, `}</div>
              							</div>
            						</div>
          					</div>
        				</div>
        				<div className={styles.frameGroup}>
          					<div className={styles.wrapperRectangle34626411Parent}>
            						<div className={styles.wrapperRectangle34626411}>
              							<Image className={styles.wrapperRectangle34626411Child} fill alt="" src="/Rectangle 89.png" />
            						</div>
            						<div className={styles.frameWrapper}>
              							<div className={styles.parent}>
                								<div className={styles.div3}>박소현</div>
                								<div className={styles.brandingUxui}>Branding, UXUI</div>
              							</div>
            						</div>
          					</div>
          					<div className={styles.wrapperRectangle34626411Parent}>
            						<div className={styles.wrapperRectangle34626411}>
              							<Image className={styles.wrapperRectangle34626411Child} fill alt="" src="/Rectangle 34626412.png" />
            						</div>
            						<div className={styles.frameWrapper}>
              							<div className={styles.parent}>
                								<div className={styles.div3}>여명대학교</div>
                								<div className={styles.branding}>{`Branding, `}</div>
              							</div>
            						</div>
          					</div>
          					<div className={styles.wrapperRectangle34626411Parent}>
            						<div className={styles.wrapperRectangle34626411}>
              							<Image className={styles.wrapperRectangle34626411Child} fill alt="" src="/Rectangle 34626411.png" />
            						</div>
            						<div className={styles.frameWrapper}>
              							<div className={styles.parent}>
                								<div className={styles.div3}>심현영</div>
                								<div className={styles.branding}>{`Branding, `}</div>
              							</div>
            						</div>
          					</div>
        				</div>
      			</div>
      			<div className={styles.more}>more</div>
    		</div>
      <Footer />
    </div>
  );
}