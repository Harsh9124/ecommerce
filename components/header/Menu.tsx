"use client";
import { IoCartOutline } from "react-icons/io5";
import useCartService from "@/lib/hooks/useCartStore";
import Link from "next/link";
import { useEffect, useState } from "react";

const Menu = () => {
  const { items } = useCartService();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div>
      <ul className="flex  gap-7 items-center text-md">
        <li>
          <Link
            className="btn btn-ghost rounded-btn flex flex-row"
            href="/cart"
          >
            <IoCartOutline className="text-3xl" />
            {mounted && items.length != 0 && (
              <div className="badge badge-secondary bg-red-600 rounded-full items-center text-xs p-1 h-5 text-center">
                <div className="relative">
                  {items.reduce((a, c) => a + c.qty, 0)}{" "}
                </div>
              </div>
            )}
          </Link>
        </li>
        <li>
          <button className="btn btn-ghost rounded-btn" type="button">
            Sign in
          </button>
        </li>
      </ul>
    </div>
  );
};
export default Menu;
