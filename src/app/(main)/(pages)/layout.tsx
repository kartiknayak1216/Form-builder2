import Navbar from '@/components/global/navbar'
import React, { ReactNode } from 'react'

export default function layout({children}:{children:ReactNode}) {
  return (
    <div
    className='flex flex-col'>
      <Navbar/>
      <div className='mt-[100px]'>{children}</div></div>
  )
}
