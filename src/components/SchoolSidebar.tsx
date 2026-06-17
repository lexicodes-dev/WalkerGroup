'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './SchoolSidebar.module.css';

interface SchoolSidebarProps {
  schoolName: string;
  resolvedSlug: string;
}

export default function SchoolSidebar({ schoolName, resolvedSlug }: SchoolSidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <aside className={styles.sidebar}>
      <button 
        className={styles.mobileMainToggle} 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        IN THIS SECTION
        <span className={styles.icon}>{isMobileMenuOpen ? '−' : '+'}</span>
      </button>
      
      <div className={`${styles.menuContainer} ${isMobileMenuOpen ? styles.mobileOpen : styles.mobileClosed}`}>
        <ul className={styles.sidebarMenu}>
          <li><Link href={`/schools/${resolvedSlug}/friday-folder`} className={styles.sidebarLink}>FRIDAY FOLDER - {schoolName}</Link></li>
          <li><Link href="#" className={styles.sidebarLink}>EVENTS CALENDAR</Link></li>
          <li><Link href="#" className={styles.sidebarLink}>PROFILE <span>&#8599;</span></Link></li>
          <li><Link href="https://fpsct.nutrislice.com/" target="_blank" rel="noopener noreferrer" className={styles.sidebarLink}>LUNCH MENUS <span>&#8599;</span></Link></li>
          <li><Link href="#" className={styles.sidebarLink}>SCHOOL SCHEDULES</Link></li>
          <li><Link href="#" className={styles.sidebarLink}>BELL SCHEDULE <span>&#8599;</span></Link></li>
          <li><Link href="#" className={styles.sidebarLink}>PARKING INFORMATION</Link></li>
          <li><Link href="#" className={styles.sidebarLink}>FACULTY & STAFF DIRECTORY</Link></li>
          <li><Link href="#" className={styles.sidebarLink}>OTHER RESOURCES <span className={styles.redPlus}>+</span></Link></li>
        </ul>
      </div>
    </aside>
  );
}
