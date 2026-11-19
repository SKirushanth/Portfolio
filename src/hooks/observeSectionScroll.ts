/** Update at most once per frame while a section is near the viewport. */
export function observeSectionScroll(section: HTMLElement, update: () => void, ...sizes: HTMLElement[]) {
  let frame = 0;
  function schedule() {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      update();
    });
  }

  const visibility = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) window.addEventListener('scroll', schedule, { passive: true });
    else window.removeEventListener('scroll', schedule);
    schedule();
  }, { rootMargin: '100px 0px' });
  const resize = new ResizeObserver(schedule);
  for (const element of [section, ...sizes]) resize.observe(element);
  visibility.observe(section);
  window.addEventListener('resize', schedule);
  window.addEventListener('pageshow', schedule);
  update();

  return () => {
    visibility.disconnect();
    resize.disconnect();
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
    window.removeEventListener('pageshow', schedule);
    cancelAnimationFrame(frame);
  };
}
