import React from 'react';
import styles from './page.module.css';

async function getSchoolsData() {
  try {
    const res = await fetch('https://wheat-squid-973289.hostingersite.com/wp-json/wp/v2/schools?per_page=100', {
      cache: 'no-store'
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.map((school: any) => {
      const acf = school.acf && !Array.isArray(school.acf) ? school.acf : {};
      const rawWpTitle = school.title?.rendered ? school.title.rendered.replace(/<[^>]+>/g, '') : '';
      return {
        id: school.id,
        name: acf.school_name || rawWpTitle || 'Unnamed School',
        address: acf.adress || '',
        phone: acf.phone || '',
        fax: acf.fax || ''
      };
    });
  } catch (error) {
    console.error("Failed to fetch schools for contact page", error);
    return [];
  }
}

export default async function ContactPage() {
  const wpSchools = await getSchoolsData();

  // Sort schools alphabetically by name
  wpSchools.sort((a: any, b: any) => a.name.localeCompare(b.name));

  const allLocations = [
    {
      id: 'district-office',
      name: 'DISTRICT OFFICE',
      address: '14 Monteith Drive\nFarmington, CT 06032',
      phone: '(860) 673-8270',
      fax: '(860) 675-7134'
    },
    ...wpSchools
  ];

  return (
    <main className={styles.container}>
      <div className={styles.innerContainer}>
        <h1 className={styles.title}>Contact</h1>

        <div className={styles.grid}>
          {allLocations.map((location) => (
            <div key={location.id} className={styles.card}>
              <h2 className={styles.schoolName}>{location.name}</h2>
              
              <div className={styles.infoBlock}>
                <div className={styles.label}>Address:</div>
                <div className={styles.data}>
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address.replace(/\n/g, ' '))}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.mapLink}
                  >
                    {location.address}
                  </a>
                </div>
              </div>

              <div className={styles.infoBlock}>
                <div className={styles.label}>Phone:</div>
                <div className={styles.data}>
                  {location.phone && <div>{location.phone}</div>}
                </div>
              </div>

              {location.fax && (
                <div className={styles.infoBlock}>
                  <div className={styles.label}>Fax:</div>
                  <div className={styles.data}>
                    <div>{location.fax}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
