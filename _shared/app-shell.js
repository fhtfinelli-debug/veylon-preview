// =============================================================================
// VEYLON · app-shell.js
// Sidebar laterale fissa per le pagine app interne (protected).
// Importato dopo protectPage() in ogni pagina app.
// =============================================================================

import { getUser, signOut } from "./supabase-client.js";

// Lista flat — una voce per sezione. Niente sub-items per non incasinare.
// Le pagine secondarie (cert-emetti, tag-storico, ecc.) si raggiungono
// navigando DENTRO la sezione principale.
// Menu fisso 13 voci (12 atti + Strumenti, 2026-06-19).
// Admin accessibile via URL diretto /admin.html (non in nav).
const NAV = [
  { key: "dashboard",   label: "Cruscotto",  href: "dashboard.html" },
  { key: "notarizza",   label: "Sigillo",    href: "notarizza.html" },
  { key: "invia",       label: "Send",       href: "invia.html" },
  { key: "mail",        label: "Mail",       href: "mail.html" },
  { key: "firma",       label: "Firma",      href: "firma.html" },
  { key: "garanzie",    label: "Garanzie",   href: "garanzie.html" },
  { key: "onboarding",  label: "KYC",        href: "onboarding.html" },
  { key: "tag",         label: "Tag",        href: "tag.html" },
  { key: "cert",        label: "Cert",       href: "cert.html" },
  { key: "archivio",    label: "Archivio",   href: "archivio.html" },
  { key: "strumenti",   label: "Strumenti",  href: "strumenti-pdf.html" },
  { key: "verifica",    label: "Verifica",   href: "verifica.html" },
  { key: "logout",      label: "Esci",       href: "#",               action: "logout" },
];

// Mappa di pagine secondarie -> chiave sezione, per evidenziare correttamente
// il link attivo anche quando l'utente naviga in sotto-pagine.
const SECTION_OF = {
  "trasmissioni":         "invia",
  "condivisione":         "archivio",
  "tag-onboarding":       "tag",
  "tag-emetti":           "tag",
  "tag-batch":            "tag",
  "tag-storico":          "tag",
  "tag-trasferisci":      "tag",
  "tag-prodotti":         "tag",
  "cert-istituzione":     "cert",
  "cert-emetti":          "cert",
  "cert-emetti-batch":    "cert",
  "cert-mio":             "cert",
  "certificato":          "cert",
  "certificazioni":       "cert",
  // ProofOS — sotto-pagine della sezione Mail
  "proof-inbox":          "mail",
  "proof-archive":        "mail",
  "proof-capsule-detail": "mail",
  "proof-cases":          "mail",
  "proof-case-detail":    "mail",
};

export async function renderAppShell(activeKey = "") {
  const sectionKey = SECTION_OF[activeKey] ?? activeKey;
  const user = await getUser();
  const email = user?.email ?? "";
  const initials = (email.split("@")[0] || "u").slice(0, 2).toUpperCase();

  const linksHtml = NAV.map((it) => {
    const cls = `appside-link${it.key === sectionKey ? " is-active" : ""}${it.action === "logout" ? " is-logout" : ""}`;
    const dataAttr = it.action ? ` data-action="${it.action}"` : "";
    return `<li><a href="${it.href}" class="${cls}"${dataAttr}>${escapeHtml(it.label)}</a></li>`;
  }).join("");

  const sidebarHtml = `
    <button class="app-drawer-toggle" id="app-drawer-toggle" type="button" aria-label="Apri menu" aria-controls="app-sidebar" aria-expanded="false">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      <span class="sr-only">Menu</span>
    </button>
    <div class="app-drawer-backdrop" id="app-drawer-backdrop" aria-hidden="true"></div>
    <aside class="app-sidebar" id="app-sidebar" aria-label="Navigazione principale">
      <div class="appside-brand">
        <a href="dashboard.html" class="appside-brand-link" aria-label="Veylon — Cruscotto">
          <span class="appside-brand-name">VEYLON</span>
          <span class="appside-brand-tag">Certificazione legale</span>
        </a>
      </div>
      <nav class="appside-nav" aria-label="Sezioni">
        <ul class="appside-list" role="list">
          ${linksHtml}
        </ul>
      </nav>
      <div class="appside-user">
        <button class="appside-user-card" id="appside-logout" type="button" aria-label="Esci dall'account">
          <span class="appside-avatar" aria-hidden="true">${escapeHtml(initials)}</span>
          <span class="appside-user-meta">
            <span class="appside-user-email">${escapeHtml(email)}</span>
            <span class="appside-user-action">Esci</span>
          </span>
        </button>
      </div>
    </aside>
  `;

  const body = document.body;
  body.classList.add("app");

  // Wrappa il content esistente in <main class="app-main">
  const main = document.createElement("main");
  main.className = "app-main";
  while (body.firstChild) main.appendChild(body.firstChild);

  // Inietta sidebar + main
  body.insertAdjacentHTML("afterbegin", sidebarHtml);
  body.appendChild(main);

  // Logout (sia voce nav "Esci" sia user-card bottom)
  async function doLogout(e) {
    e.preventDefault();
    await signOut();
  }
  document.getElementById("appside-logout")?.addEventListener("click", doLogout);
  document.querySelectorAll('.appside-link[data-action="logout"]').forEach((a) =>
    a.addEventListener("click", doLogout)
  );

  // Drawer mobile
  const toggleBtn = document.getElementById("app-drawer-toggle");
  const sidebar = document.getElementById("app-sidebar");
  const backdrop = document.getElementById("app-drawer-backdrop");
  function closeDrawer() {
    sidebar?.classList.remove("is-open");
    backdrop?.classList.remove("is-open");
    toggleBtn?.setAttribute("aria-expanded", "false");
  }
  function openDrawer() {
    sidebar?.classList.add("is-open");
    backdrop?.classList.add("is-open");
    toggleBtn?.setAttribute("aria-expanded", "true");
  }
  toggleBtn?.addEventListener("click", () => {
    sidebar?.classList.contains("is-open") ? closeDrawer() : openDrawer();
  });
  backdrop?.addEventListener("click", closeDrawer);
  sidebar?.querySelectorAll(".appside-link").forEach((a) => a.addEventListener("click", closeDrawer));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeDrawer(); });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
