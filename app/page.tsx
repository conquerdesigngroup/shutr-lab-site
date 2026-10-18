import Link from "next/link";
import { DownloadButton } from "@/app/components/DownloadButton";
import { Section } from "@/app/components/Section";
import { ShutrWordmark } from "@/app/components/ShutrWordmark";
import { ShutrMark } from "@/app/components/ShutrMark";

interface ReleaseAsset {
  name: string;
  size: number;
  browser_download_url: string;
}

interface Release {
  tag_name: string;
  assets: ReleaseAsset[];
}

const RELEASES_PAGE =
  "https://github.com/conquerdesigngroup/shutr-lab/releases";
const RELEASES_LATEST = `${RELEASES_PAGE}/latest`;

async function getLatestRelease(): Promise<Release | null> {
  try {
    const res = await fetch(
      "https://api.github.com/repos/conquerdesigngroup/shutr-lab/releases/latest",
      // Re-fetch every minute. Worst-case staleness after a release is 60s,
      // even if the explicit deploy-hook trigger from dist/build-dmg.sh misses.
      // GitHub's API rate limit (60 req/h unauth) is plenty for this.
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    return (await res.json()) as Release;
  } catch {
    return null;
  }
}

export default async function Home() {
  const release = await getLatestRelease();
  const dmg = release?.assets.find((a) =>
    a.name.toLowerCase().endsWith(".dmg")
  );
  const version = release?.tag_name ?? "latest";
  const sizeMb = dmg ? `${(dmg.size / (1024 * 1024)).toFixed(1)} MB` : "~5 MB";
  const downloadUrl = dmg?.browser_download_url ?? RELEASES_LATEST;

  return (
    <>
      <main className="mx-auto w-full max-w-3xl px-6 pt-16 pb-24 flex-1">
        <header className="mb-16">
          <ShutrWordmark className="h-24 w-auto text-paper" />
        </header>

        <section className="mb-12">
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-[1.05] tracking-tight mb-4">
            Canon tether.
            <br />
            <span className="text-accent">Built for macOS.</span>
          </h1>
          <p className="text-lg text-muted max-w-xl">
            Native USB tethering for Canon EOS cameras. No Electron, no EOS
            Utility — just a small Mac app that catches every shot, files it
            correctly, and stays out of your way.
          </p>
        </section>

        <div className="mb-14 flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-line bg-surface p-7">
          <div className="flex items-center gap-4">
            <div className="grid size-14 place-items-center rounded-xl bg-bg ring-1 ring-line shrink-0">
              <ShutrMark className="size-9 text-paper" />
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted leading-7">
              <div>Download — macOS</div>
              <div>
                <span className="text-paper font-bold">{version}</span> &middot;{" "}
                {sizeMb}{" "}&middot; Universal
              </div>
            </div>
          </div>

          <DownloadButton href={downloadUrl}>Download for macOS</DownloadButton>
        </div>

        <Section title="Install">
          <ol className="space-y-2">
            {[
              "Open the downloaded .dmg",
              "Drag SHUTR LAB to your Applications folder",
              "Launch it — connect your Canon over USB and you're tethered",
            ].map((step, i) => (
              <li
                key={i}
                className="relative rounded-[10px] border border-line bg-surface py-4 pl-14 pr-4 text-paper"
              >
                <span className="absolute left-[18px] top-1/2 -translate-y-1/2 grid size-[26px] place-items-center rounded-md bg-accent text-[#062612] text-xs font-extrabold">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </Section>

        <Section title="What it does">
          <ul className="grid gap-2 sm:grid-cols-2">
            {[
              "Real USB tether to Canon EOS bodies (R6 Mark II tested)",
              "Auto-downloads every capture into your shoot folders",
              "Recital workflow: stations, solos/duos/trios, groups",
              "Full exposure controls: Tv, Av, ISO, EV, WB, picture style",
              "Card import, intervalometer, bulb timer, batch rename",
              "Updates itself — no manual re-downloads",
            ].map((feat) => (
              <li
                key={feat}
                className="flex items-start gap-2.5 rounded-[10px] border border-line bg-surface p-4 text-sm text-paper"
              >
                <span className="mt-1.5 size-2 shrink-0 rounded-sm bg-accent" />
                {feat}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Requirements">
          <div className="flex flex-wrap gap-6 rounded-[10px] border border-line bg-surface p-4 text-[13px] text-muted">
            <div>
              <strong className="text-paper font-semibold">macOS</strong> 13.0
              or later
            </div>
            <div>
              <strong className="text-paper font-semibold">
                Apple Silicon
              </strong>{" "}
              or Intel
            </div>
            <div>
              <strong className="text-paper font-semibold">USB</strong>{" "}
              connection to a supported Canon EOS body
            </div>
          </div>
        </Section>
      </main>

      <footer className="border-t border-line py-6 text-center text-xs text-muted tracking-wide">
        © Media Maple ·{" "}
        <a
          href={RELEASES_PAGE}
          className="underline decoration-line decoration-1 underline-offset-[3px] hover:text-paper hover:decoration-accent"
        >
          All releases
        </a>{" "}
        ·{" "}
        <Link
          href="/touchup"
          className="underline decoration-line decoration-1 underline-offset-[3px] hover:text-paper hover:decoration-accent"
        >
          Touch-Up
        </Link>
      </footer>
    </>
  );
}
