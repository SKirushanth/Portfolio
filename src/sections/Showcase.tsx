import { Atom, FileCode2, Hexagon, Leaf, Database, Container, Zap, Waves, Triangle, Coffee, Code2, Activity, Sprout, Flame, Braces, Cloud } from 'lucide-react';
import { Fragment, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LogoLoop, { type LogoItem } from '../components/LogoLoop';
import './showcase.css';

gsap.registerPlugin(ScrollTrigger);

const images = {

  BENTO_CARD_1_BG_IMG: '/hero-center.svg',
  BENTO_CARD_2_BG_IMG: '/hero-2.svg',
  BENTO_CARD_3_BG_IMG: '/servers.svg',
  AVATAR_1: '/nextrole.svg',
  AVATAR_2: '/mineo.svg',
  AVATAR_3: '/lb.svg',
  AVATAR_4: '/prestiege.svg',
};

type ImageSlot = keyof typeof images;

const avatars: ImageSlot[] = ['AVATAR_1', 'AVATAR_2', 'AVATAR_3', 'AVATAR_4'];

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

function Artwork({ slot, className = '' }: { slot: ImageSlot; className?: string }) {
  return (
    <div className={`pi-art ${className}`} data-placeholder={slot} aria-hidden="true">
      {images[slot] && <img src={images[slot]} alt="" />}
    </div>
  );
}

function ChartBadge() {
  return (
    <span className="pi-chart" aria-hidden="true">
      <i /><i /><i />
    </span>
  );
}

// Keep each word together when a character-animated heading wraps.
function SplitText({ text, words = false }: { text: string; words?: boolean }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(' ').map((word, index) => (
          <Fragment key={index}>
            {index > 0 && ' '}
            <span className="pi-word">
              {words ? (
                <span data-piece>{word}</span>
              ) : (
                Array.from(word, (letter, i) => <span data-piece key={i}>{letter}</span>)
              )}
            </span>
          </Fragment>
        ))}
      </span>
    </>
  );
}

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

export default function Showcase() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const media = gsap.matchMedia();

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const select = gsap.utils.selector(root);
      const trigger = (element: Element) => ({
        trigger: element, start: 'top 92%', end: 'top 65%', scrub: true
      });
      gsap.from(select('.pi-about-header [data-piece]'), {
        opacity: 0, y: 6, stagger: .04, ease: 'none',
        scrollTrigger: trigger(select('.pi-about-header h2')[0])
      });
      const cascade = gsap.timeline({scrollTrigger: trigger(select('.pi-bento')[0])});
      select('.pi-photo,.pi-quality,.pi-blue-stat,.pi-dark-stat').forEach(card => {
        cascade.from(card, {opacity: 0, y: 12, duration: 1, ease: 'none'});
      });
    });

    return () => { media.revert(); };
  }, []);

  return (
    <div className="pi" ref={rootRef}>
      <TechnologyMarquee />
      <section className="light pi-showcase" id="about" aria-labelledby="pi-about-heading">
        <header className="pi-about-header">
          <p className="pi-eyebrow">• About me</p>
          <h2 id="pi-about-heading" data-scrub>
            <span><SplitText text="Building scalable fullstack" /></span>{' '}
            <span><SplitText text="systems" /> <span data-piece><ChartBadge /></span> <SplitText text="designed for speed and" /></span>{' '}
            <span><SplitText text="cloud reliability" /></span>
          </h2>
        </header>

        <div className="pi-bento grid">
          <article className="pi-bento-column pi-photo">
            <Artwork slot="BENTO_CARD_1_BG_IMG" className="pi-card-art" />
            <div className="pi-photo-top">
              <strong>FULLSTACK</strong>
              <ChartBadge />
            </div>
            <div className="pi-photo-bottom">
              <strong>4+</strong>
              <p>Production-ready applications engineered for modern web and cloud scale.</p>
            </div>
          </article>

          <article className="pi-bento-column pi-quality">
            <Artwork slot="BENTO_CARD_2_BG_IMG" className="pi-card-art" />
            <div>
              <p className="pi-small">System reliability</p>
              <strong>99.9%</strong>
            </div>
            <div>
              <div className="pi-avatars">
                {avatars.map((slot) => <Artwork slot={slot} key={slot} />)}
              </div>
              <p className="pi-quality-copy">
                “Engineering resilient architectures with clean code, low latency, and human-centric design.”
              </p>
            </div>
          </article>

          <div className="pi-bento-column pi-stat-stack">
            <article className="pi-blue-stat">
              <Artwork slot="BENTO_CARD_3_BG_IMG" className="pi-card-art" />
              <div>
                <p className="pi-small">Specializations</p>
                <strong>MERN &amp; Spring</strong>
              </div>
              <p>Full-stack distributed services with robust REST APIs and reactive interfaces.</p>
            </article>
            <article className="pi-dark-stat">
              <p className="pi-small">Technologies</p>
              <strong>10+ Tools</strong>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
