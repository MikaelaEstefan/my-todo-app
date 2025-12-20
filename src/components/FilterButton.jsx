// src/components/FilterButton.jsx
export default function FilterButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
        ${
          active
            ? "bg-pink-500 text-white shadow-md scale-105"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }
      `}
    >
      {label}
    </button>
  );
}
