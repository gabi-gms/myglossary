import Link from "next/link";
import type { CSSProperties } from "react";

import type { TermWithDetails } from "@/types/glossary";

type RelatedTermCardProps = {
  term: TermWithDetails;
};

export function RelatedTermCard({
  term,
}: RelatedTermCardProps) {
  const categoryColor = {
    "--category-color": term.category.color,
  } as CSSProperties;

  return (
    <Link
      href={`/termos/${term.slug}`}
      style={categoryColor}
      className="
        flex min-h-40 flex-col gap-3 rounded-xl
        border border-[#3a363d] bg-[#222024] p-5
        text-inherit no-underline transition duration-200
        hover:-translate-y-0.5
        hover:border-(--category-color)
        hover:shadow-[0_0_18px_color-mix(in_srgb,var(--category-color)_28%,transparent)]
        focus-visible:outline-2
        focus-visible:outline-offset-4
        focus-visible:outline-(--category-color)
      "
    >
      <h3 className="text-lg font-semibold text-[#f1edf0]">
        {term.name}
      </h3>

      <p className="line-clamp-3 text-sm leading-relaxed text-[#b9b1b7]">
        {term.shortDescription}
      </p>
    </Link>
  );
}