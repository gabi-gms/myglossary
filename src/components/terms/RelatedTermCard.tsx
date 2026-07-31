import Link from "next/link";
import type { CSSProperties } from "react";

import type {
  TermSummaryWithDetails,
} from "@/types/glossary";

type RelatedTermCardProps = {
  term: TermSummaryWithDetails;
};

export function RelatedTermCard({
  term,
}: RelatedTermCardProps) {
  const categoryColor = {
    "--category-color": term.category.color,
  } as CSSProperties;

  return (
    <Link
      href={`/terms/${term.slug}`}
      style={categoryColor}
      className="
        flex min-h-40 flex-col gap-3 rounded-xl
        border border-(--color-border) bg-(--color-surface) p-5
        text-inherit no-underline transition duration-200
        hover:-translate-y-0.5
        hover:border-(--category-color)
        hover:shadow-[0_0_18px_color-mix(in_srgb,var(--category-color)_25%,transparent)]
        focus-visible:outline-2
        focus-visible:outline-offset-4
        focus-visible:outline-(--category-color)
      "
    >
      <h3 className="text-lg font-semibold text-(--color-text-primary)">
        {term.name}
      </h3>

      <p className="line-clamp-3 text-sm leading-relaxed text-(--color-text-secondary)">
        {term.shortDescription}
      </p>
    </Link>
  );
}