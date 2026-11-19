import { useEffect, useRef } from 'react';
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
    const html = document.documentElement;
    const previousTitle = document.title;
    const previousScroll = html.style.scrollBehavior;

    document.title = `${PROFILE.name} · Software Engineer`;
    html.style.scrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'auto'
      : 'smooth';

    return () => {
      document.title = previousTitle;
      html.style.scrollBehavior = previousScroll;
    };
  }, []);

  return (
    <div className="fm" ref={root}>
      <Navbar />
      <div className="home-sequence">
        <div className="home-opening">
          <Hero />
        </div>
        <Showcase />
      </div>
      <Disciplines />
      <Portfolio />
      <Contact />
      <Footer />
    </div>
  );
}
