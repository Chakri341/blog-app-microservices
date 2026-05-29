"use client";

export default function SearchBar({
  search,

  setSearch,
}) {
  return (
    <div
      className="
      w-full
      md:w-96
    "
    >
      <input
        type="text"
        placeholder="
        Search blogs...
        "
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
        w-full
        px-5
        py-3
        rounded-2xl
        border
        outline-none
        focus:ring-2
        focus:ring-black
      "
      />
    </div>
  );
}
