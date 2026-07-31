import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-(--color-border) bg-(--color-background)">
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
            text-(--color-text-primary) no-underline
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
              shadow-[0_0_12px_var(--color-accent-glow)]
            "
          />

          <span className="text-xl font-bold tracking-tight">
            myGlossary
          </span>

          <span
            className="
              rounded
              bg-(--color-accent-soft)
              px-1.5 py-0.5 text-[0.550rem] font-bold
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