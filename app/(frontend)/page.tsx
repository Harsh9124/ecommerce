/* eslint-disable @next/next/no-img-element */
import ProductItem from "@/components/products/ProductItem";
import data from "@/lib/data";
import { Metadata } from "next";
import productService from "@/lib/services/ProductService";
import Link from "next/link";
import { convertDoctoObj } from "@/lib/utils";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME || "Ecommerce",
};

export default async function Home() {
  const featuredProducts = await productService.getFeatured();
  const latestProducts = await productService.getLatest();

  return (
    <div className="container mx-auto">
      <div className="carousel mt-8 mb-6">
        {featuredProducts.map((product, index) => (
          <div
            key={product._id}
            id={`slide-${index}`}
            className="relative w-full rounded-lg overflow-hidden"
          >
            <Link href={`/product/${product.slug}`}>
              <img
                src={product.banner}
                className="w-full h-auto transform transition-transform duration-500 hover:scale-105"
                alt={product.name}
              />
            </Link>
            {/* <div className="absolute top-1/2 transform -translate-y-1/2 flex justify-between w-full px-4">
              <button
                className="btn btn-circle bg-primary text-white hover:bg-secondary hover:text-white"
                onClick={() =>
                  index === 0 ? featuredProducts.length - 1 : index - 1
                }
              >
                ❮
              </button>
              <button
                className="btn btn-circle bg-primary text-white hover:bg-secondary hover:text-white"
                onClick={() =>
                  index === featuredProducts.length - 1 ? 0 : index + 1
                }
              >
                ❯
              </button>
            </div> */}
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-bold mb-4">Latest Products</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {latestProducts.map((product) => (
          <ProductItem key={product.slug} product={convertDoctoObj(product)} />
        ))}
      </div>
    </div>
  );
}
