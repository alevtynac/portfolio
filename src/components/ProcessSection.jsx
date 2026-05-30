/* =====================================================================
   ProcessSection.jsx — clean numbered timeline.
   ===================================================================== */

function ProcessSection({ data }) {
  const { process } = data;
  return (
    <section id="process" className="section process">
      <SectionLabel number={process.sectionNumber} label={process.label} />
      <div className="process__head">
        <Reveal as="h2" className="section__title">{process.title}</Reveal>
        <Reveal as="p" className="process__text" delay={80}>{process.text}</Reveal>
      </div>

      <ol className="timeline">
        {process.steps.map((step, i) => (
          <Reveal as="li" key={step.title} className="timeline__item" delay={i * 60}>
            <span className="timeline__num">{String(i + 1).padStart(2, "0")}</span>
            <div className="timeline__content">
              <h3 className="timeline__title">{step.title}</h3>
              <p className="timeline__text">{step.text}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

window.ProcessSection = ProcessSection;
