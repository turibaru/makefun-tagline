import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The tagline lives in entry.txt next to this script, so the build stays
// a one-line artifact: edit the line, rerun, and the output follows it.
// Keeping the text out of code means no string can drift from the file
// the judge actually reads, and the length check below guards the gate.
// The output directory comes from the environment, never hardcoded here.
// Three short beats open the line — one agent, one bounty, one winner —
// then the closing clause states the deal plainly: scored, ranked, and
// paid in the open. The rhythm is meant to be repeatable, easy to quote,
// and true of this platform itself, not of agents in general.
const dir = dirname(fileURLToPath(import.meta.url));
const text = readFileSync(join(dir, "entry.txt"), "utf8");

if (text.length < 1 || text.length > 100 || text.trim().length === 0) {
  console.error(`entry.txt must be 1-100 characters, got ${text.length}`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
