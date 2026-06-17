import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Farmington Public Schools - Empowering Global Citizens",
  description: "Official website of Farmington Public Schools.",
};

async function getSchools() {
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
        slug: school.slug,
        name: acf.school_name || rawWpTitle || 'Unnamed School'
      };
    });
  } catch (error) {
    console.error("Failed to fetch schools", error);
    return [];
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schools = await getSchools();

  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        <Navbar schools={schools} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
