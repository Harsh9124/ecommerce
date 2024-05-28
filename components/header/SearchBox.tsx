"use client";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

export const SearchBox = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "All";

  const { data: categories, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/products/categories`
  );

  if (error) return <p className="text-red-500">{error.message}</p>;
  if (!categories) return <p>Loading...</p>;

  return (
    <form
      action="/search"
      method="GET"
      className="flex items-center justify-center space-x-2"
    >
      <div className="join">
        <select
          name="category"
          defaultValue={category}
          className="border border-gray-300 rounded-s-lg p-0.5 md:px-3 md:py-2.5 focus:outline-none text-black"
        >
          <option value="all">All</option>
          {categories.map((c: string) => (
            <option key={c} value={c} className="hover:bg-primary">
              {c}
            </option>
          ))}
        </select>
        <input
          className="border border-gray-300 p1 md:px-3 md:py-2 w-32 lg:w-60 focus:outline-none text-black"
          placeholder="Search"
          defaultValue={q}
          name="q"
        />
        <button className="bg-[#D2D2D2] text-black rounded-e-lg p-1 text-sm md:text-base md:px-3 md:py-2.5 hover:bg-[#d2d2d291]">
          Search
        </button>
      </div>
    </form>
  );
};
