// FILE GENERATO: non modificare a mano.
// Fonte: supabase/functions/_shared/tabelle-file.ts e tabelle-testo.ts
// Rigenera con: npm run genera:tabelle-pdf (da apps/web)
// ../../supabase/functions/_shared/tabelle-testo.ts
var TOLLERANZA_RIGA = 2;
var SPAZIO_PAROLE = 4;
var MIN_LARGHEZZA_SPAZIO = 6;
var QUOTA_RUMORE = 0.06;
var QUOTA_ALLINEATE = 0.2;
function soloSegni(v) {
  return !/[\p{L}\p{N}]/u.test(v);
}
function minimo(valori) {
  let m = Infinity;
  for (const v of valori) if (v < m) m = v;
  return m;
}
function massimo(valori) {
  let m = -Infinity;
  for (const v of valori) if (v > m) m = v;
  return m;
}
function righeDellaPagina(pezzi) {
  const validi = pezzi.filter((p) => p.testo.trim() !== "").sort((a, b) => b.y - a.y || a.x - b.x);
  const righe = [];
  for (const p of validi) {
    const ultima = righe[righe.length - 1];
    if (ultima && Math.abs(ultima.y - p.y) <= TOLLERANZA_RIGA) ultima.pezzi.push(p);
    else righe.push({ y: p.y, pezzi: [p] });
  }
  return righe.map((r) => {
    const ordinati = [...r.pezzi].sort((a, b) => a.x - b.x);
    const blocchi = [];
    for (const p of ordinati) {
      const ultimo = blocchi[blocchi.length - 1];
      const fine = p.x + Math.max(p.larghezza, 0);
      const dueNumeri = ultimo && p.x - ultimo.x1 > 1 && numeroItaliano(ultimo.testo) !== null && numeroItaliano(p.testo) !== null;
      if (ultimo && !dueNumeri && p.x - ultimo.x1 < SPAZIO_PAROLE) {
        const serveSpazio = !/\s$/.test(ultimo.testo) && !/^\s/.test(p.testo) && p.x - ultimo.x1 > 0.5;
        blocchi[blocchi.length - 1] = { testo: ultimo.testo + (serveSpazio ? " " : "") + p.testo, x0: ultimo.x0, x1: Math.max(ultimo.x1, fine) };
      } else {
        blocchi.push({ testo: p.testo, x0: p.x, x1: fine });
      }
    }
    return { y: r.y, blocchi: blocchi.map((b) => ({ ...b, testo: b.testo.replace(/\s+/g, " ").trim() })).filter((b) => b.testo) };
  });
}
function confiniColonne(righe) {
  const tutti = righe.flatMap((r) => r.blocchi);
  if (tutti.length === 0) return [];
  const inizio = Math.floor(minimo(tutti.map((b) => b.x0)));
  const fine = Math.ceil(massimo(tutti.map((b) => b.x1)));
  const copertura = new Array(fine - inizio + 1).fill(0);
  for (const b of tutti) {
    for (let x = Math.floor(b.x0); x < Math.ceil(b.x1); x++) copertura[x - inizio]++;
  }
  const soglia = Math.max(1, Math.floor(righe.length * QUOTA_RUMORE));
  const confini = [];
  let partenza = -1;
  for (let i = 0; i <= copertura.length; i++) {
    const libero = i < copertura.length && copertura[i] <= soglia;
    if (libero && partenza < 0) partenza = i;
    if (!libero && partenza >= 0) {
      const ampiezza = i - partenza;
      if (partenza > 0 && i < copertura.length && ampiezza >= MIN_LARGHEZZA_SPAZIO) {
        confini.push(...confiniNelCorridoio(tutti, inizio + partenza, inizio + i));
      }
      partenza = -1;
    }
  }
  return confini;
}
function confiniNelCorridoio(tutti, da, a) {
  const dentro = tutti.filter((b) => b.x0 >= da && b.x1 <= a && b.testo.replace(/[^\p{L}\p{N}]/gu, "").length >= 2);
  if (dentro.length < 2) return [(da + a) / 2];
  const occupato = new Array(Math.ceil(a - da) + 1).fill(false);
  for (const b of dentro) {
    for (let x = Math.floor(b.x0 - da); x < Math.ceil(b.x1 - da); x++) occupato[x] = true;
  }
  const confini = [];
  let inizioVuoto = -1;
  for (let i = 0; i <= occupato.length; i++) {
    const vuoto = i < occupato.length && !occupato[i];
    if (vuoto && inizioVuoto < 0) inizioVuoto = i;
    if (!vuoto && inizioVuoto >= 0) {
      if (i - inizioVuoto >= 3) confini.push(da + (inizioVuoto + i) / 2);
      inizioVuoto = -1;
    }
  }
  return confini.length ? confini : [(da + a) / 2];
}
function bordiAllineati(righe, lato) {
  const tutti = righe.flatMap((r) => r.blocchi);
  const posizioni = tutti.map((b) => Math.round(lato === "inizio" ? b.x0 : b.x1));
  if (posizioni.length === 0) return [];
  const margine = lato === "inizio" ? minimo(posizioni) : massimo(posizioni);
  const conteggio = /* @__PURE__ */ new Map();
  for (const x of posizioni) conteggio.set(x, (conteggio.get(x) ?? 0) + 1);
  const intorno = (x) => (conteggio.get(x - 1) ?? 0) + (conteggio.get(x) ?? 0) + (conteggio.get(x + 1) ?? 0);
  const righeTabella = righe.filter((r) => r.blocchi.length >= 2).length || righe.length;
  const soglia = Math.max(3, Math.ceil(righeTabella * QUOTA_ALLINEATE));
  const trovati = [];
  for (const x of [...conteggio.keys()].sort((a, b) => a - b)) {
    if (Math.abs(x - margine) < MIN_LARGHEZZA_SPAZIO) continue;
    if (intorno(x) >= soglia && (trovati.length === 0 || x - trovati[trovati.length - 1] > 2)) trovati.push(x);
  }
  const scarto = lato === "inizio" ? -1.5 : 1.5;
  return trovati.filter((x) => {
    const c = x + scarto;
    const attraversano = tutti.filter((b) => b.x0 < c - 1 && b.x1 > c + 1).length;
    return attraversano * 2 <= intorno(x);
  }).map((x) => x + scarto);
}
function unisciConfini(...gruppi) {
  const tutti = gruppi.flat().sort((x, y) => x - y);
  const uscita = [];
  for (const c of tutti) {
    if (uscita.length && c - uscita[uscita.length - 1] < MIN_LARGHEZZA_SPAZIO) continue;
    uscita.push(c);
  }
  return uscita;
}
function colonnaDi(b, confini) {
  const punto = b.x1 - b.x0 < 40 ? (b.x0 + b.x1) / 2 : b.x0;
  let c = 0;
  while (c < confini.length && punto > confini[c]) c++;
  return c;
}
function numeroItaliano(s) {
  const t = s.replace(/^\s*[-–—]\s+|\s+[-–—]\s*$/g, "").replace(/\s/g, "").replace(/^€|€$/g, "");
  if (!/^-?(\d{1,3}(\.\d{3})+|\d+)(,\d+)?$/.test(t)) return null;
  if (/\.\d{3}$/.test(t) && !t.includes(",")) return null;
  if (t.replace(/\D/g, "").length > 15) return null;
  const n = Number(t.replace(/\./g, "").replace(",", "."));
  return Number.isFinite(n) ? n : null;
}
function tabellaDaTesto(pagine) {
  const perPagina = pagine.map(righeDellaPagina);
  const righe = perPagina.flat();
  if (righe.length === 0) return [];
  const firmaRiga = (r) => r.blocchi.map((b) => `${Math.round(b.x0)}:${b.testo}`).join("|");
  const pagineConRiga = /* @__PURE__ */ new Map();
  for (const pag of perPagina) for (const f of new Set(pag.map(firmaRiga))) pagineConRiga.set(f, (pagineConRiga.get(f) ?? 0) + 1);
  const minimoRipetute = Math.max(2, Math.ceil(perPagina.length / 2));
  const daAnalizzare = righe.filter((r) => (pagineConRiga.get(firmaRiga(r)) ?? 0) < minimoRipetute);
  const base = daAnalizzare.length ? daAnalizzare : righe;
  const confini = unisciConfini(confiniColonne(base), bordiAllineati(base, "inizio"), bordiAllineati(base, "fine"));
  const nColonne = confini.length + 1;
  if (nColonne < 2) return [];
  const uscita = [];
  {
    const celle = righe.map((r) => {
      const riga = new Array(nColonne).fill("");
      for (const b of r.blocchi) {
        const c = colonnaDi(b, confini);
        riga[c] = unisciPezzo(riga[c], b.testo, " ");
      }
      return riga;
    });
    const peso = new Array(nColonne).fill(0);
    for (const r of celle) r.forEach((v, i) => {
      peso[i] += v.length;
    });
    const colTesto = peso.indexOf(massimo(peso));
    const unite = [];
    for (const r of celle) {
      const chiaviVuote = colTesto > 0 && r.slice(0, colTesto).every((v) => v === "");
      const precedente = unite[unite.length - 1];
      const precedenteHaChiave = precedente && precedente.slice(0, colTesto).some((v) => v !== "");
      if (chiaviVuote && precedenteHaChiave) {
        unite[unite.length - 1] = precedente.map((v, i) => unisciPezzo(v, r[i], "\n"));
      } else {
        unite.push(r);
      }
    }
    const usate = Array.from({ length: nColonne }, (_, c) => unite.some((r) => r[c] !== ""));
    const compatte = unisciColonneComplementari(unite.map((r) => r.filter((_, c) => usate[c])));
    for (const r of compatte) uscita.push(r.map((v) => numeroItaliano(v) ?? v));
  }
  return senzaIntestazioniRipetute(uscita, pagine.length);
}
var segnaposto = (v) => /^[\s\-–—€.…]+$/.test(v);
function unisciPezzo(cella, pezzo, separatore) {
  if (!pezzo) return cella;
  if (!cella) return pezzo;
  const numerico = (v) => numeroItaliano(v.replace(/\s*%$/, "")) !== null;
  if (segnaposto(pezzo) && numerico(cella)) return cella;
  if (segnaposto(cella) && numerico(pezzo)) return pezzo;
  return `${cella}${separatore}${pezzo}`;
}
function unisciColonneComplementari(righe) {
  let tabella = righe;
  let c = 0;
  const vuota = soloSegni;
  while (tabella.length && c + 1 < tabella[0].length) {
    const complementari = tabella.every((r) => vuota(r[c]) || vuota(r[c + 1]));
    if (!complementari) {
      c++;
      continue;
    }
    const unita = (a, b) => segnaposto(a) && !vuota(b) ? b : segnaposto(b) && !vuota(a) ? a : unisciPezzo(a, b, " ");
    tabella = tabella.map((r) => [...r.slice(0, c), unita(r[c], r[c + 1]), ...r.slice(c + 2)]);
  }
  return tabella;
}
function senzaIntestazioniRipetute(t, nPagine) {
  if (nPagine < 2) return t;
  const firma = (r) => r.join("");
  const conteggio = /* @__PURE__ */ new Map();
  for (const r of t) conteggio.set(firma(r), (conteggio.get(firma(r)) ?? 0) + 1);
  const soglia = Math.max(2, Math.ceil(nPagine / 2));
  const viste = /* @__PURE__ */ new Set();
  return t.filter((r) => {
    const f = firma(r);
    const ripetuta = (conteggio.get(f) ?? 0) >= soglia && r.every((v) => typeof v === "string");
    if (!ripetuta) return true;
    if (viste.has(f)) return false;
    viste.add(f);
    return true;
  });
}
function pagineRichieste(testo, totale) {
  const tutte = Array.from({ length: totale }, (_, i) => i + 1);
  const t = (testo ?? "").trim().toLowerCase();
  if (!t || t === "all") return tutte;
  const scelte = /* @__PURE__ */ new Set();
  for (const parte of t.split(",")) {
    const m = parte.trim().match(/^(\d+)(?:\s*-\s*(\d+))?$/);
    if (!m) continue;
    const da = Number(m[1]);
    const a = m[2] ? Number(m[2]) : da;
    for (let p = Math.max(1, da); p <= Math.min(totale, a); p++) scelte.add(p);
  }
  return scelte.size ? [...scelte].sort((x, y) => x - y) : tutte;
}

