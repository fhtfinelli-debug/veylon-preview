// =========================================================
// VEYLON - Auth guard helper
// ---------------------------------------------------------
// Wrapper compatto per proteggere una pagina:
//
//   import { protectPage } from "./_shared/auth-guard.js";
//   const { session, user } = await protectPage();
//
// Per default redirige a login.html?next=... se non autenticato.
// =========================================================

import { supabase, requireSession, getUser, signOut, getDisplayName } from "./supabase-client.js";

export async function protectPage(opts = {}) {
  const redirectTo = opts.redirectTo || "login.html";
  const session = await requireSession(redirectTo);
  if (!session) {
    // requireSession ha gia' avviato il redirect; interrompiamo l'esecuzione
    // chiamante con un throw per evitare codice DOM eseguito senza sessione.
    throw new Error("veylon:redirecting-to-login");
  }
  const user = await getUser();

  // Installa compat shim per il codice legacy delle pagine "atti":
  //   const s = JSON.parse(localStorage.getItem('veylon_session'));
  //   s.access_token  /  s.user.email
  // Cosi' i getJwt() legacy continuano a funzionare senza modifiche.
  installLegacyShim(session, user);

  return { session, user };
}

// Espone su window.veylonAuth utility per pagine non-modulo
// e mantiene compat con localStorage['veylon_session'].
function installLegacyShim(session, user) {
  try {
    const shim = {
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      expires_at: session.expires_at,
      authenticated: true,
      since: new Date().toISOString(),
      user: user ? {
        id: user.id,
        email: user.email,
        nome: user.user_metadata?.nome || user.user_metadata?.full_name || null,
      } : null,
    };
    localStorage.setItem("veylon_session", JSON.stringify(shim));

    // Auto-refresh dello shim quando il token Supabase si rinnova
    supabase.auth.onAuthStateChange((event, newSession) => {
      if (event === "SIGNED_OUT") {
        localStorage.removeItem("veylon_session");
        return;
      }
      if (newSession) {
        const updated = {
          ...shim,
          access_token: newSession.access_token,
          refresh_token: newSession.refresh_token,
          expires_at: newSession.expires_at,
        };
        localStorage.setItem("veylon_session", JSON.stringify(updated));
      }
    });

    window.veylonAuth = {
      getJwt: () => session.access_token,
      user,
      signOut,
    };
  } catch (e) {
    console.error("[veylon-auth] installLegacyShim error", e);
  }
}

// Aggancia un click handler "Esci" agli elementi indicati (default: #logout).
// Usabile cosi':
//   bindLogout();                        // cerca #logout
//   bindLogout("#mio-link-esci");        // selettore custom
export function bindLogout(selector = "#logout") {
  const els = document.querySelectorAll(selector);
  els.forEach((el) => {
    el.addEventListener("click", (ev) => {
      ev.preventDefault();
      signOut();
    });
  });
}

// Comodo per le navbar: imposta il testo dell'elemento `target`
// con l'email/nome dell'utente.
export function renderUserBadge(user, selector = "#user-email") {
  const el = document.querySelector(selector);
  if (!el) return;
  el.textContent = getDisplayName(user);
}
