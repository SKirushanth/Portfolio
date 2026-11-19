import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { MouseEvent, RefObject } from 'react';
import { createPortal } from 'react-dom';
import { PROFILE } from '../data/content';
import { projects } from '../data/projects';
import { observeSectionScroll } from '../hooks/observeSectionScroll';
import type { Project } from '../types';
import './portfolio.css';

const pad = (n: number) => String(n).padStart(2, '0');
const cardSpring = { type: 'spring', stiffness: 320, damping: 32, mass: 0.9 } as const;

function ProjectDialog({ project, trigger, onClose }: { project: Project; trigger: RefObject<HTMLButtonElement | null>; onClose: () => void }) {
  const card = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    const body = document.body;
    const previousOverflow = body.style.overflow;
    const opener = trigger.current;
    const app = opener?.closest<HTMLElement>('.fm');
    const previousInert = app?.inert ?? false;
    body.style.overflow = 'hidden';
    if (app) app.inert = true;
    closeButton.current?.focus({ preventScroll: true });

    function onOutsideClick(event: PointerEvent) {
      if (event.button === 0 && event.target instanceof Node && !card.current?.contains(event.target)) onClose();
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
      if (event.key !== 'Tab') return;
      const controls = card.current?.querySelectorAll<HTMLElement>('button, a[href]');
      if (!controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey ? document.activeElement === first : document.activeElement === last) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      }
    }

    document.addEventListener('pointerdown', onOutsideClick);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onOutsideClick);
      document.removeEventListener('keydown', onKeyDown);
      body.style.overflow = previousOverflow;
      if (app) app.inert = previousInert;
      opener?.focus({ preventScroll: true });
    };
  }, [onClose, trigger]);

  const demo = project.link !== '#' ? project.link : undefined;

  return (
    <>
      <motion.div className="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm" aria-hidden="true"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.2 }} />
      <motion.div layoutRoot className="fixed inset-0 z-50 grid place-items-center p-4 pointer-events-none">
        <motion.div ref={card} role="dialog" aria-modal="true" aria-labelledby="gallery-detail-title"
          layoutId={reduceMotion ? undefined : `card-container-${project.id}`} transition={cardSpring}
          className="pointer-events-auto relative w-full max-w-xl overflow-hidden rounded-3xl bg-[#0A0A0A] border border-white/15 shadow-[0_32px_90px_rgba(0,0,0,0.9)] text-white"
          style={{ borderRadius: 24 }}>
          <button ref={closeButton} type="button" onClick={onClose} aria-label="Close project details"
            className="absolute top-6 right-6 z-10 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center">
            <X size={16} aria-hidden="true" />
          </button>
          <h3 id="gallery-detail-title" className="sr-only">{project.title}</h3>
          <motion.div layoutScroll className="gallery-detail-scroll" tabIndex={0} role="region" aria-labelledby="gallery-detail-title">
            <motion.img src={project.image} alt="" width={1200} height={750}
              layoutId={reduceMotion ? undefined : `card-art-${project.id}`} transition={cardSpring}
              className="block h-auto w-full" />
            <motion.div className="grid gap-3 border-t border-white/15 p-5 text-sm text-white/80 sm:p-6"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
              transition={{ duration: reduceMotion ? 0 : 0.22, delay: reduceMotion ? 0 : 0.12 }}>
              <p>{project.description}</p>
              <ul aria-label="Key features" className="list-disc space-y-1 pl-5">
                {project.features.map(feature => <li key={feature}>{feature}</li>)}
              </ul>
              <ul aria-label="Tech stack" className="flex flex-wrap gap-2">
                {project.tags.map(tag => <li key={tag} className="rounded-full bg-white/10 px-3 py-1">{tag}</li>)}
              </ul>
              <div className="flex flex-wrap gap-4 font-medium text-white underline underline-offset-4">
                {demo && <a href={demo} target="_blank" rel="noreferrer">Live Demo</a>}
                <a href={project.github || PROFILE.github} target="_blank" rel="noreferrer">
                  {project.github ? 'GitHub' : 'GitHub profile'}
                </a>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}

