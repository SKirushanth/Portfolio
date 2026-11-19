import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PROFILE } from '../data/content';

export default function Navbar() {
  const [compact, setCompact] = useState(false);
  const [overFinale, setOverFinale] = useState(false);
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);

  useEffect(() => {
    const finale = document.getElementById('connect');
    const update = () => {
      setCompact(window.scrollY > 80);
      if (finale) {
        const { top, bottom } = finale.getBoundingClientRect();
        setOverFinale(top <= 44 && bottom > 44);
      }
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (!nav.current?.contains(event.target as Node)) setOpen(false);
    };
    const desktop = window.matchMedia('(min-width: 861px)');
    const close = () => setOpen(false);
    document.addEventListener('pointerdown', closeOutside);
    desktop.addEventListener('change', close);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      desktop.removeEventListener('change', close);
    };
  }, [open]);

  return (
    <nav ref={nav} className="nav" data-compact={compact} data-finale={overFinale} aria-label="Main navigation"
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={event => {
        if (open && event.key === 'Escape') {
          toggle.current?.focus();
          setOpen(false);
        }
      }}>
      <a className="logo" href="#top" onClick={() => setOpen(false)}><i />{PROFILE.name}</a>
      <button className="nav-toggle" ref={toggle} type="button" aria-controls="nav-links"
        aria-expanded={open} aria-label={open ? 'Close navigation' : 'Open navigation'}
        onClick={() => setOpen(value => !value)}>
        {open ? <X /> : <Menu />}
      </button>
      <div id="nav-links" className="nav-links" data-open={open} onClick={() => setOpen(false)}>
        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#work">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a className="pill white" href={PROFILE.cv} download>Download CV</a>
      </div>
    </nav>
  );
}
