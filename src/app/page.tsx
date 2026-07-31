import { getTermsWithDetails } from "@/lib/glossary";

export default function Home() {
  const terms = getTermsWithDetails();

  return (
    <main>
      <h1>myGlossary</h1>

      <ul>
        {terms.map((term) => (
          <li key={term.id}>
            <strong>{term.name}</strong>

            <p>{term.shortDescription}</p>

            <small>
              {term.category.name} — {term.subcategory.name}
            </small>
          </li>
        ))}
      </ul>
    </main>
  );
}