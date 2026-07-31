import {
  categories,
  subcategories,
  terms,
} from "@/data/mockData";

import type { TermWithDetails } from "@/types/glossary";

export function getTermsWithDetails(): TermWithDetails[] {
  const categoriesById = new Map(
    categories.map((category) => [category.id, category]),
  );

  const subcategoriesById = new Map(
    subcategories.map((subcategory) => [
      subcategory.id,
      subcategory,
    ]),
  );

  return terms
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
    .sort((firstTerm, secondTerm) =>
      firstTerm.name.localeCompare(
        secondTerm.name,
        "pt-BR",
        { sensitivity: "base" },
      ),
    );
}