import { Product } from "@/lib/models/ProductModel";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import AddToCart from "./AddToCart";

function ProductItem({ product }: { product: Product }) {
  return (
    <div className="w-[80%] md:w-full mx-auto bg-white shadow-md rounded-lg overflow-hidden flex flex-col justify-center">
      <figure>
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="h-64 w-full object-top md:object-center"
          />
        </Link>
      </figure>

      <div className="p-4 flex flex-col justify-center">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-500 cursor-pointer mb-2">
            {product.name}
          </h2>
        </Link>
        <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xl font-semibold text-gray-800">
            ${product.price}
          </span>
          {product.countInStock !== 0 && (
                <div className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                  <AddToCart
                    item={{
                      ...product,
                      qty: 0,
                      color: '',
                      size: '',
                    }}
                  />
                </div>
              )}
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
