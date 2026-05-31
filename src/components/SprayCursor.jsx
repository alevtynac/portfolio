/* =====================================================================
   SprayCursor.jsx — soft blurred neon brush trail following the mouse.
   Desktop only; disabled on touch / coarse-pointer devices.
   ===================================================================== */

function SprayCursor() {
  const canvasRef = React.useRef(null);
  const lastPointRef = React.useRef(null);
  const rafRef = React.useRef(null);

  React.useEffect(() => {
    const mobileQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    if (mobileQuery.matches) return undefined;

    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawBrush = (x, y) => {
      const radius = 24 + Math.random() * 8;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);

      gradient.addColorStop(0, "rgba(200, 255, 46, 0.3)");
      gradient.addColorStop(0.4, "rgba(200, 255, 46, 0.16)");
      gradient.addColorStop(0.75, "rgba(200, 255, 46, 0.05)");
      gradient.addColorStop(1, "rgba(200, 255, 46, 0)");

      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.shadowBlur = 44;
      ctx.shadowColor = "rgba(200, 255, 46, 0.85)";
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const stampAlongPath = (x, y) => {
      const last = lastPointRef.current;

      if (!last) {
        drawBrush(x, y);
      } else {
        const dx = x - last.x;
        const dy = y - last.y;
        const distance = Math.hypot(dx, dy);
        const steps = Math.max(1, Math.ceil(distance / 5));

        for (let i = 1; i <= steps; i++) {
          const t = i / steps;
          drawBrush(last.x + dx * t, last.y + dy * t);
        }
      }

      lastPointRef.current = { x, y };
    };

    const fadeTrail = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.07)";
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      rafRef.current = requestAnimationFrame(fadeTrail);
    };

    const onMove = (event) => {
      stampAlongPath(event.clientX, event.clientY);
    };

    const onLeave = () => {
      lastPointRef.current = null;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    rafRef.current = requestAnimationFrame(fadeTrail);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastPointRef.current = null;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="spray-cursor"
      aria-hidden="true"
    />
  );
}

window.SprayCursor = SprayCursor;
