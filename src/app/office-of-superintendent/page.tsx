import React from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import styles from './page.module.css';

async function getStaffData() {
  try {
    const [staffRes, mediaRes] = await Promise.all([
      fetch('https://wheat-squid-973289.hostingersite.com/wp-json/wp/v2/staff?per_page=100', { cache: 'no-store' }),
      fetch('https://wheat-squid-973289.hostingersite.com/wp-json/wp/v2/media?per_page=100', { cache: 'no-store' })
    ]);
    
    if (!staffRes.ok) return [];
    
    const staffData = await staffRes.json();
    const mediaData = mediaRes.ok ? await mediaRes.json() : [];

    // Create a map of media ID to URL for quick lookup
    const mediaMap: Record<number, string> = {};
    mediaData.forEach((media: any) => {
      mediaMap[media.id] = media.source_url;
    });

    return staffData.map((staff: any) => {
      const acf = staff.acf && !Array.isArray(staff.acf) ? staff.acf : {};
      const rawWpTitle = staff.title?.rendered ? staff.title.rendered.replace(/<[^>]+>/g, '') : '';
      
      let photoUrl = '/placeholder-user.png';
      if (acf.photo) {
        if (typeof acf.photo === 'string') photoUrl = acf.photo;
        else if (typeof acf.photo === 'number' && mediaMap[acf.photo]) photoUrl = mediaMap[acf.photo];
        else if (acf.photo.url) photoUrl = acf.photo.url;
      }

      return {
        id: staff.id,
        name: acf.name || rawWpTitle || 'Unnamed Staff',
        department: acf.department || 'Other',
        jobTitle: acf.job_title || '',
        photo: photoUrl,
        email: acf.email || ''
      };
    });
  } catch (error) {
    console.error("Failed to fetch staff", error);
    return [];
  }
}

