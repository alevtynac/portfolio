/* =====================================================================
   SectionLabel.jsx — small numbered label used across sections.
   Renders e.g.  [01] About   with an accent number.
   ===================================================================== */

function SectionLabel({ number, label }) {
  return (
    <Reveal as="div" className="section-label">
      <span className="section-label__num">{number}</span>
      <span className="section-label__line"></span>
      <span className="section-label__text">{label}</span>
    </Reveal>
  );
}

window.SectionLabel = SectionLabel;
