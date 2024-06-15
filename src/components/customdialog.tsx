"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CreateForm from "../app/(main)/(pages)/dashboard/form/createform"
import { ReactNode } from "react"
import { useCounterStore } from "@/lib/state"

export  default function Dialogcustom({child}:{child:ReactNode}) {
  
  const{count,increment}= useCounterStore()
  return (
    <Dialog open={count} onOpenChange={()=>increment()}>
      <DialogTrigger asChild  >
       {child}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
       
        <CreateForm/>
      </DialogContent>
    </Dialog>
  )
}
