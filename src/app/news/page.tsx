import Link from "next/link";
import styles from "./newsArchive.module.css";

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

async function getArchiveNews() {
  try {
    const res = await fetch('https://wheat-squid-973289.hostingersite.com/wp-json/wp/v2/district_news?_embed&per_page=100', {
      cache: 'no-store'
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch archive news", error);
    return [];
  }
}

export default async function NewsArchive() {
  const newsPosts = await getArchiveNews();

  const enhancedPosts = await Promise.all(newsPosts.map(async (post: any) => {
    const acf = post.acf && !Array.isArray(post.acf) ? post.acf : {};
            
    const rawWpTitle = post.title?.rendered ? post.title.rendered.replace(/<[^>]+>/g, '') : '';
    const title = acf.title || rawWpTitle || 'Untitled';
    
    let imageUrl = 'https://fpsct.org/wp-content/uploads/2026/05/Press-Release-1.png'; // Fallback
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
      imageUrl,
      href,
      target
    };
  }));

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>NEWS & INFORMATION</h1>
        
        <div className={styles.newsGrid}>
          {enhancedPosts.length > 0 ? enhancedPosts.map((post: any) => (
            <Link href={post.href} target={post.target} className={styles.newsCard} key={post.id}>
              <div 
                className={styles.newsImage} 
                style={{ backgroundImage: `url('${post.imageUrl}')` }}
              ></div>
              <h2 className={styles.newsTitle}>{post.title}</h2>
            </Link>
          )) : (
            <p>No older news available at the moment.</p>
          )}
        </div>
      </div>
    </main>
  );
}
