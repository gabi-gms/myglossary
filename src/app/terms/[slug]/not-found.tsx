import Link from "next/link";

export default function TermNotFound() {
  return (
    <main
      className="
        flex min-h-[70vh] flex-col items-center
        justify-center gap-6 px-6 text-center
      "
    >
      <h1 className="text-3xl font-bold text-[#f1edf0]">
        Termo não encontrado
      </h1>

      <p className="text-[#b9b1b7]">
        O termo solicitado não existe ou não está disponível.
      </p>

      <Link
        href="/"
        className="
          rounded-lg bg-[#c97c91] px-5 py-3
          font-medium text-[#181719] no-underline
          transition hover:opacity-90
        "
      >
        Voltar ao glossário
      </Link>
    </main>
  );
}