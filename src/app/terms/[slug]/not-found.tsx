import Link from "next/link";

export default function TermNotFound() {
  return (
    <main
      className="
        flex min-h-[70vh] flex-col items-center
        justify-center gap-6 px-6 text-center
      "
    >
      <h1 className="text-3xl font-bold text-(--color-text-primary)">
        Termo não encontrado
      </h1>

      <p className="text-(--color-text-secondary)">
        O termo solicitado não existe ou não está disponível.
      </p>

      <Link
        href="/"
        className="
          rounded-lg bg-(--color-accent) px-5 py-3
          font-medium text-(--color-accent-foreground) no-underline
          transition hover:opacity-90
        "
      >
        Voltar ao glossário
      </Link>
    </main>
  );
}