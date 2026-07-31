import "server-only";

import { createSupabaseClient } from "@/lib/supabase/server";

import type {
  Category,
  Subcategory,
  TermSummary,
  TermSummaryWithDetails,
  TermWithDetails,
} from "@/types/glossary";

type CategoryRow = {
  id: string;
  name: string;
  slug: string;
  color: string;
};

type SubcategoryRow = {
  id: string;
  category_id: string;
  name: string;
  slug: string;
};

type TermRow = {
  id: string;
  subcategory_id: string;
  name: string;
  slug: string;
  name_variations: string[];
  short_description: string;
  full_description: string;
  analogy: string | null;
};

type TermRelationRow = {
  term_a_id: string;
  term_b_id: string;
};

export type CatalogData = {
  categories: Category[];
  subcategories: Subcategory[];
  terms: TermSummary[];
};

type TermSummaryRow = {
  id: string;
  subcategory_id: string;
  name: string;
  slug: string;
  short_description: string;
};

type SubcategoryWithCategoryRow = SubcategoryRow & {
  category: CategoryRow | null;
};

type TermWithDetailsRow = TermRow & {
  subcategory: SubcategoryWithCategoryRow | null;
};

type TermSummaryWithDetailsRow = TermSummaryRow & {
  subcategory: SubcategoryWithCategoryRow | null;
};

export type TermPageData = {
  term: TermWithDetails | null;
  relatedTerms: TermSummaryWithDetails[];
};

function getTermRelations(
  row: TermWithDetailsRow | TermSummaryWithDetailsRow,
) {
  const subcategoryRow = row.subcategory;

  if (!subcategoryRow) {
    throw new Error(
      `Subcategory not found for term: ${row.name}`,
    );
  }

  const categoryRow = subcategoryRow.category;

  if (!categoryRow) {
    throw new Error(
      `Category not found for subcategory: ${subcategoryRow.name}`,
    );
  }

  const subcategory: Subcategory = {
    id: subcategoryRow.id,
    categoryId: subcategoryRow.category_id,
    name: subcategoryRow.name,
    slug: subcategoryRow.slug,
  };

  const category: Category = {
    id: categoryRow.id,
    name: categoryRow.name,
    slug: categoryRow.slug,
    color: categoryRow.color,
  };

  return {
    category,
    subcategory,
  };
}

function mapTermWithDetails(
  row: TermWithDetailsRow,
): TermWithDetails {
  const { category, subcategory } =
    getTermRelations(row);

  return {
    id: row.id,
    subcategoryId: row.subcategory_id,
    name: row.name,
    slug: row.slug,
    nameVariations: row.name_variations,
    shortDescription: row.short_description,
    fullDescription: row.full_description,
    analogy: row.analogy,
    category,
    subcategory,
  };
}

function mapTermSummaryWithDetails(
  row: TermSummaryWithDetailsRow,
): TermSummaryWithDetails {
  const { category, subcategory } =
    getTermRelations(row);

  return {
    id: row.id,
    subcategoryId: row.subcategory_id,
    name: row.name,
    slug: row.slug,
    shortDescription: row.short_description,
    category,
    subcategory,
  };
}

export async function getCatalogData(): Promise<CatalogData> {
  const supabase = createSupabaseClient();

  const [
    categoriesResult,
    subcategoriesResult,
    termsResult,
  ] = await Promise.all([
    supabase
      .from("categories")
      .select("id, name, slug, color")
      .order("name"),

    supabase
      .from("subcategories")
      .select("id, category_id, name, slug")
      .order("name"),

    supabase
      .from("terms")
      .select(
        `
          id,
          subcategory_id,
          name,
          slug,
          short_description
        `,
      )
      .order("name"),
  ]);

  const queryError =
    categoriesResult.error ??
    subcategoriesResult.error ??
    termsResult.error;

  if (queryError) {
    console.error(
      "[myGlossary] Failed to load catalog data.",
      queryError,
    );

    throw new Error(
      "Não foi possível carregar o catálogo.",
    );
  }

  const categoryRows =
    (categoriesResult.data ?? []) as CategoryRow[];

  const subcategoryRows =
    (subcategoriesResult.data ?? []) as SubcategoryRow[];

  const termRows =
    (termsResult.data ?? []) as TermSummaryRow[];

  const categories: Category[] = categoryRows.map(
    (category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      color: category.color,
    }),
  );

  const subcategories: Subcategory[] =
    subcategoryRows.map((subcategory) => ({
      id: subcategory.id,
      categoryId: subcategory.category_id,
      name: subcategory.name,
      slug: subcategory.slug,
    }));

  const terms: TermSummary[] = termRows.map((term) => ({
    id: term.id,
    subcategoryId: term.subcategory_id,
    name: term.name,
    slug: term.slug,
    shortDescription: term.short_description,
  }));

  return {
    categories,
    subcategories,
    terms,
  };
}

export async function getTermPageData(
  slug: string,
): Promise<TermPageData> {
  const supabase = createSupabaseClient();

  const {
    data: termData,
    error: termError,
  } = await supabase
    .from("terms")
    .select(
      `
        id,
        subcategory_id,
        name,
        slug,
        name_variations,
        short_description,
        full_description,
        analogy,
        subcategory:subcategories (
          id,
          category_id,
          name,
          slug,
          category:categories (
            id,
            name,
            slug,
            color
          )
        )
      `,
    )
    .eq("slug", slug)
    .maybeSingle();

  if (termError) {
    console.error(
      "[myGlossary] Failed to load term.",
      termError,
    );

    throw new Error(
      "Não foi possível carregar o termo.",
    );
  }

if (!termData) {
  return {
    term: null,
    relatedTerms: [],
  };
}

  const term = mapTermWithDetails(
    termData as unknown as TermWithDetailsRow,
  );

  const {
    data: relationsData,
    error: relationsError,
  } = await supabase
    .from("term_relations")
    .select("term_a_id, term_b_id")
    .or(
      `term_a_id.eq.${term.id},term_b_id.eq.${term.id}`,
    );

  if (relationsError) {
    console.error(
      "[myGlossary] Failed to load term relations.",
      relationsError,
    );

    throw new Error(
      "Não foi possível carregar os termos relacionados.",
    );
  }

  const relatedTermIds = (
    (relationsData ?? []) as TermRelationRow[]
  ).map((relation) =>
    relation.term_a_id === term.id
      ? relation.term_b_id
      : relation.term_a_id,
  );

  if (relatedTermIds.length === 0) {
    return {
      term,
      relatedTerms: [],
    };
  }

  const {
    data: relatedTermsData,
    error: relatedTermsError,
  } = await supabase
    .from("terms")
    .select(
      `
        id,
        subcategory_id,
        name,
        slug,
        short_description,
        subcategory:subcategories (
          id,
          category_id,
          name,
          slug,
          category:categories (
            id,
            name,
            slug,
            color
          )
        )
      `,
    )
    .in("id", relatedTermIds)
    .order("name");

  if (relatedTermsError) {
    console.error(
      "[myGlossary] Failed to load related terms.",
      relatedTermsError,
    );

    throw new Error(
      "Não foi possível carregar os termos relacionados.",
    );
  }

  const relatedTerms = (
    (relatedTermsData ?? []) as unknown as TermSummaryWithDetailsRow[]
  ).map(mapTermSummaryWithDetails);

  return {
    term,
    relatedTerms,
  };
}