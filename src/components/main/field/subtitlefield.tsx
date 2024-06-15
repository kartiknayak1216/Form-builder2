"use client"
import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Store } from '../function/store';
import { Node } from '../function/state';
import { Button } from '@/components/ui/button';

export default function SubTitlefield({ node }: { node: Node }) {
  const { setproperty,updateProperty } = Store()
  const [title, setTitle] = useState(node.properties.label || '');


  useEffect(() => {
    updateProperty(node.id, 'label', title);
  }, []);
  
  return (
    <div>
      <div className="grid md:w-full max-w-screen-sm md:min-w-[800px]  items-center gap-1.5">
      <Label htmlFor="Subtitle">Subtitle</Label>
        <Input className='text-md' value={title} placeholder={node.properties.label}  disabled />
      </div>
    </div>
  );
}

export function SubTitleProperty(){
  const { updateProperty,store, addStore, removeStore,property,setproperty,removeproperty } = Store()

  if(!property){
    return
  }


const [title,settitle] = useState(property?.properties.label || "")


const onsubmit =()=>{
  if  (property?.properties.label !== title) {
    updateProperty(property?.id , 'label', title)

  }
  removeproperty()
}



  return(
  <div className='w-full mt-11 flex flex-col gap-4 '>
      <div className='flex flex-col gap-2'>
         <Label htmlFor="title">Subtitle</Label>
         <Input value={title} placeholder={title || "Enter subtitle"} onChange={(e)=>settitle(e.target.value)}  />
      </div>
      <Button onClick={onsubmit}>
        Save
      </Button>
 </div>)
}