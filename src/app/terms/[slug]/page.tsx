import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";

import { RelatedTermCard } from "@/components/terms/RelatedTermCard";
import { getTermPageData } from "@/lib/glossary-data";

type TermPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function TermPage({
  params,
}: TermPageProps) {
const { slug } = await params;

const {
  term,
  relatedTerms,
} = await getTermPageData(slug);

if (!term) {
  notFound();
}

  const categoryColor = {
    "--category-color": term.category.color,
  } as CSSProperties;

  return (
    <main
      style={categoryColor}
      className="mx-auto w-[calc(100%-2rem)] max-w-5xl py-10"
    >
      <nav
        aria-label="Navegação estrutural"
        className="
          mb-12 flex flex-wrap items-center gap-2
          text-sm text-[#b9b1b7]
        "
      >
        <Link
          href="/"
          className="
            no-underline transition
            hover:text-(--category-color)
          "
        >
          Glossário
        </Link>

        <span aria-hidden="true"></span>
        <span>{term.category.name}</span>
        <span aria-hidden="true"></span>
        <span>{term.subcategory.name}</span>
        <span aria-hidden="true"></span>
        <span aria-current="page">{term.name}</span>
      </nav>

      <article className="mx-auto max-w-3xl text-center">
        <h1
          className="
            mb-4 text-4xl font-bold
            text-(--category-color)
          "
        >
          {term.name}
        </h1>

        {term.nameVariations.length > 0 && (
          <div className="mb-10 text-sm text-[#b9b1b7]">
            {term.nameVariations.map((variation) => (
              <p key={variation}>{variation}</p>
            ))}
          </div>
        )}

        <section className="mb-10">
          <p className="text-justify leading-8 text-[#d5cfd3]">
            {term.fullDescription}
          </p>
        </section>

        {term.analogy && (
          <section className="mb-10">
            <h2
              className="
                mb-4 text-xl font-semibold
                text-(--category-color)
              "
            >
              Analogia
            </h2>

            <p className="text-justify leading-8 text-[#d5cfd3]">
              {term.analogy}
            </p>
          </section>
        )}

        <div className="mb-14 flex flex-wrap justify-center gap-3">
          <span
            className="
              rounded-full bg-(--category-color)
              px-4 py-2 text-sm font-medium text-[#181719]
            "
          >
            {term.category.name}
          </span>

          <span
            className="
              rounded-full border border-(--category-color)
              px-4 py-2 text-sm font-medium
              text-(--category-color)
            "
          >
            {term.subcategory.name}
          </span>
        </div>
      </article>

      {relatedTerms.length > 0 && (
        <section aria-labelledby="related-terms-title">
          <h2
            id="related-terms-title"
            className="
              mb-6 text-center text-2xl font-semibold
              text-(--category-color)
            "
          >
            Termos relacionados
          </h2>

          <div
            className="
              grid grid-cols-1 gap-4
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {relatedTerms.map((relatedTerm) => (
              <RelatedTermCard
                key={relatedTerm.id}
                term={relatedTerm}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}