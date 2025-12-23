// src/components/FilterButton.jsx
export default function FilterButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-7 py-3
        rounded-full
        text-base
        font-semibold
        transition-all
        duration-200
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-[var(--pink-main)]/50
        ${
          active
            ? `
              bg-[var(--pink-main)]
              text-white
              shadow-sm
              scale-[1.02]
            `
            : `
              bg-[var(--bg-panel)]
              text-[var(--text-muted)]
              hover:text-[var(--text-main)]
              hover:bg-[var(--bg-card)]
              hover:scale-[1.02]
            `
        }
      `}
    >
      {label}
    </button>
  );
}

