/* =====================================================================
   portfolioData.js  —  THE ONLY FILE YOU NEED TO EDIT
   ---------------------------------------------------------------------
   Every piece of text, every link, project and media path on the site
   is read from this object. Change the values below and the layout
   updates automatically. You should not need to touch the component
   files unless you want to change the layout itself.

   MEDIA: drop your files into
     src/assets/videos/   (*.mp4 — must be H.264 / "web compatible")
     src/assets/images/   (*.jpg posters)
   using the exact filenames referenced below. Until a real file loads,
   the site shows a clean labelled placeholder in its place.

   NOTE ON VIDEO FORMAT: browsers cannot play HEVC / H.265 (the default
   for many iPhone exports). Export or convert clips to H.264 .mp4
   ("Most Compatible") so they play everywhere.

   COPY STYLE: keep every line short and plain. Each project should read
   in under 30 seconds — short sentences, clear labels, visual keywords.
   ===================================================================== */

window.portfolioData = {

  /* ---- Personal details ------------------------------------------- */
  personal: {
    name: "Alevtyna Coacher",
    role: "Visual Communication Student",
    location: "Israel, Haifa",
    email: "alevtynac@gmail.com",
    instagram: "https://www.instagram.com/alev.coa",
    linkedin: "https://www.linkedin.com/in/alevtyna-coacher-300a391a8/",
    behance: "",                       // leave "" to hide
    portfolioLink: "https://www.instagram.com/alev.coa"
  },

  /* ---- Site-wide settings ----------------------------------------- */
  site: {
    title: "I Love Haifa",
    secondaryTitle: "Visual Systems in Motion",
    academy: "Portfolio for Wix Playground Academy TLV",
    accentColor: "#D7FF3F",            // acid yellow — used sparingly
    year: "2026"
  },

  /* ---- Header navigation ------------------------------------------ */
  nav: [
    { label: "About",   target: "about" },
    { label: "Work",    target: "work" },
    { label: "Process", target: "process" },
    { label: "Contact", target: "contact" }
  ],
  navCta: { label: "Let's talk", target: "contact" },

  /* ---- Hero -------------------------------------------------------- */
  hero: {
    title: "I Love Haifa",
    type: "PUBLIC-SCREEN VIDEO / SEA MOVEMENT / ABSTRACT VISUAL SYSTEM",
    label: "Featured in public space",
    subtitle: "A public-screen video project shown in Haifa.",
    secondaryTitle: "",
    description: "",
    videoText: "",
    video: {
      type: "local",
      src: "src/assets/videos/ilovehaifa.mp4",
      hoverSrc: "src/assets/videos/love-haifa-hover-final.mp4",
      poster: "src/assets/images/ilovehaifa-poster.jpg"
    }
  },

  heroInfo: {
    projectLabel: "Project",
    projectText: "Public-screen video projection inspired by Haifa as a sea city.",
    conceptLabel: "Concept",
    conceptText: "Sea foam, waves and water movement translated into an abstract visual system.",
    tags: ["Public screen", "TouchDesigner"]
  },

  /* ---- 1 · About Me ----------------------------------------------- */
  about: {
    sectionNumber: "1",
    label: "About",
    title: "About Me",
    paragraphs: [
      "I'm Alevtyna Coacher, a 3rd-year visual communication student at the WIZO School of Design, University of Haifa.",
      "I work with typography, video, motion and interactive systems. My projects often start from a personal or emotional question, then become visual structures built through rhythm, repetition and movement.",
      "I'm interested in how digital design can translate perception, memory and inner states into visual experiences.",
      "This portfolio shows not only finished works, but also how I think, test, combine tools and build visual systems."
    ]
  },

  /* ---- 2 · Work (project index) ----------------------------------- */
  work: {
    sectionNumber: "2",
    label: "Work",
    title: "Selected Projects"
  },

  /* ---- Projects (order here = order on the page) ------------------ */
  projects: [
    {
      number: "01",
      id: "melt",
      title: "MELT",
      type: "Glitch Typography / Motion Experiment",
      description: "Created for a Brik task, MELT turns typography into a reusable digital effect.",
      concept: "The project explores the tension between readability and visual disruption. The word stays recognizable, while RGB shifts, screen noise and signal artifacts break its edges.",
      process: "I worked with layered text, color-channel displacement, noise texture and subtle digital distortion to create the feeling of a corrupted screen.",
      visualLanguage: [
        "Glitch typography",
        "RGB displacement",
        "Screen noise",
        "Signal distortion",
        "Strong contrast"
      ],
      tools: ["Brik"],
      externalLink: "https://brik.space/Profile/6a099eb3dff2d3fdde9c57b7",
      externalLinkLabel: "View my Brik profile",
      media: {
        video: {
          type: "local",
          src: "src/assets/videos/melt.mp4",
          autoplay: true,
          muted: true,
          loop: true,
          controls: false,
          playsInline: true
        }
      }
    },

    {
      number: "02",
      id: "inner-gaze",
      title: "The Inner Gaze",
      type: "Real-Time Visualization / TouchDesigner / Poetic Interpretation",
      description: "Based on Ronny Someck’s poem “Abraham on the Way to the Binding,” the project visualizes doubt, fear, faith and conscience as an inner psychological state.",
      concept: "The project is based on a poetic reinterpretation of the Binding of Isaac story. Instead of focusing on the event itself, it explores the inner state of the character: doubt, fear, faith and moral tension.",
      process: "I created video fragments using AI, then combined them in TouchDesigner into one real-time composition. The work uses layering and split-screen structure to show several inner states existing at the same time.",
      visualLanguage: [
        "Split-screen structure",
        "Blooming and withering",
        "Moral tension"
      ],
      tools: ["TouchDesigner", "Video Processing", "Kling AI"],
      learning: "Shows how text and metaphor can become a moving visual system.",
      media: {
        video: {
          type: "local",
          src: "src/assets/videos/inner-gaze.mp4",
          autoplay: true,
          muted: true,
          loop: true,
          controls: false,
          playsInline: true
        }
      }
    },

    {
      number: "03",
      id: "intuition-mirage",
      title: "Intuition Mirage",
      type: "Interactive Digital Project / Collage Interface / Digital Perception",
      description: "Intuition Mirage is an interactive digital game that explores the relationship between human intuition and artificial intelligence. The user makes intuitive choices, while the system responds by building a visual image of that intuition.",
      concept: "The project is based on a dialogue between human intuition and machine interpretation. Through a collage-like interface, the user’s choices become visual fragments, creating a portrait of their intuitive thinking.",
      process: "I built the project as an interactive visual experience, combining collage, digital interface elements and AI-based interpretation. The system turns user choices into a changing visual composition.",
      visualLanguage: [
        "Collage interface",
        "AI interpretation",
        "Human intuition",
        "Fragmented choices",
        "Digital portrait"
      ],
      tools: ["Cursor", "VS Code"],
      externalLink: "https://alevtynac.wixstudio.com/my-site",
      externalLinkLabel: "TO THE GAME",
      media: {
        video: {
          type: "local",
          src: "src/assets/videos/intuition-mirage-03-video.mp4",
          autoplay: true,
          muted: true,
          loop: true,
          controls: false,
          playsInline: true
        }
      }
    }
  ],

  /* ---- 3 · Process ------------------------------------------------ */
  process: {
    sectionNumber: "3",
    label: "Process",
    title: "Research, test, build, refine.",
    text: "I don't start from a final image. I start from a question, a reference or a rule — then research, test and refine.",
    steps: [
      { title: "Research",          text: "Collect references and understand the context." },
      { title: "Visual References", text: "Build a direction: type, color, texture, motion, interface." },
      { title: "Experiments",       text: "Test options — sketches, AI images, type, motion, mockups." },
      { title: "System Rules",      text: "Define what changes, what stays, and how it behaves." },
      { title: "Iterations",        text: "Compare versions; adjust scale, color, type and motion." },
      { title: "Final Direction",   text: "Lock it when concept, visuals and logic align." }
    ]
  },

  /* ---- 4 · Tools and Methods -------------------------------------- */
  toolsSection: {
    sectionNumber: "4",
    label: "Tools",
    title: "Tools and methods.",
    text: "AI helps me find references and explore directions. The final decisions come from editing, structure and design thinking.",
    tools: [
      "Figma", "Photoshop / Illustrator", "Vibe Coding", "TouchDesigner",
      "Brik", "Wix", "AI tools", "Video editing tools"
    ]
  },

  /* ---- 5 · Contact ------------------------------------------------ */
  contact: {
    sectionNumber: "5",
    label: "Contact",
    title: ["Let's shape", "what moves."],
    text: "I'm open to academy opportunities, collaborations and experimental digital projects.",
    ctaLabel: "Get in touch"
  },

  /* ---- Footer ----------------------------------------------------- */
  footer: {
    line1: "Visual Systems in Motion",
    line2: "Portfolio for Wix Playground Academy TLV"
    // © year + name are composed automatically from site / personal
  }
};
