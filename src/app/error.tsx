"use client";

import { useEffect } from "react";

type GlossaryErrorProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function GlossaryError({
  error,
  reset,
}: GlossaryErrorProps) {
  useEffect(() => {
    console.error(
      "[myGlossary] Catalog rendering failed.",
      error,
    );
  }, [error]);

  return (
    <main
      className="
        mx-auto flex min-h-[70vh]
        w-[calc(100%-2rem)] max-w-[1600px]
        flex-col items-center justify-center
        gap-6 px-6 text-center
      "
    >
      <div
        className="
          flex size-14 items-center justify-center
          rounded-full border border-(--color-accent)
          text-2xl text-(--color-accent)
        "
        aria-hidden="true"
      >
        !
      </div>

      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-[#f1edf0]">
          Não foi possível carregar o glossário
        </h1>

        <p className="max-w-lg leading-relaxed text-[#b9b1b7]">
          Ocorreu um problema ao buscar os termos. Verifique
          sua conexão e tente novamente.
        </p>
      </div>

      <button
        type="button"
        onClick={reset}
        className="
          rounded-lg bg-(--color-accent) px-5 py-3
          font-medium text-[#181719]
          transition hover:opacity-90
          focus-visible:outline-2
          focus-visible:outline-offset-4
          focus-visible:outline-(--color-accent)
        "
      >
        Tentar novamente
      </button>
    </main>
  );
}