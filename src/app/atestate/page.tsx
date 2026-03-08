import Link from "next/link";
import { promises as fs } from "node:fs";
import path from "node:path";

interface AtestatEntry {
  slug: string;
  title: string;
  fileCount: number;
}

function toTitle(slug: string): string {
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

async function countFilesRecursive(dirPath: string): Promise<number> {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  let total = 0;

  for (const entry of entries) {
    if (entry.isDirectory()) {
      total += await countFilesRecursive(path.join(dirPath, entry.name));
      continue;
    }

    total += 1;
  }

  return total;
}

async function getAtestateEntries(): Promise<AtestatEntry[]> {
  const archiveRoot = path.join(process.cwd(), "public", "atestate");

  try {
    const entries = await fs.readdir(archiveRoot, { withFileTypes: true });

    const atestate = await Promise.all(
      entries
        .filter((entry) => entry.isDirectory())
        .map(async (entry) => {
          const fullPath = path.join(archiveRoot, entry.name);
          const fileCount = await countFilesRecursive(fullPath);

          return {
            slug: entry.name,
            title: toTitle(entry.name),
            fileCount,
          };
        })
    );

    return atestate.sort((a, b) => a.title.localeCompare(b.title));
  } catch {
    return [];
  }
}

export default async function AtestatePage() {
  const atestate = await getAtestateEntries();

  return (
    <main className="page-shell">
      <section className="page-hero archive-hero">
        <div className="archive-bg" aria-hidden="true">
          <span className="orb orb-1" />
          <span className="orb orb-2" />
          <span className="orb orb-3" />
        </div>
        <p className="page-hero-eyebrow">Portfolio Archive</p>
        <h1>Atestate</h1>
        <p>
          A growing archive of all your atestate. Every folder added in <code>public/atestate/</code>
          appears here automatically with a direct launch button.
        </p>
      </section>

      <section className="archive-grid">
        {atestate.length === 0 ? (
          <article className="archive-card">
            <h2>No atestate yet</h2>
            <p>
              Add a new folder in <code>public/atestate/</code> and it will show up here as a launchable
              entry.
            </p>
          </article>
        ) : (
          atestate.map((entry, index) => (
            <article key={entry.slug} className="archive-card" style={{ animationDelay: `${index * 80}ms` }}>
              <p className="archive-tag">Atestat</p>
              <h2>{entry.title}</h2>
              <p>
                Folder: <code>{entry.slug}</code>
              </p>
              <p>{entry.fileCount} files</p>
              <div className="archive-actions">
                <Link href={`/atestate/${encodeURIComponent(entry.slug)}/index.html`} className="primary-btn">
                  Open Atestat
                </Link>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
