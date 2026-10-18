import type { Metadata } from "next";
import Link from "next/link";
import { DownloadButton } from "@/app/components/DownloadButton";
import { Section } from "@/app/components/Section";
import { ShutrWordmark } from "@/app/components/ShutrWordmark";
import { ShutrMark } from "@/app/components/ShutrMark";
import { TOUCHUP_RELEASE } from "./release";

export const metadata: Metadata = {
  title: "SHUTR Touch-Up — team download",
  description:
    "SHUTR LAB companion: automatic, face-aware lighting touch-ups for tethered JPEGs.",
  // A team tool, not a product page: keep it out of search results.
  robots: { index: false, follow: false },
};

export default function TouchUp() {
  const { version, url, sizeMb, notarized } = TOUCHUP_RELEASE;

  return (
    <>
      <main className="mx-auto w-full max-w-3xl px-6 pt-16 pb-24 flex-1">
        <header className="mb-16">
          <Link href="/" aria-label="SHUTR LAB home">
            <ShutrWordmark className="h-24 w-auto text-paper" />
          </Link>
        </header>

        <section className="mb-12">
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-[1.05] tracking-tight mb-4">
            Touch-Up.
            <br />
            <span className="text-accent">Fair light, every frame.</span>
          </h1>
          <p className="text-lg text-muted max-w-xl">
            Stage one after SHUTR LAB. It watches your job folder, gives every
            JPEG the same small lighting and colour fix, and writes it to a
            separate folder for Evoto. Your originals are never changed.
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
                <span className="text-paper font-bold">v{version}</span> &middot;{" "}
                {sizeMb} MB &middot; Apple Silicon
              </div>
            </div>
          </div>

          <DownloadButton href={url}>Download Touch-Up</DownloadButton>
        </div>

        <Section title="Install">
          <ol className="space-y-2">
            {[
              "Open the downloaded .dmg",
              "Drag SHUTR Touchup to your Applications folder",
              "Open it, choose the SHUTR LAB job folder and an output folder, press Start watching",
              "Point Evoto's Auto Import at the output folder",
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

        {!notarized && (
          <Section title="First launch only">
            <div className="rounded-[10px] border border-line bg-surface p-5 text-sm text-paper">
              <p className="mb-3 text-muted">
                This build is signed but still waiting on Apple&rsquo;s
                notarization, so macOS asks you to confirm it once:
              </p>
              <ol className="list-decimal space-y-1.5 pl-5">
                <li>
                  Open SHUTR Touchup. When macOS says it can&rsquo;t verify the
                  app, click <strong>Done</strong> (or <strong>OK</strong>).
                </li>
                <li>
                  Open <strong>System Settings &rarr; Privacy &amp; Security</strong>{" "}
                  and scroll down.
                </li>
                <li>
                  Next to &ldquo;SHUTR Touchup was blocked&rdquo;, click{" "}
                  <strong>Open Anyway</strong>, then confirm.
                </li>
              </ol>
              <p className="mt-3 text-muted">After that it opens normally.</p>
            </div>
          </Section>
        )}

        <Section title="What it does">
          <ul className="grid gap-2 sm:grid-cols-2">
            {[
              "Exposure and white balance read off the white backdrop",
              "Matched to the last few frames, never more than 0.5 EV",
              "The same correction for every skin tone in the frame",
              "Gentle contrast, anchored on each face",
              "Mirrors your folders; originals stay untouched",
              "Flags frames worth a second look",
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
              <strong className="text-paper font-semibold">macOS</strong> 14
              Sonoma or later
            </div>
            <div>
              <strong className="text-paper font-semibold">
                Apple Silicon
              </strong>{" "}
              (M1 or newer)
            </div>
            <div>
              <strong className="text-paper font-semibold">SHUTR LAB</strong>{" "}
              writing JPEGs to a job folder
            </div>
          </div>
        </Section>
      </main>

      <footer className="border-t border-line py-6 text-center text-xs text-muted tracking-wide">
        © Media Maple ·{" "}
        <Link
          href="/"
          className="underline decoration-line decoration-1 underline-offset-[3px] hover:text-paper hover:decoration-accent"
        >
          SHUTR LAB
        </Link>
      </footer>
    </>
  );
}
