
import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Footer from './components/Footer';
import PillNav from './components/PillNav';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import Services from './sections/Services';
import Contact from './sections/Contact';

function App() {
  const [activeSection, setActiveSection] = useState('#home');

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      touchMultiplier: 1.1,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const handleAnchorClick = (event: Event) => {
      const target = event.currentTarget as HTMLAnchorElement | null;
      const href = target?.getAttribute('href');
      if (href && href.startsWith('#')) {
        event.preventDefault();
        lenis.scrollTo(href);
      }
    };

    const anchorLinks = Array.from(document.querySelectorAll('a[href^="#"]'));
    anchorLinks.forEach((link) => link.addEventListener('click', handleAnchorClick));

    return () => {
      anchorLinks.forEach((link) => link.removeEventListener('click', handleAnchorClick));
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(`#${sectionId}`);
            break;
          }
        }
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener);
    handleScroll(); // Call once on mount
    return () => window.removeEventListener('scroll', scrollListener);
  }, []);

  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <PillNav
        items={[
          { label: 'Home', href: '#home' },
          { label: 'About', href: '#about' },
          { label: 'Projects', href: '#projects' },
          { label: 'Contact', href: '#contact' }
        ]}
        activeHref={activeSection}
        baseColor="#0a0a0a"
        pillColor="#e85a2d"
        pillTextColor="#ffffff"
        hoveredPillTextColor="#0a0a0a"
      />
      <div className="max-w-350 mx-auto">
        <Hero />
        <Services />
        <Projects />
        <Contact />
        <Footer />
        
      </div>
    </main>
  );
}

export default App;