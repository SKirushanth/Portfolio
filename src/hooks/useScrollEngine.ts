import { useEffect } from 'react';
import type { RefObject } from 'react';
import { observeSectionScroll } from './observeSectionScroll';

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const DARK = { bg: [5, 5, 8], fg: [255, 255, 255] };
const ACCENT = { bg: [9, 11, 20], fg: [255, 255, 255] };
const mix = (a: number[], b: number[], t: number) => a.map((v, i) => Math.round(lerp(v, b[i], t)));

export function useScrollEngine(root: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const light = el.querySelector<HTMLElement>('.light');
    if (!light) return;
    let previous = -1;

    const update = () => {
      const vh = window.innerHeight;

      // Smooth flowing background transition through about/showcase section
      const lr = light.getBoundingClientRect();
      const tin = clamp((vh * 0.92 - lr.top) / (vh * 0.55));
      const tout = clamp((vh * 0.9 - lr.bottom) / (vh * 0.55));
      const t = tin * (1 - tout);
      if (t === previous) return;
      previous = t;
      el.style.setProperty('--bg', `rgb(${mix(DARK.bg, ACCENT.bg, t)})`);
      el.style.setProperty('--fg', `rgb(${DARK.fg})`);
      el.style.setProperty('--muted', `rgba(255,255,255,${lerp(0.55, 0.65, t)})`);
      el.style.setProperty('--line', `rgba(255,255,255,${lerp(0.12, 0.16, t)})`);
    };

    return observeSectionScroll(light, update);
  }, [root]);
}
