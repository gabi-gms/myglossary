"use client";

import { useMemo, useState } from "react";

import { TermCard } from "@/components/terms/TermCard";
import type {
  Category,
  Subcategory,
  TermWithDetails,
} from "@/types/glossary";

import { MultiSelectFilter } from "./MultiSelectFilter";

type GlossaryCatalogProps = {
  terms: TermWithDetails[];
  categories: Category[];
  subcategories: Subcategory[];
};

function normalizeText(value: string) {
  return value
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");
}

const TERMS_PER_PAGE = 20;

type PaginationItem =
  | number
  | "start-ellipsis"
  | "end-ellipsis";

function getPaginationItems(
  currentPage: number,
  totalPages: number,
): PaginationItem[] {
  if (totalPages <= 7) {
    return Array.from(
      { length: totalPages },
      (_, index) => index + 1,
    );
  }

  if (currentPage <= 4) {
    return [
      1,
      2,
      3,
      4,
      5,
      "end-ellipsis",
      totalPages,
    ];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "start-ellipsis",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "start-ellipsis",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "end-ellipsis",
    totalPages,
  ];
}

export function GlossaryCatalog({
  terms,
  categories,
  subcategories,
}: GlossaryCatalogProps) {
  const [query, setQuery] = useState("");
  const [selectedCategoryIds, setSelectedCategoryIds] =
    useState<string[]>([]);
  const [selectedSubcategoryIds, setSelectedSubcategoryIds] =
    useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const availableSubcategories = useMemo(() => {
    if (selectedCategoryIds.length === 0) {
      return subcategories;
    }

    return subcategories.filter((subcategory) =>
      selectedCategoryIds.includes(subcategory.categoryId),
    );
  }, [selectedCategoryIds, subcategories]);

  const filteredTerms = useMemo(() => {
    const normalizedQuery = normalizeText(query);

    return terms.filter((term) => {
      const matchesSearch =
        normalizedQuery === "" ||
        normalizeText(term.name).includes(normalizedQuery);

      const matchesCategory =
        selectedCategoryIds.length === 0 ||
        selectedCategoryIds.includes(term.category.id);

      const matchesSubcategory =
        selectedSubcategoryIds.length === 0 ||
        selectedSubcategoryIds.includes(term.subcategory.id);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSubcategory
      );
    });
  }, [
    query,
    selectedCategoryIds,
    selectedSubcategoryIds,
    terms,
  ]);

  const totalPages = Math.ceil(
  filteredTerms.length / TERMS_PER_PAGE,
);

const firstTermIndex =
  (currentPage - 1) * TERMS_PER_PAGE;

const visibleTerms = filteredTerms.slice(
  firstTermIndex,
  firstTermIndex + TERMS_PER_PAGE,
);

