"use client"
import { Form } from '@prisma/client'
import React, { useState, useEffect } from 'react'
import FormCard from './global/formcard'
import { revalidatePath } from 'next/cache'

export default function Gridform() {


  type DataType = Form

  const [error, setError] = useState<string>("")
  const [data, setData] = useState<DataType[]>([])


  const extract = async () => {
    try {
      const response = await fetch("/api/fetchjob", {
        method: 'GET'
      })
      const body = await response.json()
      if (response.ok) {
        setData(body.user)
        
      } else {
        setData([])
        setError("An error occurred while fetching the data")
      }
    } catch (error) {
      setError("An error occurred during fetch")
    }
  }

  useEffect(() => {
    extract()
  }, [data])




  return (
    <div>
<div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7 mt-11'>
        {
          data.length && !error ? (
            data.map((item) => (
              <FormCard  id={item.id}key={item.id} createdAt={item.createdAt} title={item.title} visits={item.visits} submissions={item.submissions} published={item.published} />
            ))
          ) : (
            <div>
              You dont have any forms. Create one!
            </div>
          )
        }
        {
          error && <div>{error}</div>
        }
      </div>

    </div>
  )
}
