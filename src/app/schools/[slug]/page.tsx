import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SchoolSidebar from "@/components/SchoolSidebar";
import styles from "./schools.module.css";

async function getSchoolBySlug(slug: string) {
  try {
    const res = await fetch(`https://wheat-squid-973289.hostingersite.com/wp-json/wp/v2/schools?slug=${slug}&_embed&acf_format=standard`, {
      cache: 'no-store'
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data && data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Failed to fetch school", error);
    return null;
  }
}

async function getMediaUrl(id: number) {
  if (!id) return null;
  try {
    const res = await fetch(`https://wheat-squid-973289.hostingersite.com/wp-json/wp/v2/media/${id}`, {
      cache: 'no-store'
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.source_url || null;
  } catch (error) {
    return null;
  }
}

export default async function SchoolPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const school = await getSchoolBySlug(resolvedParams.slug);

  if (!school) {
    notFound();
  }

  const acf = school.acf && !Array.isArray(school.acf) ? school.acf : {};
  const schoolName = acf.school_name || (school.title?.rendered ? school.title.rendered.replace(/<[^>]+>/g, '') : "School Information");
  // The ACF field is spelled 'blurp'
  const blurb = acf.blurp || "Welcome to our school. We are dedicated to providing an excellent education for all our students. Our passionate staff and comprehensive curriculum prepare students for future success in a global society.";
  const principalName = acf.principal || "Name";
  
  let principalPhotoUrl = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=500";
  if (acf.principal_photo) {
    if (typeof acf.principal_photo === 'number') {
      const mediaUrl = await getMediaUrl(acf.principal_photo);
      if (mediaUrl) principalPhotoUrl = mediaUrl;
    } else if (typeof acf.principal_photo === 'string') {
      principalPhotoUrl = acf.principal_photo;
    } else if (acf.principal_photo.url) {
      principalPhotoUrl = acf.principal_photo.url;
    }
  }

  let schoolLogoUrl = null;
  if (acf.school_logo) {
    if (typeof acf.school_logo === 'string') {
      schoolLogoUrl = acf.school_logo;
    } else if (acf.school_logo.url) {
      schoolLogoUrl = acf.school_logo.url;
    }
  }
  
  // Try to find a featured image in the _embedded data, otherwise fallback to the generic Schools.png
  let featuredImageUrl = "/Schools.png";
  if (school._embedded && school._embedded['wp:featuredmedia']) {
    featuredImageUrl = school._embedded['wp:featuredmedia'][0].source_url;
  }

  return (
    <main className={styles.main}>
      {/* Hero Header */}
      <section className={styles.heroSection}>
        <div className={styles.heroImageWrapper}>
          <Image 
            src={featuredImageUrl}
            alt={schoolName}
            fill
            className={styles.heroImage}
            priority
          />
          <div className={styles.heroOverlay}>
            {schoolLogoUrl ? (
              <Image 
                src={schoolLogoUrl}
                alt={`${schoolName} Logo`}
                width={400}
                height={300}
                className={styles.schoolLogoInHero}
              />
            ) : (
              <h1 className={styles.heroTitle}>{schoolName}</h1>
            )}
          </div>
        </div>
      </section>

      {/* Mobile Full-Width Sidebar */}
      <div className={styles.mobileSidebarWrapper}>
        <SchoolSidebar schoolName={schoolName} resolvedSlug={resolvedParams.slug} />
      </div>

      {/* Main Layout Container */}
      <div className={styles.container}>
        {/* Left Sidebar (Desktop) */}
        <div className={styles.desktopSidebarWrapper}>
          <SchoolSidebar schoolName={schoolName} resolvedSlug={resolvedParams.slug} />
        </div>

        {/* Right Content Area */}
        <section className={styles.contentArea}>
          <h2 className={styles.contentTitle}>{schoolName}</h2>
          
          <div className={styles.blurbAndPrincipal}>
            <div className={styles.blurbText}>
              <p>{blurb}</p>
            </div>
            
            <div className={styles.principalCard}>
              <div className={styles.principalPhotoWrapper}>
                <Image 
                  src={principalPhotoUrl}
                  alt={principalName}
                  width={200}
                  height={250}
                  className={styles.principalPhoto}
                />
              </div>
              <p className={styles.principalName}>Principal {principalName}</p>
            </div>
          </div>

          {/* Action Cards Grid */}
          <div className={styles.actionGrid}>
            <Link href={`/schools/${resolvedParams.slug}/friday-folder`} className={styles.actionCard}>
              <div className={styles.cardImageWrapper}>
                <Image src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=400&h=300" alt="Friday Folders" fill className={styles.cardImage} />
              </div>
              <div className={styles.cardLabel}>
                <span className={styles.cardIcon}>F</span>
                <span>FRIDAY FOLDERS</span>
              </div>
            </Link>
            
            <Link href="#" className={styles.actionCard}>
              <div className={styles.cardImageWrapper}>
                <Image src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=400&h=300" alt="Calendar" fill className={styles.cardImage} />
              </div>
              <div className={styles.cardLabel}>
                <span className={styles.cardIcon}>F</span>
                <span>CALENDAR</span>
              </div>
            </Link>
            
            <Link href="https://fpsct.nutrislice.com/" target="_blank" rel="noopener noreferrer" className={styles.actionCard}>
              <div className={styles.cardImageWrapper}>
                <Image src="/lunch_box.png" alt="Lunch Menus" fill className={styles.cardImage} />
              </div>
              <div className={styles.cardLabel}>
                <span className={styles.cardIcon}>F</span>
                <span>LUNCH MENUS</span>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
