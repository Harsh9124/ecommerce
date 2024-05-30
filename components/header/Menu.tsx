"use client";
import { IoCartOutline } from "react-icons/io5";
import useCartService from "@/lib/hooks/useCartStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const Menu = () => {
  const { items, init } = useCartService();
  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const signoutHandler = () => {
    signOut({ callbackUrl: "/signin" });
    init();
  };

  const { data: session } = useSession();

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDropdownClose = () => {
    setDropdownOpen(false);
  };

  return (
    <div>
      <ul className="flex gap-7 items-center text-md">
        <li>
          <Link className="btn rounded-btn flex flex-row" href="/cart">
            <IoCartOutline className="text-3xl text-black" />
            {mounted && items.length !== 0 && (
              <div className="badge badge-secondary bg-pink-600 rounded-full items-center px-2 py-1 h-6 text-center">
                <div className="text-xs">
                  {items.reduce((a, c) => a + c.qty, 0)}
                </div>
              </div>
            )}
          </Link>
        </li>
        {session && session.user ? (
          <>
            <li>
              <div className="dropdown relative text-black">
                <button
                  type="button"
                  className="flex flex-row font-semibold"
                  onClick={handleDropdownToggle}
                >
                  <span>{session.user.name}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 ml-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
                {dropdownOpen && (
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content z-[1] p-2 shadow bg-primary flex flex-col items-center rounded-lg w-44 absolute mt-4 right-0 font-semibold"
                    onClick={handleDropdownClose}
                  >
                    {session.user.isAdmin && (
                      <li onClick={handleDropdownClose}>
                        <Link href="/admin/dashboard">Admin DashBoard</Link>
                      </li>
                    )}
                    <li onClick={handleDropdownClose}>
                      <Link href="/order-history">Order history</Link>
                    </li>
                    <li onClick={handleDropdownClose}>
                      <Link href="/profile">Profile</Link>
                    </li>
                    <li>
                      <button type="button" onClick={signoutHandler}>
                        Sign out
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </li>
          </>
        ) : (
          <li>
            <button
              className="btn text-black rounded-btn"
              type="button"
              onClick={() => signIn()}
            >
              Sign in
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Menu;
