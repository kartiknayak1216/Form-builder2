"use client"
import React from 'react'
import Logo from './logo'
import { ModeToggle } from '../modebutton'
import Link from 'next/link'
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser
} from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
export default   function Navbar() {
  const user =  useUser();
  const pathname = usePathname()
  const truepath = (pathname==="/dashboard")
  return (
    <div className='fixed top-0 left-0 right-0  backdrop-blur-lg z-[100]  flex items-center justify-between border-b ' >
<div className='flex px-1 items-center  md:px-6'>
<Logo/>
</div>
<div>

  <div className='flex  gap-x-4  items-center mr-2 my-4 md:mr-7 md:gap-x-6'>
<ModeToggle/>
{
  !truepath &&
  <Link
          href="/dashboard"
          className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-slate-950 px-1 py-1 text-sm font-medium text-white backdrop-blur-3xl md:px-3">
            {user ? 'Dashboard' : 'Get Started'}

          </span>
        </Link>
}
        <div>
        {user ? <UserButton afterSignOutUrl="/" /> : null}

        </div>
        </div>
</div></div>
  )
}
