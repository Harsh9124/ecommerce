"use client";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

export const SearchBox = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "All";

  const { data: categories, error } = useSWR("/api/products/categories");

  if (error) return <p className="text-red-500">{error.message}</p>;
  if (!categories) return <p>Loading...</p>;

  return (
    <form
      action="/search"
      method="GET"
      className="flex items-center justify-center space-x-2"
    >
      <select
        name="category"
        defaultValue={category}
        className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
      >
        <option value="all">All</option>
        {categories.map((c: string) => (
          <option key={c} className="hover:bg-primary">
            {c}
          </option>
        ))}
      </select>
      <input
        className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        placeholder="Search"
        defaultValue={q}
        name="q"
      />
      <button className="bg-blue-500 text-white rounded px-4 py-1 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Search
      </button>
    </form>
  );
};
