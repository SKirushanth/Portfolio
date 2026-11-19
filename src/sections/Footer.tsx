import { Github, Linkedin } from 'lucide-react';
import { useLayoutEffect, useRef } from 'react';
import { PROFILE } from '../data/content';
import { observeSectionScroll } from '../hooks/observeSectionScroll';
import './footer.css';

export default function Footer() {
  const reveal = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrapper = reveal.current;
    if (!wrapper) return;

    const update = () => {
      const { top, height } = wrapper.getBoundingClientRect();
      const range = Math.min(window.innerHeight / 2, height);
      const progress = Math.min(1, Math.max(0, (window.innerHeight - top) / Math.max(1, range)));
      wrapper.style.setProperty('--footer-offset', `${Math.min(140, range / 2) * (1 - progress)}px`);
    };
    return observeSectionScroll(wrapper, update);
  }, []);

  return (
    <div className="footer-reveal" ref={reveal}>
      <footer className="foot">
        <div className="foot-top">
          <div>
            <a className="logo" href="#top"><i aria-hidden="true" />{PROFILE.name}</a>
            <p className="tag">Engineering high-performance digital solutions with a focus on clean code and intuitive user experiences.</p>
            <div className="foot-socials">
              <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <Github size={20} aria-hidden="true" />
              </a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Linkedin size={20} aria-hidden="true" />
              </a>
            </div>
          </div>
          <nav aria-label="Footer">
            <h3>Navigate</h3>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#work">Projects</a></li>
            </ul>
          </nav>
          <div>
            <h3>Contact</h3>
            <ul>
              <li><a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></li>
              <li><a href={`tel:${PROFILE.phone.replace(/\s/g, '')}`}>{PROFILE.phone}</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bot">
          <span>&copy; {new Date().getFullYear()} {PROFILE.name}</span>
          <span>{PROFILE.location}</span>
        </div>
        <div className="foot-signature" aria-hidden="true">{PROFILE.name}</div>
      </footer>
    </div>
  );
}
