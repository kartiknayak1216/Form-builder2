"use client";

import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "./ui/aurora-background";
import Link from "next/link";

export default function Header() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent text-center">
        FormBuilderX
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          Platform that enable drag and drop form creation in one click
        </div>
        <button className="p-[3px] relative">
  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
  <Link href="/dashboard">
  <div className="px-8 py-2  bg-black   relative group transition duration-200 text-white hover:bg-transparent rounded-full" >
    Create A Form
  </div></Link>
</button>
      </motion.div>
    </AuroraBackground>
  );
}
