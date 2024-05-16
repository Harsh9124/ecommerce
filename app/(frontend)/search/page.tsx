import ProductItem from "@/components/products/ProductItem";
import productServices from "@/lib/services/productService";
import { convertDoctoObj } from "@/lib/utils";
import Link from "next/link";

export async function generateMetadata({
  searchParams: { q = "all", category = "all" },
}: {
  searchParams: {
    q: string;
    category: string;

    sort: string;
    page: string;
  };
}) {
  if ((q !== "all" && q !== "") || category !== "all") {
    return {
      title: `Search ${q !== "all" ? q : ""}
          ${category !== "all" ? ` : Category ${category}` : ""}`,
    };
  } else {
    return {
      title: "Search Products",
    };
  }
}

export default async function SearchPage({
  searchParams: { q = "all", category = "all", sort = "newest", page = "1" },
}: {
  searchParams: {
    q: string;
    category: string;
    sort: string;
    page: string;
  };
}) {
  const getFilterUrl = ({
    c,
    s,
    p,
    r,
    pg,
  }: {
    c?: string;
    s?: string;
    p?: string;
    r?: string;
    pg?: string;
  }) => {
    const params = { q, category, sort, page };
    if (c) params.category = c;
    if (pg) params.page = pg;
    return `/search?${new URLSearchParams(params).toString()}`;
  };
  const categories = await productServices.getCategories();
  const { countProducts, products, pages } = await productServices.getByQuery({
    category,
    q,
    page,
  });
  return (
    <div className="grid md:grid-cols-5 md:gap-5">
      <div>
        <div className="text-xl pt-3">Categories</div>
        <div>
          <ul>
            <li>
              <Link
                className={`link link-hover ${
                  "all" === category && "link-primary"
                }`}
                href={getFilterUrl({ c: "all" })}
              >
                Any
              </Link>
            </li>
            {categories.map((c: string) => (
              <li key={c}>
                <Link
                  className={`link link-hover ${
                    c === category && "link-primary"
                  }`}
                  href={getFilterUrl({ c })}
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="md:col-span-4">
        <div className="flex items-center justify-between  py-4">
          <div className="flex items-center">
            {products.length === 0 ? "No" : countProducts} Results
            {q !== "all" && q !== "" && " : " + q}
            {category !== "all" && " : " + category}
            &nbsp;
            {(q !== "all" && q !== "") || category !== "all" ? (
              <Link className="btn btn-sm btn-ghost" href="/search">
                Clear
              </Link>
            ) : null}
          </div>
        </div>

        <div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3  ">
            {products.map((product: any) => (
              <ProductItem
                key={product.slug}
                product={convertDoctoObj(product)}
              />
            ))}
          </div>
          <div className="join">
            {products.length > 0 &&
              Array.from(Array(pages).keys()).map((p) => (
                <Link
                  key={p}
                  className={`join-item btn ${
                    Number(page) === p + 1 ? "btn-active" : ""
                  } `}
                  href={getFilterUrl({ pg: `${p + 1}` })}
                >
                  {p + 1}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
