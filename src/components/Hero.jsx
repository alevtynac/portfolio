/* =====================================================================
   Hero.jsx — video with label overlay, text info block below.
   All copy and media paths come from portfolioData.
   ===================================================================== */

function HeroInfoItem({ label, text }) {
  if (!label || !text) return null;
  return (
    <div className="hero-info-item">
      <p className="hero-info-label">{label}</p>
      <p className="hero-info-text">{text}</p>
    </div>
  );
}

function Hero({ data }) {
  const { hero, heroInfo } = data;
  const hoverSrc = hero.video.hoverSrc;
  const hoverRef = React.useRef(null);

  React.useEffect(() => {
    const video = hoverRef.current;
    if (!video || !hoverSrc) return;

    video.muted = true;

    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise && playPromise.catch) playPromise.catch(() => {});
    };

    if (video.readyState >= 2) tryPlay();
    video.addEventListener("loadeddata", tryPlay, { once: true });
    video.addEventListener("canplay", tryPlay, { once: true });

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
    };
  }, [hoverSrc]);

  return (
    <section id="top" className="hero">
      <div className="hero-container">
        <div className="hero-media">
          <div className="hero-media__frame">
            <VideoFrame
              src={hero.video.src}
              poster={hero.video.poster}
              label={hero.title}
              autoplay={true}
              muted={true}
              loop={true}
              controls={false}
            />

            {hoverSrc && (
              <video
                ref={hoverRef}
                className="hero-hover-video"
                src={hoverSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
            )}
          </div>

          {hero.label && (
            <div className="hero-label hero-label-overlay">{hero.label}</div>
          )}
        </div>

        <div className="hero-headtext">
          <h2 className="project__title">{hero.title}</h2>
          {hero.type && <p className="project__type hero-headtext__type">{hero.type}</p>}
        </div>

        {heroInfo && (
          <div className="hero-info">
            <div className="hero-info-grid">
              <HeroInfoItem label={heroInfo.projectLabel} text={heroInfo.projectText} />
              <HeroInfoItem label={heroInfo.conceptLabel} text={heroInfo.conceptText} />
            </div>

            {heroInfo.tags && heroInfo.tags.length > 0 && (
              <ul className="hero-tags">
                {heroInfo.tags.map((tag) => (
                  <li key={tag} className="hero-tag">{tag}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

window.Hero = Hero;
