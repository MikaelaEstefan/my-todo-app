// src/components/FilterButton.jsx
export default function FilterButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3
        rounded-full
        text-base
        font-semibold
        transition-colors
        ${
          active
            ? `
              bg-[var(--pink-main)]
              text-white
            `
            : `
              bg-[var(--bg-panel)]
              text-[var(--text-muted)]
              hover:text-[var(--text-main)]
              hover:bg-[var(--bg-card)]
            `
        }
      `}
    >
      {label}
    </button>
  );
}
