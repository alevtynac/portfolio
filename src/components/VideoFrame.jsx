/* =====================================================================
   VideoFrame.jsx — reusable, minimal video / media frame
   Supports: local video, poster, autoplay, muted, loop, controls,
   fallback placeholder (only when no src), responsive aspect-ratio box.
   ===================================================================== */
const { useRef: vfUseRef, useEffect: vfUseEffect, useState: vfUseState } = React;

function VideoFrame({
  src,
  poster,
  label,                 // small mono caption shown on the placeholder
  ratio = "16 / 9",
  cover = false,           // fill parent height; object-fit: cover (hero)
  autoplay = false,
  muted = true,
  loop = false,
  controls = true,
  playsInline = true,
  rounded = false,
  className = ""
}) {
  const videoRef = vfUseRef(null);
  const [playing, setPlaying] = vfUseState(false);
  const hasPoster = Boolean(poster);

  vfUseEffect(() => {
    setPlaying(false);
    const el = videoRef.current;
    if (!el) return;
    el.muted = muted !== false;
    if (autoplay !== false) {
      const tryPlay = () => { const p = el.play(); if (p && p.catch) p.catch(() => {}); };
      if (el.readyState >= 2) tryPlay();
      el.addEventListener("loadeddata", tryPlay, { once: true });
      el.addEventListener("canplay", tryPlay, { once: true });
      return () => {
        el.removeEventListener("loadeddata", tryPlay);
        el.removeEventListener("canplay", tryPlay);
      };
    }
  }, [muted, autoplay, src]);

  return (
    <figure
      className={`video-frame ${cover ? "video-frame--cover" : ""} ${rounded ? "video-frame--round" : ""} ${className}`.trim()}
      style={cover ? undefined : { aspectRatio: ratio }}
    >
      {src ? (
        <React.Fragment>
          {hasPoster && !playing && (
            <img
              className="video-frame__poster"
              src={poster}
              alt=""
              aria-hidden="true"
            />
          )}
          <video
            ref={videoRef}
            src={src}
            autoPlay={autoplay !== false}
            muted={muted !== false}
            loop={loop !== false}
            playsInline
            controls={controls === true}
            preload="auto"
            onPlaying={() => setPlaying(true)}
          />
        </React.Fragment>
      ) : (
        <div className="video-frame__placeholder" aria-hidden="true">
          <div className="video-frame__stripes"></div>
          <div className="video-frame__caption">
            <span className="video-frame__file">{label || "media"}</span>
          </div>
        </div>
      )}
    </figure>
  );
}

window.VideoFrame = VideoFrame;
