import type {
  Category,
  Subcategory,
  TermSummary,
  TermSummaryWithDetails,
} from "@/types/glossary";

export function buildTermSummariesWithDetails(
  sourceTerms: TermSummary[],
  sourceSubcategories: Subcategory[],
  sourceCategories: Category[],
): TermSummaryWithDetails[] {
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
    .sort((firstTerm, secondTerm) =>
      firstTerm.name.localeCompare(
        secondTerm.name,
        "pt-BR",
        {
          sensitivity: "base",
        },
      ),
    );
}