"use client";

const categories = ["All", "Frontend", "Backend", "DevOps", "AI", "Mobile"];

export default function CategoryFilter({
  category,

  setCategory,
}) {
  return (
    <div
      className="
      flex
      flex-wrap
      gap-3
    "
    >
      {categories.map((item) => (
        <button
          key={item}
          onClick={() => setCategory(item)}
          className={`
              px-4
              py-2
              rounded-full
              text-sm
              transition

              ${category === item ? "bg-black text-white" : "bg-gray-100"}
            `}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
