// The current SHUTR Touchup build. Its repo (conquerdesigngroup/shutr-touchup) is
// private, so the DMG lives in this project's Blob store instead of GitHub Releases.
//
// To ship a new version: run ./packaging/release_mac.sh in shutr-touchup, upload the
// DMG under a NEW pathname (blobs are cached, never overwrite one), then update this.
// `notarized: false` shows the team the one-time "Open Anyway" steps.
export const TOUCHUP_RELEASE = {
  version: "0.1.0",
  url: "https://dx93rbf6l8qxfqgz.public.blob.vercel-storage.com/touchup/0.1.0-signed/SHUTR-Touchup-0.1.0.dmg",
  sizeMb: 71.3,
  notarized: false,
};
