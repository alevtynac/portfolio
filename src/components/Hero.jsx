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

  return (
    <section id="top" className="hero">
      <div className="hero-container">
        <div className="hero-media">
          {hero.label && (
            <div className="hero-label hero-label-overlay">{hero.label}</div>
          )}

          <VideoFrame
            src={hero.video.src}
            poster={hero.video.poster}
            label={hero.title}
            autoplay={true}
            muted={true}
            loop={true}
            controls={false}
          />
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
