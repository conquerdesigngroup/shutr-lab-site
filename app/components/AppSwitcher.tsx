import Link from "next/link";

type AppId = "lab" | "touchup";

const APPS: { id: AppId; name: string; href: string }[] = [
  { id: "lab", name: "SHUTR LAB", href: "/" },
  { id: "touchup", name: "Touch-Up", href: "/touchup" },
];

/** Two equal tabs at the top of each download page, so the team can jump
 *  between the apps without hunting for the footer link. Each tab is a real
 *  route, so "/" and "/touchup" stay shareable on their own. */
export function AppSwitcher({
  active,
  versions,
}: {
  active: AppId;
  versions: Record<AppId, string>;
}) {
  return (
    <nav
      aria-label="Apps"
      className="mb-12 grid grid-cols-2 gap-1 rounded-2xl border border-line bg-surface p-1"
    >
      {APPS.map((app) => {
        const isActive = app.id === active;
        return (
          <Link
            key={app.id}
            href={app.href}
            aria-current={isActive ? "page" : undefined}
            className={`flex flex-col items-center justify-center gap-x-2.5 gap-y-0.5 rounded-xl px-3 py-3 text-sm font-extrabold tracking-wide transition-colors sm:flex-row ${
              isActive
                ? "bg-bg text-paper ring-1 ring-line"
                : "text-muted hover:bg-surface-2 hover:text-paper"
            }`}
          >
            <span className="flex items-center gap-2.5 whitespace-nowrap">
              <span
                aria-hidden="true"
                className={`size-2 shrink-0 rounded-sm ${isActive ? "bg-accent" : "bg-line"}`}
              />
              {app.name}
            </span>
            <span className="text-xs font-semibold text-muted">
              {versions[app.id]}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
