/* =====================================================================
   Intro.jsx — "1 · About" : the design philosophy / about-the-work block.
   Large editorial statement with supporting paragraphs.
   ===================================================================== */

function Intro({ data }) {
  const { intro } = data;
  return (
    <section id="intro" className="section intro">
      <SectionLabel number={intro.sectionNumber} label={intro.label} />
      <div className="intro__grid">
        <Reveal as="h2" className="intro__title" delay={60}>{intro.title}</Reveal>
        <div className="intro__body">
          {intro.paragraphs.map((para, i) => (
            <Reveal as="p" key={i} className="intro__para" delay={120 + i * 60}>{para}</Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Intro = Intro;
