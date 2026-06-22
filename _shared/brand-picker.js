// =============================================================================
// VEYLON · _shared/brand-picker.js
// Componente dropdown brand riusabile per i form di emissione Veylon Tag.
//
// Uso:
//   import { mountBrandPicker } from "./_shared/brand-picker.js";
//
//   const picker = await mountBrandPicker("#brand-container", {
//     supabase: supabaseClient,
//     required: true,
//     allowCreate: true,                 // mostra "+ Nuovo brand" inline
//     initialBrandId: null,              // pre-seleziona un brand se passato
//     onChange: (brand) => { ... },      // brand = { id, nome, partita_iva, vat_internazionale, paese } | null
//   });
//
//   const selected = picker.getSelected();      // sync getter
//   await picker.reload();                       // re-fetch (es. dopo close modal)
//   picker.setSelected("uuid");                  // setter programmatic
//
// Edge case gestiti:
//   - utente con 0 brand → mostra hint "Crea il primo brand" + apre modale al click
//   - errore network/RLS → fallback graceful con warning + 2 input text liberi
//     che vengono passati come {nome, partita_iva} effimeri (no scrittura DB)
//   - brand archiviato non listato (filter attivo=true AND archived_at IS NULL)
//
// RLS: la SELECT su tag_brands ritorna SOLO i brand dell'utente corrente
// (policy tag_brands_select_own user_id = auth.uid()).
// =============================================================================

const STYLE_TAG_ID = "veylon-brandpicker-styles";

