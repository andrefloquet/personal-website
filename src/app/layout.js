import { Inter } from "next/font/google";

import Header from '@/components/header';
import Footer from '@/components/footer';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://andrefloquet.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Andre Floquet | Software Engineer",
    template: "%s | Andre Floquet",
  },
  description:
    "Senior Software Engineer with 18+ years of experience building production-ready backend, frontend, cloud, mobile, and AI systems.",
  applicationName: "Andre Floquet Website",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Andre Floquet | Software Engineer",
    description:
      "Portfolio of Andre Floquet, a Software Engineer focused on scalable products across web, cloud, mobile, and AI.",
    siteName: "Andre Floquet",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 1200,
        alt: "Andre Floquet logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Andre Floquet | Software Engineer",
    description:
      "Explore Andre Floquet's software engineering portfolio, experience, skills, and certifications.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/logo.png" }],
    apple: [{ url: "/logo.png" }],
    shortcut: [{ url: "/logo.png" }],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Andre Floquet",
  url: siteUrl,
  description:
    "Senior Software Engineer portfolio showcasing experience, technical skills, and certifications.",
  inLanguage: "en",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Andre Floquet",
  url: siteUrl,
  image: `${siteUrl}/logo.png`,
  jobTitle: "Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Andre Floquet",
  },
  knowsAbout: [
    "Software Engineering",
    "Backend Development",
    "Frontend Development",
    "Cloud",
    "AI Integrations",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-slate-50 text-slate-900 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
