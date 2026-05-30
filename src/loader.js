/* Loads JSX components in order, then mounts React (fixes blank screen on Netlify). */
(function () {
  const COMPONENT_SCRIPTS = [
    "src/components/Reveal.jsx",
    "src/components/SectionLabel.jsx",
    "src/components/VideoFrame.jsx",
    "src/components/Header.jsx",
    "src/components/Hero.jsx",
    "src/components/ProjectIndex.jsx",
    "src/components/ProjectSection.jsx",
    "src/components/ProcessSection.jsx",
    "src/components/About.jsx",
    "src/components/ToolsSection.jsx",
    "src/components/Contact.jsx",
    "src/components/Footer.jsx",
    "src/App.jsx"
  ];

  function showError(err) {
    console.error(err);
    const root = document.getElementById("root");
    if (!root) return;
    root.innerHTML =
      '<p style="padding:24px;font-family:sans-serif;max-width:36em;line-height:1.5">' +
      "The site could not load. Press F12 and check the Console tab for details." +
      "</p>";
  }

  async function loadComponent(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load ${url} (${res.status})`);
    const source = await res.text();
    const { code } = Babel.transform(source, { presets: ["react"] });
    new Function(code)();
  }

  async function boot() {
    if (typeof Babel === "undefined") throw new Error("Babel did not load");
    if (typeof React === "undefined" || typeof ReactDOM === "undefined") {
      throw new Error("React did not load");
    }
    if (!window.portfolioData) throw new Error("portfolioData.js did not load");

    for (const url of COMPONENT_SCRIPTS) {
      await loadComponent(url);
    }
    if (typeof App !== "function") throw new Error("App is not defined");

    const rootEl = document.getElementById("root");
    if (!rootEl) throw new Error("Missing #root element");

    ReactDOM.createRoot(rootEl).render(React.createElement(App));
  }

  boot().catch(showError);
})();
