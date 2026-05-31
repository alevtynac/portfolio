/* =====================================================================
   ToolsSection.jsx — tools & methods, list driven from data.
   ===================================================================== */

function ToolsSection({ data }) {
  const { toolsSection } = data;
  return (
    <section id="tools" className="section tools">
      <SectionLabel number={toolsSection.sectionNumber} label={toolsSection.label} />
      <div className="tools__head">
        <Reveal as="h2" className="section__title">{toolsSection.title}</Reveal>
        <Reveal as="p" className="tools__text" delay={80}>{toolsSection.text}</Reveal>
      </div>
      <ul className="tools__list">
        {toolsSection.tools.map((t, i) => (
          <Reveal as="li" key={t} className="tools__item" delay={i * 40}>
            <span className="tools__index">{String(i + 1).padStart(2, "0")}</span>
            <span className="tools__name">{t}</span>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

window.ToolsSection = ToolsSection;
