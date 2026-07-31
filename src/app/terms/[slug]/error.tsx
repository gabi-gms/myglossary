"use client";

import { useEffect } from "react";
import Link from "next/link";

type TermErrorProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function TermError({
  error,
  reset,
}: TermErrorProps) {
  useEffect(() => {
    console.error(
      "[myGlossary] Term page rendering failed.",
      error,
    );
  }, [error]);

  return (
    <main
      className="
        mx-auto flex min-h-[70vh]
        w-[calc(100%-2rem)] max-w-5xl
        flex-col items-center justify-center
        gap-6 px-6 text-center
      "
    >
      <h1 className="text-3xl font-bold text-[#f1edf0]">
        Não foi possível carregar este termo
      </h1>

      <p className="max-w-lg leading-relaxed text-[#b9b1b7]">
        Ocorreu um problema ao buscar os detalhes. Você pode
        tentar novamente ou voltar ao glossário.
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="
            rounded-lg bg-(--accent) px-5 py-3
            font-medium text-[#181719]
            transition hover:opacity-90
          "
        >
          Tentar novamente
        </button>

        <Link
          href="/"
          className="
            rounded-lg border border-(--accent)
            px-5 py-3 font-medium text-(--accent)
            no-underline transition
            hover:border-(--accent)
            hover:text-(--accent)
          "
        >
          Voltar ao glossário
        </Link>
      </div>
    </main>
  );
}