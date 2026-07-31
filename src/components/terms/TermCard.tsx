import Link from "next/link";
import type { CSSProperties } from "react";

import type {
  TermSummaryWithDetails,
} from "@/types/glossary";

type TermCardProps = {
  term: TermSummaryWithDetails;
};

export function TermCard({ term }: TermCardProps) {
  const categoryColor = {
    "--category-color": term.category.color,
  } as CSSProperties;

  return (
    <Link
      href={`/terms/${term.slug}`}
      style={categoryColor}
      className="
        flex min-h-56 flex-col gap-4 rounded-xl border border-(--color-border)
        bg-(--color-surface) p-6 text-inherit no-underline
        transition duration-200
        hover:-translate-y-0.5
        hover:border-(--category-color)
        hover:shadow-[0_0_18px_color-mix(in_srgb,var(--category-color)_28%,transparent)]
        focus-visible:outline-2
        focus-visible:outline-offset-4
        focus-visible:outline-(--category-color)
      "
    >
      <h2 className="text-xl font-semibold text-(--color-text-primary)">
        {term.name}
      </h2>

      <p className="line-clamp-3 flex-1 leading-relaxed text-(--color-text-secondary)">
        {term.shortDescription}
      </p>

      <div className="flex flex-wrap gap-2">
        <span
          className="
            rounded-full bg-(--category-color) px-3 py-1
            text-xs font-medium text-(--color-background)
          "
        >
          {term.category.name}
        </span>

        <span
          className="
            rounded-full border border-(--category-color) px-3 py-1
            text-xs font-medium text-(--category-color)
          "
        >
          {term.subcategory.name}
        </span>
      </div>
    </Link>
  );
}