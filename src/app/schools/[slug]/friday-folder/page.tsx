import { notFound } from "next/navigation";
import Link from "next/link";
import styles from "./folder.module.css";

// Helper to fetch the school so we can get its ID
async function getSchoolBySlug(slug: string) {
  try {
    const res = await fetch(`https://wheat-squid-973289.hostingersite.com/wp-json/wp/v2/schools?slug=${slug}&_embed`, {
      cache: 'no-store'
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data && data.length > 0 ? data[0] : null;
  } catch (error) {
    return null;
  }
}

// Fetch all friday folders
async function getFridayFolders() {
  try {
    const res = await fetch(`https://wheat-squid-973289.hostingersite.com/wp-json/wp/v2/friday_folders?_embed&acf_format=standard&per_page=100`, {
      cache: 'no-store'
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    return [];
  }
}

export default async function FridayFolderPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  // 1. Get School
  const school = await getSchoolBySlug(resolvedParams.slug);
  if (!school) {
    notFound();
  }
  
  const schoolName = school.title?.rendered ? school.title.rendered.replace(/<[^>]+>/g, '') : "School";

  // 2. Get Folders
  const folders = await getFridayFolders();
  
  // 3. Find matching folder
  const folder = folders.find((f: any) => {
    if (!f.acf || !f.acf.school) return false;
    const schoolRef = f.acf.school;
    
    // ACF Post Object could be a single ID, an array of objects, or a single object
    if (typeof schoolRef === 'number') return schoolRef === school.id;
    if (Array.isArray(schoolRef) && schoolRef.length > 0) {
      return schoolRef[0].ID === school.id || schoolRef[0] === school.id;
    }
    if (schoolRef.ID) return schoolRef.ID === school.id;
    
    return false;
  });

  if (!folder) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <Link href={`/schools/${resolvedParams.slug}`} className={styles.backLink}>
            &larr; Back to {schoolName}
          </Link>
          <div className={styles.emptyState}>
            <h2>No Friday Folder Available</h2>
            <p>There is currently no Friday Folder uploaded for {schoolName}. Please check back later.</p>
          </div>
        </div>
      </main>
    );
  }

  // 4. Extract PDF URL
  let pdfUrl = null;
  if (folder.acf.fridayfolder_file) {
    const fileRef = folder.acf.fridayfolder_file;
    if (typeof fileRef === 'string') {
      pdfUrl = fileRef;
    } else if (fileRef.url) {
      pdfUrl = fileRef.url;
    }
  }

  if (!pdfUrl) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <Link href={`/schools/${resolvedParams.slug}`} className={styles.backLink}>
            &larr; Back to {schoolName}
          </Link>
          <div className={styles.emptyState}>
            <h2>Friday Folder Not Found</h2>
            <p>A Friday Folder exists for {schoolName}, but the PDF file is missing.</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Left Sidebar */}
        <aside className={styles.sidebar}>
          <ul className={styles.sidebarMenu}>
            <li><Link href="#" className={styles.sidebarLink}>FRIDAY FOLDER - {schoolName.toUpperCase()}</Link></li>
            <li><Link href="#" className={styles.sidebarLink}>EVENTS CALENDAR</Link></li>
            <li><Link href="#" className={styles.sidebarLink}>PROFILE <span>&#8599;</span></Link></li>
            <li><Link href="https://fpsct.nutrislice.com/" target="_blank" rel="noopener noreferrer" className={styles.sidebarLink}>LUNCH MENUS <span>&#8599;</span></Link></li>
            <li><Link href="#" className={styles.sidebarLink}>SCHOOL SCHEDULES</Link></li>
            <li><Link href="#" className={styles.sidebarLink}>BELL SCHEDULE <span>&#8599;</span></Link></li>
            <li><Link href="#" className={styles.sidebarLink}>PARKING INFORMATION</Link></li>
            <li><Link href="#" className={styles.sidebarLink}>FACULTY & STAFF DIRECTORY</Link></li>
            <li><Link href="#" className={styles.sidebarLink}>OTHER RESOURCES <span className={styles.redPlus}>+</span></Link></li>
          </ul>
        </aside>

        {/* Right Content Area */}
        <section className={styles.contentArea}>
          <h1 className={styles.title}>FRIDAY FOLDER</h1>
          
          <div className={styles.pdfContainer}>
            <object data={`${pdfUrl}#toolbar=0&navpanes=0`} type="application/pdf" className={styles.pdfViewer}>
              <iframe src={`${pdfUrl}#toolbar=0&navpanes=0`} className={styles.pdfViewer} title="Friday Folder PDF" />
              <p>Your browser does not support PDFs. <a href={pdfUrl} target="_blank" rel="noopener noreferrer">Download the PDF</a>.</p>
            </object>
          </div>
        </section>
      </div>
    </main>
  );
}
