import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface PillNavItem {
  label: string;
  href: string;
}

export interface PillNavProps {
  items: PillNavItem[];
  activeHref?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
}

const PillNav: React.FC<PillNavProps> = ({
  items,
  activeHref,
  baseColor = "#0a0a0a",
  pillColor = "#e85a2d",
  hoveredPillTextColor = "#ffffff",
  pillTextColor = "#ffffff",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
  const ease = 'power3.out';

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle, index) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement as HTMLElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`
        });

        const label = pill.querySelector<HTMLElement>('.pill-label');
        const white = pill.querySelector<HTMLElement>('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, duration: 0.4, ease }, 0);
        if (label) tl.to(label, { y: -(h + 8), duration: 0.4, ease }, 0);
        if (white) tl.to(white, { y: 0, opacity: 1, duration: 0.4, ease }, 0);

        tlRefs.current[index] = tl;
      });
    };

    layout();
    window.addEventListener('resize', layout);
    return () => window.removeEventListener('resize', layout);
  }, [items]);

  const handleEnter = (i: number, isActive: boolean) => {
  if (isActive) return;
  const tl = tlRefs.current[i];
  if (!tl) return;
  
  // Kill any running tweens to prevent stuttering
  activeTweenRefs.current[i]?.kill(); 
  
  // FIXED: Standard .play() is safer for TS than .tweenTo()
  tl.play(); 
};
  // Inside the handleLeave function:
  const handleLeave = (i: number, isActive: boolean) => {
    if (isActive) return;
    const tl = tlRefs.current[i];
    if (!tl) return;
    
    activeTweenRefs.current[i]?.kill();
    
    // FIXED: Standard .reverse() ensures it returns to scale 0
    tl.reverse(); 
    };

  return (
    <nav 
      className="fixed top-6 w-full px-6 flex justify-end md:justify-center pointer-events-none"
      style={{ zIndex: 100 }}
    >
      {/* Desktop Menu */}
      <div 
        style={{ backgroundColor: `${baseColor}cc` }} 
        className="hidden md:flex items-center backdrop-blur-xl border border-white/10 p-1.5 rounded-full shadow-2xl pointer-events-auto"
      >
        <ul className="flex items-center gap-1 list-none m-0 p-0">
          {items.map((item, i) => {
            const isActive = activeHref === item.href;
            return (
              <li key={item.href} className="relative">
                <a
                  href={item.href}
                  onMouseEnter={() => handleEnter(i, isActive)}
                  onMouseLeave={() => handleLeave(i, isActive)}
                  className="relative overflow-hidden inline-flex items-center justify-center px-6 py-2 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] transition-all"
                  style={{ 
                    backgroundColor: isActive ? pillColor : 'transparent',
                    color: isActive ? hoveredPillTextColor : pillTextColor
                  }}
                >
                  <span 
                    ref={el => { circleRefs.current[i] = el; }}
                    className="absolute left-1/2 bottom-0 rounded-full pointer-events-none"
                    style={{ background: pillColor, zIndex: 1, visibility: isActive ? 'hidden' : 'visible' }}
                    />
                  
                  {/* Label Stack for the sliding effect */}
                  <span 
                    className="relative flex flex-col items-center justify-center overflow-hidden"
                    style={{ zIndex: 2, height: '12px' }} // FIXED: Moved z-index and height to style
                    >
                    <span className="pill-label block text-center w-full leading-none">
                        {item.label}
                    </span>
                    <span 
                        className="pill-label-hover absolute block text-center w-full opacity-0 leading-none"
                        style={{ color: hoveredPillTextColor }}
                    >
                        {item.label}
                    </span>
                   </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Mobile Menu (Framer Motion) */}
      <div className="md:hidden pointer-events-auto">
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{ backgroundColor: baseColor }}
          className="border border-white/10 p-4 rounded-full text-white shadow-xl flex items-center justify-center active:scale-90 transition-all"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm -z-10 h-screen w-screen"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                style={{ backgroundColor: baseColor }}
                className="absolute top-20 right-0 w-64 border border-white/10 rounded-[2.5rem] p-6 shadow-2xl"
              >
                <div className="flex flex-col gap-3">
                  {items.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="px-6 py-4 rounded-3xl text-xs uppercase tracking-[0.2em] font-black transition-all text-center"
                      style={{ 
                        backgroundColor: activeHref === item.href ? pillColor : 'transparent',
                        color: pillTextColor 
                      }}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default PillNav;