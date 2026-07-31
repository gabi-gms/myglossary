type FilterOption = {
  id: string;
  name: string;
};

type MultiSelectFilterProps = {
  label: string;
  options: FilterOption[];
  selectedIds: string[];
  onToggle: (optionId: string) => void;
};

export function MultiSelectFilter({
  label,
  options,
  selectedIds,
  onToggle,
}: MultiSelectFilterProps) {
  return (
    <details className="min-w-0">
      <summary
        className="
          flex cursor-pointer list-none items-center justify-between
          gap-3 rounded-lg border border-[#3a363d]
          bg-[#222024] px-4 py-3 text-sm text-[#f1edf0]
          transition hover:border-[#6a626a]
          [&::-webkit-details-marker]:hidden
        "
      >
        <span>{label}</span>

        <span className="text-xs text-[#b9b1b7]">
          {selectedIds.length > 0
            ? `${selectedIds.length} selecionado(s)`
            : "▾"}
        </span>
      </summary>

      <div
        className="
          mt-2 max-h-72 overflow-y-auto rounded-xl
          border border-[#3a363d] bg-[#222024] p-2
          shadow-xl
        "
      >
        {options.length > 0 ? (
          options.map((option) => (
            <label
              key={option.id}
              className="
                flex cursor-pointer items-center gap-3
                rounded-lg px-3 py-2 text-sm text-[#d5cfd3]
                transition hover:bg-white/5
              "
            >
              <input
                type="checkbox"
                checked={selectedIds.includes(option.id)}
                onChange={() => onToggle(option.id)}
                className="size-4 accent-[#c97c91]"
              />

              <span>{option.name}</span>
            </label>
          ))
        ) : (
          <p className="px-3 py-2 text-sm text-[#8f878d]">
            Nenhuma opção disponível
          </p>
        )}
      </div>
    </details>
  );
}