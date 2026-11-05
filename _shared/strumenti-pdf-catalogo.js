// GENERATO da apps/web/scripts/genera-catalogo-pdf.mjs a partire da apps/web/src/data/strumentiPdfCatalog.ts.
// Non modificare a mano: cambia il catalogo TypeScript e lancia `npm run genera:catalogo-pdf` in apps/web.
export const MAX_MB = 50;
export const CATEGORIE = [{"key":"sicurezza","label":"Sicurezza"},{"key":"conversione","label":"Conversione"},{"key":"pagine","label":"Organizza pagine"},{"key":"modifica","label":"Modifica & ritocco"},{"key":"analisi","label":"Analisi"},{"key":"moduli","label":"Moduli"},{"key":"filtri","label":"Controlli"}];
export const IN_PRIMO_PIANO = ["ocr-pdf","merge-pdfs","compress-pdf","cert-sign","pdf-to-word"];
export const STRUMENTI = [
 {
  "id": "add-password",
  "cat": "sicurezza",
  "tag": "Sicurezza",
  "nome": "Aggiungi password",
  "desc": "Protegge il PDF con una password: senza, nessuno può aprirlo. Utile per inviare per email documenti riservati come contratti, buste paga o bilanci.",
  "endpoint": "/api/v1/security/add-password",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF da cifrare",
    "required": true,
    "accept": "application/pdf"
   },
   {
    "kind": "password",
    "name": "password",
    "label": "Password di apertura",
    "required": true
   },
   {
    "kind": "password",
    "name": "ownerPassword",
    "label": "Password per modificare (facoltativa)"
   },
   {
    "kind": "select",
    "name": "keyLength",
    "label": "Livello di protezione",
    "options": [
     [
      "256",
      "Massimo (AES 256 bit)"
     ],
     [
      "128",
      "Standard (AES 128 bit)"
     ]
    ]
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Protegge il PDF con una password: senza, nessuno può aprirlo. Utile per inviare per email documenti riservati come contratti, buste paga o bilanci.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF da cifrare».",
    "Compila le impostazioni: «Password di apertura» (obbligatorio), «Password per modificare (facoltativa)», «Livello di protezione».",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "remove-password",
  "cat": "sicurezza",
  "tag": "Sicurezza",
  "nome": "Rimuovi password",
  "desc": "Toglie la password a un PDF protetto, se la conosci, così puoi aprirlo, unirlo ad altri o archiviarlo senza blocchi.",
  "endpoint": "/api/v1/security/remove-password",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF protetto",
    "required": true,
    "accept": "application/pdf"
   },
   {
    "kind": "password",
    "name": "password",
    "label": "Password attuale",
    "required": true
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Toglie la password a un PDF protetto, se la conosci, così puoi aprirlo, unirlo ad altri o archiviarlo senza blocchi.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF protetto».",
    "Compila le impostazioni: «Password attuale» (obbligatorio).",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "verify-pdf",
  "cat": "sicurezza",
  "tag": "Sicurezza",
  "nome": "Verifica integrità",
  "desc": "Controlla che il PDF sia integro e leggibile, senza parti danneggiate. Utile prima di inviarlo o caricarlo su un portale.",
  "endpoint": "/api/v1/security/verify-pdf",
  "esce": "json",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Controlla che il PDF sia integro e leggibile, senza parti danneggiate. Utile prima di inviarlo o caricarlo su un portale.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui»: le informazioni compaiono subito sotto, nella finestra."
   ]
  }
 },
 {
  "id": "cert-sign",
  "cat": "sicurezza",
  "tag": "Sicurezza",
  "nome": "Firma con certificato",
  "desc": "Applica al PDF una firma digitale con il tuo certificato in formato file (.p12 o .pem), con il riquadro della firma visibile sulla pagina. Non sostituisce la firma con smart card o token quando è richiesta.",
  "endpoint": "/api/v1/security/cert-sign",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF da firmare",
    "required": true,
    "accept": "application/pdf"
   },
   {
    "kind": "select",
    "name": "certType",
    "label": "Tipo di certificato",
    "options": [
     [
      "PKCS12",
      "File .p12 (PKCS#12)"
     ],
     [
      "PEM",
      "File .pem (chiave + certificato)"
     ]
    ]
   },
   {
    "kind": "file",
    "name": "p12File",
    "label": "Certificato .p12 (se hai scelto .p12)",
    "accept": ".p12,application/x-pkcs12"
   },
   {
    "kind": "file",
    "name": "privateKeyFile",
    "label": "Chiave privata .pem (se hai scelto .pem)",
    "accept": ".pem,.key"
   },
   {
    "kind": "file",
    "name": "certFile",
    "label": "Certificato .pem (se hai scelto .pem)",
    "accept": ".pem,.crt,.cer"
   },
   {
    "kind": "password",
    "name": "password",
    "label": "Password del certificato"
   },
   {
    "kind": "checkbox",
    "name": "showSignature",
    "label": "Mostra il riquadro della firma sulla pagina"
   },
   {
    "kind": "text",
    "name": "reason",
    "label": "Motivo della firma"
   },
   {
    "kind": "text",
    "name": "location",
    "label": "Luogo della firma"
   },
   {
    "kind": "text",
    "name": "name",
    "label": "Nome di chi firma"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Applica al PDF una firma digitale con il tuo certificato in formato file (.p12 o .pem), con il riquadro della firma visibile sulla pagina. Non sostituisce la firma con smart card o token quando è richiesta.",
   "formati": [
    "PDF",
    "P12",
    "PEM",
    "KEY",
    "CRT",
    "CER"
   ],
   "notaFile": "Anche più file insieme, fino a 50 MB in tutto.",
   "passi": [
    "Scegli i file dal computer o dal telefono: «PDF da firmare», «Certificato .p12 (se hai scelto .p12)» (se serve), «Chiave privata .pem (se hai scelto .pem)» (se serve) e «Certificato .pem (se hai scelto .pem)» (se serve).",
    "Compila le impostazioni: «Tipo di certificato», «Password del certificato», «Mostra il riquadro della firma sulla pagina», «Motivo della firma» e altre 2 impostazioni.",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "validate-signature",
  "cat": "sicurezza",
  "tag": "Sicurezza",
  "nome": "Verifica firma",
  "desc": "Controlla le firme digitali presenti nel PDF: chi ha firmato, quando e se la firma è ancora valida.",
  "endpoint": "/api/v1/security/validate-signature",
  "esce": "json",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Controlla le firme digitali presenti nel PDF: chi ha firmato, quando e se la firma è ancora valida.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui»: le informazioni compaiono subito sotto, nella finestra."
   ]
  }
 },
 {
  "id": "remove-cert-sign",
  "cat": "sicurezza",
  "tag": "Sicurezza",
  "nome": "Rimuovi firma",
  "desc": "Toglie le firme digitali dal PDF lasciando il contenuto identico. Serve quando devi modificare un documento già firmato e poi firmarlo di nuovo.",
  "endpoint": "/api/v1/security/remove-cert-sign",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Toglie le firme digitali dal PDF lasciando il contenuto identico. Serve quando devi modificare un documento già firmato e poi firmarlo di nuovo.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "add-watermark",
  "cat": "sicurezza",
  "tag": "Sicurezza",
  "nome": "Aggiungi filigrana",
  "desc": "Scrive un testo in trasparenza ripetuto su tutte le pagine, per esempio «BOZZA», «RISERVATO» o «COPIA».",
  "endpoint": "/api/v1/security/add-watermark",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   },
   {
    "kind": "text",
    "name": "watermarkText",
    "label": "Testo della filigrana",
    "required": true,
    "placeholder": "RISERVATO"
   },
   {
    "kind": "number",
    "name": "fontSize",
    "label": "Grandezza del testo",
    "default": "30"
   },
   {
    "kind": "number",
    "name": "rotation",
    "label": "Inclinazione (gradi)",
    "default": "45"
   },
   {
    "kind": "number",
    "name": "opacity",
    "label": "Trasparenza (da 0 a 1)",
    "default": "0.5",
    "step": "0.1"
   },
   {
    "kind": "number",
    "name": "widthSpacer",
    "label": "Distanza orizzontale tra le scritte",
    "default": "50"
   },
   {
    "kind": "number",
    "name": "heightSpacer",
    "label": "Distanza verticale tra le scritte",
    "default": "50"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Scrive un testo in trasparenza ripetuto su tutte le pagine, per esempio «BOZZA», «RISERVATO» o «COPIA».",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Compila le impostazioni: «Testo della filigrana» (obbligatorio), «Grandezza del testo», «Inclinazione (gradi)», «Trasparenza (da 0 a 1)» e altre 2 impostazioni.",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "sanitize-pdf",
  "cat": "sicurezza",
  "tag": "Sicurezza",
  "nome": "Sanifica PDF",
  "desc": "Ripulisce il PDF da elementi nascosti: codice JavaScript, file allegati e, se vuoi, metadati, link e caratteri incorporati. Utile prima di condividere un documento all'esterno.",
  "endpoint": "/api/v1/security/sanitize-pdf",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF da ripulire",
    "required": true,
    "accept": "application/pdf"
   },
   {
    "kind": "checkbox",
    "name": "removeJavaScript",
    "label": "Togli il codice JavaScript",
    "default": true
   },
   {
    "kind": "checkbox",
    "name": "removeEmbeddedFiles",
    "label": "Togli i file allegati",
    "default": true
   },
   {
    "kind": "checkbox",
    "name": "removeMetadata",
    "label": "Togli i metadati (autore, programma usato…)"
   },
   {
    "kind": "checkbox",
    "name": "removeLinks",
    "label": "Togli i collegamenti"
   },
   {
    "kind": "checkbox",
    "name": "removeFonts",
    "label": "Togli i caratteri incorporati"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Ripulisce il PDF da elementi nascosti: codice JavaScript, file allegati e, se vuoi, metadati, link e caratteri incorporati. Utile prima di condividere un documento all'esterno.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF da ripulire».",
    "Compila le impostazioni: «Togli il codice JavaScript», «Togli i file allegati», «Togli i metadati (autore, programma usato…)», «Togli i collegamenti» e un'altra impostazione.",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "auto-redact",
  "cat": "sicurezza",
  "tag": "Sicurezza",
  "nome": "Oscura testo",
  "desc": "Copre con un rettangolo nero, in modo definitivo, le parole che indichi (nomi, IBAN, codici fiscali). Utile per pubblicare o inviare documenti senza dati personali.",
  "endpoint": "/api/v1/security/auto-redact",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   },
   {
    "kind": "textarea",
    "name": "listOfText",
    "label": "Parole da oscurare (una per riga)",
    "required": true,
    "rows": 4
   },
   {
    "kind": "checkbox",
    "name": "useRegex",
    "label": "Usa espressioni regolari (solo per esperti)"
   },
   {
    "kind": "checkbox",
    "name": "wholeWordSearch",
    "label": "Solo parole intere",
    "default": true
   },
   {
    "kind": "text",
    "name": "redactColor",
    "label": "Colore del rettangolo (es. #000000 = nero)",
    "default": "#000000"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Copre con un rettangolo nero, in modo definitivo, le parole che indichi (nomi, IBAN, codici fiscali). Utile per pubblicare o inviare documenti senza dati personali.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Compila le impostazioni: «Parole da oscurare (una per riga)» (obbligatorio), «Usa espressioni regolari (solo per esperti)», «Solo parole intere», «Colore del rettangolo (es. #000000 = nero)».",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "get-info-on-pdf",
  "cat": "sicurezza",
  "tag": "Sicurezza",
  "nome": "Info su PDF",
  "desc": "Mostra la scheda completa del PDF: autore, versione, numero di pagine, caratteri, firme e allegati presenti.",
  "endpoint": "/api/v1/security/get-info-on-pdf",
  "esce": "json",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Mostra la scheda completa del PDF: autore, versione, numero di pagine, caratteri, firme e allegati presenti.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui»: le informazioni compaiono subito sotto, nella finestra."
   ]
  }
 },
 {
  "id": "img-to-pdf",
  "cat": "conversione",
  "tag": "Conversione",
  "nome": "Immagine → PDF",
  "desc": "Mette una o più immagini (JPG, PNG…) in un unico PDF, una per pagina. Utile per foto di documenti, ricevute o scontrini.",
  "endpoint": "/api/v1/convert/img/pdf",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "Immagini (JPG, PNG, HEIC…)",
    "required": true,
    "accept": "image/*",
    "multiple": true
   },
   {
    "kind": "select",
    "name": "fitOption",
    "label": "Come adattare l'immagine",
    "options": [
     [
      "fillPage",
      "Riempi tutta la pagina"
     ],
     [
      "maintainAspectRatio",
      "Mantieni le proporzioni"
     ],
     [
      "fitDocumentToImage",
      "Pagina grande come l'immagine"
     ]
    ]
   },
   {
    "kind": "select",
    "name": "colorType",
    "label": "Colori",
    "options": [
     [
      "color",
      "A colori"
     ],
     [
      "greyscale",
      "In scala di grigi"
     ],
     [
      "blackwhite",
      "Bianco e nero"
     ]
    ]
   },
   {
    "kind": "checkbox",
    "name": "autoRotate",
    "label": "Ruota in automatico le immagini"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Mette una o più immagini (JPG, PNG…) in un unico PDF, una per pagina. Utile per foto di documenti, ricevute o scontrini.",
   "formati": [
    "Immagini (JPG, PNG…)"
   ],
   "notaFile": "Anche più file insieme, fino a 50 MB in tutto.",
   "passi": [
    "Scegli i file dal computer o dal telefono: «Immagini (JPG, PNG, HEIC…)».",
    "Compila le impostazioni: «Come adattare l'immagine», «Colori», «Ruota in automatico le immagini».",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "file-to-pdf",
  "cat": "conversione",
  "tag": "Conversione",
  "nome": "Word, Excel, PowerPoint → PDF",
  "desc": "Converte in PDF documenti Word, fogli Excel, presentazioni PowerPoint e file OpenDocument, RTF o di testo.",
  "endpoint": "/api/v1/convert/file/pdf",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "File da convertire",
    "required": true,
    "accept": ".docx,.doc,.odt,.rtf,.txt,.html,.xlsx,.xls,.ods,.csv,.pptx,.ppt,.odp"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Converte in PDF documenti Word, fogli Excel, presentazioni PowerPoint e file OpenDocument, RTF o di testo.",
   "formati": [
    "DOCX",
    "DOC",
    "ODT",
    "RTF",
    "TXT",
    "HTML",
    "XLSX",
    "XLS",
    "ODS",
    "CSV",
    "PPTX",
    "PPT",
    "ODP"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «File da convertire».",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "html-to-pdf",
  "cat": "conversione",
  "tag": "Conversione",
  "nome": "HTML → PDF",
  "desc": "Converte una pagina web salvata (file HTML, oppure ZIP con immagini e stili) in un PDF.",
  "endpoint": "/api/v1/convert/html/pdf",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "File da convertire",
    "required": true,
    "accept": ".html,.htm,.zip"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Converte una pagina web salvata (file HTML, oppure ZIP con immagini e stili) in un PDF.",
   "formati": [
    "HTML",
    "HTM",
    "ZIP"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «File da convertire».",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "md-to-pdf",
  "cat": "conversione",
  "tag": "Conversione",
  "nome": "Markdown → PDF",
  "desc": "Converte un testo scritto in Markdown in un PDF impaginato, con titoli, elenchi e grassetti.",
  "endpoint": "/api/v1/convert/markdown/pdf",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "File da convertire",
    "required": true,
    "accept": ".md,.markdown,text/markdown"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Converte un testo scritto in Markdown in un PDF impaginato, con titoli, elenchi e grassetti.",
   "formati": [
    "MD",
    "MARKDOWN"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «File da convertire».",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "eml-to-pdf",
  "cat": "conversione",
  "tag": "Conversione",
  "nome": "Email → PDF",
  "desc": "Converte un'email salvata in formato .eml in PDF, per archiviarla o allegarla come prova di una comunicazione.",
  "endpoint": "/api/v1/convert/eml/pdf",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "File da convertire",
    "required": true,
    "accept": ".eml,message/rfc822"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Converte un'email salvata in formato .eml in PDF, per archiviarla o allegarla come prova di una comunicazione.",
   "formati": [
    "EML"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «File da convertire».",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "ebook-to-pdf",
  "cat": "conversione",
  "tag": "Conversione",
  "nome": "E-book → PDF",
  "desc": "Converte un e-book (EPUB, MOBI, AZW, FB2) in un PDF stampabile.",
  "endpoint": "/api/v1/convert/ebook/pdf",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "File da convertire",
    "required": true,
    "accept": ".epub,.mobi,.azw,.azw3,.fb2"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Converte un e-book (EPUB, MOBI, AZW, FB2) in un PDF stampabile.",
   "formati": [
    "EPUB",
    "MOBI",
    "AZW",
    "AZW3",
    "FB2"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «File da convertire».",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "svg-to-pdf",
  "cat": "conversione",
  "tag": "Conversione",
  "nome": "SVG → PDF",
  "desc": "Converte un disegno vettoriale SVG (loghi, schemi) in PDF senza perdere qualità.",
  "endpoint": "/api/v1/convert/svg/pdf",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "File da convertire",
    "required": true,
    "accept": ".svg,image/svg+xml"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Converte un disegno vettoriale SVG (loghi, schemi) in PDF senza perdere qualità.",
   "formati": [
    "SVG"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «File da convertire».",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "vector-to-pdf",
  "cat": "conversione",
  "tag": "Conversione",
  "nome": "Illustrator/EPS → PDF",
  "desc": "Converte file vettoriali di Adobe Illustrator (AI), EPS o PostScript in PDF.",
  "endpoint": "/api/v1/convert/vector/pdf",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "File da convertire",
    "required": true,
    "accept": ".ai,.eps,.ps"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Converte file vettoriali di Adobe Illustrator (AI), EPS o PostScript in PDF.",
   "formati": [
    "AI",
    "EPS",
    "PS"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «File da convertire».",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "cbr-to-pdf",
  "cat": "conversione",
  "tag": "Conversione",
  "nome": "Fumetto CBR → PDF",
  "desc": "Converte un archivio di immagini CBR (il formato dei fumetti digitali) in un PDF, una immagine per pagina.",
  "endpoint": "/api/v1/convert/cbr/pdf",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "File da convertire",
    "required": true,
    "accept": ".cbr"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Converte un archivio di immagini CBR (il formato dei fumetti digitali) in un PDF, una immagine per pagina.",
   "formati": [
    "CBR"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «File da convertire».",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "cbz-to-pdf",
  "cat": "conversione",
  "tag": "Conversione",
  "nome": "Fumetto CBZ → PDF",
  "desc": "Converte un archivio di immagini CBZ in un PDF, una immagine per pagina.",
  "endpoint": "/api/v1/convert/cbz/pdf",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "File da convertire",
    "required": true,
    "accept": ".cbz"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Converte un archivio di immagini CBZ in un PDF, una immagine per pagina.",
   "formati": [
    "CBZ"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «File da convertire».",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "pdf-to-word",
  "cat": "conversione",
  "tag": "Conversione",
  "nome": "PDF → Word",
  "desc": "Trasforma il PDF in un documento Word modificabile. Utile per riprendere un contratto o un modulo e cambiarne il testo.",
  "endpoint": "/api/v1/convert/pdf/word",
  "esce": "docx",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   },
   {
    "kind": "select",
    "name": "outputFormat",
    "label": "Formato del documento",
    "options": [
     [
      "docx",
      "Word (.docx)"
     ],
     [
      "doc",
      "Word vecchio formato (.doc)"
     ],
     [
      "odt",
      "OpenDocument (.odt)"
     ]
    ]
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Trasforma il PDF in un documento Word modificabile. Utile per riprendere un contratto o un modulo e cambiarne il testo.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Compila le impostazioni: «Formato del documento».",
    "Premi «Esegui» e scarica il risultato: un documento Word."
   ]
  }
 },
 {
  "id": "pdf-to-img",
  "cat": "conversione",
  "tag": "Conversione",
  "nome": "PDF → Immagini",
  "desc": "Salva ogni pagina del PDF come immagine (PNG, JPEG o WEBP), oppure tutte in un'unica immagine lunga.",
  "endpoint": "/api/v1/convert/pdf/img",
  "esce": "zip",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   },
   {
    "kind": "select",
    "name": "imageFormat",
    "label": "Formato delle immagini",
    "options": [
     [
      "png",
      "PNG"
     ],
     [
      "jpeg",
      "JPEG"
     ],
     [
      "webp",
      "WEBP"
     ]
    ]
   },
   {
    "kind": "select",
    "name": "singleOrMultiple",
    "label": "Come salvarle",
    "options": [
     [
      "multiple",
      "Un'immagine per pagina (archivio ZIP)"
     ],
     [
      "single",
      "Un'unica immagine lunga"
     ]
    ]
   },
   {
    "kind": "select",
    "name": "colorType",
    "label": "Colori",
    "options": [
     [
      "color",
      "A colori"
     ],
     [
      "greyscale",
      "In scala di grigi"
     ],
     [
      "blackwhite",
      "Bianco e nero"
     ]
    ]
   },
   {
    "kind": "number",
    "name": "dpi",
    "label": "Qualità in DPI (300 = qualità da stampa)",
    "default": "300"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Salva ogni pagina del PDF come immagine (PNG, JPEG o WEBP), oppure tutte in un'unica immagine lunga.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Compila le impostazioni: «Formato delle immagini», «Come salvarle», «Colori», «Qualità in DPI (300 = qualità da stampa)».",
    "Premi «Esegui» e scarica il risultato: un archivio ZIP."
   ]
  }
 },
 {
  "id": "pdf-to-text",
  "cat": "conversione",
  "tag": "Conversione",
  "nome": "PDF → Testo",
  "desc": "Estrae tutto il testo del PDF in un file di testo semplice, da copiare o cercare.",
  "endpoint": "/api/v1/convert/pdf/text",
  "esce": "txt",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Estrae tutto il testo del PDF in un file di testo semplice, da copiare o cercare.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui» e scarica il risultato: un file di testo (TXT)."
   ]
  }
 },
 {
  "id": "pdf-to-html",
  "cat": "conversione",
  "tag": "Conversione",
  "nome": "PDF → HTML",
  "desc": "Converte il PDF in una pagina web (HTML) apribile con il browser.",
  "endpoint": "/api/v1/convert/pdf/html",
  "esce": "html",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Converte il PDF in una pagina web (HTML) apribile con il browser.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui» e scarica il risultato: una pagina HTML."
   ]
  }
 },
 {
  "id": "pdf-to-markdown",
  "cat": "conversione",
  "tag": "Conversione",
  "nome": "PDF → Markdown",
  "desc": "Converte il PDF in testo Markdown, mantenendo titoli ed elenchi.",
  "endpoint": "/api/v1/convert/pdf/markdown",
  "esce": "txt",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Converte il PDF in testo Markdown, mantenendo titoli ed elenchi.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui» e scarica il risultato: un file di testo (TXT)."
   ]
  }
 },
 {
  "id": "pdf-to-csv",
  "cat": "conversione",
  "tag": "Conversione",
  "nome": "PDF → CSV",
  "desc": "Estrae le tabelle del PDF in un file CSV da aprire con Excel. Utile per listini, estratti conto e report in PDF.",
  "endpoint": "/api/v1/convert/pdf/csv",
  "esce": "csv",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF con tabelle",
    "required": true,
    "accept": "application/pdf"
   },
   {
    "kind": "text",
    "name": "pageNumbers",
    "label": "Pagine da leggere (es. 1,3-5; vuoto = tutte)"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Estrae le tabelle del PDF in un file CSV da aprire con Excel. Utile per listini, estratti conto e report in PDF.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF con tabelle».",
    "Compila le impostazioni: «Pagine da leggere (es. 1,3-5; vuoto = tutte)».",
    "Premi «Esegui» e scarica il risultato: un file CSV, apribile con Excel."
   ]
  }
 },
 {
  "id": "pdf-to-xlsx",
  "cat": "conversione",
  "tag": "Conversione",
  "nome": "PDF → Excel",
  "desc": "Estrae le tabelle del PDF direttamente in un file Excel. Utile per riprendere listini, estratti conto e tabelle senza ricopiarle a mano.",
  "endpoint": "/api/v1/convert/pdf/xlsx",
  "esce": "xlsx",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Estrae le tabelle del PDF direttamente in un file Excel. Utile per riprendere listini, estratti conto e tabelle senza ricopiarle a mano.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui» e scarica il risultato: un file Excel (XLSX)."
   ]
  }
 },
 {
  "id": "pdf-to-xml",
  "cat": "conversione",
  "tag": "Conversione",
  "nome": "PDF → XML",
  "desc": "Esporta la struttura e il testo del PDF in formato XML, per elaborazioni con altri programmi.",
  "endpoint": "/api/v1/convert/pdf/xml",
  "esce": "xml",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Esporta la struttura e il testo del PDF in formato XML, per elaborazioni con altri programmi.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui» e scarica il risultato: un file XML."
   ]
  }
 },
 {
  "id": "pdf-to-pdfa",
  "cat": "conversione",
  "tag": "Conversione",
  "nome": "PDF → PDF/A",
  "desc": "Converte il PDF nel formato PDF/A, quello richiesto per la conservazione a lungo termine e dalla conservazione digitale a norma.",
  "endpoint": "/api/v1/convert/pdf/pdfa",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   },
   {
    "kind": "select",
    "name": "outputFormat",
    "label": "Versione di PDF/A",
    "options": [
     [
      "pdfa",
      "PDF/A-1b"
     ],
     [
      "pdfa-1",
      "PDF/A-1a"
     ],
     [
      "pdfa-2",
      "PDF/A-2b"
     ],
     [
      "pdfa-3",
      "PDF/A-3b (ammette allegati)"
     ]
    ]
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Converte il PDF nel formato PDF/A, quello richiesto per la conservazione a lungo termine e dalla conservazione digitale a norma.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Compila le impostazioni: «Versione di PDF/A».",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "pdf-to-presentation",
  "cat": "conversione",
  "tag": "Conversione",
  "nome": "PDF → PowerPoint",
  "desc": "Converte ogni pagina del PDF in una diapositiva PowerPoint.",
  "endpoint": "/api/v1/convert/pdf/presentation",
  "esce": "pptx",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Converte ogni pagina del PDF in una diapositiva PowerPoint.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui» e scarica il risultato: una presentazione PowerPoint (PPTX)."
   ]
  }
 },
 {
  "id": "pdf-to-vector",
  "cat": "conversione",
  "tag": "Conversione",
  "nome": "PDF → PostScript (vettoriale)",
  "desc": "Converte il PDF in PostScript vettoriale, il formato usato da tipografie e plotter.",
  "endpoint": "/api/v1/convert/pdf/vector",
  "esce": "ps",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Converte il PDF in PostScript vettoriale, il formato usato da tipografie e plotter.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui» e scarica il risultato: un file PostScript (PS)."
   ]
  }
 },
 {
  "id": "pdf-to-epub",
  "cat": "conversione",
  "tag": "Conversione",
  "nome": "PDF → EPUB",
  "desc": "Converte il PDF in e-book EPUB, da leggere comodamente su tablet ed e-reader.",
  "endpoint": "/api/v1/convert/pdf/epub",
  "esce": "epub",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Converte il PDF in e-book EPUB, da leggere comodamente su tablet ed e-reader.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui» e scarica il risultato: un e-book EPUB."
   ]
  }
 },
 {
  "id": "pdf-to-cbz",
  "cat": "conversione",
  "tag": "Conversione",
  "nome": "PDF → Fumetto CBZ",
  "desc": "Salva le pagine del PDF come immagini in un archivio CBZ.",
  "endpoint": "/api/v1/convert/pdf/cbz",
  "esce": "zip",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Salva le pagine del PDF come immagini in un archivio CBZ.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui» e scarica il risultato: un archivio ZIP."
   ]
  }
 },
 {
  "id": "merge-pdfs",
  "cat": "pagine",
  "tag": "Pagine",
  "nome": "Unisci PDF",
  "desc": "Mette più PDF uno dopo l'altro in un unico file. Utile per mandare un solo documento invece di tanti allegati.",
  "endpoint": "/api/v1/general/merge-pdfs",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF da unire (puoi sceglierne più di uno)",
    "required": true,
    "accept": "application/pdf",
    "multiple": true
   },
   {
    "kind": "select",
    "name": "sortType",
    "label": "Ordine dei file",
    "options": [
     [
      "orderProvided",
      "Come li hai scelti"
     ],
     [
      "byFileName",
      "Per nome del file"
     ],
     [
      "byDateModified",
      "Per data di modifica"
     ]
    ]
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Mette più PDF uno dopo l'altro in un unico file. Utile per mandare un solo documento invece di tanti allegati.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Anche più file insieme, fino a 50 MB in tutto.",
   "passi": [
    "Nel campo «PDF da unire (puoi sceglierne più di uno)» scegli tutti i PDF insieme (tieni premuto Ctrl, o Cmd sul Mac, mentre li selezioni).",
    "In «Ordine dei file» scegli se tenerli come li hai scelti, per nome o per data.",
    "Premi «Esegui» e scarica il PDF unico."
   ]
  }
 },
 {
  "id": "split-pages",
  "cat": "pagine",
  "tag": "Pagine",
  "nome": "Dividi per pagine",
  "desc": "Taglia il PDF in più file nei punti che indichi: ogni numero è l'ultima pagina di una parte. Con «3,7» ottieni le pagine 1-3, 4-7 e dalla 8 alla fine.",
  "endpoint": "/api/v1/general/split-pages",
  "esce": "zip",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   },
   {
    "kind": "text",
    "name": "pageNumbers",
    "label": "Dividi dopo le pagine (es. 3,7)",
    "required": true
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Taglia il PDF in più file nei punti che indichi: ogni numero è l'ultima pagina di una parte. Con «3,7» ottieni le pagine 1-3, 4-7 e dalla 8 alla fine.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Compila le impostazioni: «Dividi dopo le pagine (es. 3,7)» (obbligatorio).",
    "Premi «Esegui» e scarica il risultato: un archivio ZIP."
   ]
  }
 },
 {
  "id": "split-by-size-or-count",
  "cat": "pagine",
  "tag": "Pagine",
  "nome": "Dividi per peso o pagine",
  "desc": "Divide il PDF in più file in automatico: per peso (per esempio parti da 10 MB, quando un portale o la posta hanno un limite), ogni tot pagine o in un numero di file a scelta.",
  "endpoint": "/api/v1/general/split-by-size-or-count",
  "esce": "zip",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   },
   {
    "kind": "select",
    "name": "splitType",
    "label": "Come dividere",
    "options": [
     [
      "0",
      "Per peso (es. 10MB)"
     ],
     [
      "1",
      "Ogni tot pagine"
     ],
     [
      "2",
      "In un numero di file"
     ]
    ]
   },
   {
    "kind": "text",
    "name": "splitValue",
    "label": "Valore (es. 10MB, oppure 5)",
    "required": true
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Divide il PDF in più file in automatico: per peso (per esempio parti da 10 MB, quando un portale o la posta hanno un limite), ogni tot pagine o in un numero di file a scelta.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Compila le impostazioni: «Come dividere», «Valore (es. 10MB, oppure 5)» (obbligatorio).",
    "Premi «Esegui» e scarica il risultato: un archivio ZIP."
   ]
  }
 },
 {
  "id": "split-pdf-by-chapters",
  "cat": "pagine",
  "tag": "Pagine",
  "nome": "Dividi per capitoli",
  "desc": "Divide il PDF in un file per ogni capitolo, usando i segnalibri del documento. Funziona solo se il PDF ha i segnalibri.",
  "endpoint": "/api/v1/general/split-pdf-by-chapters",
  "esce": "zip",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Divide il PDF in un file per ogni capitolo, usando i segnalibri del documento. Funziona solo se il PDF ha i segnalibri.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui» e scarica il risultato: un archivio ZIP."
   ]
  }
 },
 {
  "id": "split-pdf-by-sections",
  "cat": "pagine",
  "tag": "Pagine",
  "nome": "Dividi per sezioni",
  "desc": "Taglia ogni pagina in più parti. Utile per pagine molto grandi, come tavole o scansioni di due pagine affiancate.",
  "endpoint": "/api/v1/general/split-pdf-by-sections",
  "esce": "zip",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Taglia ogni pagina in più parti. Utile per pagine molto grandi, come tavole o scansioni di due pagine affiancate.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui» e scarica il risultato: un archivio ZIP."
   ]
  }
 },
 {
  "id": "split-for-poster-print",
  "cat": "pagine",
  "tag": "Pagine",
  "nome": "Dividi per poster",
  "desc": "Divide ogni pagina grande (per esempio un poster o una tavola A1) in più fogli A4 da stampare e affiancare.",
  "endpoint": "/api/v1/general/split-for-poster-print",
  "esce": "zip",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Divide ogni pagina grande (per esempio un poster o una tavola A1) in più fogli A4 da stampare e affiancare.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui» e scarica il risultato: un archivio ZIP."
   ]
  }
 },
 {
  "id": "rotate-pdf",
  "cat": "pagine",
  "tag": "Pagine",
  "nome": "Ruota PDF",
  "desc": "Gira tutte le pagine del PDF, per esempio una scansione venuta storta o capovolta.",
  "endpoint": "/api/v1/general/rotate-pdf",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   },
   {
    "kind": "select",
    "name": "angle",
    "label": "Di quanto ruotare",
    "options": [
     [
      "90",
      "90° in senso orario"
     ],
     [
      "180",
      "180° (capovolto)"
     ],
     [
      "270",
      "90° in senso antiorario"
     ]
    ]
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Gira tutte le pagine del PDF, per esempio una scansione venuta storta o capovolta.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Compila le impostazioni: «Di quanto ruotare».",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "remove-pages",
  "cat": "pagine",
  "tag": "Pagine",
  "nome": "Rimuovi pagine",
  "desc": "Elimina dal PDF le pagine che indichi, per esempio pagine bianche, doppie o che non vuoi inviare.",
  "endpoint": "/api/v1/general/remove-pages",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   },
   {
    "kind": "text",
    "name": "pageNumbers",
    "label": "Pagine da eliminare (es. 1,3-5)",
    "required": true
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Elimina dal PDF le pagine che indichi, per esempio pagine bianche, doppie o che non vuoi inviare.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Compila le impostazioni: «Pagine da eliminare (es. 1,3-5)» (obbligatorio).",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "rearrange-pages",
  "cat": "pagine",
  "tag": "Pagine",
  "nome": "Riordina pagine",
  "desc": "Cambia l'ordine delle pagine scrivendo il nuovo ordine, per esempio per spostare un allegato in fondo o la copertina in cima.",
  "endpoint": "/api/v1/general/rearrange-pages",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   },
   {
    "kind": "text",
    "name": "pageNumbers",
    "label": "Nuovo ordine delle pagine (es. 3,1,2,4)",
    "required": true
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Cambia l'ordine delle pagine scrivendo il nuovo ordine, per esempio per spostare un allegato in fondo o la copertina in cima.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Compila le impostazioni: «Nuovo ordine delle pagine (es. 3,1,2,4)» (obbligatorio).",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "crop",
  "cat": "pagine",
  "tag": "Pagine",
  "nome": "Ritaglia pagine",
  "desc": "Ritaglia le pagine tenendo solo l'area indicata, per eliminare margini o bordi delle scansioni. Le misure sono in punti: un A4 è 595 × 842.",
  "endpoint": "/api/v1/general/crop",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   },
   {
    "kind": "number",
    "name": "x",
    "label": "Distanza dal bordo sinistro (punti)",
    "default": "0"
   },
   {
    "kind": "number",
    "name": "y",
    "label": "Distanza dal bordo in basso (punti)",
    "default": "0"
   },
   {
    "kind": "number",
    "name": "width",
    "label": "Larghezza da tenere (punti)",
    "default": "595"
   },
   {
    "kind": "number",
    "name": "height",
    "label": "Altezza da tenere (punti)",
    "default": "842"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Ritaglia le pagine tenendo solo l'area indicata, per eliminare margini o bordi delle scansioni. Le misure sono in punti: un A4 è 595 × 842.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Compila le impostazioni: «Distanza dal bordo sinistro (punti)», «Distanza dal bordo in basso (punti)», «Larghezza da tenere (punti)», «Altezza da tenere (punti)».",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "scale-pages",
  "cat": "pagine",
  "tag": "Pagine",
  "nome": "Scala pagine",
  "desc": "Porta tutte le pagine allo stesso formato (A4, A3…), utile quando un documento mescola formati diversi.",
  "endpoint": "/api/v1/general/scale-pages",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   },
   {
    "kind": "select",
    "name": "pageSize",
    "label": "Formato delle pagine",
    "options": [
     [
      "A4",
      "A4"
     ],
     [
      "A3",
      "A3"
     ],
     [
      "A5",
      "A5"
     ],
     [
      "LETTER",
      "Letter (USA)"
     ],
     [
      "LEGAL",
      "Legal (USA)"
     ]
    ]
   },
   {
    "kind": "number",
    "name": "scaleFactor",
    "label": "Ingrandimento del contenuto (1 = invariato)",
    "default": "1.0",
    "step": "0.1"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Porta tutte le pagine allo stesso formato (A4, A3…), utile quando un documento mescola formati diversi.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Compila le impostazioni: «Formato delle pagine», «Ingrandimento del contenuto (1 = invariato)».",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "pdf-to-single-page",
  "cat": "pagine",
  "tag": "Pagine",
  "nome": "Unisci in pagina singola",
  "desc": "Unisce tutte le pagine in un'unica pagina lunga, da scorrere senza interruzioni.",
  "endpoint": "/api/v1/general/pdf-to-single-page",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Unisce tutte le pagine in un'unica pagina lunga, da scorrere senza interruzioni.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "multi-page-layout",
  "cat": "pagine",
  "tag": "Pagine",
  "nome": "Più pagine per foglio",
  "desc": "Stampa più pagine su un solo foglio (2, 4, 9 o 16), per risparmiare carta o avere una panoramica del documento.",
  "endpoint": "/api/v1/general/multi-page-layout",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   },
   {
    "kind": "select",
    "name": "pagesPerSheet",
    "label": "Pagine per foglio",
    "options": [
     [
      "2",
      "2"
     ],
     [
      "4",
      "4"
     ],
     [
      "9",
      "9"
     ],
     [
      "16",
      "16"
     ]
    ]
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Stampa più pagine su un solo foglio (2, 4, 9 o 16), per risparmiare carta o avere una panoramica del documento.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Compila le impostazioni: «Pagine per foglio».",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "booklet-imposition",
  "cat": "pagine",
  "tag": "Pagine",
  "nome": "Prepara libretto",
  "desc": "Riordina le pagine per stamparle fronte-retro e piegarle a libretto.",
  "endpoint": "/api/v1/general/booklet-imposition",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Riordina le pagine per stamparle fronte-retro e piegarle a libretto.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "overlay-pdfs",
  "cat": "pagine",
  "tag": "Pagine",
  "nome": "Sovrapponi PDF",
  "desc": "Sovrappone le pagine di un secondo PDF al primo, per esempio per aggiungere la carta intestata o un timbro.",
  "endpoint": "/api/v1/general/overlay-pdfs",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF di base",
    "required": true,
    "accept": "application/pdf"
   },
   {
    "kind": "file",
    "name": "overlayFiles",
    "label": "PDF da sovrapporre (es. carta intestata)",
    "required": true,
    "accept": "application/pdf",
    "multiple": true
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Sovrappone le pagine di un secondo PDF al primo, per esempio per aggiungere la carta intestata o un timbro.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Anche più file insieme, fino a 50 MB in tutto.",
   "passi": [
    "Scegli i file dal computer o dal telefono: «PDF di base» e «PDF da sovrapporre (es. carta intestata)».",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "remove-image-pdf",
  "cat": "pagine",
  "tag": "Pagine",
  "nome": "Rimuovi immagini",
  "desc": "Toglie tutte le immagini dal PDF e lascia solo il testo: il file diventa molto più leggero.",
  "endpoint": "/api/v1/general/remove-image-pdf",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Toglie tutte le immagini dal PDF e lascia solo il testo: il file diventa molto più leggero.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "extract-bookmarks",
  "cat": "pagine",
  "tag": "Pagine",
  "nome": "Estrai segnalibri",
  "desc": "Mostra l'elenco dei segnalibri (l'indice) del PDF.",
  "endpoint": "/api/v1/general/extract-bookmarks",
  "esce": "json",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Mostra l'elenco dei segnalibri (l'indice) del PDF.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui»: le informazioni compaiono subito sotto, nella finestra."
   ]
  }
 },
 {
  "id": "compress-pdf",
  "cat": "modifica",
  "tag": "Modifica",
  "nome": "Comprimi PDF",
  "desc": "Riduce il peso del PDF mantenendolo leggibile. Utile quando l'email o un portale rifiutano file troppo grandi.",
  "endpoint": "/api/v1/misc/compress-pdf",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF da comprimere",
    "required": true,
    "accept": "application/pdf"
   },
   {
    "kind": "select",
    "name": "optimizeLevel",
    "label": "Quanto comprimere",
    "options": [
     [
      "3",
      "Medio (consigliato)"
     ],
     [
      "1",
      "Leggero"
     ],
     [
      "2",
      "Bilanciato"
     ],
     [
      "4",
      "Forte"
     ],
     [
      "5",
      "Massimo (qualità più bassa)"
     ]
    ]
   },
   {
    "kind": "checkbox",
    "name": "convertToGrayscale",
    "label": "Converti in bianco e nero (riduce molto il peso)"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Riduce il peso del PDF mantenendolo leggibile. Utile quando l'email o un portale rifiutano file troppo grandi.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF da comprimere».",
    "Compila le impostazioni: «Quanto comprimere», «Converti in bianco e nero (riduce molto il peso)».",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "decompress-pdf",
  "cat": "modifica",
  "tag": "Modifica",
  "nome": "Decomprimi PDF",
  "desc": "Strumento tecnico: rende leggibile la struttura interna del PDF. Il file diventa più pesante; serve solo a chi deve analizzarlo.",
  "endpoint": "/api/v1/misc/decompress-pdf",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Strumento tecnico: rende leggibile la struttura interna del PDF. Il file diventa più pesante; serve solo a chi deve analizzarlo.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "ocr-pdf",
  "cat": "modifica",
  "tag": "Modifica",
  "nome": "OCR (riconoscimento testo)",
  "desc": "Riconosce il testo in un PDF scansionato, così puoi cercarlo, copiarlo e selezionarlo. Utile per contratti, fatture e documenti stampati e poi scansionati.",
  "endpoint": "/api/v1/misc/ocr-pdf",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF scansionato",
    "required": true,
    "accept": "application/pdf"
   },
   {
    "kind": "text",
    "name": "languages",
    "label": "Lingue del documento (es. ita,eng)",
    "default": "ita,eng"
   },
   {
    "kind": "checkbox",
    "name": "sidecar",
    "label": "Salva anche il testo riconosciuto in un file .txt",
    "default": false
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Riconosce il testo in un PDF scansionato, così puoi cercarlo, copiarlo e selezionarlo. Utile per contratti, fatture e documenti stampati e poi scansionati.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF scansionato».",
    "Compila le impostazioni: «Lingue del documento (es. ita,eng)», «Salva anche il testo riconosciuto in un file .txt».",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "add-page-numbers",
  "cat": "modifica",
  "tag": "Modifica",
  "nome": "Aggiungi numeri pagina",
  "desc": "Scrive il numero su ogni pagina del PDF, nella posizione che scegli.",
  "endpoint": "/api/v1/misc/add-page-numbers",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   },
   {
    "kind": "select",
    "name": "position",
    "label": "Posizione del numero",
    "options": [
     [
      "1",
      "In basso a destra"
     ],
     [
      "2",
      "In basso al centro"
     ],
     [
      "3",
      "In basso a sinistra"
     ],
     [
      "4",
      "In alto a destra"
     ],
     [
      "5",
      "In alto al centro"
     ],
     [
      "6",
      "In alto a sinistra"
     ]
    ]
   },
   {
    "kind": "number",
    "name": "startingNumber",
    "label": "Primo numero",
    "default": "1"
   },
   {
    "kind": "number",
    "name": "fontSize",
    "label": "Grandezza del numero",
    "default": "12"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Scrive il numero su ogni pagina del PDF, nella posizione che scegli.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Compila le impostazioni: «Posizione del numero», «Primo numero», «Grandezza del numero».",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "add-image",
  "cat": "modifica",
  "tag": "Modifica",
  "nome": "Aggiungi immagine",
  "desc": "Inserisce un'immagine (logo, firma scansionata, timbro) in un punto della pagina. La posizione è in punti a partire dal basso a sinistra.",
  "endpoint": "/api/v1/misc/add-image",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   },
   {
    "kind": "file",
    "name": "imageFile",
    "label": "Immagine da inserire",
    "required": true,
    "accept": "image/*"
   },
   {
    "kind": "number",
    "name": "x",
    "label": "Distanza dal bordo sinistro (punti)",
    "default": "100"
   },
   {
    "kind": "number",
    "name": "y",
    "label": "Distanza dal bordo in basso (punti)",
    "default": "100"
   },
   {
    "kind": "select",
    "name": "everyPage",
    "label": "Dove inserirla",
    "options": [
     [
      "1",
      "Su tutte le pagine"
     ],
     [
      "0",
      "Solo sulla prima pagina"
     ]
    ]
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Inserisce un'immagine (logo, firma scansionata, timbro) in un punto della pagina. La posizione è in punti a partire dal basso a sinistra.",
   "formati": [
    "PDF",
    "Immagini (JPG, PNG…)"
   ],
   "notaFile": "Anche più file insieme, fino a 50 MB in tutto.",
   "passi": [
    "Scegli i file dal computer o dal telefono: «PDF» e «Immagine da inserire».",
    "Compila le impostazioni: «Distanza dal bordo sinistro (punti)», «Distanza dal bordo in basso (punti)», «Dove inserirla».",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "add-stamp",
  "cat": "modifica",
  "tag": "Modifica",
  "nome": "Aggiungi timbro",
  "desc": "Applica un timbro di testo su tutte le pagine, per esempio «APPROVATO», «PAGATO» o il nome della tua azienda.",
  "endpoint": "/api/v1/misc/add-stamp",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   },
   {
    "kind": "text",
    "name": "stampText",
    "label": "Testo del timbro",
    "placeholder": "APPROVATO"
   },
   {
    "kind": "number",
    "name": "fontSize",
    "label": "Grandezza del testo",
    "default": "30"
   },
   {
    "kind": "number",
    "name": "rotation",
    "label": "Inclinazione (gradi)",
    "default": "0"
   },
   {
    "kind": "number",
    "name": "opacity",
    "label": "Trasparenza (da 0 a 1)",
    "default": "0.5",
    "step": "0.1"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Applica un timbro di testo su tutte le pagine, per esempio «APPROVATO», «PAGATO» o il nome della tua azienda.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Compila le impostazioni: «Testo del timbro», «Grandezza del testo», «Inclinazione (gradi)», «Trasparenza (da 0 a 1)».",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "flatten",
  "cat": "modifica",
  "tag": "Modifica",
  "nome": "Appiattisci PDF",
  "desc": "Rende fissi i campi compilabili e le annotazioni: il contenuto non si può più modificare. Utile prima di firmare o inviare un modulo compilato.",
  "endpoint": "/api/v1/misc/flatten",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   },
   {
    "kind": "checkbox",
    "name": "flattenOnlyForms",
    "label": "Blocca solo i campi del modulo (lascia commenti e note)"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Rende fissi i campi compilabili e le annotazioni: il contenuto non si può più modificare. Utile prima di firmare o inviare un modulo compilato.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Compila le impostazioni: «Blocca solo i campi del modulo (lascia commenti e note)».",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "remove-blanks",
  "cat": "modifica",
  "tag": "Modifica",
  "nome": "Rimuovi pagine bianche",
  "desc": "Trova ed elimina in automatico le pagine bianche, tipiche delle scansioni fronte-retro.",
  "endpoint": "/api/v1/misc/remove-blanks",
  "esce": "zip",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   },
   {
    "kind": "number",
    "name": "threshold",
    "label": "Tolleranza alle macchie (consigliato 10)",
    "default": "10"
   },
   {
    "kind": "number",
    "name": "whitePercent",
    "label": "Quanta parte della pagina deve essere bianca (%)",
    "default": "99.9",
    "step": "0.1"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Trova ed elimina in automatico le pagine bianche, tipiche delle scansioni fronte-retro.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Compila le impostazioni: «Tolleranza alle macchie (consigliato 10)», «Quanta parte della pagina deve essere bianca (%)».",
    "Premi «Esegui» e scarica il risultato: un archivio ZIP."
   ]
  }
 },
 {
  "id": "unlock-pdf-forms",
  "cat": "modifica",
  "tag": "Modifica",
  "nome": "Sblocca moduli",
  "desc": "Rende di nuovo compilabili i campi di un modulo PDF bloccato.",
  "endpoint": "/api/v1/misc/unlock-pdf-forms",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Rende di nuovo compilabili i campi di un modulo PDF bloccato.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "repair",
  "cat": "modifica",
  "tag": "Modifica",
  "nome": "Ripara PDF",
  "desc": "Prova a riparare un PDF danneggiato che non si apre o dà errore.",
  "endpoint": "/api/v1/misc/repair",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Prova a riparare un PDF danneggiato che non si apre o dà errore.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "auto-rename",
  "cat": "modifica",
  "tag": "Modifica",
  "nome": "Rinomina automatica",
  "desc": "Dà al file un nome in base al titolo che trova nel documento, per non avere file chiamati «scansione001.pdf».",
  "endpoint": "/api/v1/misc/auto-rename",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Dà al file un nome in base al titolo che trova nel documento, per non avere file chiamati «scansione001.pdf».",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "auto-split-pdf",
  "cat": "modifica",
  "tag": "Modifica",
  "nome": "Dividi scansione con separatori",
  "desc": "Divide una scansione unica in più documenti dove trova un foglio separatore con codice QR.",
  "endpoint": "/api/v1/misc/auto-split-pdf",
  "esce": "zip",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Divide una scansione unica in più documenti dove trova un foglio separatore con codice QR.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui» e scarica il risultato: un archivio ZIP."
   ]
  }
 },
 {
  "id": "scanner-effect",
  "cat": "modifica",
  "tag": "Modifica",
  "nome": "Effetto scansione",
  "desc": "Fa sembrare il PDF una scansione su carta, con leggere imperfezioni e toni di grigio.",
  "endpoint": "/api/v1/misc/scanner-effect",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Fa sembrare il PDF una scansione su carta, con leggere imperfezioni e toni di grigio.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "replace-invert-pdf",
  "cat": "modifica",
  "tag": "Modifica",
  "nome": "Inverti colori",
  "desc": "Inverte i colori delle pagine (il bianco diventa nero), per leggere più comodamente su schermo.",
  "endpoint": "/api/v1/misc/replace-invert-pdf",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Inverte i colori delle pagine (il bianco diventa nero), per leggere più comodamente su schermo.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "update-metadata",
  "cat": "modifica",
  "tag": "Modifica",
  "nome": "Modifica metadati",
  "desc": "Modifica titolo, autore, oggetto e parole chiave salvati dentro il PDF, che i programmi mostrano nelle proprietà del file.",
  "endpoint": "/api/v1/misc/update-metadata",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   },
   {
    "kind": "text",
    "name": "title",
    "label": "Titolo"
   },
   {
    "kind": "text",
    "name": "author",
    "label": "Autore"
   },
   {
    "kind": "text",
    "name": "subject",
    "label": "Oggetto"
   },
   {
    "kind": "text",
    "name": "keywords",
    "label": "Parole chiave"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Modifica titolo, autore, oggetto e parole chiave salvati dentro il PDF, che i programmi mostrano nelle proprietà del file.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Compila le impostazioni: «Titolo», «Autore», «Oggetto», «Parole chiave».",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "extract-images",
  "cat": "modifica",
  "tag": "Modifica",
  "nome": "Estrai immagini",
  "desc": "Salva separatamente tutte le immagini contenute nel PDF (foto, loghi, grafici).",
  "endpoint": "/api/v1/misc/extract-images",
  "esce": "zip",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   },
   {
    "kind": "select",
    "name": "format",
    "label": "Formato delle immagini",
    "options": [
     [
      "png",
      "PNG"
     ],
     [
      "jpeg",
      "JPEG"
     ]
    ]
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Salva separatamente tutte le immagini contenute nel PDF (foto, loghi, grafici).",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Compila le impostazioni: «Formato delle immagini».",
    "Premi «Esegui» e scarica il risultato: un archivio ZIP."
   ]
  }
 },
 {
  "id": "extract-image-scans",
  "cat": "modifica",
  "tag": "Modifica",
  "nome": "Estrai scansioni",
  "desc": "Trova le foto o scansioni presenti nelle pagine e le salva come immagini separate e raddrizzate.",
  "endpoint": "/api/v1/misc/extract-image-scans",
  "esce": "zip",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Trova le foto o scansioni presenti nelle pagine e le salva come immagini separate e raddrizzate.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui» e scarica il risultato: un archivio ZIP."
   ]
  }
 },
 {
  "id": "add-attachments",
  "cat": "modifica",
  "tag": "Modifica",
  "nome": "Aggiungi allegati",
  "desc": "Allega file di qualsiasi tipo dentro il PDF, come in un'email: per esempio il foglio Excel con i calcoli dentro la relazione.",
  "endpoint": "/api/v1/misc/add-attachments",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   },
   {
    "kind": "file",
    "name": "attachments",
    "label": "File da allegare (anche più di uno)",
    "required": true,
    "multiple": true,
    "accept": "*/*"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Allega file di qualsiasi tipo dentro il PDF, come in un'email: per esempio il foglio Excel con i calcoli dentro la relazione.",
   "formati": [
    "PDF",
    "Qualsiasi tipo di file"
   ],
   "notaFile": "Anche più file insieme, fino a 50 MB in tutto.",
   "passi": [
    "Scegli i file dal computer o dal telefono: «PDF» e «File da allegare (anche più di uno)».",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "extract-attachments",
  "cat": "modifica",
  "tag": "Modifica",
  "nome": "Estrai allegati",
  "desc": "Salva tutti i file allegati dentro il PDF.",
  "endpoint": "/api/v1/misc/extract-attachments",
  "esce": "zip",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Salva tutti i file allegati dentro il PDF.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui» e scarica il risultato: un archivio ZIP."
   ]
  }
 },
 {
  "id": "list-attachments",
  "cat": "modifica",
  "tag": "Modifica",
  "nome": "Elenca allegati",
  "desc": "Mostra l'elenco dei file allegati dentro il PDF, senza estrarli.",
  "endpoint": "/api/v1/misc/list-attachments",
  "esce": "json",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Mostra l'elenco dei file allegati dentro il PDF, senza estrarli.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui»: le informazioni compaiono subito sotto, nella finestra."
   ]
  }
 },
 {
  "id": "delete-attachment",
  "cat": "modifica",
  "tag": "Modifica",
  "nome": "Cancella allegato",
  "desc": "Elimina dal PDF un file allegato, indicando il suo nome (lo trovi con «Elenca allegati»).",
  "endpoint": "/api/v1/misc/delete-attachment",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   },
   {
    "kind": "text",
    "name": "attachmentName",
    "label": "Nome dell'allegato da eliminare",
    "required": true
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Elimina dal PDF un file allegato, indicando il suo nome (lo trovi con «Elenca allegati»).",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Compila le impostazioni: «Nome dell'allegato da eliminare» (obbligatorio).",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "rename-attachment",
  "cat": "modifica",
  "tag": "Modifica",
  "nome": "Rinomina allegato",
  "desc": "Cambia il nome di un file allegato dentro il PDF.",
  "endpoint": "/api/v1/misc/rename-attachment",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   },
   {
    "kind": "text",
    "name": "oldName",
    "label": "Nome attuale dell'allegato",
    "required": true
   },
   {
    "kind": "text",
    "name": "newName",
    "label": "Nuovo nome",
    "required": true
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Cambia il nome di un file allegato dentro il PDF.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Compila le impostazioni: «Nome attuale dell'allegato» (obbligatorio), «Nuovo nome» (obbligatorio).",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "show-javascript",
  "cat": "modifica",
  "tag": "Modifica",
  "nome": "Mostra JavaScript",
  "desc": "Mostra l'eventuale codice JavaScript nascosto nel PDF. Utile per controllare un file di provenienza sconosciuta.",
  "endpoint": "/api/v1/misc/show-javascript",
  "esce": "txt",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Mostra l'eventuale codice JavaScript nascosto nel PDF. Utile per controllare un file di provenienza sconosciuta.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui» e scarica il risultato: un file di testo (TXT)."
   ]
  }
 },
 {
  "id": "basic-info",
  "cat": "analisi",
  "tag": "Analisi",
  "nome": "Info base",
  "desc": "Mostra le informazioni principali del PDF: numero di pagine, peso e numero di parole.",
  "endpoint": "/api/v1/analysis/basic-info",
  "esce": "json",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Mostra le informazioni principali del PDF: numero di pagine, peso e numero di parole.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui»: le informazioni compaiono subito sotto, nella finestra."
   ]
  }
 },
 {
  "id": "document-properties",
  "cat": "analisi",
  "tag": "Analisi",
  "nome": "Proprietà documento",
  "desc": "Mostra titolo, autore, data di creazione e versione del PDF.",
  "endpoint": "/api/v1/analysis/document-properties",
  "esce": "json",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Mostra titolo, autore, data di creazione e versione del PDF.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui»: le informazioni compaiono subito sotto, nella finestra."
   ]
  }
 },
 {
  "id": "page-count",
  "cat": "analisi",
  "tag": "Analisi",
  "nome": "Conta pagine",
  "desc": "Dice quante pagine ha il PDF, senza doverlo aprire.",
  "endpoint": "/api/v1/analysis/page-count",
  "esce": "json",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Dice quante pagine ha il PDF, senza doverlo aprire.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui»: le informazioni compaiono subito sotto, nella finestra."
   ]
  }
 },
 {
  "id": "page-dimensions",
  "cat": "analisi",
  "tag": "Analisi",
  "nome": "Dimensioni pagina",
  "desc": "Mostra il formato di ogni pagina (in millimetri e punti), per verificare per esempio che siano tutte A4.",
  "endpoint": "/api/v1/analysis/page-dimensions",
  "esce": "json",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Mostra il formato di ogni pagina (in millimetri e punti), per verificare per esempio che siano tutte A4.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui»: le informazioni compaiono subito sotto, nella finestra."
   ]
  }
 },
 {
  "id": "font-info",
  "cat": "analisi",
  "tag": "Analisi",
  "nome": "Info caratteri",
  "desc": "Elenca i caratteri usati nel PDF e indica se sono incorporati. Il formato PDF/A richiede che lo siano tutti.",
  "endpoint": "/api/v1/analysis/font-info",
  "esce": "json",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Elenca i caratteri usati nel PDF e indica se sono incorporati. Il formato PDF/A richiede che lo siano tutti.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui»: le informazioni compaiono subito sotto, nella finestra."
   ]
  }
 },
 {
  "id": "annotation-info",
  "cat": "analisi",
  "tag": "Analisi",
  "nome": "Info annotazioni",
  "desc": "Elenca commenti, evidenziazioni e note presenti nel PDF, per non inviare un documento con annotazioni dimenticate.",
  "endpoint": "/api/v1/analysis/annotation-info",
  "esce": "json",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Elenca commenti, evidenziazioni e note presenti nel PDF, per non inviare un documento con annotazioni dimenticate.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui»: le informazioni compaiono subito sotto, nella finestra."
   ]
  }
 },
 {
  "id": "security-info",
  "cat": "analisi",
  "tag": "Analisi",
  "nome": "Info sicurezza",
  "desc": "Mostra se il PDF è protetto: password, permessi (stampa, copia, modifica) e firme.",
  "endpoint": "/api/v1/analysis/security-info",
  "esce": "json",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Mostra se il PDF è protetto: password, permessi (stampa, copia, modifica) e firme.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui»: le informazioni compaiono subito sotto, nella finestra."
   ]
  }
 },
 {
  "id": "form-fields-info",
  "cat": "analisi",
  "tag": "Analisi",
  "nome": "Info moduli",
  "desc": "Mostra quanti e quali campi compilabili contiene il modulo PDF.",
  "endpoint": "/api/v1/analysis/form-fields",
  "esce": "json",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Mostra quanti e quali campi compilabili contiene il modulo PDF.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui»: le informazioni compaiono subito sotto, nella finestra."
   ]
  }
 },
 {
  "id": "form-fields",
  "cat": "moduli",
  "tag": "Moduli",
  "nome": "Elenca campi",
  "desc": "Mostra l'elenco dei campi compilabili del modulo, con il loro nome: serve per compilarlo con «Compila moduli».",
  "endpoint": "/api/v1/form/fields",
  "esce": "json",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Mostra l'elenco dei campi compilabili del modulo, con il loro nome: serve per compilarlo con «Compila moduli».",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui»: le informazioni compaiono subito sotto, nella finestra."
   ]
  }
 },
 {
  "id": "form-fill",
  "cat": "moduli",
  "tag": "Moduli",
  "nome": "Compila moduli",
  "desc": "Compila in automatico i campi di un modulo PDF a partire dai dati scritti in formato JSON. Prima ricava i nomi dei campi con «Elenca campi».",
  "endpoint": "/api/v1/form/fill",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF del modulo",
    "required": true,
    "accept": "application/pdf"
   },
   {
    "kind": "textarea",
    "name": "formData",
    "label": "Dati da inserire, in formato JSON (es. {\"nome\":\"Mario\"})",
    "required": true,
    "rows": 6
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Compila in automatico i campi di un modulo PDF a partire dai dati scritti in formato JSON. Prima ricava i nomi dei campi con «Elenca campi».",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF del modulo».",
    "Compila le impostazioni: «Dati da inserire, in formato JSON (es. {\"nome\":\"Mario\"})» (obbligatorio).",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "form-delete-fields",
  "cat": "moduli",
  "tag": "Moduli",
  "nome": "Cancella campi",
  "desc": "Elimina dal modulo i campi compilabili che indichi per nome.",
  "endpoint": "/api/v1/form/delete-fields",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   },
   {
    "kind": "textarea",
    "name": "names",
    "label": "Nomi dei campi da eliminare, in formato JSON",
    "required": true,
    "placeholder": "[\"nome\", \"cognome\"]",
    "rows": 3
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Elimina dal modulo i campi compilabili che indichi per nome.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Compila le impostazioni: «Nomi dei campi da eliminare, in formato JSON» (obbligatorio).",
    "Premi «Esegui» e scarica il risultato: un file PDF."
   ]
  }
 },
 {
  "id": "form-extract-csv",
  "cat": "moduli",
  "tag": "Moduli",
  "nome": "Esporta moduli in CSV",
  "desc": "Esporta i valori inseriti nei campi del modulo in un file CSV, apribile con Excel.",
  "endpoint": "/api/v1/form/extract-csv",
  "esce": "csv",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Esporta i valori inseriti nei campi del modulo in un file CSV, apribile con Excel.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui» e scarica il risultato: un file CSV, apribile con Excel."
   ]
  }
 },
 {
  "id": "form-extract-xlsx",
  "cat": "moduli",
  "tag": "Moduli",
  "nome": "Esporta moduli in Excel",
  "desc": "Esporta i valori inseriti nei campi del modulo in un file Excel.",
  "endpoint": "/api/v1/form/extract-xlsx",
  "esce": "xlsx",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": false,
  "guida": {
   "cosaFa": "Esporta i valori inseriti nei campi del modulo in un file Excel.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui» e scarica il risultato: un file Excel (XLSX)."
   ]
  }
 },
 {
  "id": "filter-page-count",
  "cat": "filtri",
  "tag": "Controlli",
  "nome": "Controlla numero di pagine",
  "desc": "Controlla se il PDF ha il numero di pagine che indichi, per esempio «al massimo 10» quando un modulo o un bando fissano un limite. Se la risposta è sì, puoi scaricare il PDF; se è no, te lo diciamo.",
  "endpoint": "/api/v1/filter/filter-page-count",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   },
   {
    "kind": "number",
    "name": "pageCount",
    "label": "Numero di pagine",
    "required": true
   },
   {
    "kind": "select",
    "name": "comparator",
    "label": "Il PDF deve avere",
    "options": [
     [
      "Equal",
      "Esattamente"
     ],
     [
      "Greater",
      "Almeno (uguale o più)"
     ],
     [
      "Less",
      "Al massimo (uguale o meno)"
     ]
    ]
   }
  ],
  "controllo": true,
  "guida": {
   "cosaFa": "Controlla se il PDF ha il numero di pagine che indichi, per esempio «al massimo 10» quando un modulo o un bando fissano un limite. Se la risposta è sì, puoi scaricare il PDF; se è no, te lo diciamo.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Compila le impostazioni: «Numero di pagine» (obbligatorio), «Il PDF deve avere».",
    "Premi «Esegui»: ti diciamo se il PDF rispetta la condizione e, se sì, puoi scaricarlo."
   ]
  }
 },
 {
  "id": "filter-page-size",
  "cat": "filtri",
  "tag": "Controlli",
  "nome": "Controlla formato pagine",
  "desc": "Controlla se le pagine del PDF sono più piccole o più grandi del formato che scegli (A4, A3, A5). Se la risposta è sì, puoi scaricare il PDF; se è no, te lo diciamo.",
  "endpoint": "/api/v1/filter/filter-page-size",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   },
   {
    "kind": "select",
    "name": "standardPageSize",
    "label": "Formato",
    "options": [
     [
      "A4",
      "A4"
     ],
     [
      "A3",
      "A3"
     ],
     [
      "A5",
      "A5"
     ]
    ]
   },
   {
    "kind": "select",
    "name": "comparator",
    "label": "Le pagine devono essere",
    "options": [
     [
      "Less",
      "Più piccole del formato"
     ],
     [
      "Greater",
      "Più grandi del formato"
     ]
    ]
   }
  ],
  "controllo": true,
  "guida": {
   "cosaFa": "Controlla se le pagine del PDF sono più piccole o più grandi del formato che scegli (A4, A3, A5). Se la risposta è sì, puoi scaricare il PDF; se è no, te lo diciamo.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Compila le impostazioni: «Formato», «Le pagine devono essere».",
    "Premi «Esegui»: ti diciamo se il PDF rispetta la condizione e, se sì, puoi scaricarlo."
   ]
  }
 },
 {
  "id": "filter-file-size",
  "cat": "filtri",
  "tag": "Controlli",
  "nome": "Controlla peso del file",
  "desc": "Controlla se il PDF rispetta un peso massimo, per esempio il limite di un portale o di una casella email. Se la risposta è sì, puoi scaricare il PDF; se è no, te lo diciamo.",
  "endpoint": "/api/v1/filter/filter-file-size",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   },
   {
    "kind": "number",
    "name": "fileSize",
    "label": "Peso in byte (10485760 = 10 MB)",
    "required": true,
    "default": "10485760"
   },
   {
    "kind": "select",
    "name": "comparator",
    "label": "Il file deve pesare",
    "options": [
     [
      "Less",
      "Al massimo (uguale o meno)"
     ],
     [
      "Greater",
      "Almeno (uguale o più)"
     ],
     [
      "Equal",
      "Esattamente"
     ]
    ]
   }
  ],
  "controllo": true,
  "guida": {
   "cosaFa": "Controlla se il PDF rispetta un peso massimo, per esempio il limite di un portale o di una casella email. Se la risposta è sì, puoi scaricare il PDF; se è no, te lo diciamo.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Compila le impostazioni: «Peso in byte (10485760 = 10 MB)» (obbligatorio), «Il file deve pesare».",
    "Premi «Esegui»: ti diciamo se il PDF rispetta la condizione e, se sì, puoi scaricarlo."
   ]
  }
 },
 {
  "id": "filter-page-rotation",
  "cat": "filtri",
  "tag": "Controlli",
  "nome": "Controlla orientamento pagine",
  "desc": "Controlla se le pagine del PDF sono ruotate dei gradi che indichi (0 = dritte, 90 = girate di lato). Se la risposta è sì, puoi scaricare il PDF; se è no, te lo diciamo.",
  "endpoint": "/api/v1/filter/filter-page-rotation",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   },
   {
    "kind": "number",
    "name": "rotation",
    "label": "Rotazione in gradi (0, 90, 180 o 270)",
    "default": "0"
   }
  ],
  "controllo": true,
  "guida": {
   "cosaFa": "Controlla se le pagine del PDF sono ruotate dei gradi che indichi (0 = dritte, 90 = girate di lato). Se la risposta è sì, puoi scaricare il PDF; se è no, te lo diciamo.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Compila le impostazioni: «Rotazione in gradi (0, 90, 180 o 270)».",
    "Premi «Esegui»: ti diciamo se il PDF rispetta la condizione e, se sì, puoi scaricarlo."
   ]
  }
 },
 {
  "id": "filter-contains-text",
  "cat": "filtri",
  "tag": "Controlli",
  "nome": "Controlla se contiene un testo",
  "desc": "Controlla se nel PDF compare una parola o una frase, per esempio un numero di fattura o una clausola. Se la risposta è sì, puoi scaricare il PDF; se è no, te lo diciamo.",
  "endpoint": "/api/v1/filter/filter-contains-text",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   },
   {
    "kind": "text",
    "name": "text",
    "label": "Testo da cercare",
    "required": true
   },
   {
    "kind": "text",
    "name": "pageNumbers",
    "label": "Pagine in cui cercare (vuoto = tutte)"
   }
  ],
  "controllo": true,
  "guida": {
   "cosaFa": "Controlla se nel PDF compare una parola o una frase, per esempio un numero di fattura o una clausola. Se la risposta è sì, puoi scaricare il PDF; se è no, te lo diciamo.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Compila le impostazioni: «Testo da cercare» (obbligatorio), «Pagine in cui cercare (vuoto = tutte)».",
    "Premi «Esegui»: ti diciamo se il PDF rispetta la condizione e, se sì, puoi scaricarlo."
   ]
  }
 },
 {
  "id": "filter-contains-image",
  "cat": "filtri",
  "tag": "Controlli",
  "nome": "Controlla se contiene immagini",
  "desc": "Controlla se nel PDF ci sono immagini o scansioni, per esempio per capire se un documento va passato all'OCR. Se la risposta è sì, puoi scaricare il PDF; se è no, te lo diciamo.",
  "endpoint": "/api/v1/filter/filter-contains-image",
  "esce": "pdf",
  "campi": [
   {
    "kind": "file",
    "name": "fileInput",
    "label": "PDF",
    "required": true,
    "accept": "application/pdf"
   }
  ],
  "controllo": true,
  "guida": {
   "cosaFa": "Controlla se nel PDF ci sono immagini o scansioni, per esempio per capire se un documento va passato all'OCR. Se la risposta è sì, puoi scaricare il PDF; se è no, te lo diciamo.",
   "formati": [
    "PDF"
   ],
   "notaFile": "Un file alla volta, massimo 50 MB.",
   "passi": [
    "Scegli il file dal computer o dal telefono: «PDF».",
    "Premi «Esegui»: ti diciamo se il PDF rispetta la condizione e, se sì, puoi scaricarlo."
   ]
  }
 }
];
