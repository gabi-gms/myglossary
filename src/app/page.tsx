import { GlossaryCatalog } from "@/components/glossary/GlossaryCatalog";
import {
  categories,
  subcategories,
} from "@/data/mockData";
import { getTermsWithDetails } from "@/lib/glossary";

export default function Home() {
  const terms = getTermsWithDetails();

  return (
    <GlossaryCatalog
      terms={terms}
      categories={categories}
      subcategories={subcategories}
    />
  );
}