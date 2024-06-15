import React from 'react'
import { Card, CardContent } from './ui/card'
import { FilePlus } from 'lucide-react'

export default function Createpad() {
  return (
    <Card className='hover:bg-slate-500/20 items-center border border-spacing-7 border-dotted border-black dark:border-white'>
        <CardContent className='flex flex-col mx-auto text-center items-center py-7 gap-5 '>
        <FilePlus width={30} height={30} />
        <div className='text-slate-500 text-center text-xl'>Create a form</div>
   </CardContent>
    </Card>
  )
}
