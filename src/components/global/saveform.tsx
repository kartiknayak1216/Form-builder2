import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Store } from '../main/function/store'
import { toast } from 'sonner'
import { Loader } from 'lucide-react'


interface Props{
  id:string,
  
}

export default function SaveFormBtn({id}:Props) {

interface Props{
  id:string,
  content:[]
}

const {store}= Store()


const [loading, setLoading] = useState(false)

const onSubmit = async () => {

  
  setLoading(true)
  try {
    const response = await fetch('/api/fetchid', {
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
<Button onClick={onSubmit}>{
  loading?(
    <div className='animate-spin text-center'><Loader/></div>
  ):(
    <div>
      Save
    </div>
  )
}
</Button>

  )
}