const CSS = `
.vbp-root { display: flex; flex-direction: column; gap: 10px; }
.vbp-label {
  font-family: var(--mono, "IBM Plex Mono", monospace);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-3, #6b5a4a);
}
.vbp-label .vbp-req { color: var(--seal, #7a2d1f); margin-left: 3px; }

.vbp-select-row { display: flex; gap: 8px; align-items: stretch; }
.vbp-select {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid var(--rule, #d4c8b8);
  background: var(--paper-2, #f5efe0);
  font-family: var(--mono, monospace);
  font-size: 13px;
  color: var(--ink, #2d1610);
  border-radius: 0;
  appearance: auto;
  cursor: pointer;
}
.vbp-select:focus {
  outline: 2px solid var(--seal, #7a2d1f);
  outline-offset: 1px;
  border-color: var(--seal, #7a2d1f);
}
.vbp-create-btn {
  padding: 10px 14px;
  background: var(--paper, #fefbf3);
  color: var(--seal, #7a2d1f);
  border: 1px solid var(--seal, #7a2d1f);
  font-family: var(--mono, monospace);
  font-size: 10.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  cursor: pointer;
  white-space: nowrap;
}
.vbp-create-btn:hover {
  background: var(--seal, #7a2d1f);
  color: var(--paper, #fefbf3);
}

.vbp-readonly {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 14px;
  padding: 12px 14px;
  background: var(--paper-2, #f5efe0);
  border: 1px dashed var(--rule-2, #c9bea8);
}
.vbp-readonly[hidden] { display: none; }
.vbp-readonly-field { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.vbp-readonly-label {
  font-family: var(--mono, monospace);
  font-size: 9.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-3, #6b5a4a);
}
.vbp-readonly-value {
  font-family: var(--mono, monospace);
  font-size: 12.5px;
  color: var(--ink, #2d1610);
  word-break: break-all;
}
.vbp-readonly-value.is-empty { color: var(--ink-3, #6b5a4a); font-style: italic; }
@media (max-width: 520px) {
  .vbp-readonly { grid-template-columns: 1fr; }
  .vbp-select-row { flex-direction: column; }
  .vbp-create-btn { width: 100%; }
}

.vbp-hint {
  font-family: var(--mono, monospace);
  font-size: 10.5px;
  color: var(--ink-3, #6b5a4a);
  line-height: 1.4;
}
.vbp-hint a { color: var(--seal, #7a2d1f); }

.vbp-warn {
  padding: 10px 12px;
  background: #fde7e4;
  border-left: 3px solid var(--seal, #7a2d1f);
  font-family: var(--serif, Georgia, serif);
  font-size: 13px;
  color: var(--seal, #7a2d1f);
  line-height: 1.4;
}

.vbp-fallback {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px 14px;
  background: var(--paper-2, #f5efe0);
  border: 1px solid var(--rule, #d4c8b8);
}
.vbp-fallback input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--rule, #d4c8b8);
  background: var(--paper, #fefbf3);
  font-family: var(--mono, monospace);
  font-size: 13px;
  color: var(--ink, #2d1610);
  border-radius: 0;
}
.vbp-fallback label {
  font-family: var(--mono, monospace);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-3, #6b5a4a);
}

/* MODAL */
.vbp-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 15, 14, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 10000;
  animation: vbpFade .15s ease-out;
}
@keyframes vbpFade { from { opacity: 0 } to { opacity: 1 } }

.vbp-modal {
  background: var(--paper, #fefbf3);
  border: 1px solid var(--rule, #d4c8b8);
  max-width: 560px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 12px 48px rgba(0,0,0,.18);
}
.vbp-modal-head {
  padding: 22px 28px 16px;
  border-bottom: 1px solid var(--rule, #d4c8b8);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}
.vbp-modal-title {
  margin: 0;
  font-family: var(--serif, Georgia, serif);
  font-size: 22px;
  letter-spacing: -0.01em;
}
.vbp-modal-title em {
  font-style: italic;
  color: var(--seal, #7a2d1f);
}
.vbp-modal-close {
  background: transparent;
  border: 0;
  font-size: 22px;
  cursor: pointer;
  color: var(--ink-2, #4a3b30);
  padding: 4px 8px;
  line-height: 1;
}
.vbp-modal-close:hover { color: var(--seal, #7a2d1f); }
.vbp-modal-body {
  padding: 22px 28px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.vbp-modal-body .vbp-field { display: flex; flex-direction: column; gap: 5px; }
.vbp-modal-body label {
  font-family: var(--mono, monospace);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-3, #6b5a4a);
}
.vbp-modal-body label .vbp-req { color: var(--seal, #7a2d1f); margin-left: 3px; }
.vbp-modal-body input,
.vbp-modal-body select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--rule, #d4c8b8);
  background: var(--paper-2, #f5efe0);
  font-family: var(--mono, monospace);
  font-size: 13px;
  color: var(--ink, #2d1610);
  border-radius: 0;
}
.vbp-modal-body input:focus,
.vbp-modal-body select:focus {
  outline: 2px solid var(--seal, #7a2d1f);
  outline-offset: 1px;
  border-color: var(--seal, #7a2d1f);
}
.vbp-modal-help {
  font-family: var(--mono, monospace);
  font-size: 10px;
  color: var(--ink-3, #6b5a4a);
  line-height: 1.4;
}
.vbp-modal-err {
  padding: 8px 12px;
  background: #fde7e4;
  border-left: 3px solid var(--seal, #7a2d1f);
  font-family: var(--mono, monospace);
  font-size: 12px;
  color: var(--seal, #7a2d1f);
}
.vbp-modal-foot {
  padding: 16px 28px 22px;
  border-top: 1px solid var(--rule, #d4c8b8);
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.vbp-btn-secondary {
  padding: 10px 18px;
  background: transparent;
  color: var(--ink, #2d1610);
  border: 1px solid var(--ink, #2d1610);
  font-family: var(--mono, monospace);
  font-size: 10.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  cursor: pointer;
}
.vbp-btn-secondary:hover { background: var(--paper-2, #f5efe0); }
.vbp-btn-primary {
  padding: 10px 18px;
  background: var(--seal, #7a2d1f);
  color: var(--paper, #fefbf3);
  border: 1px solid var(--seal, #7a2d1f);
  font-family: var(--mono, monospace);
  font-size: 10.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  cursor: pointer;
}
.vbp-btn-primary:hover { background: var(--ink, #2d1610); border-color: var(--ink, #2d1610); }
.vbp-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
`;

