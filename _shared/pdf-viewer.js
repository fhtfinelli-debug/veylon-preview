// =============================================================================
// VEYLON · pdf-viewer.js
// N.4 - Wrapper minimale attorno a PDF.js per rendering canvas-based di PDF.
// Riusabile in pagine app o pubbliche.
//
// Uso:
//   import { mountPdfViewer } from "./_shared/pdf-viewer.js";
//   await mountPdfViewer(document.getElementById("viewer-container"), pdfUrl, {
//     initialPage: 1,
//     onPageChange: (n) => ...,
//     onClick: (event, pageNum, x, y) => ... // coord PDF (per N.2 apposizione firma)
//   });
//
// Carica PDF.js via esm.sh CDN. Il browser deve avere accesso a esm.sh.
// =============================================================================

// CDN PDF.js (stable 4.x via esm.sh)
const PDFJS_BASE = "https://esm.sh/pdfjs-dist@4.4.168";

let pdfjsLib = null;
async function loadPdfJs() {
  if (pdfjsLib) return pdfjsLib;
  pdfjsLib = await import(`${PDFJS_BASE}/build/pdf.mjs`);
  pdfjsLib.GlobalWorkerOptions.workerSrc = `${PDFJS_BASE}/build/pdf.worker.mjs`;
  return pdfjsLib;
}

export interface PdfViewerOptions {
  initialPage?: number;
  onPageChange?: (page: number) => void;
  onClick?: (event: MouseEvent, pageNum: number, pdfX: number, pdfY: number) => void;
  maxWidth?: number;
}

export async function mountPdfViewer(container, pdfUrl, options) {
  const opts = options || {};
  const lib = await loadPdfJs();

  // Layout
  container.innerHTML = `
    <div class="pdfviewer-toolbar" style="display: flex; gap: 8px; align-items: center; padding: 8px 12px; background: var(--paper-2, #f5f5f5); border: 1px solid var(--rule, #ccc); font-family: var(--mono, monospace); font-size: 12px;">
      <button data-act="prev" style="padding: 4px 10px; border: 1px solid var(--ink, #1c1c1c); background: white; cursor: pointer;">←</button>
      <span data-info></span>
      <button data-act="next" style="padding: 4px 10px; border: 1px solid var(--ink, #1c1c1c); background: white; cursor: pointer;">→</button>
      <span style="flex: 1;"></span>
      <button data-act="zoom-out" style="padding: 4px 10px; border: 1px solid var(--ink, #1c1c1c); background: white; cursor: pointer;">−</button>
      <span data-zoom>100%</span>
      <button data-act="zoom-in" style="padding: 4px 10px; border: 1px solid var(--ink, #1c1c1c); background: white; cursor: pointer;">+</button>
    </div>
    <div class="pdfviewer-canvas-wrap" style="border: 1px solid var(--rule, #ccc); border-top: 0; padding: 12px; background: #ddd; display: flex; justify-content: center;">
      <canvas data-canvas style="background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.1); cursor: pointer;"></canvas>
    </div>
  `;

  const info = container.querySelector("[data-info]");
  const zoomLbl = container.querySelector("[data-zoom]");
  const canvas = container.querySelector("[data-canvas]");
  const ctx = canvas.getContext("2d");

  const pdf = await lib.getDocument(pdfUrl).promise;
  let currentPage = opts.initialPage || 1;
  let scale = 1.2;
  const maxWidth = opts.maxWidth || 720;

  async function render(pageNum) {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1 });
    const targetScale = Math.min(scale, maxWidth / viewport.width);
    const scaledViewport = page.getViewport({ scale: targetScale });
    canvas.width = scaledViewport.width;
    canvas.height = scaledViewport.height;
    await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise;
    info.textContent = `Pagina ${pageNum} di ${pdf.numPages}`;
    zoomLbl.textContent = Math.round(targetScale * 100) + "%";
    if (opts.onPageChange) opts.onPageChange(pageNum);
  }

  function goTo(n) {
    n = Math.max(1, Math.min(pdf.numPages, n));
    currentPage = n;
    return render(n);
  }

  container.querySelector('[data-act="prev"]').addEventListener("click", () => goTo(currentPage - 1));
  container.querySelector('[data-act="next"]').addEventListener("click", () => goTo(currentPage + 1));
  container.querySelector('[data-act="zoom-in"]').addEventListener("click", () => { scale = Math.min(scale + 0.25, 3); render(currentPage); });
  container.querySelector('[data-act="zoom-out"]').addEventListener("click", () => { scale = Math.max(scale - 0.25, 0.5); render(currentPage); });

  if (opts.onClick) {
    canvas.addEventListener("click", async (e) => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      // Coordinate PDF: PDF.js usa origine in basso-sinistra, canvas in alto-sinistra
      const page = await pdf.getPage(currentPage);
      const vp1 = page.getViewport({ scale: 1 });
      const targetScale = Math.min(scale, maxWidth / vp1.width);
      const pdfX = cx / targetScale;
      const pdfY = vp1.height - (cy / targetScale);
      opts.onClick(e, currentPage, pdfX, pdfY);
    });
  }

  await render(currentPage);

  return {
    goTo,
    setScale: (s) => { scale = s; return render(currentPage); },
    getCurrentPage: () => currentPage,
    getPdfDocument: () => pdf,
    destroy: () => { container.innerHTML = ""; },
  };
}
