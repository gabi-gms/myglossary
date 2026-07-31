import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-[#3a363d] bg-[#181719]">
      <nav
        aria-label="Navegação principal"
        className="
          mx-auto flex w-[calc(100%-2rem)]
          max-w-[1600px] items-center py-5
        "
      >
        <Link
          href="/"
          className="
            inline-flex items-center gap-3
            text-[#f1edf0] no-underline
            transition hover:opacity-90
            focus-visible:outline-2
            focus-visible:outline-offset-4
            focus-visible:outline-(--color-accent)
          "
        >
          <span
            aria-hidden="true"
            className="
              size-2.5 shrink-0 rounded-full
              bg-(--color-accent)
              shadow-[0_0_12px_color-mix(in_srgb,var(--color-accent)_65%,transparent)]
            "
          />

          <span className="text-xl font-bold tracking-tight">
            myGlossary
          </span>

          <span
            className="
              rounded-full border border-(--color-accent)
              bg-[color-mix(in_srgb,var(--color-accent)_12%,transparent)]
              px-2 py-0.5 text-[0.625rem] font-bold
              tracking-[0.14em] text-(--color-accent)
            "
          >
            BETA
          </span>
        </Link>
      </nav>
    </header>
  );
}