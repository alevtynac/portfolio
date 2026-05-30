/* =====================================================================
   ProjectIndex.jsx — "Selected Works" intro + clickable project index.
   ===================================================================== */

function ProjectIndex({ data }) {
  const { work, projects } = data;
  return (
    <section id="work" className="section index">
      <SectionLabel number={work.sectionNumber} label={work.label} />
      <div className="index__head">
        <Reveal as="h2" className="section__title">{work.title}</Reveal>
      </div>

      <ol className="index__list">
        {projects.map((p, i) => (
          <Reveal as="li" key={p.id} className="index__item" delay={i * 70}>
            <button className="index__row" onClick={() => scrollToId(`project-${p.id}`)}>
              <span className="index__num">{p.number}</span>
              <span className="index__name">{p.title}</span>
              <span className="index__type">{p.type}</span>
              <span className="index__arrow">↓</span>
            </button>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

window.ProjectIndex = ProjectIndex;
