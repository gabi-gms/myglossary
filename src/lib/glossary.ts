import {
  categories,
  subcategories,
  termRelations,
  terms,
} from "@/data/mockData";

import type {
  Category,
  Subcategory,
  Term,
  TermWithDetails,
} from "@/types/glossary";

function sortTerms(
  firstTerm: TermWithDetails,
  secondTerm: TermWithDetails,
) {
  return firstTerm.name.localeCompare(secondTerm.name, "pt-BR", {
    sensitivity: "base",
  });
}

export function buildTermsWithDetails(
  sourceTerms: Term[],
  sourceSubcategories: Subcategory[],
  sourceCategories: Category[],
): TermWithDetails[] {
  const categoriesById = new Map(
    sourceCategories.map((category) => [
      category.id,
      category,
    ]),
  );

  const subcategoriesById = new Map(
    sourceSubcategories.map((subcategory) => [
      subcategory.id,
      subcategory,
    ]),
  );

  return sourceTerms
    .map((term) => {
      const subcategory = subcategoriesById.get(
        term.subcategoryId,
      );

      if (!subcategory) {
        throw new Error(
          `Subcategory not found for term: ${term.name}`,
        );
      }

      const category = categoriesById.get(
        subcategory.categoryId,
      );

      if (!category) {
        throw new Error(
          `Category not found for subcategory: ${subcategory.name}`,
        );
      }

      return {
        ...term,
        category,
        subcategory,
      };
    })
    .sort(sortTerms);
}

export function getTermsWithDetails(): TermWithDetails[] {
  return buildTermsWithDetails(
    terms,
    subcategories,
    categories,
  );
}

export function getTermBySlug(
  slug: string,
): TermWithDetails | undefined {
  return getTermsWithDetails().find(
    (term) => term.slug === slug,
  );
}

export function getRelatedTerms(
  termId: string,
): TermWithDetails[] {
  const detailedTerms = getTermsWithDetails();

  const termsById = new Map(
    detailedTerms.map((term) => [term.id, term]),
  );

  const relatedIds = termRelations
    .filter(
      (relation) =>
        relation.termAId === termId ||
        relation.termBId === termId,
    )
    .map((relation) =>
      relation.termAId === termId
        ? relation.termBId
        : relation.termAId,
    );

  return relatedIds
    .map((relatedId) => termsById.get(relatedId))
    .filter(
      (term): term is TermWithDetails =>
        term !== undefined,
    )
    .sort(sortTerms);
}