// ../../supabase/functions/_shared/tabelle-file.ts
async function pagineDalPdf(pdf, numeri) {
  const pagine = [];
  for (const n of numeri) {
    const contenuto = await (await pdf.getPage(n)).getTextContent();
    const pezzi = [];
    for (const it of contenuto.items) {
      if (typeof it.str !== "string" || !Array.isArray(it.transform)) continue;
      pezzi.push({ testo: it.str, x: Number(it.transform[4]), y: Number(it.transform[5]), larghezza: Number(it.width) || 0 });
    }
    pagine.push(pezzi);
  }
  return pagine;
}
function tabellaUtile(t) {
  return t.filter((r) => r.filter((v) => v !== "").length >= 2).length >= 2;
}
function nomeUscita(nomePdf, formato) {
  const base = nomePdf.replace(/\.[^.]+$/, "").replace(/[\r\n"\\/:*?<>|]/g, "_").trim() || "tabella";
  return `${base}.${formato}`;
}
function creaFileTabella(t, formato, nomePdf) {
  if (formato === "csv") {
    return { bytes: new TextEncoder().encode(tabellaInCsv(t)), contentType: "text/csv; charset=utf-8", nomeFile: nomeUscita(nomePdf, "csv") };
  }
  return {
    bytes: zipSemplice(fileXlsx(t)),
    contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    nomeFile: nomeUscita(nomePdf, "xlsx")
  };
}
async function tabellaDaPdf(pdf, formato, nomePdf, pagine, maxPagine = Infinity, fileMotore) {
  const numeri = pagineRichieste(pagine, pdf.numPages);
  if (numeri.length > maxPagine) return null;
  const tabella = tabellaDaTesto(await pagineDalPdf(pdf, numeri));
  if (!tabellaUtile(tabella)) return null;
  if (fileMotore && !await ricostruzioneMigliore(fileMotore, tabella)) return null;
  return creaFileTabella(tabella, formato, nomePdf);
}
var QUOTA_MINIMA_MOTORE = 0.5;
var MAX_TESTO_ZIP = 5e7;
function caratteriUtili(s) {
  const m = s.match(/[\p{L}\p{N}]/gu);
  return m ? m.length : 0;
}
function caratteriDellaTabella(t) {
  let n = 0;
  for (const r of t) for (const v of r) n += caratteriUtili(typeof v === "number" ? String(v) : v);
  return n;
}
async function ricostruzioneMigliore(fileMotore, ricostruita) {
  const nostri = caratteriDellaTabella(ricostruita);
  if (nostri === 0) return false;
  return caratteriUtili(await testoDelFileMotore(fileMotore)) < nostri * QUOTA_MINIMA_MOTORE;
}
async function testoDelFileMotore(bytes) {
  if (!(bytes[0] === 80 && bytes[1] === 75)) return new TextDecoder().decode(bytes);
  let voci;
  try {
    voci = await vociZip(bytes);
  } catch {
    return "";
  }
  const condivisi = [];
  for (const [nome, contenuto] of voci) {
    if (!/sharedStrings\.xml$/i.test(nome)) continue;
    for (const si of contenuto.matchAll(/<si\b[^>]*>([\s\S]*?)<\/si>/g)) {
      condivisi.push([...si[1].matchAll(/<t\b[^>]*>([^<]*)<\/t>/g)].map((m) => m[1]).join(""));
    }
  }
  const parti = [];
  for (const [nome, contenuto] of voci) {
    if (/\.csv$/i.test(nome)) parti.push(contenuto);
    else if (/worksheets\/[^/]+\.xml$/i.test(nome)) {
      for (const c of contenuto.matchAll(/<c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
        if (!c[2]) continue;
        if (/\bt="s"/.test(c[1])) {
          const indice = c[2].match(/<v>(\d+)<\/v>/);
          if (indice) parti.push(condivisi[Number(indice[1])] ?? "");
          continue;
        }
        for (const x of c[2].matchAll(/<(t|v)\b[^>]*>([^<]*)<\/\1>/g)) parti.push(x[2]);
      }
    }
  }
  return parti.join(" ");
}
async function vociZip(bytes) {
  const vista = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let fine = bytes.length - 22;
  while (fine >= 0 && vista.getUint32(fine, true) !== 101010256) fine--;
  if (fine < 0) return [];
  const quante = vista.getUint16(fine + 10, true);
  let p = vista.getUint32(fine + 16, true);
  const dec = new TextDecoder();
  const voci = [];
  let totale = 0;
  for (let i = 0; i < quante && p + 46 <= bytes.length; i++) {
    if (vista.getUint32(p, true) !== 33639248) break;
    const metodo = vista.getUint16(p + 10, true);
    const compresso = vista.getUint32(p + 20, true);
    const lungNome = vista.getUint16(p + 28, true);
    const locale = vista.getUint32(p + 42, true);
    const nome = dec.decode(bytes.subarray(p + 46, p + 46 + lungNome));
    p += 46 + lungNome + vista.getUint16(p + 30, true) + vista.getUint16(p + 32, true);
    if (!/\.(xml|csv)$/i.test(nome) || locale + 30 > bytes.length) continue;
    const inizio = locale + 30 + vista.getUint16(locale + 26, true) + vista.getUint16(locale + 28, true);
    const dati = bytes.slice(inizio, inizio + compresso);
    let testo;
    if (metodo === 0) testo = dec.decode(dati);
    else if (metodo === 8) {
      testo = await new Response(new Blob([dati.buffer]).stream().pipeThrough(new DecompressionStream("deflate-raw"))).text();
    } else continue;
    totale += testo.length;
    if (totale > MAX_TESTO_ZIP) break;
    voci.push([nome, testo]);
  }
  return voci;
}
function tabellaInCsv(t) {
  const campo = (v) => {
    const s = typeof v === "number" ? String(v).replace(".", ",") : v;
    return /[;"\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return "\uFEFF" + t.map((r) => r.map(campo).join(";")).join("\r\n") + "\r\n";
}
var xml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "");
function nomeColonna(i) {
  let n = i + 1;
  let s = "";
  while (n > 0) {
    const r = (n - 1) % 26;
    s = String.fromCharCode(65 + r) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}
function lunghezzaMassima(valori) {
  let m = 0;
  for (const v of valori) for (const riga of String(v ?? "").split("\n")) if (riga.length > m) m = riga.length;
  return m;
}
function fileXlsx(t) {
  let nCol = 1;
  for (const r of t) if (r.length > nCol) nCol = r.length;
  const larghezze = Array.from({ length: nCol }, (_, c) => Math.min(80, Math.max(4, lunghezzaMassima(t.map((r) => r[c] ?? ""))) + 2));
  const righe = t.map((r, ri) => {
    const celle = r.map((v, ci) => {
      const rif = `${nomeColonna(ci)}${ri + 1}`;
      if (typeof v === "number") return `<c r="${rif}" s="1"><v>${v}</v></c>`;
      if (v === "") return "";
      return `<c r="${rif}" t="inlineStr" s="1"><is><t xml:space="preserve">${xml(v)}</t></is></c>`;
    }).join("");
    return `<row r="${ri + 1}">${celle}</row>`;
  }).join("");
  return {
    "[Content_Types].xml": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>`,
    "_rels/.rels": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`,
    "xl/workbook.xml": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Tabella" sheetId="1" r:id="rId1"/></sheets></workbook>`,
    "xl/_rels/workbook.xml.rels": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`,
    "xl/styles.xml": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="1"><font><sz val="11"/><name val="Calibri"/></font></fonts><fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf></cellXfs></styleSheet>`,
    "xl/worksheets/sheet1.xml": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><cols>${larghezze.map((w, i) => `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`).join("")}</cols><sheetData>${righe}</sheetData></worksheet>`
  };
}
var TABELLA_CRC = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(dati) {
  let c = 4294967295;
  for (let i = 0; i < dati.length; i++) c = TABELLA_CRC[(c ^ dati[i]) & 255] ^ c >>> 8;
  return (c ^ 4294967295) >>> 0;
}
function zipSemplice(file) {
  const enc = new TextEncoder();
  const voci = Object.entries(file).map(([nome, testo]) => {
    const dati = enc.encode(testo);
    return { nome: enc.encode(nome), dati, crc: crc32(dati) };
  });
  let dimensione = 22;
  for (const v of voci) dimensione += 30 + v.nome.length + v.dati.length + 46 + v.nome.length;
  const uscita = new Uint8Array(dimensione);
  const vista = new DataView(uscita.buffer);
  let pos = 0;
  const posizioni = [];
  const ora = 0;
  const data = 2026 - 1980 << 9 | 1 << 5 | 1;
  for (const v of voci) {
    posizioni.push(pos);
    vista.setUint32(pos, 67324752, true);
    vista.setUint16(pos + 4, 20, true);
    vista.setUint16(pos + 6, 2048, true);
    vista.setUint16(pos + 8, 0, true);
    vista.setUint16(pos + 10, ora, true);
    vista.setUint16(pos + 12, data, true);
    vista.setUint32(pos + 14, v.crc, true);
    vista.setUint32(pos + 18, v.dati.length, true);
    vista.setUint32(pos + 22, v.dati.length, true);
    vista.setUint16(pos + 26, v.nome.length, true);
    vista.setUint16(pos + 28, 0, true);
    uscita.set(v.nome, pos + 30);
    uscita.set(v.dati, pos + 30 + v.nome.length);
    pos += 30 + v.nome.length + v.dati.length;
  }
  const inizioIndice = pos;
  voci.forEach((v, i) => {
    vista.setUint32(pos, 33639248, true);
    vista.setUint16(pos + 4, 20, true);
    vista.setUint16(pos + 6, 20, true);
    vista.setUint16(pos + 8, 2048, true);
    vista.setUint16(pos + 10, 0, true);
    vista.setUint16(pos + 12, ora, true);
    vista.setUint16(pos + 14, data, true);
    vista.setUint32(pos + 16, v.crc, true);
    vista.setUint32(pos + 20, v.dati.length, true);
    vista.setUint32(pos + 24, v.dati.length, true);
    vista.setUint16(pos + 28, v.nome.length, true);
    vista.setUint16(pos + 30, 0, true);
    vista.setUint16(pos + 32, 0, true);
    vista.setUint16(pos + 34, 0, true);
    vista.setUint16(pos + 36, 0, true);
    vista.setUint32(pos + 38, 0, true);
    vista.setUint32(pos + 42, posizioni[i], true);
    uscita.set(v.nome, pos + 46);
    pos += 46 + v.nome.length;
  });
  vista.setUint32(pos, 101010256, true);
  vista.setUint16(pos + 8, voci.length, true);
  vista.setUint16(pos + 10, voci.length, true);
  vista.setUint32(pos + 12, pos - inizioIndice, true);
  vista.setUint32(pos + 16, inizioIndice, true);
  return uscita;
}
export {
  QUOTA_MINIMA_MOTORE,
  caratteriDellaTabella,
  crc32,
  creaFileTabella,
  fileXlsx,
  nomeUscita,
  pagineDalPdf,
  pagineRichieste,
  ricostruzioneMigliore,
  tabellaDaPdf,
  tabellaDaTesto,
  tabellaInCsv,
  tabellaUtile,
  testoDelFileMotore,
  zipSemplice
};
