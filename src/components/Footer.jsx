/* =====================================================================
   Footer.jsx
   ===================================================================== */

function Footer({ data }) {
  const { footer, site, personal, nav } = data;
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <span className="site-footer__brand">{footer.line1}</span>
        <nav className="site-footer__nav">
          {nav.map((item) => (
            <button key={item.target} onClick={() => scrollToId(item.target)}>{item.label}</button>
          ))}
        </nav>
      </div>
      <div className="site-footer__bottom">
        <span>{footer.line2}</span>
        <span>© {site.year} {personal.name}</span>
      </div>
    </footer>
  );
}

window.Footer = Footer;
