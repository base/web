#!/usr/bin/env node
// tools/ci/guard-docs-links.mjs
// Guard de enlaces de docs para base/web
// - Falla si encuentra rutas antiguas de Base Learn.
// - Soporta --check (CI) y --fix (autocorrección local).
//
// Contexto de problemas previos: PRs corrigiendo rutas /base-learn/... a /learn/.
// Ver también README (workspaces) y estructura /apps/base-docs (Docusaurus).

import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const args = process.argv.slice(2);
const MODE = args.includes('--fix') ? 'fix' : 'check';

// Rutas objetivo a escanear (docs y, opcionalmente, web)
const TARGET_DIRS = [
  path.join(__dirname, '..', '..', 'apps', 'base-docs'),
  // Descomenta si quieres revisar la web por enlaces a docs:
  // path.join(__dirname, '..', '..', 'apps', 'web'),
];

// Patrones obsoletos → reemplazos
const REPLACEMENTS = [
  {
    from: /https:\/\/docs\.base\.org\/base-learn\/docs\//g,
    to:   'https://docs.base.org/learn/',
    reason: 'Ruta de Base Learn antigua: /base-learn/docs/ → /learn/',
  },
  {
    from: /https:\/\/docs\.base\.org\/base-learn\//g,
    to:   'https://docs.base.org/learn/',
    reason: 'Ruta de Base Learn antigua: /base-learn/ → /learn/',
  },
];

// Comprobación adicional opcional: evitar el typo de CLOUDFLARE
const EXTRA_PATTERNS = [
  {
    regex: /\bCLOUDFARE_IPFS_PROXY\b/g,
    message: 'Se detectó CLOUDFARE_IPFS_PROXY (typo). Debe ser CLOUDFLARE_IPFS_PROXY.',
  },
  {
    regex: /cloudfare/i,
    message: 'Se detectó "cloudfare" (typo). Debe ser "cloudflare".',
  },
];

const exts = new Set(['.md', '.mdx', '.ts', '.tsx']);

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const e of entries) {
    if (e.name.startsWith('.')) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) files = files.concat(walk(p));
    else if (exts.has(path.extname(e.name))) files.push(p);
  }
  return files;
}

function run() {
  const files = TARGET_DIRS
    .filter(fs.existsSync)
    .flatMap(walk);

  let violations = [];

  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // 1) Reglas de reemplazo (enlaces de docs)
    for (const { from, to } of REPLACEMENTS) {
      if (MODE === 'fix') content = content.replace(from, to);
      if (MODE === 'check' && from.test(content)) {
        violations.push({
          file,
          message: `Enlace obsoleto encontrado: patrón ${from} (debe ser ${to})`,
        });
      }
    }

    // 2) Reglas extra (typos cloudflare)
    for (const { regex, message } of EXTRA_PATTERNS) {
      if (regex.test(content)) {
        violations.push({ file, message });
      }
    }

    if (MODE === 'fix' && content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`🔧 Arreglado: ${path.relative(process.cwd(), file)}`);
    }
  }

  if (violations.length) {
    console.error('\n❌ Se detectaron problemas en enlaces/typos:\n');
    const seen = new Set();
    for (const v of violations) {
      const key = `${v.file}::${v.message}`;
      if (seen.has(key)) continue;
      seen.add(key);
      console.error(`- ${path.relative(process.cwd(), v.file)} → ${v.message}`);
    }
    console.error('\nSugerencia: ejecuta `yarn lint:links:fix` para autocorregir lo posible.\n');
    process.exit(1);
  } else {
    console.log('✅ Links y typos OK.');
  }
}

run();
