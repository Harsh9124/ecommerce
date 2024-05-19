"use client";
import useCartService from "@/lib/hooks/useCartStore";
import { OrderItem } from "@/lib/models/OrderModel";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AddToCart({ item }: { item: OrderItem }) {
  const router = useRouter();
  const { items, increase } = useCartService();
  const [existItem, setExistItem] = useState<OrderItem | undefined>();

  useEffect(() => {
    setExistItem(items.find((x) => x.slug === item.slug));
  }, [item, items]);

  const addToCartHandler = () => {
    increase(item);
    toast.success("Product added to cart! ");
  };

  return (
    <button
      className="btn btn-primary w-full btn-primary:hover"
      type="button"
      onClick={addToCartHandler}
    >
      Add to cart
    </button>
  );
}
