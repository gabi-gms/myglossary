import "server-only";

import {
  categories as mockCategories,
  subcategories as mockSubcategories,
  termRelations as mockTermRelations,
  terms as mockTerms,
} from "@/data/mockData";
import { createSupabaseClient } from "@/lib/supabase/server";

import type {
  Category,
  Subcategory,
  Term,
  TermRelation,
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

export type GlossaryData = {
  categories: Category[];
  subcategories: Subcategory[];
  terms: Term[];
  termRelations: TermRelation[];
  source: "supabase" | "mock";
};

export async function getGlossaryData(): Promise<GlossaryData> {
  try {
    const supabase = createSupabaseClient();

    const [
      categoriesResult,
      subcategoriesResult,
      termsResult,
      relationsResult,
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
            name_variations,
            short_description,
            full_description,
            analogy
          `,
        )
        .order("name"),

      supabase
        .from("term_relations")
        .select("term_a_id, term_b_id"),
    ]);

    const queryError =
      categoriesResult.error ??
      subcategoriesResult.error ??
      termsResult.error ??
      relationsResult.error;

    if (queryError) {
      throw queryError;
    }

    const categoryRows =
      categoriesResult.data as CategoryRow[];

    const subcategoryRows =
      subcategoriesResult.data as SubcategoryRow[];

    const termRows = termsResult.data as TermRow[];

    const relationRows =
      relationsResult.data as TermRelationRow[];

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

    const terms: Term[] = termRows.map((term) => ({
      id: term.id,
      subcategoryId: term.subcategory_id,
      name: term.name,
      slug: term.slug,
      nameVariations: term.name_variations,
      shortDescription: term.short_description,
      fullDescription: term.full_description,
      analogy: term.analogy,
    }));

    const termRelations: TermRelation[] =
      relationRows.map((relation) => ({
        termAId: relation.term_a_id,
        termBId: relation.term_b_id,
      }));

    if (process.env.NODE_ENV === "development") {
      console.info(
        "[myGlossary] Glossary data loaded from Supabase.",
      );
    }

    return {
      categories,
      subcategories,
      terms,
      termRelations,
      source: "supabase",
    };
  } catch (error) {
    console.error(
      "[myGlossary] Supabase query failed. Using mock data.",
      error,
    );

    return {
      categories: mockCategories,
      subcategories: mockSubcategories,
      terms: mockTerms,
      termRelations: mockTermRelations,
      source: "mock",
    };
  }
}