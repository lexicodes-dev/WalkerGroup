import Image from "next/image";
import Link from "next/link";
import styles from "./news.module.css";
import { notFound } from "next/navigation";

async function getNewsPost(slug: string) {
  try {
    const res = await fetch(`https://wheat-squid-973289.hostingersite.com/wp-json/wp/v2/district_news?slug=${slug}&_embed`, {
      cache: 'no-store'
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data && data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Failed to fetch news post", error);
    return null;
  }
}

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

async function getAllNews() {
  try {
    const res = await fetch('https://wheat-squid-973289.hostingersite.com/wp-json/wp/v2/district_news?per_page=100', {
      cache: 'no-store'
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    return [];
  }
}

export default async function NewsPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await getNewsPost(resolvedParams.slug);
  const allNews = await getAllNews();
  
  let prevPost = null;
  let nextPost = null;
  
  if (allNews && allNews.length > 0) {
    const currentIndex = allNews.findIndex((n: any) => n.slug === resolvedParams.slug);
    if (currentIndex !== -1) {
      // In WordPress, newer posts are first (index 0). 
      // "Previous" chronologically means older post (index + 1)
      // "Next" chronologically means newer post (index - 1)
      if (currentIndex < allNews.length - 1) prevPost = allNews[currentIndex + 1];
      if (currentIndex > 0) nextPost = allNews[currentIndex - 1];
    }
  }
  
  if (!post) {
    notFound();
  }

  const acf = post.acf && !Array.isArray(post.acf) ? post.acf : {};
  
  const rawWpTitle = post.title?.rendered ? post.title.rendered.replace(/<[^>]+>/g, '') : '';
  const title = acf.title || rawWpTitle || 'Untitled News Post';
  
  const content = acf.content || post.content?.rendered || '';
  const nativeContent = post.content?.rendered?.replace(/<[^>]+>/g, '').trim() || '';
  const hasContent = (!!acf.content && acf.content.trim().length > 0) || nativeContent.length > 0;  
  let imageUrl = '';
  if (typeof acf.image === 'number') {
    imageUrl = await getMediaUrl(acf.image);
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

  const attatchLink = acf.attatch_link || '';
  const externalLink = pdfUrl || attatchLink;

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.backNav}>
          <Link href="/news">&larr; Back to News</Link>
        </div>
        
        <article className={styles.article}>
          <div className={styles.articleGrid}>
            <div className={styles.textContent}>
              <h1 className={styles.title}>{title}</h1>
              
              <div className={styles.contentArea}>
                {hasContent && (
                  <div 
                    className={styles.contentBody}
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                )}
                
                {pdfUrl && !hasContent && (
                  <p className={styles.downloadLink}>
                    Click <a href={pdfUrl} target="_blank" rel="noopener noreferrer">here</a> to read the article.
                  </p>
                )}
                
                {attatchLink && !hasContent && !pdfUrl && (
                  <p className={styles.downloadLink}>
                    Click <a href={attatchLink} target="_blank" rel="noopener noreferrer">here</a> to read the article.
                  </p>
                )}
              </div>
            </div>

            {imageUrl && (
              <div className={styles.imageContainer}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageUrl} alt={title} className={styles.featuredImage} />
              </div>
            )}
          </div>
        </article>

        <div className={styles.paginationSection}>
          <hr className={styles.redLine} />
          <div className={styles.paginationLinks}>
            {prevPost ? (
              <Link href={`/news/${prevPost.slug}`} className={styles.pageLink}>
                PREVIOUS
              </Link>
            ) : (
              <span className={styles.pageLinkDisabled}>PREVIOUS</span>
            )}
            
            {nextPost ? (
              <Link href={`/news/${nextPost.slug}`} className={styles.pageLink}>
                NEXT
              </Link>
            ) : (
              <span className={styles.pageLinkDisabled}>NEXT</span>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
