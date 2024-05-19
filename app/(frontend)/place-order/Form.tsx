"use client";
import CheckoutSteps from "@/components/CheckoutSteps";
import useCartService from "@/lib/hooks/useCartStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWRMutation from "swr/mutation";

const Form = () => {
  const router = useRouter();
  const {
    paymentMethod,
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    clear,
  } = useCartService();

  const { trigger: placeOrder, isMutating: isPlacing } = useSWRMutation(
    `/api/orders/mine`,
    async (url) => {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethod,
          shippingAddress,
          items,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        clear();
        toast.success("Order placed successfully");
        return router.push(`/order/${data.order._id}`);
      } else {
        toast.error(data.message);
      }
    }
  );

  useEffect(() => {
    if (!paymentMethod) {
      return router.push("/payment");
    }
    if (items.length === 0) {
      return router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethod, router]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <div className="flex flex-row lg:flex-col">
      <div className="my-20 mx-10 lg:my-3 hidden lg:block">
        <CheckoutSteps current={4} />
      </div>
      <div>
      <div className="flex justify-center">
        <div className="grid md:grid-cols-2 md:gap-5 my-4 w-full max-w-4xl">
          <div className="overflow-x-auto p-4">
            <div className="card bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="card-body px-3 py-4">
                <h2 className="card-title text-lg font-semibold text-gray-800 mb-4">
                  Shipping Address
                </h2>
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Name:</span>{" "}
                  {shippingAddress.fullName}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Address:</span>{" "}
                  {shippingAddress.address}, {shippingAddress.city},{" "}
                  {shippingAddress.postalCode}, {shippingAddress.country}
                </p>
                <div className="mt-4">
                  <Link href="/shipping">
                    <button className="btn btn-primary w-full mt-4 bg-primary rounded-lg text-white">
                      Edit
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="card bg-white shadow-lg rounded-lg overflow-hidden px-3 py-4 mt-4">
              <div className="card-body">
                <h2 className="card-title text-lg font-semibold text-gray-800 mb-4">
                  Payment Method
                </h2>
                <p className="text-gray-700 mb-2">{paymentMethod}</p>
                <div className="mt-4">
                  <Link href="/payment">
                    <button className="btn btn-primary w-full mt-4 bg-primary rounded-lg text-white">
                      Edit
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="card bg-white shadow-lg rounded-lg overflow-hidden px-3 py-4 mt-4">
              <div className="card-body">
                <h2 className="card-title text-lg font-semibold text-gray-800 mb-4">
                  Items
                </h2>
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    <thead>
                      <tr className="text-left">
                        <th className="px-4 py-2">Item</th>
                        <th className="px-4 py-2">Quantity</th>
                        <th className="px-4 py-2">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr
                          key={item.slug}
                          className="border-t border-gray-200"
                        >
                          <td className="px-4 py-2">
                            <div className="flex items-center">
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={50}
                                height={50}
                                className="rounded-lg"
                              />
                              <span className="px-2">
                                {item.name} ({item.color} {item.size})
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-2">{item.qty}</td>
                          <td className="px-4 py-2">₹{item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4">
                  <Link href="/cart">
                    <button className="btn btn-primary w-full mt-4 bg-primary rounded-lg text-white">
                      Edit
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-white shadow-lg rounded-lg overflow-hidden h-fit p-4">
            <div className="card-body ">
              <h2 className="card-title text-lg font-semibold text-gray-800 mb-4">
                Order Summary
              </h2>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="font-medium">Items</span>
                  <span>₹{itemsPrice}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Tax</span>
                  <span>₹{taxPrice}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Shipping</span>
                  <span>₹{shippingPrice}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Total</span>
                  <span>₹{totalPrice}</span>
                </li>
                <li>
                  <button
                    onClick={() => placeOrder()}
                    disabled={isPlacing}
                    className="btn btn-primary w-full mt-4 bg-cta rounded-lg text-white"
                  >
                    {isPlacing && (
                      <span className="loading loading-spinner"></span>
                    )}
                    Place Order
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};
export default Form;
