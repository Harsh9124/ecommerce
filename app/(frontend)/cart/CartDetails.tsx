"use client";
import useCartService from "@/lib/hooks/useCartStore";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartDetails() {
  const router = useRouter();
  const { items, itemsPrice, decrease, increase } = useCartService();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <>
      <h1 className="py-4 text-3xl font-bold text-center text-primary">
        Shopping Cart
      </h1>

      {items.length === 0 ? (
        <div className="font-semibold text-center text-lg">
          Cart is empty.{" "}
          <Link href="/" className="text-secondary hover:underline">
            Go shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5 px-4">
          <div className="col-span-3">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-lg bg-light-grey text-dark-grey">
                    <th className="py-3 px-4 text-left">Item</th>
                    <th className="py-3 px-4 text-center">Quantity</th>
                    <th className="py-3 px-4 text-right">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.slug} className="border-b border-light-grey">
                      <td className="py-4 px-4">
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={100}
                            height={100}
                            className="m-3 bg-white shadow-md rounded-lg"
                          />
                          <span className="px-4 text-lg font-bold">
                            {item.name}
                          </span>
                        </Link>
                      </td>

                      <td className="py-4 px-4 ">
                        <div className="flex justify-center items-center">
                          <button
                            className="btn btn-outline-primary mx-1"
                            type="button"
                            onClick={() => decrease(item)}
                          >
                            -
                          </button>
                          <span className="px-2 text-lg">{item.qty}</span>
                          <button
                            className="btn btn-outline-primary mx-1"
                            type="button"
                            onClick={() => increase(item)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right text-lg font-bold">
                        ${item.price.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-span-2">
            <div className="bg-white shadow-md rounded-lg p-6">
              <div>
                <div className="text-xl font-semibold mb-4">
                  Subtotal ({items.reduce((a, c) => a + c.qty, 0)} items) :{" "}
                  <span className="text-primary">${itemsPrice.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => router.push("/shipping")}
                  className="btn btn-primary w-full rounded-lg bg-cta text-black py-3 hover:bg-cta-dark"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
