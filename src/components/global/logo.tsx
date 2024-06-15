import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link
      href={"/"}
      className="font-bold text-3xl bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text hover:cursor-pointer flex "
    >
      <span className="hidden md:block">Form</span >
      <span className=" md:hidden">F</span >

        <span>BuilderX</span>
    </Link>
  );
}

export default Logo;