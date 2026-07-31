export default function GlossaryLoading() {
  return (
    <main
      aria-busy="true"
      aria-label="Carregando glossário"
      className="
        mx-auto w-[calc(100%-2rem)]
        max-w-[1600px] py-10
      "
    >
      <span className="sr-only">
        Carregando termos do glossário...
      </span>

      <header className="mb-8 animate-pulse">
        <div
          className="
            grid items-start gap-4
            lg:grid-cols-[auto_minmax(280px,1fr)_minmax(360px,auto)]
          "
        >
          <div className="h-9 w-44 rounded-lg bg-[#2d2a2f]" />

          <div className="h-12 rounded-lg bg-[#222024]" />

          <div className="grid grid-cols-2 gap-3">
            <div className="h-12 rounded-lg bg-[#222024]" />
            <div className="h-12 rounded-lg bg-[#222024]" />
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <div className="h-5 w-40 rounded bg-[#2d2a2f]" />
        </div>
      </header>

      <section
        aria-hidden="true"
        className="
          grid grid-cols-1 gap-5
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        "
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="
              flex min-h-56 animate-pulse flex-col
              gap-4 rounded-xl border border-[#3a363d]
              bg-[#222024] p-6
            "
          >
            <div className="h-6 w-2/3 rounded bg-[#373239]" />

            <div className="space-y-3">
              <div className="h-4 rounded bg-[#302c32]" />
              <div className="h-4 rounded bg-[#302c32]" />
              <div className="h-4 w-3/4 rounded bg-[#302c32]" />
            </div>

            <div className="mt-auto flex gap-2">
              <div className="h-7 w-28 rounded-full bg-[#373239]" />
              <div className="h-7 w-20 rounded-full bg-[#302c32]" />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}