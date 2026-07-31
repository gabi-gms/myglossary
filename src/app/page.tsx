import { TermCard } from "@/components/terms/TermCard";
import { getTermsWithDetails } from "@/lib/glossary";

export default function Home() {
  const terms = getTermsWithDetails();

  return (
    <main className="mx-auto min-h-screen w-[calc(100%-2rem)] max-w-[1600px] py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#f1edf0]">
          myGlossary
        </h1>
      </header>

      <section
        aria-label="Termos do glossário"
        className="
          grid grid-cols-1 gap-5
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        "
      >
        {terms.map((term) => (
          <TermCard key={term.id} term={term} />
        ))}
      </section>
    </main>
  );
}