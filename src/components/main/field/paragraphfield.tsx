"use client"
import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Store } from '../function/store';
import { Node } from '../function/state';
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea"

export default function Paragraphfield({ node }: { node: Node }) {
  const { setproperty,updateProperty } = Store()
  const [title, setTitle] = useState(node.properties.text || '');


  useEffect(() => {
    updateProperty(node.id, 'text', title);
  }, []);
  
  return (
    <div>
      <div className="grid md:w-full max-w-screen-sm md:min-w-[800px]  items-center gap-1.5">
        <Label htmlFor="title">Paragraph</Label>
        <Textarea className='text-md' value={title} placeholder={node.properties.text}  disabled />
      </div>
    </div>
  );
}

export function ParagraphProperty(){
  const { updateProperty,store, addStore, removeStore,property,setproperty,removeproperty } = Store()

 


const [title,settitle] = useState(property?.properties.text || "")

if(!property){
  return null
}




const onsubmit =()=>{
  if  (property?.properties.text !== title) {
    updateProperty(property?.id , 'text', title)

  }
  removeproperty()
}



  return(
  <div className='w-full mt-11 flex flex-col gap-4 '>
      <div className='flex flex-col gap-2'>
         <Label htmlFor="title">Paragraph</Label>
         <Textarea value={title} placeholder={title||"Enter title"} onChange={(e)=>settitle(e.target.value)}  />
      </div>
      <Button onClick={onsubmit}>
        Save
      </Button>
 </div>)
}