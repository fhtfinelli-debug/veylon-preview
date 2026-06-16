// =============================================================================
// VEYLON · _shared/wizard-stepper.js (N.9 — replica Notarify)
//
// Component vanilla riusabile per modali/pagine wizard a step.
// Replica il pattern del competitor (stepper a pallini in alto, footer
// Annulla/Procedi pillola, dialog bianco su overlay scuro) ma in stile
// editoriale Veylon.
//
// Uso:
//   import { mountWizard, openWizardModal } from "./_shared/wizard-stepper.js";
//
//   // 1. Inline (pagina dedicata tipo onboarding-wizard.html)
//   mountWizard(document.getElementById("wiz-container"), {
//     steps: [
//       { id: "profilo", title: "Il vostro profilo", render: (root, ctx) => "..." },
//       { id: "azienda", title: "La vostra azienda", render: (root, ctx) => "..." },
//       { id: "fine",    title: "Pronti a partire",  render: (root, ctx) => "..." },
//     ],
//     onChange: (currentStepId, ctx) => { ... },
//     onFinish: async (ctx) => { ... return true; },
//     allowSkip: true,
//   });
//
//   // 2. Modale (overlay tipo firma graphics)
//   openWizardModal({ title: "Apponi firma", steps: [...], onFinish: async (ctx) => {...} });
//
// Stile Notarify replicato: pallini blu/seal, footer link + pulsante pillola,
// overlay scuro 70%, dialog bianco centrato max-w 640px.
// =============================================================================

const STYLE_TAG_ID = "veylon-wiz-styles";
const CSS = `
.vwiz-overlay {
  position: fixed; inset: 0;
  background: rgba(15, 15, 14, 0.7);
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
  z-index: 9999;
  animation: vwizFade .15s ease-out;
}
@keyframes vwizFade { from { opacity: 0 } to { opacity: 1 } }

.vwiz-dialog {
  background: var(--paper, #fefbf3);
  border: 1px solid var(--rule, #d4c8b8);
  max-width: 640px; width: 100%;
  max-height: 90vh;
  display: flex; flex-direction: column;
  box-shadow: 0 12px 48px rgba(0,0,0,.18);
}

.vwiz-head {
  padding: 28px 32px 0;
  text-align: center;
}
.vwiz-title {
  font-family: var(--serif, Georgia, serif);
  font-weight: normal;
  font-size: 26px;
  line-height: 1.2;
  letter-spacing: -0.01em;
  margin: 0;
}
.vwiz-subtitle {
  font-family: var(--serif, Georgia, serif);
  color: var(--ink-2, #4a3b30);
  font-size: 14px;
  margin: 6px 0 0;
}

.vwiz-dots {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin: 22px 0;
}
.vwiz-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  background: var(--rule, #d4c8b8);
  transition: transform .25s ease, background .25s ease;
}
.vwiz-dot.is-active {
  background: var(--seal, #7a2d1f);
  transform: scale(1.5);
}
.vwiz-dot.is-done {
  background: var(--seal, #7a2d1f);
}

.vwiz-body {
  flex: 1;
  overflow-y: auto;
  padding: 8px 32px 24px;
}

.vwiz-foot {
  padding: 18px 32px 24px;
  border-top: 1px solid var(--rule, #d4c8b8);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
.vwiz-foot-left { display: flex; gap: 16px; align-items: center; }
.vwiz-foot-right { display: flex; gap: 12px; align-items: center; }

.vwiz-link {
  background: transparent;
  border: 0;
  font-family: var(--serif, Georgia, serif);
  font-size: 14px;
  color: var(--ink-2, #4a3b30);
  cursor: pointer;
  text-decoration: underline;
  padding: 8px 0;
}
.vwiz-link:hover { color: var(--ink, #2d1610); }

.vwiz-pill {
  background: var(--seal, #7a2d1f);
  color: var(--paper, #fefbf3);
  border: 1px solid var(--seal, #7a2d1f);
  padding: 12px 28px;
  font-family: var(--mono, "IBM Plex Mono", monospace);
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 999px;
  transition: background .15s, border-color .15s;
}
.vwiz-pill:hover { background: var(--ink, #2d1610); border-color: var(--ink, #2d1610); }
.vwiz-pill:disabled { opacity: 0.5; cursor: not-allowed; }

.vwiz-pill.ghost {
  background: transparent;
  color: var(--ink, #2d1610);
}
.vwiz-pill.ghost:hover {
  background: var(--ink, #2d1610);
  color: var(--paper, #fefbf3);
}

.vwiz-err {
  color: var(--seal, #7a2d1f);
  font-family: var(--mono, monospace);
  font-size: 12px;
  padding: 8px 12px;
  background: #fde7e4;
  border-left: 3px solid var(--seal, #7a2d1f);
  margin-bottom: 12px;
}
`;

