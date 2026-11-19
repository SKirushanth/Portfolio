import { useEffect } from 'react';
import type { RefObject } from 'react';

export function useReveal(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const elements = el.querySelectorAll<HTMLElement>('.rv, .rv-img');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    elements.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [root]);
}