// Paesi ISO 2-letter piu' comuni per dropdown
const PAESI = [
  { code: "IT", name: "Italia" },
  { code: "FR", name: "Francia" },
  { code: "DE", name: "Germania" },
  { code: "ES", name: "Spagna" },
  { code: "GB", name: "Regno Unito" },
  { code: "CH", name: "Svizzera" },
  { code: "AT", name: "Austria" },
  { code: "NL", name: "Paesi Bassi" },
  { code: "BE", name: "Belgio" },
  { code: "PT", name: "Portogallo" },
  { code: "US", name: "Stati Uniti" },
  { code: "CN", name: "Cina" },
  { code: "JP", name: "Giappone" },
  { code: "KR", name: "Corea del Sud" },
  { code: "AE", name: "Emirati Arabi" },
  { code: "BR", name: "Brasile" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "IN", name: "India" },
  { code: "MX", name: "Messico" },
];

const PIVA_REGEX = /^(?:[A-Z]{2}[0-9A-Z]{2,20}|[0-9]{11}|CHE-?[0-9]{3}\.?[0-9]{3}\.?[0-9]{3})$/;

function ensureStyles() {
  if (document.getElementById(STYLE_TAG_ID)) return;
  const tag = document.createElement("style");
  tag.id = STYLE_TAG_ID;
  tag.textContent = CSS;
  document.head.appendChild(tag);
}

function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

/**
 * @typedef {Object} BrandRecord
 * @property {string} id
 * @property {string} nome
 * @property {string|null} partita_iva
 * @property {string|null} vat_internazionale
 * @property {string|null} paese
 */

/**
 * @typedef {Object} BrandPickerOptions
 * @property {Object} supabase  Supabase client (gia loggato)
 * @property {boolean} [required=true]
 * @property {boolean} [allowCreate=true]
 * @property {string|null} [initialBrandId]
 * @property {(brand: BrandRecord|null) => void} [onChange]
 * @property {string} [label]  default: "Casa / brand"
 */

/**
 * Monta il componente brand picker dentro container.
 * @param {string|HTMLElement} containerSelector
 * @param {BrandPickerOptions} options
 * @returns {Promise<{getSelected: () => BrandRecord|null, setSelected: (id: string|null) => void, reload: () => Promise<void>, mountedFallback: boolean}>}
 */
