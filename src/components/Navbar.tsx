"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';

interface School {
  id: number;
  slug: string;
  name: string;
}

interface NavbarProps {
  schools?: School[];
}

export default function Navbar({ schools = [] }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const topLinks = [
    { name: 'Calendar', href: '#', icon: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> },
    { name: 'News', href: '/news', icon: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path><path d="M18 14h-8"></path><path d="M15 18h-5"></path><path d="M10 6h8v4h-8V6Z"></path></svg> },
    { name: 'Students', href: '#' },
    { name: 'Families', href: '#' },
    { name: 'Staff', href: '#' },
  ];

  const mainLinks = [
    { name: 'About', href: '#' },
    { name: 'Schools', href: '#' },
    { name: 'District Departments', href: '#' },
    { name: 'Beyond The Classroom', href: '#' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.navContainer}>
        {/* Left Side: Logo Block (flush to edges, full height) */}
        <Link href="/" className={styles.logoWrapper}>
          <img 
            src="https://fpsct.org/wp-content/themes/hello-elementor/assets/images/fpsct-logo.png" 
            alt="Farmington Public Schools Logo" 
            className={styles.logoImage}
          />
        </Link>

        {/* Right Side: Split into Top and Bottom Bars */}
        <div className={styles.rightSection}>
          {/* Top Maroon Bar */}
          <div className={styles.topBar}>
            <ul className={styles.topNavLinks}>
              {topLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className={styles.topNavLink}>
                    {link.icon && <span style={{ marginRight: '4px' }}>{link.icon}</span>}
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <button className={styles.searchBtn} aria-label="Search">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </button>
              </li>
            </ul>
          </div>

          {/* Main White Nav */}
          <div className={styles.bottomBar}>
            <nav className={styles.desktopNav}>
              <ul className={styles.mainNavLinks}>
              {mainLinks.map((link) => (
                <li 
                  key={link.name} 
                  className={
                    link.name === 'Schools' || link.name === 'About' || link.name === 'District Departments' || link.name === 'Beyond The Classroom'
                      ? styles.dropdownContainer 
                      : ''
                  }
                >
                  <Link href={link.href} className={styles.mainNavLink}>
                    {link.name}
                  </Link>

                  {/* Schools Dropdown */}
                  {link.name === 'Schools' && schools.length > 0 && (
                    <div className={styles.dropdownMenu}>
                      {schools.map(school => (
                        <Link key={school.id} href={`/schools/${school.slug}`} className={styles.dropdownItem}>
                          {school.name}
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* About Mega Menu */}
                  {link.name === 'About' && (
                    <div className={`${styles.dropdownMenu} ${styles.megaMenu} ${styles.megaMenuLeft}`}>
                      <div className={styles.megaMenuInner}>
                        <div className={styles.megaMenuLinksCol}>
                          <Link href="#" className={styles.dropdownItem}>WHO WE ARE</Link>
                          <Link href="#" className={styles.dropdownItem}>BOARD OF EDUCATION</Link>
                          <Link href="#" className={styles.dropdownItem}>DISTRICT CALENDAR</Link>
                          <Link href="#" className={styles.dropdownItem}>FACULTY & STAFF DIRECTORY</Link>
                          <Link href="#" className={styles.dropdownItem}>DISTRICT & SCHOOL REPORTS</Link>
                          <Link href="#" className={styles.dropdownItem}>EMERGENCY INFORMATION</Link>
                          <Link href="#" className={styles.dropdownItem}>SCHOOL SCHEDULES</Link>
                        </div>
                        <div className={styles.megaMenuLinksCol}>
                          <Link href="#" className={styles.dropdownItem}>TRANSPORTATION</Link>
                          <Link href="#" className={styles.dropdownItem}>FOOD & NUTRITION</Link>
                          <Link href="#" className={styles.dropdownItem}>SAFE SCHOOL CLIMATE</Link>
                          <Link href="#" className={styles.dropdownItem}>SCHOOL REGISTRATION</Link>
                          <Link href="#" className={styles.dropdownItem}>EMPLOYMENT OPPORTUNITIES</Link>
                        </div>
                        <div className={styles.megaMenuImageCol}>
                          <div className={styles.megaMenuImageWrapper}>
                            <Image 
                              src="/AboutPhoto.png" 
                              alt="Students" 
                              fill 
                              className={styles.megaMenuImage}
                              sizes="300px"
                            />
                          </div>
                          <Link href="#" className={styles.megaMenuBtn}>
                            DISCOVER GLOBAL CITIZENS
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* District Departments Mega Menu */}
                  {link.name === 'District Departments' && (
                    <div className={`${styles.dropdownMenu} ${styles.megaMenu} ${styles.megaMenuRight}`}>
                      <div className={styles.megaMenuInnerTwoCols}>
                        <div className={styles.megaMenuLinksCol}>
                          <Link href="/office-of-superintendent" className={styles.dropdownItem}>OFFICE OF THE SUPERINTENDENT</Link>
                          <Link href="#" className={styles.dropdownItem}>FINANCE & OPERATIONS</Link>
                          <Link href="#" className={styles.dropdownItem}>EQUITY & INCLUSION</Link>
                          <Link href="#" className={styles.dropdownItem}>CURRICULUM & INSTRUCTION</Link>
                          <Link href="#" className={styles.dropdownItem}>TECHNOLOGY SERVICES</Link>
                        </div>
                        <div className={styles.megaMenuLinksCol}>
                          <Link href="#" className={styles.dropdownItem}>ENGLISH LANGUAGE LEARNERS</Link>
                          <Link href="#" className={styles.dropdownItem}>SPECIAL SERVICES</Link>
                          <Link href="#" className={styles.dropdownItem}>FACILITIES</Link>
                          <Link href="#" className={styles.dropdownItem}>HUMAN RESOURCES</Link>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Beyond The Classroom Mega Menu */}
                  {link.name === 'Beyond The Classroom' && (
                    <div className={`${styles.dropdownMenu} ${styles.megaMenu} ${styles.megaMenuRight}`}>
                      <div className={styles.megaMenuInnerReversed}>
                        <div className={styles.megaMenuImageCol}>
                          <div className={styles.megaMenuImageWrapper}>
                            <Image 
                              src="/BeyondTheClassroom.png" 
                              alt="Beyond The Classroom" 
                              fill 
                              className={styles.megaMenuImage}
                              sizes="300px"
                            />
                          </div>
                          <Link href="#" className={styles.megaMenuBtn}>
                            EXPLORE OUR EVENTS
                          </Link>
                        </div>
                        <div className={styles.megaMenuLinksCol}>
                          <Link href="#" className={styles.dropdownItem}>ATHLETICS</Link>
                          <Link href="#" className={styles.dropdownItem}>MUSIC IN OUR SCHOOLS</Link>
                          <Link href="#" className={styles.dropdownItem}>FINE AND APPLIED ARTS</Link>
                          <Link href="#" className={styles.dropdownItem}>HEALTH AND WELLNESS</Link>
                          <Link href="#" className={styles.dropdownItem}>SCHOOL TO CAREER</Link>
                        </div>
                        <div className={styles.megaMenuLinksCol}>
                          <Link href="#" className={styles.dropdownItem}>FARMINGTON EXTENDED CARE AND LEARNING (EXCL)</Link>
                          <Link href="#" className={styles.dropdownItem}>FARMINGTON CONTINUING EDUCATION</Link>
                          <Link href="#" className={styles.dropdownItem}>TOWN OF FARMINGTON</Link>
                          <Link href="#" className={styles.dropdownItem}>FARMINGTON PUBLIC SCHOOLS FOUNDATION</Link>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            </nav>
            <button 
              className={styles.mobileMenuBtn} 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenuOverlay} ${isOpen ? styles.open : ''}`}>
        <div className={styles.mobileMenuHeader}>
          <img 
            src="https://fpsct.org/wp-content/themes/hello-elementor/assets/images/fpsct-logo.png" 
            alt="Farmington Public Schools Logo" 
            className={styles.mobileLogoImage}
            style={{ width: '200px', objectFit: 'contain' }}
          />
          <button 
            className={styles.mobileMenuCloseBtn} 
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        <div className={styles.mobileMenuBody}>
          <Link href="#" className={styles.mobileMenuMainLink} onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.mobileMenuIcon}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            CALENDAR
          </Link>
          <Link href="/news" className={styles.mobileMenuMainLink} onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.mobileMenuIcon}><path d="M3 11l18-5v12L3 14v-3z"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path></svg>
            NEWS
          </Link>
          <Link href="#" className={styles.mobileMenuMainLink} onClick={toggleMenu}>STUDENTS</Link>
          <Link href="#" className={styles.mobileMenuMainLink} onClick={toggleMenu}>FAMILIES</Link>
          <Link href="#" className={styles.mobileMenuMainLink} onClick={toggleMenu}>STAFF</Link>
          <Link href="#" className={styles.mobileMenuMainLink} onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.mobileMenuIcon}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            SEARCH
          </Link>
          
          <hr className={styles.mobileMenuDivider} />
          
          <div className={styles.mobileMenuGroup}>
            <h3 className={styles.mobileMenuGroupTitle}>ABOUT</h3>
            <Link href="#" className={styles.mobileMenuSubLink} onClick={toggleMenu}>WHO WE ARE</Link>
            <Link href="#" className={styles.mobileMenuSubLink} onClick={toggleMenu}>SCHOOL REGISTRATION</Link>
            <Link href="#" className={styles.mobileMenuSubLink} onClick={toggleMenu}>BOARD OF EDUCATION</Link>
            <Link href="#" className={styles.mobileMenuSubLink} onClick={toggleMenu}>DISTRICT CALENDAR</Link>
            <Link href="#" className={styles.mobileMenuSubLink} onClick={toggleMenu}>EMERGENCY INFORMATION</Link>
            <Link href="#" className={styles.mobileMenuSubLink} onClick={toggleMenu}>SCHOOL SCHEDULES</Link>
            <Link href="#" className={styles.mobileMenuSubLink} onClick={toggleMenu}>TRANSPORTATION</Link>
            <Link href="#" className={styles.mobileMenuSubLink} onClick={toggleMenu}>FOOD & NUTRITION</Link>
            <Link href="#" className={styles.mobileMenuSubLink} onClick={toggleMenu}>DISTRICT & SCHOOL REPORTS</Link>
            <Link href="#" className={styles.mobileMenuSubLink} onClick={toggleMenu}>SAFE SCHOOL CLIMATE</Link>
            <Link href="#" className={styles.mobileMenuSubLink} onClick={toggleMenu}>EMPLOYMENT OPPORTUNITIES</Link>
          </div>

          <div className={styles.mobileMenuGroup}>
            <h3 className={styles.mobileMenuGroupTitle}>SCHOOLS</h3>
            {schools.map(school => (
              <Link key={school.id} href={`/schools/${school.slug}`} className={styles.mobileMenuSubLink} onClick={toggleMenu}>
                {school.name.toUpperCase()}
              </Link>
            ))}
          </div>

          <div className={styles.mobileMenuGroup}>
            <h3 className={styles.mobileMenuGroupTitle}>DISTRICT DEPARTMENTS</h3>
            <Link href="/office-of-superintendent" className={styles.mobileMenuSubLink} onClick={toggleMenu}>OFFICE OF THE SUPERINTENDENT</Link>
            <Link href="#" className={styles.mobileMenuSubLink} onClick={toggleMenu}>FINANCE & OPERATIONS</Link>
            <Link href="#" className={styles.mobileMenuSubLink} onClick={toggleMenu}>EQUITY & INCLUSION</Link>
            <Link href="#" className={styles.mobileMenuSubLink} onClick={toggleMenu}>CURRICULUM & INSTRUCTION</Link>
            <Link href="#" className={styles.mobileMenuSubLink} onClick={toggleMenu}>TECHNOLOGY SERVICES</Link>
            <Link href="#" className={styles.mobileMenuSubLink} onClick={toggleMenu}>ENGLISH LANGUAGE LEARNERS</Link>
            <Link href="#" className={styles.mobileMenuSubLink} onClick={toggleMenu}>SPECIAL SERVICES</Link>
            <Link href="#" className={styles.mobileMenuSubLink} onClick={toggleMenu}>FACILITIES</Link>
            <Link href="#" className={styles.mobileMenuSubLink} onClick={toggleMenu}>HUMAN RESOURCES</Link>
          </div>
          
          <div className={styles.mobileMenuGroup}>
            <h3 className={styles.mobileMenuGroupTitle}>BEYOND THE CLASSROOM</h3>
            <Link href="#" className={styles.mobileMenuSubLink} onClick={toggleMenu}>ATHLETICS</Link>
            <Link href="#" className={styles.mobileMenuSubLink} onClick={toggleMenu}>MUSIC IN OUR SCHOOLS</Link>
            <Link href="#" className={styles.mobileMenuSubLink} onClick={toggleMenu}>FINE AND APPLIED ARTS</Link>
            <Link href="#" className={styles.mobileMenuSubLink} onClick={toggleMenu}>HEALTH AND WELLNESS</Link>
            <Link href="#" className={styles.mobileMenuSubLink} onClick={toggleMenu}>SCHOOL TO CAREER</Link>
            <Link href="#" className={styles.mobileMenuSubLink} onClick={toggleMenu}>FARMINGTON EXTENDED CARE AND LEARNING (EXCL)</Link>
            <Link href="#" className={styles.mobileMenuSubLink} onClick={toggleMenu}>FARMINGTON CONTINUING EDUCATION</Link>
            <Link href="#" className={styles.mobileMenuSubLink} onClick={toggleMenu}>TOWN OF FARMINGTON</Link>
            <Link href="#" className={styles.mobileMenuSubLink} onClick={toggleMenu}>FARMINGTON PUBLIC SCHOOLS FOUNDATION</Link>
          </div>

          <hr className={styles.mobileMenuDivider} />

          <Link href="/contact" className={styles.mobileMenuMainLink} onClick={toggleMenu} style={{ fontSize: '1.2rem', color: '#111' }}>CONTACT</Link>
        </div>
      </div>

    </header>
  );
}
