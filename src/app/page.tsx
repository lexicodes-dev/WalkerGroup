import Image from "next/image";
import React from 'react';
import styles from "./page.module.css";
import Link from 'next/link';
import NewsCarousel from '@/components/NewsCarousel';

async function getMediaUrl(id: number) {
  try {
    const res = await fetch(`https://wheat-squid-973289.hostingersite.com/wp-json/wp/v2/media/${id}`, {
      cache: 'no-store'
    });
    if (!res.ok) return '';
    const media = await res.json();
    return media?.source_url || '';
  } catch (e) {
    return '';
  }
}

async function getDistrictNews() {
  try {
    const res = await fetch('https://wheat-squid-973289.hostingersite.com/wp-json/wp/v2/district_news?_embed&per_page=3', {
      cache: 'no-store'
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch news", error);
    return [];
  }
}

export default async function Home() {
  const newsPosts = await getDistrictNews();
  
  const enhancedPosts = await Promise.all(newsPosts.map(async (post: any) => {
    const acf = post.acf && !Array.isArray(post.acf) ? post.acf : {};
            
    const rawWpTitle = post.title?.rendered ? post.title.rendered.replace(/<[^>]+>/g, '') : '';
    const title = acf.title || rawWpTitle || 'Untitled';
    
    const content = acf.content || '';
    const excerpt = content.length > 100 ? content.substring(0, 100) + '...' : content;
    
    let imageUrl = 'https://fpsct.org/wp-content/uploads/2026/05/Press-Release-1.png';
    if (typeof acf.image === 'number') {
      const fetchedUrl = await getMediaUrl(acf.image);
      if (fetchedUrl) imageUrl = fetchedUrl;
    } else if (acf.image && typeof acf.image === 'string') {
      imageUrl = acf.image;
    } else if (acf.image?.url) {
      imageUrl = acf.image.url;
    } else if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
      imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
    }
    
    let pdfUrl = '';
    if (typeof acf.pdf_file === 'number') {
      pdfUrl = await getMediaUrl(acf.pdf_file);
    } else if (typeof acf.pdf_file === 'string') {
      pdfUrl = acf.pdf_file;
    } else if (acf.pdf_file?.url) {
      pdfUrl = acf.pdf_file.url;
    }

    const nativeContent = post.content?.rendered?.replace(/<[^>]+>/g, '').trim() || '';
    const hasContent = (!!acf.content && acf.content.trim().length > 0) || nativeContent.length > 0;
    const attatchLink = acf.attatch_link || '';

    let href = `/news/${post.slug}`;
    let target = '_self';

    if (!hasContent) {
      if (pdfUrl) {
        href = pdfUrl;
        target = '_blank';
      } else if (attatchLink) {
        href = attatchLink;
        target = '_blank';
      }
    }

    return {
      id: post.id,
      title,
      excerpt,
      imageUrl,
      href,
      target
    };
  }));

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            EMPOWERING<br />GLOBAL CITIZENS
          </h1>
        </div>
      </section>

      {/* Announcement Bar */}
      <div className={styles.announcementBar}>
        Announcement • 2026-2027 Kindergarten Registration is OPEN ⇗
      </div>

      {/* 3-Column Info Section */}
      <section className={styles.threeColumns}>
        {/* Col 1 */}
        <div className={`${styles.column} ${styles.colMaroon}`}>
          <div className={styles.colIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
          </div>
          <h2 className={styles.colTitle}>Enroll Today</h2>
          <p className={styles.colText}>
            If you are a Farmington resident, start your child's journey with Farmington Public Schools—Registration for 2026-2027 is now OPEN
          </p>
          <Link href="#" className={styles.colBtn}>Enrollment</Link>
        </div>
        {/* Col 2 */}
        <div className={`${styles.column} ${styles.colBlue}`}>
          <div className={styles.colIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
          </div>
          <h2 className={styles.colTitle}>Global Citizen</h2>
          <p className={styles.colText}>
            Discover how Farmington Public Schools is shaping future-ready leaders—learn more about our vision and values!
          </p>
          <Link href="#" className={styles.colBtn}>Who We Are</Link>
        </div>
        {/* Col 3 */}
        <div className={`${styles.column} ${styles.colDarkBlue}`}>
          <div className={styles.colIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </div>
          <h2 className={styles.colTitle}>Equity Matters</h2>
          <p className={styles.colText}>
            Explore how our Core Beliefs shape a culture of excellence, equity, and well-being—learn more about what truly matters at Farmington Public Schools!
          </p>
          <Link href="#" className={styles.colBtn}>Our Beliefs</Link>
        </div>
      </section>

      {/* News & Updates Section */}
      <section className={styles.newsSection}>
        <div className={styles.newsHeader}>
          <span className={styles.newsSubheading}>FARMINGTON PUBLIC SCHOOLS</span>
          <h2 className={styles.newsHeading}>NEWS & UPDATES</h2>
        </div>
        
        <div className={styles.newsWrapper}>
          {/* Desktop Grid */}
          <div className={styles.newsGridDesktop}>
            {enhancedPosts.length > 0 ? (
              enhancedPosts.map((post: any) => (
                <div className={styles.newsCard} key={post.id}>
                  <div 
                    className={styles.newsImage} 
                    style={{ backgroundImage: `url('${post.imageUrl}')` }}
                  ></div>
                  <div className={styles.newsContent}>
                    <h3 className={styles.newsTitle}>{post.title}</h3>
                    <p className={styles.newsExcerpt}>{post.excerpt}</p>
                    <Link href={post.href} target={post.target} className={styles.newsReadMore}>READ POST <span>&rarr;</span></Link>
                  </div>
                </div>
              ))
            ) : (
              <p>No news available at the moment.</p>
            )}
          </div>

          {/* Mobile Carousel */}
          <div className={styles.newsCarouselMobile}>
            {enhancedPosts.length > 0 && (
              <NewsCarousel>
                {enhancedPosts.map((post: any) => (
                  <div className={styles.newsCard} key={post.id}>
                    <div 
                      className={styles.newsImage} 
                      style={{ backgroundImage: `url('${post.imageUrl}')` }}
                    ></div>
                    <div className={styles.newsContent}>
                      <h3 className={styles.newsTitle}>{post.title}</h3>
                      <p className={styles.newsExcerpt}>{post.excerpt}</p>
                      <Link href={post.href} target={post.target} className={styles.newsReadMore}>READ POST <span>&rarr;</span></Link>
                    </div>
                  </div>
                ))}
              </NewsCarousel>
            )}
          </div>
        </div>
      </section>

      {/* Beyond the Classroom Header */}
      <div className={styles.beyondHeaderContainer}>
        <div className={styles.beyondHeader}>
          <span className={styles.newsSubheading}>FARMINGTON PUBLIC SCHOOLS</span>
          <h2 className={styles.newsHeading}>BEYOND THE CLASSROOM</h2>
        </div>
      </div>

      {/* Beyond the Classroom Section */}
      <section className={styles.beyondSection}>
        <div className={styles.beyondGrid}>
          {/* Item 1 */}
          <div className={styles.beyondItem}>
            <div className={styles.beyondImageWrapper}>
              <div 
                className={styles.beyondImage} 
                style={{ backgroundImage: `url('https://fpsct.org/wp-content/uploads/2025/12/winter.png')` }}
              ></div>
            </div>
            <div className={styles.beyondOverlay}>
              <h3 className={styles.beyondTitle}>WINTER ATHLETICS</h3>
            </div>
          </div>

          {/* Item 2 */}
          <div className={styles.beyondItem}>
            <div className={styles.beyondImageWrapper}>
              <div 
                className={styles.beyondImage} 
                style={{ backgroundImage: `url('https://fpsct.org/wp-content/uploads/2025/08/artcard-copy.jpg')` }}
              ></div>
            </div>
            <div className={styles.beyondOverlay}>
              <h3 className={styles.beyondTitle}>FINE & APPLIED ARTS</h3>
            </div>
          </div>

          {/* Item 3 */}
          <div className={styles.beyondItem}>
            <div className={styles.beyondImageWrapper}>
              <div 
                className={styles.beyondImage} 
                style={{ backgroundImage: `url('https://fpsct.org/wp-content/uploads/2025/08/musiccard-copy.jpg')` }}
              ></div>
            </div>
            <div className={styles.beyondOverlay}>
              <h3 className={styles.beyondTitle}>MUSIC IN OUR SCHOOLS</h3>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