export async function mountBrandPicker(containerSelector, options) {
  ensureStyles();

  const opts = options || {};
  const required = opts.required !== false;
  const allowCreate = opts.allowCreate !== false;
  const labelText = opts.label || "Casa / brand";
  const onChange = typeof opts.onChange === "function" ? opts.onChange : () => {};
  const supabase = opts.supabase;

  if (!supabase) throw new Error("brand-picker: option 'supabase' obbligatoria");

  const container = typeof containerSelector === "string"
    ? document.querySelector(containerSelector)
    : containerSelector;
  if (!container) throw new Error("brand-picker: container non trovato: " + containerSelector);

  // STATE
  let brands = [];
  let selected = null; // BrandRecord | null
  let mountedFallback = false;

  // Render scheletro
  const reqMark = required ? `<span class="vbp-req" aria-hidden="true">*</span>` : "";
  container.innerHTML = `
    <div class="vbp-root">
      <label class="vbp-label" for="vbp-${cssId(container)}-sel">
        ${escapeHtml(labelText)}${reqMark}
      </label>
      <div class="vbp-select-row">
        <select id="vbp-${cssId(container)}-sel"
                class="vbp-select"
                aria-label="${escapeHtml(labelText)}"
                ${required ? "required aria-required=\"true\"" : ""}>
          <option value="">— Caricamento brand —</option>
        </select>
        ${allowCreate
          ? `<button type="button" class="vbp-create-btn" data-act="create" aria-label="Crea nuovo brand">+ Nuovo brand</button>`
          : ""}
      </div>
      <div class="vbp-readonly" hidden>
        <div class="vbp-readonly-field">
          <span class="vbp-readonly-label">Partita IVA</span>
          <span class="vbp-readonly-value" data-fill="piva">—</span>
        </div>
        <div class="vbp-readonly-field">
          <span class="vbp-readonly-label">VAT internazionale</span>
          <span class="vbp-readonly-value" data-fill="vat">—</span>
        </div>
      </div>
      <p class="vbp-hint">
        Brand gia registrato? Selezionalo dal menu. Nuovo brand? Clicca
        <strong>+ Nuovo brand</strong>, sara' disponibile per tutte le emissioni
        future.
      </p>
    </div>
  `;

  const selectEl = container.querySelector(".vbp-select");
  const createBtn = container.querySelector('[data-act="create"]');
  const readonlyBox = container.querySelector(".vbp-readonly");
  const fillPiva = container.querySelector('[data-fill="piva"]');
  const fillVat = container.querySelector('[data-fill="vat"]');

  function renderSelect() {
    const opts0 = required ? "" : `<option value="">— Nessuno —</option>`;
    const placeholderOpt = `<option value="">— Seleziona brand —</option>`;
    const items = brands.map((b) => {
      const sel = selected && selected.id === b.id ? " selected" : "";
      const sub = b.partita_iva ? ` · ${escapeHtml(b.partita_iva)}` : "";
      return `<option value="${escapeHtml(b.id)}"${sel}>${escapeHtml(b.nome)}${sub}</option>`;
    }).join("");
    selectEl.innerHTML = (selected ? "" : placeholderOpt) + opts0 + items;
  }

  function updateReadonly() {
    if (!selected) {
      readonlyBox.hidden = true;
      return;
    }
    readonlyBox.hidden = false;
    if (selected.partita_iva) {
      fillPiva.textContent = selected.partita_iva;
      fillPiva.classList.remove("is-empty");
    } else {
      fillPiva.textContent = "Non specificata";
      fillPiva.classList.add("is-empty");
    }
    if (selected.vat_internazionale) {
      fillVat.textContent = selected.vat_internazionale;
      fillVat.classList.remove("is-empty");
    } else {
      fillVat.textContent = "Non specificato";
      fillVat.classList.add("is-empty");
    }
  }

  function setSelected(id) {
    if (!id) {
      selected = null;
    } else {
      selected = brands.find((b) => b.id === id) || null;
    }
    renderSelect();
    updateReadonly();
    onChange(selected);
  }

  selectEl.addEventListener("change", (e) => {
    setSelected(e.target.value || null);
  });

  if (createBtn) {
    createBtn.addEventListener("click", () => openCreateModal());
  }

  async function reload() {
    try {
      const { data, error } = await supabase
        .from("tag_brands")
        .select("id, nome, partita_iva, vat_internazionale, paese")
        .eq("attivo", true)
        .is("archived_at", null)
        .order("nome", { ascending: true });
      if (error) throw error;
      brands = Array.isArray(data) ? data : [];
      // Conserva la selezione se ancora presente
      if (selected && !brands.some((b) => b.id === selected.id)) {
        selected = null;
        onChange(null);
      }
      renderSelect();
      updateReadonly();
      return true;
    } catch (e) {
      mountFallback("Impossibile caricare i brand registrati (" + (e?.message || "errore di rete") + "). Puoi inserire il brand manualmente per questo lotto: non verra' salvato nel portfolio.");
      return false;
    }
  }

  function mountFallback(warningMessage) {
    mountedFallback = true;
    selected = null;
    container.innerHTML = `
      <div class="vbp-root">
        <div class="vbp-warn">${escapeHtml(warningMessage)}</div>
        <div class="vbp-fallback">
          <div>
            <label class="vbp-label" for="vbp-fb-${cssId(container)}-nome">${escapeHtml(labelText)}${reqMark}</label>
            <input id="vbp-fb-${cssId(container)}-nome" type="text" maxlength="200" placeholder="Nome brand" ${required ? "required" : ""}/>
          </div>
          <div>
            <label class="vbp-label" for="vbp-fb-${cssId(container)}-piva">Partita IVA / VAT</label>
            <input id="vbp-fb-${cssId(container)}-piva" type="text" maxlength="40" placeholder="Es. IT01234567890 (11 cifre) o CHE-123.456.789"/>
          </div>
        </div>
      </div>
    `;
    const nomeEl = container.querySelector(`#vbp-fb-${cssId(container)}-nome`);
    const pivaEl = container.querySelector(`#vbp-fb-${cssId(container)}-piva`);
    function emit() {
      const nome = (nomeEl?.value || "").trim();
      const piva = (pivaEl?.value || "").trim();
      selected = nome
        ? { id: null, nome, partita_iva: piva || null, vat_internazionale: null, paese: null, _fallback: true }
        : null;
      onChange(selected);
    }
    nomeEl?.addEventListener("input", emit);
    pivaEl?.addEventListener("input", emit);
  }

  // CREATE MODAL
  function openCreateModal() {
    const backdrop = document.createElement("div");
    backdrop.className = "vbp-modal-backdrop";
    backdrop.setAttribute("role", "dialog");
    backdrop.setAttribute("aria-modal", "true");
    backdrop.setAttribute("aria-labelledby", "vbp-modal-title");

    const paeseOptions = PAESI.map((p) => `<option value="${p.code}">${escapeHtml(p.name)} (${p.code})</option>`).join("");

    backdrop.innerHTML = `
      <div class="vbp-modal">
        <div class="vbp-modal-head">
          <h2 class="vbp-modal-title" id="vbp-modal-title">Nuovo <em>brand</em></h2>
          <button type="button" class="vbp-modal-close" data-act="close" aria-label="Chiudi">×</button>
        </div>
        <div class="vbp-modal-body">
          <div class="vbp-modal-err" data-el="err" hidden></div>
          <div class="vbp-field">
            <label for="vbp-m-nome">Nome brand<span class="vbp-req">*</span></label>
            <input id="vbp-m-nome" type="text" maxlength="200" autocomplete="organization" required/>
            <span class="vbp-modal-help">Sara' visibile in tutti i certificati emessi.</span>
          </div>
          <div class="vbp-field">
            <label for="vbp-m-piva">Partita IVA</label>
            <input id="vbp-m-piva" type="text" maxlength="40" placeholder="Es. IT01234567890 (11 cifre IT) o CHE-123.456.789"/>
            <span class="vbp-modal-help">11 cifre per IT, formato ISO (es. FR12345678901) o CHE-XXX.XXX.XXX per CH.</span>
          </div>
          <div class="vbp-field">
            <label for="vbp-m-vat">VAT internazionale</label>
            <input id="vbp-m-vat" type="text" maxlength="40" placeholder="Es. GB123456789 (solo se diverso dalla P.IVA)"/>
            <span class="vbp-modal-help">Opzionale, solo se il brand opera anche fuori UE con VAT diverso.</span>
          </div>
          <div class="vbp-field">
            <label for="vbp-m-paese">Paese del brand</label>
            <select id="vbp-m-paese">
              <option value="">— seleziona —</option>
              ${paeseOptions}
            </select>
          </div>
          <div class="vbp-field">
            <label for="vbp-m-sito">Sito web (opzionale)</label>
            <input id="vbp-m-sito" type="url" maxlength="200" placeholder="https://…"/>
          </div>
        </div>
        <div class="vbp-modal-foot">
          <button type="button" class="vbp-btn-secondary" data-act="cancel">Annulla</button>
          <button type="button" class="vbp-btn-primary" data-act="save">Crea e seleziona</button>
        </div>
      </div>
    `;
    document.body.appendChild(backdrop);
    document.body.style.overflow = "hidden";

    const modalEl = backdrop.querySelector(".vbp-modal");
    const errEl = backdrop.querySelector('[data-el="err"]');
    const nomeEl = backdrop.querySelector("#vbp-m-nome");
    const pivaEl = backdrop.querySelector("#vbp-m-piva");
    const vatEl = backdrop.querySelector("#vbp-m-vat");
    const paeseEl = backdrop.querySelector("#vbp-m-paese");
    const sitoEl = backdrop.querySelector("#vbp-m-sito");
    const saveBtn = backdrop.querySelector('[data-act="save"]');
    const cancelBtn = backdrop.querySelector('[data-act="cancel"]');
    const closeBtn = backdrop.querySelector('[data-act="close"]');

    // Focus trap basico
    const previouslyFocused = document.activeElement;
    setTimeout(() => nomeEl?.focus(), 50);

    function close() {
      backdrop.remove();
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      if (previouslyFocused && typeof previouslyFocused.focus === "function") {
        previouslyFocused.focus();
      }
    }
    function showErr(msg) {
      errEl.textContent = msg;
      errEl.hidden = false;
    }
    function clearErr() {
      errEl.hidden = true;
      errEl.textContent = "";
    }
    function onKey(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "Tab") {
        // focus trap minimale
        const focusables = modalEl.querySelectorAll("input, select, button");
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);

    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) close();
    });
    cancelBtn.addEventListener("click", close);
    closeBtn.addEventListener("click", close);

    saveBtn.addEventListener("click", async () => {
      clearErr();
      const nome = (nomeEl.value || "").trim();
      const piva = (pivaEl.value || "").trim();
      const vat = (vatEl.value || "").trim();
      const paese = (paeseEl.value || "").trim();
      const sito = (sitoEl.value || "").trim();

      if (nome.length < 2) { showErr("Il nome brand deve avere almeno 2 caratteri."); return; }
      if (piva && !PIVA_REGEX.test(piva.toUpperCase())) {
        showErr("Formato P.IVA non valido. Esempi: 12345678901 (11 cifre IT), IT01234567890, CHE-123.456.789.");
        return;
      }

      saveBtn.disabled = true;
      const origLabel = saveBtn.textContent;
      saveBtn.textContent = "Creazione…";

      try {
        const { data: userData } = await supabase.auth.getUser();
        const userId = userData?.user?.id;
        if (!userId) throw new Error("Sessione scaduta. Effettua di nuovo login.");

        const payload = {
          user_id: userId,
          nome,
          partita_iva: piva ? piva.toUpperCase() : null,
          vat_internazionale: vat || null,
          paese: paese || null,
          sito_web: sito || null,
        };

        const { data: inserted, error } = await supabase
          .from("tag_brands")
          .insert(payload)
          .select("id, nome, partita_iva, vat_internazionale, paese")
          .single();
        if (error) {
          if (/duplicate key|unique/i.test(error.message)) {
            throw new Error("Esiste gia' un brand con questa P.IVA nel tuo portfolio.");
          }
          throw error;
        }

        // Aggiungi al cache locale e seleziona
        brands.push(inserted);
        brands.sort((a, b) => (a.nome || "").localeCompare(b.nome || ""));
        selected = inserted;
        renderSelect();
        updateReadonly();
        onChange(selected);
        close();
      } catch (e) {
        showErr("Errore: " + (e?.message || "impossibile creare il brand"));
        saveBtn.disabled = false;
        saveBtn.textContent = origLabel;
      }
    });
  }

  // BOOT
  await reload();
  if (!mountedFallback && opts.initialBrandId) {
    setSelected(opts.initialBrandId);
  } else if (!mountedFallback) {
    // re-render select per mostrare placeholder corretto
    renderSelect();
  }

  return {
    getSelected: () => selected,
    setSelected,
    reload,
    get mountedFallback() { return mountedFallback; },
  };
}

// Utility: id univoco basato su elemento (per gli htmlFor sui label)
let _vbpCounter = 0;
const _vbpIds = new WeakMap();
function cssId(el) {
  if (_vbpIds.has(el)) return _vbpIds.get(el);
  const id = "vbp" + (++_vbpCounter);
  _vbpIds.set(el, id);
  return id;
}
