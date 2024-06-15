"use client"
import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Store } from '../function/store';
import { Node } from '../function/state';
import { Button } from '@/components/ui/button';

export default function Titlefield({ node }: { node: Node }) {
  const { setproperty,updateProperty } = Store()
  const [title, setTitle] = useState(node.properties.label || '');


  useEffect(() => {
    updateProperty(node.id, 'label', title);
  }, []);
  
  return (
    <div>
      <div className="grid md:w-full max-w-screen-sm md:min-w-[800px]  items-center gap-1.5">
      <Label htmlFor="title">Title</Label>
        <Input className='text-2xl' value={title} placeholder={node.properties.label}  disabled />
      </div>
    </div>
  );
}

export function TitleProperty(){
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
         <Label htmlFor="title">Title</Label>
         <Input className='w-full' value={title} placeholder={title||"Enter title"} onChange={(e)=>settitle(e.target.value)}  />
      </div>
      <Button onClick={onsubmit}>
        Save
      </Button>
 </div>)
}