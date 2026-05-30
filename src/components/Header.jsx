/* =====================================================================
   Header.jsx — minimal sticky header
   Left: name. Right: navigation that scrolls to sections.
   ===================================================================== */

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.pageYOffset - 64;
  window.scrollTo({ top, behavior: "smooth" });
}
window.scrollToId = scrollToId;

function Header({ data }) {
  const { personal, nav, navCta } = data;
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <button className="site-header__name" onClick={() => scrollToId("top")}>
          {personal.name}
        </button>
        <nav className="site-header__nav">
          {nav.map((item) => (
            <button
              key={item.target}
              className="site-header__link"
              onClick={() => scrollToId(item.target)}
            >
              {item.label}
            </button>
          ))}
          {navCta && (
            <button
              className="site-header__cta"
              onClick={() => scrollToId(navCta.target)}
            >
              {navCta.label}
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

window.Header = Header;
