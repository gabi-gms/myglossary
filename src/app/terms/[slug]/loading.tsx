export default function TermLoading() {
  return (
    <main
      aria-busy="true"
      aria-label="Carregando termo"
      className="
        mx-auto w-[calc(100%-2rem)]
        max-w-5xl animate-pulse py-10
      "
    >
      <span className="sr-only">
        Carregando detalhes do termo...
      </span>

      <div className="mb-8 h-8 w-40 rounded bg-(--color-surface-soft)" />

      <div className="mb-12 h-5 w-3/4 rounded bg-(--color-surface-soft)" />

      <article className="mx-auto max-w-3xl">
        <div className="mx-auto mb-5 h-11 w-64 rounded bg-(--color-surface-strong)" />

        <div className="mx-auto mb-10 h-4 w-52 rounded bg-(--color-surface-soft)" />

        <div className="mb-10 space-y-4">
          <div className="h-4 rounded bg-(--color-surface-muted)" />
          <div className="h-4 rounded bg-(--color-surface-muted)" />
          <div className="h-4 rounded bg-(--color-surface-muted)" />
          <div className="h-4 w-4/5 rounded bg-(--color-surface-muted)" />
        </div>

        <div className="mx-auto mb-14 flex justify-center gap-3">
          <div className="h-9 w-40 rounded-full bg-(--color-surface-strong)" />
          <div className="h-9 w-28 rounded-full bg-(--color-surface-muted)" />
        </div>
      </article>

      <div className="mb-6 h-8 w-56 rounded bg-(--color-surface-strong)" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="h-40 rounded-xl bg-(--color-surface)" />
        <div className="h-40 rounded-xl bg-(--color-surface)" />
      </div>
    </main>
  );
}