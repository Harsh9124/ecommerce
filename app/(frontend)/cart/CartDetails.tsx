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
      <h1 className="py-4 text-3xl font-bold text-center text-black">
        Shopping Cart
      </h1>

      {items.length === 0 ? (
        <div className="font-semibold text-center text-lg">
          Cart is empty.{" "}
          <Link href="/" className="text-cta hover:underline">
            Go shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5 px-4">
          <div className="col-span-3">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-lg text-dark-grey">
                    <th className="py-3 px-4 text-center md:text-left">Item</th>
                    <th className="py-3 px-4 text-center">Quantity</th>
                    <th className="py-3 px-4 text-center md:text-right">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.slug} className="border-b border-light-grey">
                      <td className="py-4 px-4">
                        <Link
                          href={`/product/${item.slug}`}
                          className="items-center flex flex-col md:flex-row"
                        >
                          <div>
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={100}
                            height={100}
                            className=" shadow-md rounded-lg"
                          />
                          </div>
                          <div className="w-fit m-2 md:m-4">
                          <span className="text-lg font-bold text-center">
                            {item.name}
                          </span>
                          </div>
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
                      ₹{item.price.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-span-2 mb-4">
            <div className="bg-white shadow-md rounded-lg p-6">
              <div>
                <div className="text-xl font-semibold mb-4">
                  Subtotal ({items.reduce((a, c) => a + c.qty, 0)} items) :{" "}
                  <span className="text-black">₹{itemsPrice.toFixed(2)}</span>
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
