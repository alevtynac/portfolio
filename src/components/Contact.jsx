/* =====================================================================
   Contact.jsx — contact section. Only renders fields that are filled in.
   ===================================================================== */

function externalUrl(url) {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url.replace(/^\/+/, "")}`;
}

function Contact({ data }) {
  const { contact, personal } = data;
  const ctaLabel = contact.ctaLabel || "Get in touch";

  const links = [
    personal.email && {
      key: "email",
      label: "Email",
      href: `mailto:${personal.email}`
    },
    personal.instagram && {
      key: "instagram",
      label: "Instagram",
      href: externalUrl(personal.instagram),
      external: true
    },
    personal.linkedin && {
      key: "linkedin",
      label: "LinkedIn",
      href: externalUrl(personal.linkedin),
      external: true
    }
  ].filter(Boolean);

  return (
    <section id="contact" className="section contact">
      <SectionLabel number={contact.sectionNumber} label={contact.label} />
      <div className="contact__grid">
        <div className="contact__intro">
          <Reveal as="h2" className="section__title contact__title">
            {(Array.isArray(contact.title) ? contact.title : [contact.title]).map((line) => (
              <span key={line} className="contact__title-line">{line}</span>
            ))}
          </Reveal>
          <Reveal as="p" className="contact__text process__text" delay={80}>{contact.text}</Reveal>
          {personal.email && (
            <Reveal delay={140}>
              <a className="btn btn--solid contact__cta" href={`mailto:${personal.email}`}>
                <span>{ctaLabel}</span>
                <span className="contact__cta-arrow" aria-hidden="true">→</span>
              </a>
            </Reveal>
          )}
        </div>

        {(links.length > 0 || personal.location) && (
          <Reveal delay={120}>
            <nav className="contact__nav" aria-label="Contact links">
              <ul className="contact__nav-list">
                {links.map((item) => (
                  <li key={item.key} className="contact__nav-item">
                    <a
                      className="contact__nav-link"
                      href={item.href}
                      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                {personal.location && (
                  <li className="contact__nav-item contact__nav-item--location" tabIndex={0}>
                    <span className="contact__nav-link contact__nav-link--static">Location</span>
                    <span className="contact__location-hint">{personal.location}</span>
                  </li>
                )}
              </ul>
            </nav>
          </Reveal>
        )}
      </div>
    </section>
  );
}

window.Contact = Contact;
