/* =====================================================================
   App.jsx — composes the whole site from portfolioData.
   ===================================================================== */

function App() {
  const data = window.portfolioData;

  // Apply the editable accent colour as a CSS variable.
  React.useEffect(() => {
    document.documentElement.style.setProperty("--accent", data.site.accentColor);
    document.title = `${data.personal.name} — ${data.site.title}`;
  }, []);

  return (
    <React.Fragment>
      <SprayCursor />
      <Header data={data} />
      <main>
        <Hero data={data} />
        <About data={data} />
        <ProjectIndex data={data} />
        {data.projects.map((project, i) => (
          <ProjectSection
            key={project.id}
            project={project}
            index={i}
          />
        ))}
        <ProcessSection data={data} />
        <ToolsSection data={data} />
        <Contact data={data} />
      </main>
      <Footer data={data} />
    </React.Fragment>
  );
}

window.App = App;
