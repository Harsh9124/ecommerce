/* eslint-disable @next/next/no-img-element */

import ProductItem from "@/components/products/ProductItem";
import data from "@/lib/data";
import { Metadata } from "next";
import productService from "@/lib/services/productService";
import Link from "next/link";
import { convertDoctoObj } from "@/lib/utils";
import Image from "next/image";
import TypingAnimation from '@/components/TypingAnimation';

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME || "Ecommerce",
};

export default async function Home() {
  const featuredProducts = await productService.getFeatured();
  const latestProducts = await productService.getLatest();

  return (
    <div className="container mx-auto">

      <div className="bg-primary my-6 w-full rounded-lg">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between ">
          <div className="lg:pl-60 justify-start m-4">
          <p className="font-semibold text-sm">Best Fashion Collection</p>
          <h1 className="mb-10 font-mono text-xl lg:text-4xl"><TypingAnimation /></h1>
          <form
            action="/search"
            method="GET"
            className="flex items-center space-x-2"
          >
            <button className="border-2 border-black py-2 px-6 rounded-full hover:btn-primary">View More</button>
          </form>
          
          </div>
          <div>
          <Image
              src={"/images/banner.png"} 
              alt={"banner"}
            width={640}
            height={640}
            sizes="100vw"
            className="rounded-lg drop-shadow-2xl shadow-yellow-950 flex justify-end"
          />
          </div>
        
        </div>
        
      </div>


      <h2 className="text-2xl font-bold mb-4">Latest Products</h2>
      <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3 lg:grid-cols-4">
        {latestProducts.map((product) => (
          <ProductItem key={product.slug} product={convertDoctoObj(product)} />
        ))}
      </div>
    </div>
  );
}