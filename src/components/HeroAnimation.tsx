import { useEffect, useRef } from "react";

const TOTAL_FRAMES  = 240;
const PRELOAD_FIRST = 10;
const FRAME_PATH    = (n: number) =>
  `/frames/ezgif-frame-${String(n).padStart(3, "0")}.webp`;

const INFO_PHASES = [
  {
    left:     "Každá střecha je jiná. Pracuji s každým materiálem, který trh nabízí.",
    leftTag:  "Pokrývačství & Klempířství",
    right:    "Přírodní břidlice je řemeslo, které dnes umí jen málokdo.",
    rightTag: "Specialita",
  },
  {
    left:     "Správně zateplená střecha sníží náklady na vytápění o desítky procent.",
    leftTag:  "Zateplení & Izolace",
    right:    "Rekonstrukce i novostavby – sanace krovů a tesařské práce.",
    rightTag: "Tesařství & Sanace",
  },
  {
    left:     "Střecha nad hlavou by vás neměla trápit. O to se postarám já.",
    leftTag:  "Přemysl Nečas",
    right:    "Okres Šumperk a okolí — zavolejte, přijedu se podívat.",
    rightTag: "737 012 244",
  },
];

const FRAME_RATIO = 1080 / 1920;

const HeroAnimation = () => {
  const stageRef      = useRef<HTMLDivElement>(null);
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const heroNameRef   = useRef<HTMLDivElement>(null);
  const animCenterRef = useRef<HTMLDivElement>(null);
  const infoLeftRef   = useRef<HTMLDivElement>(null);
  const infoRightRef  = useRef<HTMLDivElement>(null);
  const leftTextRef   = useRef<HTMLParagraphElement>(null);
  const leftTagRef    = useRef<HTMLSpanElement>(null);
  const rightTextRef  = useRef<HTMLParagraphElement>(null);
  const rightTagRef   = useRef<HTMLSpanElement>(null);
  const overlayRef    = useRef<HTMLDivElement>(null);
  const loadBarRef    = useRef<HTMLDivElement>(null);

  const bitmapsRef      = useRef<(ImageBitmap | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const currentFrameRef = useRef(0);
  const currentPhaseRef = useRef(-2);
  const timeoutRef      = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafIdRef        = useRef<number | null>(null);
  const pendingFrameRef    = useRef(0);
  const pendingProgressRef = useRef(0);
  const loadedCountRef  = useRef(0);
  const readyRef        = useRef(false);

  useEffect(() => {
    const canvas     = canvasRef.current;
    const stage      = stageRef.current;
    const heroName   = heroNameRef.current;
    const animCenter = animCenterRef.current;
    const infoLeft   = infoLeftRef.current;
    const infoRight  = infoRightRef.current;
    const leftText   = leftTextRef.current;
    const leftTag    = leftTagRef.current;
    const rightText  = rightTextRef.current;
    const rightTag   = rightTagRef.current;
    const overlay    = overlayRef.current;
    const loadBar    = loadBarRef.current;

    if (!canvas || !stage || !heroName || !animCenter || !infoLeft || !infoRight) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const bitmaps = bitmapsRef.current;

    function resizeCanvas() {
      const w = animCenter!.offsetWidth;
      if (!w) return;
      const h = Math.round(w * FRAME_RATIO);
      if (canvas!.width === w && canvas!.height === h) return;
      canvas!.width  = w;
      canvas!.height = h;
      const bmp = bitmaps[currentFrameRef.current];
      if (bmp) {
        ctx!.clearRect(0, 0, w, h);
        ctx!.drawImage(bmp, 0, 0, w, h);
      }
    }

    function drawFrame(index: number) {
      const bmp = bitmaps[index];
      if (!bmp) return;
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx!.drawImage(bmp, 0, 0, canvas!.width, canvas!.height);
    }

    function setPhase(idx: number) {
      if (idx === currentPhaseRef.current) return;
      currentPhaseRef.current = idx;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      if (idx === -1) {
        heroName!.classList.remove("hidden");
        animCenter!.classList.remove("centered");
        infoLeft!.classList.remove("visible");
        infoRight!.classList.remove("visible");
      } else {
        heroName!.classList.add("hidden");
        animCenter!.classList.add("centered");
        infoLeft!.classList.remove("visible");
        infoRight!.classList.remove("visible");

        timeoutRef.current = setTimeout(() => {
          const p = INFO_PHASES[idx];
          if (leftText)  leftText.textContent  = p.left;
          if (leftTag)   leftTag.textContent   = p.leftTag;
          if (rightText) rightText.textContent = p.right;
          if (rightTag)  rightTag.textContent  = p.rightTag;
          infoLeft!.classList.add("visible");
          infoRight!.classList.add("visible");
        }, 280);
      }
    }

    /* Continuous RAF loop – scroll only sets pendingFrame, never touches canvas */
    function renderLoop() {
      const frame    = pendingFrameRef.current;
      const progress = pendingProgressRef.current;

      if (frame !== currentFrameRef.current) {
        currentFrameRef.current = frame;
        drawFrame(frame);
      }

      if (progress < 0.10) {
        setPhase(-1);
      } else {
        const infoProgress = (progress - 0.10) / 0.78;
        setPhase(Math.min(Math.floor(infoProgress * 3), 2));
      }

      rafIdRef.current = requestAnimationFrame(renderLoop);
    }

    function onScroll() {
      if (!readyRef.current) return;
      const rect     = stage!.getBoundingClientRect();
      const stageH   = stage!.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / stageH));
      pendingFrameRef.current    = Math.min(Math.round(progress * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1);
      pendingProgressRef.current = progress;
    }

    /* Fetch → createImageBitmap: decoded directly to GPU memory */
    async function loadFrame(i: number) {
      try {
        const resp = await fetch(FRAME_PATH(i + 1));
        const blob = await resp.blob();
        bitmaps[i] = await createImageBitmap(blob);
        loadedCountRef.current++;

        if (loadBar) {
          loadBar.style.width = `${(loadedCountRef.current / TOTAL_FRAMES) * 100}%`;
        }

        if (loadedCountRef.current === PRELOAD_FIRST) {
          resizeCanvas();
          readyRef.current = true;
          if (overlay) overlay.classList.add("done");
          rafIdRef.current = requestAnimationFrame(renderLoop);
          onScroll();
        }
      } catch (e) {
        console.error("Frame load error:", FRAME_PATH(i + 1), e);
      }
    }

    const ro = new ResizeObserver(resizeCanvas);
    ro.observe(animCenter);

    for (let i = 0; i < TOTAL_FRAMES; i++) loadFrame(i);

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div id="scroll-stage" ref={stageRef}>

      {/* Loading overlay – fades out after first 10 frames are GPU-ready */}
      <div id="load-overlay" ref={overlayRef}>
        <div id="load-bar" ref={loadBarRef} />
      </div>

      <div id="sticky-hero">

        <div id="hero-name" ref={heroNameRef}>
          <p className="name-eyebrow">Klempířství · Pokrývačství · Tesařství</p>
          <h1 className="name-main">
            Přemysl<br />Nečas
          </h1>
          <div className="name-divider">
            <span className="divider-line" />
            <span className="divider-dot" />
            <span className="name-sub">Šumperk &amp; okolí</span>
          </div>
        </div>

        <div id="info-left" className="info-panel info-panel--left" ref={infoLeftRef}>
          <div className="panel-inner">
            <div className="panel-line panel-line--left" />
            <p className="panel-sentence" ref={leftTextRef} />
            <span className="panel-tag" ref={leftTagRef} />
          </div>
        </div>

        <div id="animation-center" ref={animCenterRef}>
          <canvas id="roof-canvas" ref={canvasRef} />
        </div>

        <div id="info-right" className="info-panel info-panel--right" ref={infoRightRef}>
          <div className="panel-inner">
            <div className="panel-line panel-line--right" />
            <p className="panel-sentence" ref={rightTextRef} />
            <span className="panel-tag" ref={rightTagRef} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroAnimation;
