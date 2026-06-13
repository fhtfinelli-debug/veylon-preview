// =========================================================
// VEYLON - Supabase client singleton
// ---------------------------------------------------------
// Tutti i moduli pages/*.html importano da qui:
//   import { supabase, requireSession, getUser, signOut }
//   from "./_shared/supabase-client.js";
//
// Endpoint: https://hanxxxtgxofjkfdjegfe.supabase.co
// Chiave ANON pubblica (sicura da committere - PostgREST con RLS).
// =========================================================

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const SUPABASE_URL = "https://hanxxxtgxofjkfdjegfe.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
  "eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhhbnh4eHRneG9mamtmZGplZ2ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MDU0ODcsImV4cCI6MjA5NjQ4MTQ4N30." +
  "feoybVVmvEP0N4vwkaOrrWqXDyVH48LPGrsCL0n9aOw";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: "pkce",
    storageKey: "veylon-auth",
  },
});

// ---------------------------------------------------------
// requireSession
// ---------------------------------------------------------
// Verifica che esista una sessione attiva.
// Se assente, redirige a login.html conservando il path corrente
// nel parametro `?next=` per riprendere la navigazione dopo l'accesso.
//
// Ritorna la sessione attiva oppure `null` se sta gia' redirigendo.
// ---------------------------------------------------------
export async function requireSession(redirectTo = "login.html") {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error("[veylon-auth] getSession error", error);
    }
    const session = data?.session ?? null;
    if (!session) {
      const next = encodeURIComponent(
        window.location.pathname + window.location.search,
      );
      window.location.href = redirectTo + "?next=" + next;
      return null;
    }
    return session;
  } catch (e) {
    console.error("[veylon-auth] requireSession threw", e);
    window.location.href = redirectTo;
    return null;
  }
}

// ---------------------------------------------------------
// getUser
// ---------------------------------------------------------
// Ritorna l'utente autenticato corrente (o null).
// ---------------------------------------------------------
export async function getUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error("[veylon-auth] getUser error", error);
    return null;
  }
  return data?.user ?? null;
}

// ---------------------------------------------------------
// signOut
// ---------------------------------------------------------
// Chiude la sessione e redirige alla pagina di login.
// ---------------------------------------------------------
export async function signOut(redirectTo = "login.html") {
  try {
    await supabase.auth.signOut();
  } catch (e) {
    console.error("[veylon-auth] signOut error", e);
  }
  // Compat: pulisce anche il vecchio cookie demo se presente
  try {
    localStorage.removeItem("veylon_session");
  } catch (e) {
    // ignore
  }
  window.location.href = redirectTo;
}

// ---------------------------------------------------------
// getDisplayName
// ---------------------------------------------------------
// Ritorna un nome leggibile per l'utente:
//   user_metadata.nome  ->  user_metadata.full_name  ->  email
// ---------------------------------------------------------
export function getDisplayName(user) {
  if (!user) return "";
  const meta = user.user_metadata || {};
  return meta.nome || meta.full_name || meta.name || user.email || "";
}
