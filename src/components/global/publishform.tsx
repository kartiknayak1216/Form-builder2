import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Store } from '../main/function/store'
import { toast } from 'sonner'
import { Loader } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from '../ui/separator'
import { Input } from '../ui/input'


interface Props{
  id:string,
  
}

export default function PublishFormBtn({id}:Props) {

interface Props{
  id:string,
  content:[]
}

const {store}= Store()


const [loading, setLoading] = useState(false)
const [open, setopen] = useState(false)


const onSubmit = async () => {

  
  setLoading(true)
  try {
    const response = await fetch('/api/publish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      id:id,
      content:store
      })
    })

    const body = await response.json()
    
    if (response.ok) {
      toast.success(body.message)
      setopen(true)
    } else {
      toast.error(body.error)
    }
  } catch (error) {
    console.log(error)
    toast.error("An unexpected error occurred")
  } finally {
    setLoading(false)
  }
}

  return (
<Dialog open={open} onOpenChange={setopen}>
  <DialogTrigger asChild><Button onClick={onSubmit}>{
  loading?(
    <div className='animate-spin text-center'><Loader/></div>
  ):(
    <div>
      Publish
    </div>
  )
}
</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Your form has sucessfully published ?</DialogTitle> 
      <Separator className='w-full'/>
      <DialogDescription>
        
      <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="text" placeholder={`http://localhost:3000/publish/${id}`}  disabled/>
      <Button type="submit" >Coppy</Button>
    </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>




  )
}