export default function Portfolio() {
  const section = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState(0);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const reduceMotion = useReducedMotion();
  const closeProject = useCallback(() => setActiveProject(null), []);

  useEffect(() => {
    const host = section.current!;
    const frame = host.querySelector<HTMLElement>('.gallery-frame')!;
    const cards = Array.from(frame.querySelectorAll<HTMLElement>('.gallery-plane'));
    const exit = frame.querySelector<HTMLElement>('.gallery-exit')!;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let previousIndex = -1;

    function paint() {
      const view = frame.clientHeight;
      const last = cards.length - 1;
      const travel = Math.max(1, host.offsetHeight - view);
      const scrolled = -host.getBoundingClientRect().top;
      const position = Math.min(1, Math.max(0, scrolled / travel)) * last;
      const exitDistance = Math.max(1, view * 0.35);
      const exitProgress = Math.min(1, Math.max(0, 1 - (travel - scrolled) / exitDistance));
      const height = cards[0].offsetHeight;
      const spacing = Math.min(view * .68, height + view * .15);
      exit.style.opacity = String(reduced.matches ? 1 : exitProgress);

      cards.forEach((card, index) => {
        const distance = (index - position) * spacing;
        const diff = Math.abs(index - position);
        const depth = reduced.matches ? 0 : Math.min(1, diff);
        
        // Smooth depth transitions for scale and opacity
        const cardOpacity = reduced.matches ? 1 : Math.max(0, 1 - Math.pow(diff / 1.45, 1.8));
        const cardScale = reduced.matches ? 1 : Math.max(0.86, 1 - diff * 0.08);

        card.style.transform = `translate(-50%, -50%) translateY(${distance}px) perspective(2200px) translateZ(${-45 * depth}px) rotateX(${20 * depth}deg) scale(${cardScale})`;
        card.style.opacity = cardOpacity.toFixed(3);
      });

      const clampedIndex = Math.round(position);
      if (clampedIndex === previousIndex) return;
      previousIndex = clampedIndex;
      setActive(clampedIndex);
      host.style.setProperty('--ambient', projects[clampedIndex].glow);
    }

    const entrance = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { host.classList.add('entered'); entrance.disconnect(); }
    }, { threshold: .15 });
    entrance.observe(frame);

    const stopScroll = observeSectionScroll(host, paint, frame, cards[0]);
    reduced.addEventListener('change', paint);

    return () => {
      stopScroll();
      entrance.disconnect();
      reduced.removeEventListener('change', paint);
    };
  }, []);

  const currentProject = projects[active];

  function openProject(event: MouseEvent<HTMLButtonElement>) {
    trigger.current = event.currentTarget;
    setActiveProject(currentProject);
  }

  return (
    <LayoutGroup>
      <section id="work" className="project-gallery" ref={section} style={{ height: `${projects.length * 100}svh` }} aria-labelledby="gallery-heading">
        <div className="gallery-frame">
          <div className="gallery-aura" aria-hidden="true" />
          <div className="gallery-exit" aria-hidden="true" />
          <div className="gallery-header">
            <h2 id="gallery-heading" className="gallery-title" aria-label="Portfolio">
              {'PORTFOLIO'.split('').map((char, i) => (
                <span
                  key={i}
                  className="gallery-char"
                  style={{ '--i': i } as React.CSSProperties}
                >
                  {char}
                </span>
              ))}
            </h2>
          </div>
          <div className="gallery-rail">
            {projects.map(item => (
              <article className="gallery-item" key={item.id}>
                <div className="gallery-plane">
                  <motion.div className="gallery-card" style={{ borderRadius: 20 }}
                    layoutId={reduceMotion ? undefined : `card-container-${item.id}`} transition={cardSpring}>
                    <motion.img src={item.image} alt="" width={1200} height={750}
                      className="gallery-card-artwork"
                      layoutId={reduceMotion ? undefined : `card-art-${item.id}`} transition={cardSpring} />
                    {item.id === currentProject.id && (
                      <button type="button" className="gallery-card-trigger" aria-haspopup="dialog"
                        aria-label={`View ${item.title} project`} onClick={openProject} />
                    )}
                  </motion.div>
                </div>
              </article>
            ))}
          </div>
          <div className="gallery-count" aria-live="polite">{pad(active + 1)} / {pad(projects.length)}</div>
          <button type="button" className="gallery-open" aria-haspopup="dialog" onClick={openProject}>View project</button>
        </div>
      </section>
      {createPortal(
        <AnimatePresence>
          {activeProject && <ProjectDialog key={activeProject.id} project={activeProject} trigger={trigger} onClose={closeProject} />}
        </AnimatePresence>,
        document.body,
      )}
    </LayoutGroup>
  );
}
