import { GlossaryCatalog } from "@/components/glossary/GlossaryCatalog";
import { getCatalogData } from "@/lib/glossary-data";
import {
  buildTermSummariesWithDetails,
} from "@/lib/glossary";

export default async function Home() {
  const catalogData = await getCatalogData();

  const terms = buildTermSummariesWithDetails(
    catalogData.terms,
    catalogData.subcategories,
    catalogData.categories,
  );

  return (
    <GlossaryCatalog
      terms={terms}
      categories={catalogData.categories}
      subcategories={catalogData.subcategories}
    />
  );
}