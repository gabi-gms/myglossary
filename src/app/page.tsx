import { GlossaryCatalog } from "@/components/glossary/GlossaryCatalog";
import { getGlossaryData } from "@/lib/glossary-data";
import { buildTermsWithDetails } from "@/lib/glossary";

export default async function Home() {
  const glossaryData = await getGlossaryData();

  const terms = buildTermsWithDetails(
    glossaryData.terms,
    glossaryData.subcategories,
    glossaryData.categories,
  );

  return (
    <GlossaryCatalog
      terms={terms}
      categories={glossaryData.categories}
      subcategories={glossaryData.subcategories}
    />
  );
}