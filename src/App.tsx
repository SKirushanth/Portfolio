import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import './momentum.css';
import { useReveal } from './hooks/useReveal';
import { useScrollEngine } from './hooks/useScrollEngine';
import Hero from './sections/Hero';
import Navbar from './components/Navbar';
import Showcase from './sections/Showcase';
import { PROFILE } from './data/content';
import Portfolio from './sections/Portfolio';
import Contact from './sections/Contact';
import Disciplines from './sections/Disciplines';
import Footer from './sections/Footer';

export default function App() {
  const root = useRef<HTMLDivElement>(null);

  useReveal(root);
  useScrollEngine(root);

  useEffect(() => {
    const previousTitle = document.title;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const app = root.current;
    let scroll: Lenis | undefined;
    const syncScroll = () => {
      scroll?.destroy();
      scroll = motion.matches || app?.inert ? undefined : new Lenis({
        autoRaf: true,
        lerp: 0.12,
        allowNestedScroll: true,
      });
    };
    syncScroll();
    motion.addEventListener('change', syncScroll);
    const dialogObserver = new MutationObserver(syncScroll);
    if (app) dialogObserver.observe(app, { attributes: true, attributeFilter: ['inert'] });

    document.title = `${PROFILE.name} · Software Engineer`;

    return () => {
      document.title = previousTitle;
      dialogObserver.disconnect();
      motion.removeEventListener('change', syncScroll);
      scroll?.destroy();
    };
  }, []);

  return (
    <div className="fm" ref={root}>
      <Navbar />
      <div className="home-sequence">
        <div className="home-opening">
          <Hero />
        </div>
      </div>
      <Showcase><Disciplines /></Showcase>
      <Portfolio />
      <Contact />
      <Footer />
    </div>
  );
}
