import { cookies } from "next/headers";
import SplashScreen from "@/components/SplashScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Cursor from "@/components/Cursor";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import AboutMe from "@/components/AboutMe";
import Footer from "@/components/Footer";

export default async function Home() {
  const cookieStore = await cookies();
  const hasSeenIntro = cookieStore.get("introSeen");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Tomás Merlonetti",
            "url": "https://tomimrl.vercel.app",
            "image": "https://tomimrl.vercel.app/red-b.png",
            "jobTitle": "Software Engineer",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Rosario",
              "addressRegion": "Santa Fe",
              "addressCountry": "Argentina"
            },
            "sameAs": [
              "https://github.com/tomimrl",
              "https://www.linkedin.com/in/tomasmerlonetti"
            ]
          })
        }}
      />
      {!hasSeenIntro && <SplashScreen />}
      <Cursor />
      <Navbar />
      <Hero />
      <AboutMe />
      <Skills />
      <Projects />
      <Footer />
    </>
  );
}