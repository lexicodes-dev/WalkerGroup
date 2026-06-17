'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

interface School {
  id: number;
  name: string;
}

interface SidebarProps {
  schools: School[];
}

export default function Sidebar({ schools }: SidebarProps) {
  const pathname = usePathname();
  
  // Default open state based on current path
  const isDeptPage = pathname.includes('/office-of-superintendent') || pathname.includes('/departments');
  const [openSection, setOpenSection] = useState<string | null>(isDeptPage ? 'departments' : null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const departments = [
    { name: 'Office of the Superintendent', href: '/office-of-superintendent' },
    { name: 'Curriculum & Instruction', href: '#' },
    { name: 'Special Services', href: '#' },
    { name: 'Finance & Operations', href: '#' },
    { name: 'Technology Services', href: '#' },
    { name: 'Facilities', href: '#' },
    { name: 'Equity & Inclusion', href: '#' },
    { name: 'English Language Learners', href: '#' },
    { name: 'Human Resources', href: '#' },
  ];

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
        <ul className={styles.menuList}>
        
        {/* ABOUT FPS */}
        <li className={styles.menuItem}>
          <button className={styles.menuHeader} onClick={() => toggleSection('about')}>
            ABOUT FPS
            <span className={styles.icon}>{openSection === 'about' ? '−' : '+'}</span>
          </button>
        </li>

        {/* SCHOOLS */}
        <li className={`${styles.menuItem} ${openSection === 'schools' ? styles.activeHeader : ''}`}>
          <button 
            className={`${styles.menuHeader} ${openSection === 'schools' ? styles.activeText : ''}`} 
            onClick={() => toggleSection('schools')}
          >
            SCHOOLS
            <span className={styles.icon}>{openSection === 'schools' ? '−' : '+'}</span>
          </button>
          
          {openSection === 'schools' && (
            <div className={styles.subMenu}>
              {schools.map(school => (
                <Link key={school.id} href="#" className={styles.subLink}>
                  {school.name}
                </Link>
              ))}
            </div>
          )}
        </li>

        {/* DISTRICT DEPARTMENTS */}
        <li className={`${styles.menuItem} ${openSection === 'departments' ? styles.activeHeader : ''}`}>
          <button 
            className={`${styles.menuHeader} ${openSection === 'departments' ? styles.activeText : ''}`} 
            onClick={() => toggleSection('departments')}
          >
            DISTRICT DEPARTMENTS
            <span className={styles.icon}>{openSection === 'departments' ? '−' : '+'}</span>
          </button>
          
          {openSection === 'departments' && (
            <div className={styles.subMenu}>
              {departments.map(dept => (
                <Link 
                  key={dept.name} 
                  href={dept.href} 
                  className={`${styles.subLink} ${pathname === dept.href ? styles.active : ''}`}
                >
                  {dept.name}
                </Link>
              ))}
            </div>
          )}
        </li>

        {/* BEYOND THE CLASSROOM */}
        <li className={styles.menuItem}>
          <button className={styles.menuHeader} onClick={() => toggleSection('beyond')}>
            BEYOND THE CLASSROOM
            <span className={styles.icon}>{openSection === 'beyond' ? '−' : '+'}</span>
          </button>
        </li>

        {/* NEWS */}
        <li className={styles.menuItem}>
          <Link href="#" className={styles.menuHeader} style={{ textDecoration: 'none' }}>
            NEWS
          </Link>
        </li>

        {/* CONTACT */}
        <li className={styles.menuItem}>
          <Link href="/contact" className={styles.menuHeader} style={{ textDecoration: 'none' }}>
            CONTACT
          </Link>
        </li>

      </ul>
      </div>
    </aside>
  );
}
