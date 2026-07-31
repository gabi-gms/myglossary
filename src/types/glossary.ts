export type Category = {
  id: string;
  name: string;
  slug: string;
  color: string;
};

export type Subcategory = {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
};

export type Term = {
  id: string;
  subcategoryId: string;
  name: string;
  slug: string;
  nameVariations: string[];
  shortDescription: string;
  fullDescription: string;
  analogy: string | null;
};

export type TermRelation = {
  termAId: string;
  termBId: string;
};

export type TermWithDetails = Term & {
  category: Category;
  subcategory: Subcategory;
};

export type TermSummary = Pick<
  Term,
  | "id"
  | "subcategoryId"
  | "name"
  | "slug"
  | "shortDescription"
>;

export type TermSummaryWithDetails = TermSummary & {
  category: Category;
  subcategory: Subcategory;
};