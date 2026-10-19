interface ReleaseAsset {
  name: string;
  size: number;
  browser_download_url: string;
}

interface Release {
  tag_name: string;
  assets: ReleaseAsset[];
}

export const RELEASES_PAGE =
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

/** The SHUTR LAB DMG from the newest GitHub release, with fallbacks that
 *  still send people to the releases page if the API is unreachable. */
export async function getShutrLabDownload() {
  const release = await getLatestRelease();
  const dmg = release?.assets.find((a) =>
    a.name.toLowerCase().endsWith(".dmg")
  );
  return {
    version: release?.tag_name ?? "latest",
    sizeMb: dmg ? `${(dmg.size / (1024 * 1024)).toFixed(1)} MB` : "~5 MB",
    url: dmg?.browser_download_url ?? RELEASES_LATEST,
  };
}