function ensureStyles() {
  if (document.getElementById(STYLE_TAG_ID)) return;
  const tag = document.createElement("style");
  tag.id = STYLE_TAG_ID;
  tag.textContent = CSS;
  document.head.appendChild(tag);
}

/**
 * Crea l'HTML scheletro del wizard (header + stepper + body + footer)
 * dentro container fornito. Ritorna handle con metodi {next, prev, goTo,
 * setError, getStepIndex, getContext}.
 */
export function mountWizard(container, options) {
  ensureStyles();
  const opts = options || {};
  const steps = Array.isArray(opts.steps) ? opts.steps : [];
  if (steps.length === 0) throw new Error("wizard: serve almeno uno step");
  const ctx = opts.context || {};
  const allowSkip = opts.allowSkip !== false;

  container.innerHTML = `
    <div class="vwiz-head">
      ${opts.title ? `<h2 class="vwiz-title">${escapeHtml(opts.title)}</h2>` : ""}
      ${opts.subtitle ? `<p class="vwiz-subtitle">${escapeHtml(opts.subtitle)}</p>` : ""}
      <div class="vwiz-dots" role="tablist" aria-label="Stepper"></div>
    </div>
    <div class="vwiz-body" data-vwiz-body></div>
    <div class="vwiz-foot">
      <div class="vwiz-foot-left">
        <button type="button" class="vwiz-link" data-act="back" hidden>Indietro</button>
        <button type="button" class="vwiz-link" data-act="skip" hidden>Salta per ora</button>
      </div>
      <div class="vwiz-foot-right">
        <button type="button" class="vwiz-pill" data-act="next">Avanti</button>
      </div>
    </div>
  `;

  const dotsEl = container.querySelector(".vwiz-dots");
  steps.forEach((_s, i) => {
    const d = document.createElement("span");
    d.className = "vwiz-dot";
    d.setAttribute("role", "tab");
    d.setAttribute("aria-label", `Passo ${i + 1} di ${steps.length}`);
    dotsEl.appendChild(d);
  });

  const bodyEl = container.querySelector("[data-vwiz-body]");
  const nextBtn = container.querySelector('[data-act="next"]');
  const backBtn = container.querySelector('[data-act="back"]');
  const skipBtn = container.querySelector('[data-act="skip"]');

  let idx = 0;
  let errEl = null;

  function setError(msg) {
    if (errEl) errEl.remove();
    if (!msg) { errEl = null; return; }
    errEl = document.createElement("div");
    errEl.className = "vwiz-err";
    errEl.textContent = msg;
    bodyEl.prepend(errEl);
  }

  function render() {
    const step = steps[idx];
    bodyEl.innerHTML = "";
    errEl = null;
    if (step.title) {
      const h = document.createElement("h3");
      h.style.cssText = "font-family: var(--serif); font-weight: normal; font-size: 20px; margin: 0 0 6px;";
      h.textContent = step.title;
      bodyEl.appendChild(h);
    }
    if (step.lede) {
      const p = document.createElement("p");
      p.style.cssText = "color: var(--ink-2); font-family: var(--serif); font-size: 14px; margin: 0 0 18px;";
      p.textContent = step.lede;
      bodyEl.appendChild(p);
    }
    const inner = typeof step.render === "function" ? step.render(ctx, { setError }) : (step.html || "");
    if (typeof inner === "string") {
      const wrap = document.createElement("div");
      wrap.innerHTML = inner;
      bodyEl.appendChild(wrap);
    } else if (inner instanceof Node) {
      bodyEl.appendChild(inner);
    }
    // update dots
    Array.from(dotsEl.children).forEach((d, i) => {
      d.classList.remove("is-active", "is-done");
      if (i < idx) d.classList.add("is-done");
      else if (i === idx) d.classList.add("is-active");
    });
    // update buttons
    backBtn.hidden = idx === 0;
    skipBtn.hidden = !allowSkip || idx === steps.length - 1;
    nextBtn.textContent = idx === steps.length - 1 ? (opts.finishLabel || "Conferma") : "Avanti";

    if (typeof opts.onChange === "function") {
      try { opts.onChange(step.id, ctx); } catch (e) { console.error("wizard onChange", e); }
    }
  }

  async function tryNext() {
    const step = steps[idx];
    setError(null);
    // Hook beforeNext per validazione
    if (typeof step.beforeNext === "function") {
      try {
        const ok = await step.beforeNext(ctx, { setError });
        if (ok === false) return;
      } catch (e) {
        setError(e?.message || String(e));
        return;
      }
    }
    if (idx === steps.length - 1) {
      // Last -> finish
      if (typeof opts.onFinish === "function") {
        nextBtn.disabled = true;
        const original = nextBtn.textContent;
        nextBtn.textContent = "...";
        try {
          const r = await opts.onFinish(ctx);
          if (r === false) {
            // staying on last step (error gia mostrato da onFinish)
            nextBtn.textContent = original;
            nextBtn.disabled = false;
            return;
          }
        } catch (e) {
          setError(e?.message || String(e));
          nextBtn.textContent = original;
          nextBtn.disabled = false;
          return;
        }
      }
      return;
    }
    idx++;
    render();
  }

  function prev() {
    if (idx > 0) { idx--; render(); }
  }

  function skip() {
    if (idx < steps.length - 1) { idx++; render(); }
  }

  nextBtn.addEventListener("click", tryNext);
  backBtn.addEventListener("click", prev);
  skipBtn.addEventListener("click", skip);

  render();

  return {
    next: tryNext,
    prev,
    skip,
    goTo: (n) => { if (n >= 0 && n < steps.length) { idx = n; render(); } },
    getStepIndex: () => idx,
    getContext: () => ctx,
    setError,
  };
}

/**
 * Apre il wizard in una modale overlay sopra la pagina corrente.
 * Ritorna {close, handle} dove handle e' lo stesso oggetto di mountWizard.
 */
export function openWizardModal(options) {
  ensureStyles();
  const overlay = document.createElement("div");
  overlay.className = "vwiz-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");

  const dialog = document.createElement("div");
  dialog.className = "vwiz-dialog";
  overlay.appendChild(dialog);
  document.body.appendChild(overlay);

  const onEsc = (e) => { if (e.key === "Escape") close(); };
  document.addEventListener("keydown", onEsc);

  function close() {
    document.removeEventListener("keydown", onEsc);
    overlay.remove();
    if (typeof options.onClose === "function") options.onClose();
  }

  // Click sull'overlay = annulla (no su dialog)
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay && options.closeOnOverlay !== false) close();
  });

  // Wrap onFinish per chiudere automaticamente
  const userOnFinish = options.onFinish;
  const modalOptions = {
    ...options,
    onFinish: async (ctx) => {
      if (typeof userOnFinish === "function") {
        const r = await userOnFinish(ctx);
        if (r === false) return false;
      }
      close();
      return true;
    },
  };

  const handle = mountWizard(dialog, modalOptions);
  return { close, handle };
}

function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));
}
