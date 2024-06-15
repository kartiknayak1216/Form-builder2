"use client"
import FormBuilder from '@/components/main/FormBuilder';
import { Store } from '@/components/main/function/store';
import { Form } from '@prisma/client';
import React, { useEffect, useState } from 'react'
import { Node } from '@/components/main/function/state';
import { useRouter } from 'next/navigation';
export default function Pages({params}:{params:{id:string}}) {
 



 const {id} = params;
const{store,addStore,removeStore,clearStore} = Store()
 type DataType = Form

 const [data, setData] = useState<DataType | null>(null);
 const [error, setError] = useState<string>("")

const router =   useRouter()
 const extract = async () => {
    try {
      const response = await fetch(`/api/jobbyid?id=${id}`, {
        method: 'GET',
      })
      const body = await response.json()
      if (response.ok) {
        setData(body.user)
        clearStore()
        const contentNodes: Node[] = body.user.content;
        contentNodes.forEach(node => addStore(node));
        
      } else {
    
        setError(body.error)
      }
    } catch (error) {
      setError("An error occurred during fetch")
    }
  }

  useEffect(() => {
     extract()
  
   }, [])
   


    return (



    <div>


        {data &&
        <FormBuilder form={data} />
        }
    </div>
  )
}