const paginationItems = getPaginationItems(
  currentPage,
  totalPages,
);

  const selectedCategories = categories.filter((category) =>
    selectedCategoryIds.includes(category.id),
  );

  const selectedSubcategories = subcategories.filter(
    (subcategory) =>
      selectedSubcategoryIds.includes(subcategory.id),
  );

  const hasActiveFilters =
    query.trim() !== "" ||
    selectedCategoryIds.length > 0 ||
    selectedSubcategoryIds.length > 0;

  function toggleCategory(categoryId: string) {
    setCurrentPage(1);

    const isSelected =
      selectedCategoryIds.includes(categoryId);

    if (isSelected) {
      setSelectedCategoryIds((currentIds) =>
        currentIds.filter(
          (currentId) => currentId !== categoryId,
        ),
      );

      setSelectedSubcategoryIds((currentIds) =>
        currentIds.filter((subcategoryId) => {
          const subcategory = subcategories.find(
            (item) => item.id === subcategoryId,
          );

          return subcategory?.categoryId !== categoryId;
        }),
      );

      return;
    }

    setSelectedCategoryIds((currentIds) => [
      ...currentIds,
      categoryId,
    ]);

    if (selectedCategoryIds.length === 0) {
      setSelectedSubcategoryIds((currentIds) =>
        currentIds.filter((subcategoryId) => {
          const subcategory = subcategories.find(
            (item) => item.id === subcategoryId,
          );

          return subcategory?.categoryId === categoryId;
        }),
      );
    }
  }

  function toggleSubcategory(subcategoryId: string) {
    setCurrentPage(1);

    setSelectedSubcategoryIds((currentIds) => {
      const isSelected = currentIds.includes(subcategoryId);

      if (isSelected) {
        return currentIds.filter(
          (currentId) => currentId !== subcategoryId,
        );
      }

      return [...currentIds, subcategoryId];
    });
  }

  function clearAllFilters() {
    setQuery("");
    setSelectedCategoryIds([]);
    setSelectedSubcategoryIds([]);
    setCurrentPage(1);
  }

  return (
    <main
      className="
        mx-auto w-[calc(100%-2rem)]
        max-w-[1600px] py-10
      "
    >
      <header className="mb-8">
        <div
          className="
            grid items-start gap-4
            lg:grid-cols-[auto_minmax(280px,1fr)_minmax(360px,auto)]
            lg:items-start
          "
        >
          <h1 className="text-3xl font-bold text-[#f1edf0]">
            myGlossary
          </h1>

          <label>
            <span className="sr-only">
              Pesquisar termos
            </span>

            <input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setCurrentPage(1);
               }}
              placeholder="Pesquisar um termo..."
              className="
                w-full rounded-lg border border-[#3a363d]
                bg-[#222024] px-4 py-3 text-[#f1edf0]
                outline-none transition
                placeholder:text-[#777077]
                focus:border-[#c97c91]
                focus:ring-2 focus:ring-[#c97c91]/20
              "
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <MultiSelectFilter
              label="Categorias"
              options={categories}
              selectedIds={selectedCategoryIds}
              onToggle={toggleCategory}
            />

            <MultiSelectFilter
              label="Subcategorias"
              options={availableSubcategories}
              selectedIds={selectedSubcategoryIds}
              onToggle={toggleSubcategory}
            />
          </div>
        </div>

        <div
          className="
            mt-5 flex flex-col gap-4
            sm:flex-row sm:items-start sm:justify-between
          "
        >
          <div className="flex flex-wrap items-center gap-2">
            {selectedCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => toggleCategory(category.id)}
                className="
                  rounded-full border border-[#c97c91]
                  px-3 py-1.5 text-xs text-[#c97c91]
                  transition hover:bg-[#c97c91]/10
                "
                aria-label={`Remover categoria ${category.name}`}
              >
                {category.name} ×
              </button>
            ))}

            {selectedSubcategories.map((subcategory) => (
              <button
                key={subcategory.id}
                type="button"
                onClick={() =>
                  toggleSubcategory(subcategory.id)
                }
                className="
                  rounded-full border border-[#777077]
                  px-3 py-1.5 text-xs text-[#b9b1b7]
                  transition hover:bg-white/5
                "
                aria-label={`Remover subcategoria ${subcategory.name}`}
              >
                {subcategory.name} ×
              </button>
            ))}

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="
                  px-2 py-1 text-xs text-[#b9b1b7]
                  underline-offset-4 transition
                  hover:text-[#f1edf0] hover:underline
                "
              >
                Limpar filtros
              </button>
            )}
          </div>

          <p
            className="
                shrink-0 text-sm text-[#b9b1b7]
                sm:pt-1
            "
            aria-live="polite"
            >
            {filteredTerms.length}{" "}
            {filteredTerms.length === 1
                ? "termo encontrado"
                : "termos encontrados"}

            {filteredTerms.length > 0 && (
                <span className="ml-2 text-[#777077]">
                • Página {currentPage} de {totalPages}
                </span>
            )}
        </p>
        </div>
      </header>

      {filteredTerms.length > 0 ? (
  <>
    <section
      aria-label="Termos do glossário"
      className="
        grid grid-cols-1 gap-5
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
      "
    >
      {visibleTerms.map((term) => (
        <TermCard key={term.id} term={term} />
      ))}
    </section>

    {totalPages > 1 && (
      <nav
        aria-label="Paginação do glossário"
        className="
          mt-10 flex flex-wrap items-center
          justify-center gap-2
        "
      >
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage((page) => page - 1)
          }
          className="
            rounded-lg border border-[#3a363d]
            bg-[#222024] px-4 py-2
            text-sm text-[#d5cfd3]
            transition
            hover:border-[#6a626a]
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          Anterior
        </button>

        {paginationItems.map((item) => {
          if (typeof item === "string") {
            return (
              <span
                key={item}
                aria-hidden="true"
                className="
                  flex size-10 items-center
                  justify-center text-[#777077]
                "
              >
                …
              </span>
            );
          }

          const isCurrentPage =
            item === currentPage;

          return (
            <button
              key={item}
              type="button"
              onClick={() => setCurrentPage(item)}
              aria-current={
                isCurrentPage ? "page" : undefined
              }
              aria-label={`Ir para a página ${item}`}
              className={`
                flex size-10 items-center justify-center
                rounded-lg border text-sm transition
                ${
                  isCurrentPage
                    ? "border-[#c97c91] bg-[#c97c91] font-semibold text-[#181719]"
                    : "border-[#3a363d] bg-[#222024] text-[#d5cfd3] hover:border-[#6a626a]"
                }
              `}
            >
              {item}
            </button>
          );
        })}

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((page) => page + 1)
          }
          className="
            rounded-lg border border-[#3a363d]
            bg-[#222024] px-4 py-2
            text-sm text-[#d5cfd3]
            transition
            hover:border-[#6a626a]
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          Próxima
        </button>
      </nav>
    )}
  </>
) : (
  <section
    className="
      flex min-h-80 flex-col items-center
      justify-center gap-4 rounded-xl
      border border-dashed border-[#3a363d]
      px-6 text-center
    "
  >
    <h2 className="text-2xl font-semibold text-[#f1edf0]">
      Nenhum termo encontrado
    </h2>

    <p className="max-w-md text-[#b9b1b7]">
      Tente alterar a pesquisa ou remover alguns filtros.
    </p>

    <button
      type="button"
      onClick={clearAllFilters}
      className="
        rounded-lg bg-[#c97c91] px-5 py-3
        font-medium text-[#181719]
        transition hover:opacity-90
      "
    >
      Limpar busca e filtros
    </button>
  </section>
)}
    </main>
  );
}