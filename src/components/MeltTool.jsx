/* =====================================================================
   MeltTool.jsx — a small, self-contained interactive typography toy that
   lives inside the MELT project. Type any text and watch it melt. All
   defaults & labels come from portfolioData.meltTool. No libraries —
   the liquid effect is an animated SVG turbulence + displacement filter
   plus a gentle CSS drip. Works fully offline; uploads are optional.
   ===================================================================== */

function MeltTool({ config }) {
  const c = config || {};
  const L = c.labels || {};

  // unique filter id so multiple instances never clash
  const fid = React.useMemo(() => "melt-f-" + Math.random().toString(36).slice(2, 8), []);

  const [text, setText]   = React.useState(c.defaultText || "MELT");
  const [size, setSize]   = React.useState(c.defaultFontSize ?? 120);
  const [speed, setSpeed] = React.useState(c.defaultMeltSpeed ?? 4);
  const [wave, setWave]   = React.useState(c.defaultWaveIntensity ?? 35);
  const [glow, setGlow]   = React.useState(c.defaultGlow ?? 30);
  const [posX, setPosX]   = React.useState(c.defaultPositionX ?? 0);
  const [posY, setPosY]   = React.useState(c.defaultPositionY ?? 0);
  const [bg, setBg]       = React.useState(c.defaultBackgroundColor || "#111111");
  const [fg, setFg]       = React.useState(c.defaultTextColor || "#D7FF3F");
  const [bgImage, setBgImage] = React.useState(null);
  const [bgVideo, setBgVideo] = React.useState(null);
  const [imgName, setImgName] = React.useState("");
  const [vidName, setVidName] = React.useState("");
  const [resetKey, setResetKey] = React.useState(0);   // clears file inputs

  // tidy up object URLs
  React.useEffect(() => () => {
    if (bgImage) URL.revokeObjectURL(bgImage);
    if (bgVideo) URL.revokeObjectURL(bgVideo);
  }, [bgImage, bgVideo]);

  const dur = (12 - speed) + "s";          // higher speed → faster motion
  const waveScale = wave * 0.85;           // 0–100 → displacement scale
  const textShadow = glow > 0
    ? `0 0 ${glow * 0.35}px ${fg}, 0 0 ${glow * 0.9}px ${fg}`
    : "none";

  function onImage(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    if (bgImage) URL.revokeObjectURL(bgImage);
    setBgImage(URL.createObjectURL(f));
    setImgName(f.name);
  }
  function onVideo(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    if (bgVideo) URL.revokeObjectURL(bgVideo);
    setBgVideo(URL.createObjectURL(f));
    setVidName(f.name);
  }

  function reset() {
    setText(c.defaultText || "MELT");
    setSize(c.defaultFontSize ?? 120);
    setSpeed(c.defaultMeltSpeed ?? 4);
    setWave(c.defaultWaveIntensity ?? 35);
    setGlow(c.defaultGlow ?? 30);
    setPosX(c.defaultPositionX ?? 0);
    setPosY(c.defaultPositionY ?? 0);
    setBg(c.defaultBackgroundColor || "#111111");
    setFg(c.defaultTextColor || "#D7FF3F");
    if (bgImage) URL.revokeObjectURL(bgImage);
    if (bgVideo) URL.revokeObjectURL(bgVideo);
    setBgImage(null);
    setBgVideo(null);
    setImgName("");
    setVidName("");
    setResetKey((k) => k + 1);
  }

  return (
    <div className="melt-tool">
      {/* PREVIEW */}
      <div className="melt-preview" style={{ background: bg }}>
        {bgVideo ? (
          <video className="melt-bg" src={bgVideo} autoPlay loop muted playsInline />
        ) : bgImage ? (
          <div className="melt-bg" style={{ backgroundImage: `url(${bgImage})` }}></div>
        ) : null}

        <div
          className="melt-stage"
          style={{ transform: `translate(${posX * 3}px, ${posY * 3}px)` }}
        >
          <div
            className="melt-text"
            style={{
              fontSize: size + "px",
              color: fg,
              textShadow,
              filter: `url(#${fid})`,
              animationDuration: dur
            }}
          >
            {text || "\u00A0"}
          </div>
        </div>

        {/* animated liquid filter */}
        <svg className="melt-defs" aria-hidden="true" width="0" height="0">
          <defs>
            <filter id={fid} x="-35%" y="-35%" width="170%" height="170%">
              <feTurbulence type="fractalNoise" baseFrequency="0.012 0.016"
                            numOctaves="2" seed="7" result="noise">
                <animate attributeName="baseFrequency" dur={dur}
                         values="0.012 0.015;0.014 0.032;0.012 0.015"
                         repeatCount="indefinite" />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale={waveScale}
                                 xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>

        <span className="melt-tag">Live · type below</span>
      </div>

      {/* CONTROLS */}
      <div className="melt-controls">
        <div className="melt-field">
          <label className="melt-label">{L.customText || "Custom text"}</label>
          <input
            className="melt-input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type here…"
          />
        </div>

        <MeltSlider label={L.fontSize || "Font size"}        value={size}  min={48} max={220} step={1} onChange={setSize} />
        <MeltSlider label={L.meltSpeed || "Melt speed"}      value={speed} min={1}  max={10}  step={1} onChange={setSpeed} />
        <MeltSlider label={L.waveIntensity || "Wave intensity"} value={wave} min={0} max={100} step={1} onChange={setWave} />
        <MeltSlider label={L.glow || "Glow"}                 value={glow}  min={0}  max={100} step={1} onChange={setGlow} />

        <div className="melt-row">
          <MeltSlider label={L.positionX || "Position X"} value={posX} min={-50} max={50} step={1} onChange={setPosX} />
          <MeltSlider label={L.positionY || "Position Y"} value={posY} min={-50} max={50} step={1} onChange={setPosY} />
        </div>

        <div className="melt-row">
          <div className="melt-field">
            <label className="melt-label">{L.backgroundColor || "Background color"}</label>
            <div className="melt-color">
              <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} />
              <span className="melt-color__val">{bg}</span>
            </div>
          </div>
          <div className="melt-field">
            <label className="melt-label">{L.textColor || "Text color"}</label>
            <div className="melt-color">
              <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} />
              <span className="melt-color__val">{fg}</span>
            </div>
          </div>
        </div>

        <div className="melt-row">
          <div className="melt-field">
            <label className="melt-label">{L.uploadImage || "Upload background image"}</label>
            <label className="melt-upload">
              <span className="melt-upload__btn">Choose image</span>
              <span className="melt-upload__name">{imgName || "No file"}</span>
              <input key={"img" + resetKey} type="file" accept="image/*" onChange={onImage} />
            </label>
          </div>
          <div className="melt-field">
            <label className="melt-label">{L.uploadVideo || "Upload background video"}</label>
            <label className="melt-upload">
              <span className="melt-upload__btn">Choose video</span>
              <span className="melt-upload__name">{vidName || "No file"}</span>
              <input key={"vid" + resetKey} type="file" accept="video/*" onChange={onVideo} />
            </label>
          </div>
        </div>

        <button className="melt-reset" onClick={reset}>{L.reset || "Reset"}</button>
      </div>
    </div>
  );
}

/* labelled slider with live value read-out */
function MeltSlider({ label, value, min, max, step, onChange }) {
  return (
    <div className="melt-field">
      <div className="melt-label melt-label--row">
        <span>{label}</span>
        <span className="melt-value">{value}</span>
      </div>
      <input
        className="melt-range"
        type="range"
        min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

window.MeltTool = MeltTool;
