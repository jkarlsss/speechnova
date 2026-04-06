import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const prismaBuildPath = path.join(
  process.cwd(),
  "node_modules",
  "prisma",
  "build",
  "index.js",
);

const target =
  'async function _nr(e,r,n){if(e.statusCode=r.status,e.statusMessage=r.statusText,r.headers.forEach((o,i)=>{e.setHeader(i,o)}),Anr(n)||!r.body){e.end();return}await(0,Ott.pipeline)(yle.Readable.fromWeb(r.body),e)}';

const replacement =
  'async function _nr(e,r,n){if(e.statusCode=r.status,e.statusMessage=r.statusText,r.headers.forEach((o,i)=>{e.setHeader(i,o)}),Anr(n)||!r.body){e.end();return}try{await(0,Ott.pipeline)(yle.Readable.fromWeb(r.body),e)}catch(o){if(o&&typeof o=="object"&&(("code"in o&&("ERR_STREAM_UNABLE_TO_PIPE"===o.code||"ERR_STREAM_PREMATURE_CLOSE"===o.code))||("name"in o&&"AbortError"===o.name)))return;throw o}}';

try {
  const source = await readFile(prismaBuildPath, "utf8");

  if (source.includes(replacement)) {
    console.log("Prisma Studio patch already applied.");
    process.exit(0);
  }

  if (!source.includes(target)) {
    console.warn("Prisma Studio patch target not found; skipping.");
    process.exit(0);
  }

  await writeFile(prismaBuildPath, source.replace(target, replacement), "utf8");
  console.log("Applied Prisma Studio stream patch.");
} catch (error) {
  console.warn(
    "Failed to patch Prisma Studio:",
    error instanceof Error ? error.message : String(error),
  );
  process.exit(0);
}
