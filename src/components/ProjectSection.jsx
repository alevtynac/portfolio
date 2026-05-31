/* =====================================================================
   ProjectSection.jsx — one project. Two-column editorial layout:
   text on the left, sticky media on the right (single column on mobile).
   Optional fields (metaphor, viewerRole, controls) only render when set.
   Media priority: video → image → placeholder.
   ===================================================================== */

/* small labelled text block */
function DetailBlock({ label, children, delay = 0 }) {
  if (!children) return null;
  return (
    <Reveal className="detail" delay={delay}>
      <p className="detail__label">{label}</p>
      <div className="detail__body">{children}</div>
    </Reveal>
  );
}

/* chip list (visual language, themes, controls, tools) */
function ChipList({ label, items, accent = false, delay = 0 }) {
  if (!items || !items.length) return null;
  return (
    <Reveal className="detail" delay={delay}>
      <p className="detail__label">{label}</p>
      <ul className={`chips ${accent ? "chips--accent" : ""}`}>
        {items.map((it) => <li key={it} className="chip">{it}</li>)}
      </ul>
    </Reveal>
  );
}

function ProjectVideo({ video }) {
  const ref = React.useRef(null);
  const [aspectRatio, setAspectRatio] = React.useState(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.muted = true;

    const syncRatio = () => {
      if (el.videoWidth > 0 && el.videoHeight > 0) {
        setAspectRatio(`${el.videoWidth} / ${el.videoHeight}`);
      }
    };

    const tryPlay = () => {
      const p = el.play();
      if (p && p.catch) p.catch(() => {});
    };

    syncRatio();
    el.addEventListener("loadedmetadata", syncRatio);
    el.addEventListener("loadeddata", tryPlay, { once: true });
    el.addEventListener("canplay", tryPlay, { once: true });
    if (el.readyState >= 2) tryPlay();

    return () => {
      el.removeEventListener("loadedmetadata", syncRatio);
      el.removeEventListener("loadeddata", tryPlay);
      el.removeEventListener("canplay", tryPlay);
    };
  }, [video.src]);

  return (
    <div
      className="project-video-frame"
      style={aspectRatio ? { aspectRatio, minHeight: 0 } : undefined}
    >
      <video
        ref={ref}
        src={video.src}
        autoPlay
        muted
        loop
        playsInline
        controls={false}
        preload="auto"
      />
    </div>
  );
}

function ProjectMediaItem({ item, title }) {
  const isVideo = item.type === "video" || /\.mp4(\?|$)/i.test(item.src || "");

  if (isVideo) {
    return <ProjectVideo video={{ src: item.src }} />;
  }

  return (
    <figure className="video-frame" style={{ aspectRatio: "4 / 5" }}>
      <img
        className="video-frame__media"
        src={item.src}
        alt={item.alt || title}
      />
    </figure>
  );
}

function ProjectMedia({ project }) {
  const media = project.media || {};
  const title = project.title;
  const video = media.video;
  const images = media.images || [];

  if (video?.src) {
    return <ProjectVideo video={video} />;
  }

  if (images.length > 1) {
    return (
      <div className="project-media-gallery">
        {images.map((item, index) => (
          <ProjectMediaItem key={item.src || index} item={item} title={title} />
        ))}
      </div>
    );
  }

  const image = images[0];

  if (image?.src) {
    return <ProjectMediaItem item={image} title={title} />;
  }

  return <VideoFrame label="project media" ratio="4 / 5" controls={false} />;
}

function ProjectSection({ project, index }) {
  const p = project;
  const media = p.media || {};
  const hasVideo = Boolean(media.video?.src);

  const details = (
    <React.Fragment>
      <DetailBlock label="Concept">{p.concept}</DetailBlock>
      <DetailBlock label="Metaphor analysis" delay={40}>{p.metaphor}</DetailBlock>
      <DetailBlock label="Process" delay={40}>{p.process}</DetailBlock>
      <DetailBlock label="Viewer role" delay={40}>{p.viewerRole}</DetailBlock>
      <ChipList label="Visual language" items={p.visualLanguage} delay={40} />
      <ChipList label="Themes" items={p.themes} delay={40} />
      <ChipList label="Tool / interface controls" items={p.controls} delay={40} />
      <ChipList label="Tools" items={p.tools} accent={true} delay={40} />
      <DetailBlock label="What this project shows" delay={40}>{p.learning}</DetailBlock>
      {p.externalLink && (
        <div className="project-external-link-wrap">
          <Reveal delay={40}>
            <a
              className="btn btn--solid project__external-link"
              href={p.externalLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {p.externalLinkLabel || "Open link"}
            </a>
          </Reveal>
        </div>
      )}
    </React.Fragment>
  );

  const mediaKind = hasVideo
    ? "video"
    : media.images?.[0]
      ? "image"
      : null;

  const mediaNote = mediaKind === "video"
    ? `Video — press play · ${p.title}`
    : mediaKind === "image"
      ? `Image · ${p.title}`
      : `Media · ${p.title}`;

  const showMediaNote = mediaKind === "video" && !media.video?.autoplay;
  const isMelt = p.title === "MELT";

  return (
    <section id={`project-${p.id}`} className="section project">
      <div className="project__header">
        <Reveal as="span" className="project__num">{p.number}</Reveal>
        <div className="project__headtext">
          <Reveal as="h2" className="project__title" delay={60}>{p.title}</Reveal>
          <Reveal as="p" className="project__type" delay={120}>{p.type}</Reveal>
          <Reveal as="p" className="project__desc" delay={180}>{p.description}</Reveal>
        </div>
      </div>

      <div className="project__body">
        <div className="project__detail">{details}</div>
        <div className="project__media">
          <div className="project__media-sticky">
            <div className={`project-media${isMelt ? " project-media--melt-rotated" : ""}`}>
              <ProjectMedia project={p} />
            </div>
            {showMediaNote && (
              <p className="project__media-note">{mediaNote}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

window.ProjectSection = ProjectSection;