async function getSchoolsData() {
  try {
    const res = await fetch('https://wheat-squid-973289.hostingersite.com/wp-json/wp/v2/schools?per_page=100', { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.map((school: any) => {
      const acf = school.acf && !Array.isArray(school.acf) ? school.acf : {};
      const rawWpTitle = school.title?.rendered ? school.title.rendered.replace(/<[^>]+>/g, '') : '';
      return {
        id: school.id,
        name: acf.school_name || rawWpTitle || 'Unnamed School'
      };
    }).sort((a: any, b: any) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error("Failed to fetch schools", error);
    return [];
  }
}

export default async function OfficeOfSuperintendentPage() {
  const [allStaff, schools] = await Promise.all([
    getStaffData(),
    getSchoolsData()
  ]);
  
  // Filter for Office of the Superintendent staff, or just show all if none specifically match
  // The user's screenshot just shows "Jess Giannini" and "D'Ante Borawski" at the top.
  // We will display all fetched staff in the top grid for now.
  const staffMembers = allStaff.filter((s: any) => 
    s.department === 'Office of the Superintendent' || !s.department || s.department === 'Other'
  );

  // If filtering resulted in empty array, fallback to all staff so something displays
  const displayStaff = staffMembers.length > 0 ? staffMembers : allStaff;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        
        <div className={styles.desktopSidebar}>
          <Sidebar schools={schools} />
        </div>

        {/* Main Content */}
      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>OFFICE OF THE SUPERINTENDENT</h1>

        <div className={styles.mobileSidebar}>
          <Sidebar schools={schools} />
        </div>

        {/* Staff Grid */}
        <div className={styles.staffGrid}>
          {displayStaff.map((staff: any) => (
            <div key={staff.id} className={styles.staffCard}>
              <div className={styles.photoWrapper}>
                <img 
                  src={staff.photo} 
                  alt={staff.name}
                  className={styles.photo}
                />
              </div>
              <h2 className={styles.staffName}>{staff.name}</h2>
              <div className={styles.staffTitle}>{staff.jobTitle}</div>
              {staff.email && (
                <a href={`mailto:${staff.email}`} className={styles.staffEmail}>
                  {staff.email}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Text Content */}
        <div className={styles.textContent}>
          <p>
            It is a great honor to welcome you to the Farmington Public Schools, a nationally recognized school district committed to academic and personal excellence, deeper learning experiences, social emotional well-being and equity in education.
          </p>
          <p>
            The mission of the Farmington Public Schools is to enable all students to achieve academic and personal excellence, exhibit persistent effort and live as resourceful, inquiring and contributing global citizens. In turn, we are an innovative learning organization that focuses upon continuous improvement in all aspects of our work. This focus on continuous improvement creates an environment of innovation, risk-taking, student voice and agency as well as excellence at all levels of our learning organization. Each day, our students engage in powerful, inspiring and meaningful deeper learning experiences, mastering rigorous grade level standards and learning targets while developing the transferable thinking and learning skills necessary to be successful in college, careers and as citizens of our global community. As outlined in Farmington’s Vision of the Global Citizen (VoGC), our students acquire an understanding of the essential knowledge and skills in the core academic disciplines and develop the transferable thinking and learning skills necessary to meet the challenges of local, national and global citizenship in a rapidly changing world.
          </p>

          <h3>FARMINGTON’S VISION OF THE GLOBAL CITIZEN</h3>
          
          <p><strong>Self Aware Individual:</strong> I know myself and how to care for my own well-being.</p>
          <p>I can assess my own personal strengths and needs, persist in overcoming obstacles to reach my own goals, make wise choices and informed decisions, and adapt to new challenges and opportunities by regulating my emotions and adjusting my behavior to positively impact myself and others.</p>

          <p><strong>Empowered Learner:</strong> I am a knowledgeable, reflective, and resourceful learner.</p>
          <p>I can explore interests, take initiative, ask questions and conduct research. I can use technology and media tools skillfully, and learn from my successes and failures by engaging in feedback and self-assessment protocols.</p>

          <p><strong>Disciplined Thinker:</strong> I can apply strategic thinking to develop ideas and solve problems.</p>
          <p>I am a critical consumer of information recognizing point of view and bias. I can reason with evidence, synthesize and evaluate data, and connect concepts and ideas while thinking creatively and flexibly to design and develop innovative solutions, strategies, and outcomes.</p>

          <p><strong>Engaged Collaborator:</strong> I can work effectively and respectfully with diverse groups of people.</p>
          <p>I can actively listen and seek to understand the ideas of others, self-monitoring for biased thinking. I can create inclusive environments for dialogue that establish and adhere to group norms for effective communication and conflict resolution.</p>

          <p><strong>Civic-Minded Contributor:</strong> I can actively contribute to a better world community.</p>
          <p>I understand complex interdependent systems and their impact on people and the environment. I question prevailing assumptions, develop my cultural competence, and seek solutions through negotiation and compromise in order to contribute to the betterment of my local/global communities through service and civic participation.</p>

          <p>We celebrate and honor the strong relationships that have been established among and between the Board of Education, administration, faculty, students, families and the community at large. As a school district, we are deeply committed to equity, inclusivity and social justice to ensure all members of our school community feel a strong and genuine belonging to our academic community. To learn more about our focus on equity and inclusivity, please visit the Equity and Inclusion section of our website. Our focus on academic excellence, social emotional well-being and equity are further outlined in our Core Beliefs:</p>

          <ul>
            <li>Actions Matter</li>
            <li>Excellence Matters</li>
            <li>Equity Matters</li>
            <li>Mindset Matters</li>
            <li>Teamwork Matters</li>
            <li>Well-Being Matters</li>
          </ul>

          <p>With an outstanding team of administrators and faculty, we work in collaboration and partnership with families to engage in continuous strategic improvement efforts that challenge, support and build connections with our students and one another. Our continuous improvement efforts are driven by our Theory of Action and our instructional model, the Framework for Teaching and Learning, with a particular focus on our Equity Framework. To view our most recent Program and School Development Plans and Annual Global Showcase, please click here. Farmington students engage in learning opportunities that are student-centered, designed to promote all elements of our VoGC and focused upon the empowerment of students to use their voice, leadership and agency to solve complex problems to ultimately make an impact on their local, regional and world communities for a greater good. In all of our collaborative efforts, we want to ensure that students feel safe within our schools and valued for who they are. This can only be achieved by standing together in unity as a school district community when it comes to belonging, academic excellence and care for oneself and others.</p>

          <p>Our new high school facility reflects our core documents and the future of education in Connecticut and beyond. The new facility reflects what was imagined many years ago when we first initiated the design process for a new high school facility:</p>

          <ul>
            <li>Light – open spaces, visibility, connection to the outdoors, and natural light;</li>
            <li>Flexibility – furniture and spaces that are multi-purpose, adaptable, moveable;</li>
            <li>Independence – space that fosters persistence, self-direction, choice and curiosity;</li>
            <li>Collaboration – places where students can interact and spontaneously work together, share ideas and work products</li>
            <li>Reflection – furniture and spaces that offer quiet places for contemplation and introspection;</li>
            <li>Creativity – a technology rich, imagination rich environment to foster a maker mindset;</li>
            <li>Exhibition – public places for work in progress and final products to be displayed and presented for feedback and critique; and.</li>
            <li>Joyous – a school that is safe, warm, welcoming and nurturing of all learners.</li>
          </ul>

          <p>Farmington High School’s facility is a truly inspiring, future-oriented learning environment for all learners to thrive, imagine, belong and succeed as global citizens. We want to express our appreciation to the Farmington community for the support we have received through this exciting and historic building project that will benefit generations of Farmington students.</p>

          <p>The purpose of our website is to keep our students, staff, parents and community informed of the outstanding services, resources and programs that are offered by the Farmington Public Schools. We encourage you to explore this website and learn more about the quality programming and focus on the whole child that is offered in our schools and community.</p>
        </div>
      </main>
    </div>
    </div>
  );
}
