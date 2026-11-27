/**
 * Copies the site's current content (lib/data/*.ts) into Sanity so editors start from what is live.
 *
 *   npx sanity exec scripts/seed-sanity.ts --with-user-token
 *
 * Safe to re-run: existing documents are left alone. To overwrite them with the local data again
 * (this discards edits made in the Studio), add:  -- --replace
 */
import { getCliClient } from "sanity/cli";
import { SEED_DOCS, keyed } from "./seed-docs";

const client = getCliClient({ apiVersion: "2026-11-01" });
const replace = process.argv.includes("--replace");

async function main() {
  const { projectId, dataset } = client.config();
  console.log(`Seeding ${SEED_DOCS.length} documents into ${projectId}/${dataset} (${replace ? "replace" : "create if missing"})…`);
  const tx = client.transaction();
  for (const doc of SEED_DOCS) {
    const d = keyed(doc);
    if (replace) tx.createOrReplace(d);
    else tx.createIfNotExists(d);
  }
  await tx.commit();
  console.log("Done. Open the Studio to edit (npm run studio, or your <host>.sanity.studio address).");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
