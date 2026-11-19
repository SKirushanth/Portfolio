import { Atom, FileCode2, Hexagon, Leaf, Database, Container, Zap, Waves, Triangle, Coffee, Code2, Activity, Sprout, Flame, Braces, Cloud } from 'lucide-react';
import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { observeSectionScroll } from '../hooks/observeSectionScroll';
import LogoLoop, { type LogoItem } from '../components/LogoLoop';
import './showcase.css';

const techLogos: LogoItem[] = [
  { title: 'React', Icon: Atom, color: '#087e9b' },
  { title: 'TypeScript', Icon: FileCode2, color: '#3178c6' },
  { title: 'Node.js', Icon: Hexagon, color: '#417e38' },
  { title: 'Spring Boot', Icon: Leaf, color: '#44822a' },
  { title: 'PostgreSQL', Icon: Database, color: '#336791' },
  { title: 'Docker', Icon: Container, color: '#176ab3' },
  { title: 'FastAPI', Icon: Zap, color: '#007f73' },
  { title: 'Tailwind CSS', Icon: Waves, color: '#087d9c' },
  { title: 'Next.js', Icon: Triangle, color: '#191919' },
  { title: 'Java', Icon: Coffee, color: '#ae4620' },
  { title: 'Python', Icon: Code2, color: '#326d98' },
  { title: 'GSAP', Icon: Activity, color: '#327c25' },
  { title: 'MongoDB', Icon: Sprout, color: '#16784b' },
  { title: 'Firebase', Icon: Flame, color: '#aa4b08' },
  { title: 'REST APIs', Icon: Braces, color: '#7140a0' },
  { title: 'Cloud CI/CD', Icon: Cloud, color: '#3959a8' },
].map(({ title, Icon, color }) => ({
  title,
  node: <span className="pi-tech-mark" style={{ color }}><Icon size={21} aria-hidden="true" /></span>,
  hoverColor: color,
}));

function TechnologyMarquee() {
  return (
    <div className="pi-marquee">
      <LogoLoop
        logos={techLogos}
        speed={42}
        direction="left"
        logoHeight={32}
        gap={26}
        labels="inline"
        pauseOnHover={true}
        scaleOnHover={true}
        draggable={true}
        fadeOut={true}
        fadeOutWidth={0.12}
        ariaLabel="Technical competencies"
      />
    </div>
  );
}

export default function Showcase({ children }: { children: ReactNode }) {
  const sequence = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const track = sequence.current;
    const about = panel.current;
    if (!track || !about) return;
    const motion = matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)');
    let stop: (() => void) | undefined;
    const configure = () => {
      stop?.();
      if (!motion.matches) {
        about.style.removeProperty('--remaining');
        about.style.removeProperty('--pin-top');
        return;
      }
      stop = observeSectionScroll(track, () => {
        const pinTop = Math.min(0, window.innerHeight - about.offsetHeight);
        const runway = parseFloat(getComputedStyle(track).getPropertyValue('--runway'));
        const progress = Math.min(1, Math.max(0, (pinTop - track.getBoundingClientRect().top) / runway));
        about.style.setProperty('--pin-top', pinTop + 'px');
        about.style.setProperty('--remaining', String((1 - progress) ** 3));
      }, about);
    };
    configure();
    motion.addEventListener('change', configure);
    return () => {
      stop?.();
      motion.removeEventListener('change', configure);
    };
  }, []);

  return (
    <>
      <div className="pi"><TechnologyMarquee /></div>
      <div className="about-sequence" ref={sequence} id="about">
        <section className="pi light pi-showcase" ref={panel} aria-labelledby="pi-about-heading">
          <header className="pi-about-header">
            <p className="pi-eyebrow">&bull; About me</p>
            <h2 id="pi-about-heading">Building scalable fullstack systems designed for <span>speed and cloud reliability</span></h2>
          </header>
          <div className="pi-bento">
            <article className="pi-photo">
              <div className="pi-image"><img src="/hero-center.svg" alt="" /></div>
              <span className="pi-label">Fullstack</span>
              <div><strong>4+</strong><p>Production-ready applications engineered for modern web and cloud scale.</p></div>
            </article>
            <article className="pi-quality">
              <div className="pi-image"><img src="/hero-2.svg" alt="" /></div>
              <div><span className="pi-label">System reliability</span><strong>99.9%</strong></div>
              <div>
                <p>&ldquo;Engineering resilient architectures with clean code, low latency, and human-centric design.&rdquo;</p>
              </div>
            </article>
            <div className="pi-stat-stack">
              <article className="pi-stat">
                <span className="pi-label">Specializations</span><strong>MERN &amp; Spring</strong>
                <p>Full-stack distributed services with robust REST APIs and reactive interfaces.</p>
                <ul><li>MERN</li><li>Spring Boot</li></ul>
              </article>
              <article className="pi-stat">
                <span className="pi-label">Technologies</span><strong>10+ Tools</strong>
                <ul><li>Docker</li><li>PostgreSQL</li><li>TypeScript</li></ul>
              </article>
            </div>
          </div>
        </section>
        <div className="about-next-sheet">{children}</div>
      </div>
    </>
  );
}
