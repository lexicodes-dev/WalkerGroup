"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Footer.module.css';

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  return (
    <footer className={styles.footer}>
      {/* Mission Statement Bar */}
      {isHome && (
        <div className={styles.missionBar}>
          <div className={styles.missionContainer}>
            <img 
              src="https://fpsct.org/wp-content/uploads/2025/08/FIcon-lightmarroon.png" 
              alt="F Icon" 
              width={49} 
              height={43} 
              className={styles.missionIcon}
            />
            <p className={styles.missionText}>
              Farmington Public Schools empowers every student to reach personal and academic excellence through a commitment to equity and whole-child development—preparing innovative, compassionate leaders ready to thrive in a complex, global society.
            </p>
          </div>
        </div>
      )}

      <div className={`${styles.thinDivider} ${styles.mobileHideFooterMenu}`}></div>

      {/* Main Footer Links */}
      <div className={`${styles.footerLinksSection} ${styles.mobileHideFooterMenu}`}>
        <div className={styles.footerLinksContainer}>
          
          {/* Logo & Left Links */}
          <div className={styles.footerColumn}>
            <Image 
              src="/logo.png" 
              alt="Farmington Public Schools Logo" 
              width={1092} 
              height={337} 
              className={styles.footerLogo}
            />
            <div className={styles.mobileHideFooterMenu}>
              <ul className={styles.footerLinkList}>
                <li><Link href="/">HOME</Link></li>
                <li><Link href="#">CAREERS</Link></li>
                <li><Link href="/contact">CONTACT</Link></li>
              </ul>
              <div className={styles.divider}></div>
              <ul className={styles.footerLinkList}>
                <li><Link href="#">STUDENTS</Link></li>
                <li><Link href="#">FAMILIES</Link></li>
                <li><Link href="#">STAFF</Link></li>
              </ul>
            </div>
          </div>

          {/* About Links */}
          <div className={`${styles.footerColumn} ${styles.mobileHideFooterMenu}`}>
            <h4 className={styles.columnTitle}>ABOUT</h4>
            <ul className={styles.footerLinkList}>
              <li><Link href="#">WHO WE ARE</Link></li>
              <li><Link href="#">SCHOOL REGISTRATION</Link></li>
              <li><Link href="#">BOARD OF EDUCATION</Link></li>
              <li><Link href="#">DISTRICT CALENDAR</Link></li>
              <li><Link href="#">EMERGENCY INFORMATION</Link></li>
              <li><Link href="#">SCHOOL SCHEDULES</Link></li>
              <li><Link href="#">TRANSPORTATION</Link></li>
              <li><Link href="#">FOOD & NUTRITION</Link></li>
              <li><Link href="#">DISTRICT & SCHOOL REPORTS</Link></li>
              <li><Link href="#">SAFE SCHOOL CLIMATE</Link></li>
              <li><Link href="#">EMPLOYMENT OPPORTUNITIES</Link></li>
            </ul>
          </div>

          {/* Schools Links */}
          <div className={`${styles.footerColumn} ${styles.mobileHideFooterMenu}`}>
            <h4 className={styles.columnTitle}>SCHOOLS</h4>
            <ul className={styles.footerLinkList}>
              <li><Link href="#">FARMINGTON HIGH SCHOOL</Link></li>
              <li><Link href="#">IRVING A. ROBBINS MIDDLE SCHOOL</Link></li>
              <li><Link href="#">WEST WOODS UPPER ELEMENTARY SCHOOL</Link></li>
              <li><Link href="#">EAST FARMS ELEMENTARY SCHOOL</Link></li>
              <li><Link href="#">NOAH WALLACE ELEMENTARY SCHOOL</Link></li>
              <li><Link href="#">UNION ELEMENTARY SCHOOL</Link></li>
              <li><Link href="#">WEST DISTRICT ELEMENTARY SCHOOL</Link></li>
              <li><Link href="#">FARMINGTON COLLABORATIVE PRESCHOOL</Link></li>
            </ul>
          </div>

          {/* Departments Links */}
          <div className={`${styles.footerColumn} ${styles.mobileHideFooterMenu}`}>
            <h4 className={styles.columnTitle}>DEPARTMENTS</h4>
            <ul className={styles.footerLinkList}>
              <li><Link href="#">OFFICE OF THE SUPERINTENDENT</Link></li>
              <li><Link href="#">CURRICULUM & INSTRUCTION</Link></li>
              <li><Link href="#">SPECIAL SERVICES</Link></li>
              <li><Link href="#">FINANCE & OPERATIONS</Link></li>
              <li><Link href="#">TECHNOLOGY SERVICES</Link></li>
              <li><Link href="#">FACILITIES</Link></li>
              <li><Link href="#">EQUITY & INCLUSION</Link></li>
              <li><Link href="#">ENGLISH LANGUAGE LEARNERS</Link></li>
              <li><Link href="#">HUMAN RESOURCES</Link></li>
            </ul>
          </div>

          {/* Beyond the Classroom Links */}
          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>BEYOND THE CLASSROOM</h4>
            <ul className={styles.footerLinkList}>
              <li><Link href="#">ATHLETICS</Link></li>
              <li><Link href="#">FINE AND APPLIED ARTS</Link></li>
              <li><Link href="#">MUSIC IN OUR SCHOOLS</Link></li>
              <li><Link href="#">HEALTH AND WELLNESS</Link></li>
              <li><Link href="#">SCHOOL TO CAREER</Link></li>
              <li><Link href="#">FARMINGTON CONTINUING EDUCATION</Link></li>
              <li><Link href="#">FARMINGTON PUBLIC SCHOOLS FOUNDATION</Link></li>
              <li><Link href="#">FARMINGTON EXTENDED CARE AND LEARNING (EXCL)</Link></li>
              <li><Link href="#">TOWN OF FARMINGTON</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Copyright Bar */}
      <div className={styles.copyrightBar}>
        <div className={styles.copyrightContainer}>
          <div className={styles.copyrightLeft}>
            <p>Copyright 2026 - Farmington Public Schools</p>
            <p style={{ marginTop: '0.5rem' }}>14 Monteith Drive, Farmington CT 06032</p>
            <p>Phone: 860-673-8270 | Fax: 860-675-7134</p>
          </div>
          <div className={styles.copyrightRight}>
            <button className={styles.reportBtn}>Report Acts of Bias, Harassment and Bullying</button>
            <div className={styles.legalLinks}>
              <Link href="#">Contact</Link>
              <span>|</span>
              <Link href="#">EOE Policy</Link>
              <span>|</span>
              <Link href="#">Privacy Policy</Link>
              <span>|</span>
              <Link href="#">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
