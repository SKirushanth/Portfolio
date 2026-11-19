import { useLayoutEffect, useRef } from 'react';
import './finale.css';
import { observeSectionScroll } from '../hooks/observeSectionScroll';

const disciplines = [
  {
    title: 'Build',
    statement: 'React and TypeScript interfaces on Spring Boot or Node.js APIs.',
    shape: <><circle cx="64" cy="64" r="48" /><circle cx="64" cy="64" r="32" /></>,
  },
  {
    title: 'Secure and test',
    statement: 'JWT authentication, role based access, and automated tests.',
    shape: <path d="M55 23Q64 7 73 23L116 98Q124 113 107 113H21Q4 113 12 98Z" />,
  },
  {
    title: 'Ship',
    statement: 'Cloud deployments with Docker, Kubernetes, Terraform, and CI/CD.',
    shape: <path d="M34 20Q37 14 44 15L89 20Q96 21 99 27L118 62Q121 68 117 74L92 108Q88 114 81 114L43 111Q36 111 32 105L12 74Q8 68 11 62Z" />,
  },
];

export default function Disciplines() {
  const scene = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = scene.current;
    if (!root) return;
    const stage = root.querySelector<HTMLElement>('.studio-stage')!;
    return observeSectionScroll(root, () => {
      const { top, height } = root.getBoundingClientRect();
      const travel = Math.max(1, height - stage.offsetHeight);
      const progress = Math.max(0, Math.min(1, -top / travel));
      root.style.setProperty('--scene-progress', String(progress));
    }, stage);
  }, []);

  return (
    <section ref={scene} className="studio-finale" id="connect" aria-labelledby="studio-heading">
      <div className="studio-stage">
        <div className="studio-services">
          <h2 id="studio-heading">From the first interface to the final deployment.</h2>
          <div className="studio-cards">
            <span className="studio-thread" aria-hidden="true" />
            <div className="studio-wire" aria-hidden="true">
              <i className="wire-top" />
              <i className="wire-side wire-left" />
              <i className="wire-divider wire-first" />
              <i className="wire-divider wire-second" />
              <i className="wire-side wire-right" />
              <i className="wire-bottom wire-left" />
              <i className="wire-bottom wire-right" />
            </div>
            <ol className="studio-disciplines">
              {disciplines.map(({ title, statement, shape }, index) => (
                <li key={title}>
                  <div className="studio-index">
                    <span aria-hidden="true">[ 0{index + 1} ]</span>{' '}
                    <strong>{title}</strong>
                  </div>
                  <svg viewBox="0 0 128 128" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.3">
                    {shape}
                  </svg>
                  <p>{statement}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
