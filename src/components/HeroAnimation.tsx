import { useEffect, useRef } from "react";

const TOTAL_FRAMES = 240;
const FRAME_PATH = (n: number) =>
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

/* Native aspect ratio of frames (1920×1080) */
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

  const imagesRef       = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const currentFrameRef = useRef(0);
  const currentPhaseRef = useRef(-2);
  const timeoutRef      = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* RAF state – never draw inside the scroll handler */
  const rafIdRef        = useRef<number | null>(null);
  const pendingFrameRef = useRef(0);
  const pendingProgressRef = useRef(0);

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

    if (!canvas || !stage || !heroName || !animCenter || !infoLeft || !infoRight) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const imgs = imagesRef.current;

    /* ── Canvas resolution = display size, not native 1920×1080.
       Draws 9× fewer pixels → the single biggest perf win.       ── */
    function resizeCanvas() {
      const w = animCenter!.offsetWidth;
      if (!w) return;
      const h = Math.round(w * FRAME_RATIO);
      if (canvas!.width === w && canvas!.height === h) return;
      canvas!.width  = w;
      canvas!.height = h;
      /* Redraw the current frame at the new size */
      const img = imgs[currentFrameRef.current];
      if (img?.complete) {
        ctx!.clearRect(0, 0, w, h);
        ctx!.drawImage(img, 0, 0, w, h);
      }
    }

    function drawFrame(index: number) {
      const img = imgs[index];
      if (!img?.complete) return;
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx!.drawImage(img, 0, 0, canvas!.width, canvas!.height);
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
        }, 300);
      }
    }

    /* ── RAF render: runs once per animation frame, not per scroll event ── */
    function render() {
      rafIdRef.current = null;
      const frame    = pendingFrameRef.current;
      const progress = pendingProgressRef.current;

      if (frame !== currentFrameRef.current) {
        currentFrameRef.current = frame;
        drawFrame(frame);
      }

      /* 0–10% hero | 10–88% three info phases (175vh each) | 88–100% buffer */
      if (progress < 0.10) {
        setPhase(-1);
      } else {
        const infoProgress = (progress - 0.10) / 0.78;
        setPhase(Math.min(Math.floor(infoProgress * 3), 2));
      }
    }

    function scheduleRender() {
      if (rafIdRef.current !== null) return; // already queued
      rafIdRef.current = requestAnimationFrame(render);
    }

    function onScroll() {
      const rect     = stage!.getBoundingClientRect();
      const stageH   = stage!.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / stageH));
      const frameIdx = Math.min(
        Math.round(progress * (TOTAL_FRAMES - 1)),
        TOTAL_FRAMES - 1
      );
      pendingFrameRef.current    = frameIdx;
      pendingProgressRef.current = progress;
      scheduleRender();
    }

    /* ── ResizeObserver keeps canvas resolution in sync with its CSS size ── */
    const ro = new ResizeObserver(resizeCanvas);
    ro.observe(animCenter);

    /* ── Preload all frames ── */
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.decoding = "async"; // decode off main thread
      img.onload = () => {
        if (i === 0) { resizeCanvas(); drawFrame(0); }
      };
      img.src = FRAME_PATH(i + 1);
      imgs[i] = img;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div id="scroll-stage" ref={stageRef}>
      <div id="sticky-hero">

        {/* FÁZE 0 – name left, disappears on scroll */}
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

        {/* Info panel left (phases 1–3) */}
        <div id="info-left" className="info-panel info-panel--left" ref={infoLeftRef}>
          <div className="panel-inner">
            <div className="panel-line panel-line--left" />
            <p className="panel-sentence" ref={leftTextRef} />
            <span className="panel-tag" ref={leftTagRef} />
          </div>
        </div>

        {/* Canvas – always visible, shifts from right to center */}
        <div id="animation-center" ref={animCenterRef}>
          <canvas id="roof-canvas" ref={canvasRef} />
        </div>

        {/* Info panel right (phases 1–3) */}
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
