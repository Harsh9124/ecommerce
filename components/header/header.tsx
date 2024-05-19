import Link from "next/link";
import React from "react";
import Menu from "./Menu";
import { SearchBox } from "./SearchBox";

const header = () => {
  return (
    <>
      <nav className="text-white">
        <div className="bg-primary flex flex-col  md:justify-between md:flex-row px-4 py-1 items-center">
          <Link href="/" className="text-xl md:text-2xl font-mono m-4 sm:mx-9 text-black ">
            PHDJOD 
          </Link>
          <SearchBox />
          <Menu />
        </div>
      </nav>
    </>
  );
};

export default header;
