import { DownloadIcon } from "@/app/components/DownloadIcon";

export function DownloadButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="
        inline-flex items-center gap-2.5 rounded-[10px] border border-accent-dark px-7 py-4
        text-sm font-extrabold tracking-wide text-[#062612]
        bg-gradient-to-b from-accent-light via-accent to-accent-dark
        shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_4px_0_var(--color-accent-shadow),0_12px_24px_rgba(16,221,92,0.25)]
        transition-transform duration-75
        hover:-translate-y-px hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_5px_0_var(--color-accent-shadow),0_16px_28px_rgba(16,221,92,0.35)]
        active:translate-y-0.5 active:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_1px_0_var(--color-accent-shadow),0_4px_8px_rgba(16,221,92,0.2)]
      "
    >
      <DownloadIcon className="size-[18px] shrink-0" />
      {children}
    </a>
  );
}
