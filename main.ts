// One Line, No Deadline Met — entrypoint.
//
// The whole entry is the single line kept in entry.txt beside this
// file. All this program does is carry that line, byte for byte,
// into the output directory the grader names, so the text that
// gets judged is exactly the text that sits in this repository.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The gate only lets a line of 1 to 200 characters through, so
// refuse to ship anything else rather than be scored a quiet 0.
const bytes = readFileSync(join(here, "entry.txt"));
const line = bytes.toString("utf8");
if (line.trim().length === 0 || [...line].length > 200) {
  throw new Error("entry.txt must hold one line of 1 to 200 characters");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), bytes);
