import { gsap } from 'gsap';
import { useState, useRef, useLayoutEffect } from 'react';
import type { FormEvent } from 'react';
import { PROFILE } from '../data/content';
import type { CSSVars } from '../types';

type Status = 'idle' | 'sending' | 'success' | 'error';
const d = (n: number): CSSVars => ({ '--d': n });

const Icon = {
  mail: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-10 6L2 7" /></svg>,
  phone: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>,
  github: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>,
  linkedin: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>,
  instagram: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>,
};

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const section = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const host = section.current!;
      gsap.fromTo(host.querySelector('.cform'), { y: 42 }, {
        y: 0, ease: 'none',
        scrollTrigger: { trigger: host, start: 'top bottom', end: 'top 30%', scrub: true }
      });
      gsap.fromTo(host.querySelector('.contact-flow'), { xPercent: -24 }, {
        xPercent: 24,
        ease: 'none',
        scrollTrigger: { trigger: host, start: 'top bottom', end: 'top 25%', scrub: true },
      });
    });
    return () => media.revert();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    const body = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else setStatus('error');
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
    }
  };

  return (
    <section ref={section} className="contact" id="contact">
      <div className="contact-flow" aria-hidden="true" />
      <div className="contact-in">
        <div className="contact-info">
          <div className="label rv">Get in touch</div>
          <h2 className="rv" style={d(1)}>Let's start a <em>project</em></h2>
          <p className="rv" style={d(2)}>I'm available for freelance and full-time opportunities. Drop a message!</p>
          <a className="row rv" style={d(3)} href={`mailto:${PROFILE.email}`}><span className="ic">{Icon.mail}</span>{PROFILE.email}</a>
          <div className="row rv" style={d(4)}><span className="ic">{Icon.phone}</span>{PROFILE.phone}</div>
          <div className="socials rv" style={d(5)}>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">{Icon.linkedin}</a>
            <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub">{Icon.github}</a>
            <a href={PROFILE.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">{Icon.instagram}</a>
          </div>
        </div>

        <form className="cform" onSubmit={handleSubmit}>
          <div className="two">
            <label>Name<input name="name" type="text" required placeholder="Your Name" /></label>
            <label>Email<input name="email" type="email" required placeholder="Email" /></label>
          </div>
          <label>Message<textarea name="message" rows={4} required placeholder="Tell me about your project..." /></label>
          <button type="submit" className="pill white send" disabled={status === 'sending'}>
            {status === 'sending' ? 'SENDING...' : <>SEND MESSAGE <span className="arr">→</span></>}
          </button>
          <p className={`status ${status}`} role="status">
            {status === 'success' && 'Message sent successfully!'}
            {status === 'error' && 'Something went wrong. Please try again or email me directly.'}
          </p>
        </form>
      </div>
    </section>
  );
}
