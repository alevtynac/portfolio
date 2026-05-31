/* =====================================================================
   Reveal.jsx — subtle scroll reveal + parallax helpers
   No animation library: a small IntersectionObserver fade/slide and a
   lightweight scroll-parallax hook. Keeps motion gentle and cheap.
   ===================================================================== */
const { useRef, useEffect, useState } = React;

/* Fades + slides children in once they enter the viewport. */
function Reveal({ children, delay = 0, as = "div", className = "", ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If the element is already in (or near) the viewport on mount, show it
    // right away — avoids a blank first paint if the observer fires late.
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight || 0;
    if (rect.top < vh * 0.92) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);

    // Safety net: never let content stay invisible if the observer misfires.
    const safety = setTimeout(() => setShown(true), 2500);
    return () => { io.disconnect(); clearTimeout(safety); };
  }, []);

  const Tag = as;
  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${shown ? "reveal-in" : ""} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* Returns a translateY value that drifts slightly as the element scrolls
   through the viewport. strength in px (small numbers = subtle). */
function useParallax(strength = 40) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = null;
    const update = () => {
      raf = null;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // progress: -1 (below) -> 0 (centered) -> 1 (above)
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
      setOffset(progress * strength);
    };
    const onScroll = () => {
      if (raf == null) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);

  return [ref, offset];
}

window.Reveal = Reveal;
window.useParallax = useParallax;
