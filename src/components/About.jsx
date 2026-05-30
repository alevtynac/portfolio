/* =====================================================================
   About.jsx — short editorial about section.
   ===================================================================== */

function About({ data }) {
  const { about } = data;
  return (
    <section id="about" className="section about">
      <SectionLabel number={about.sectionNumber} label={about.label} />
      <div className="about__grid">
        <Reveal as="h2" className="section__title">{about.title}</Reveal>
        <div className="about__body">
          {about.paragraphs.map((para, i) => (
            <Reveal as="p" key={i} className={`about__para ${i === 0 ? "about__para--lead" : ""}`} delay={i * 60}>
              {para}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

window.About = About;
