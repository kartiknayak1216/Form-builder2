"use client"
import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Store } from '../function/store';
import { Node } from '../function/state';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

export default function Textfield({ node }: { node: Node }) {
  const { setproperty,updateProperty } = Store()
  const [label, setlabel] = useState(node.properties.label || 'Text field');
  const [text, settext] = useState(node.properties.text || '');
  const [helpertext, sethelpertext] = useState(node.properties.helpertext || '');

  
  return (
    <div>
      <div className="grid md:w-full max-w-screen-sm md:min-w-[800px]  items-center gap-1 ">
      <Label htmlFor="title" className='mt-1'>{node.properties.label}</Label>
        <Input  placeholder={node.properties.text}  disabled />
     <div className='text-md text-slate-500  ml-3'>{node.properties.helpertext }</div>
     {node.properties.required && <div className='text-sm text-red-500  ml-3 '>This is required field</div>
    }
      </div>

    </div>
  );
}

export function TextProperty(){
  const { updateProperty,store, addStore, removeStore,property,setproperty,removeproperty } = Store()

  


  const [label, setlabel] = useState(property?.properties.label || 'Add label');
  const [text, settext] = useState(property?.properties.text || 'Text field');
  const [helpertext, sethelpertext] = useState(property?.properties.helpertext || 'Helper text');
  const [required, setrequired] = useState(property?.properties.required||false)


  if(!property){
    return null
  }

const onsubmit =()=>{
  if  (property?.properties.label !== label ||property?.properties.text !== text ||property?.properties.helpertext !== helpertext ||property?.properties.required !== required) {
    updateProperty(property?.id , 'label', label)
    updateProperty(property?.id , 'text', text)
    updateProperty(property?.id , 'helpertext', helpertext)
    updateProperty(property?.id , 'required', required)



  }
  removeproperty()
}



  return(
  <div className='w-full mt-11 flex flex-col gap-9'>
      <div className='flex flex-col gap-2'>
         <Label htmlFor="title">Label</Label>
         <Input className='w-full' value={label} placeholder={label||"Enter label"} onChange={(e)=>setlabel(e.target.value)}  />
         <div className='text-slate-500 mt-2'>The Label will appear on top of Text field</div>

      </div>

      <div className='flex flex-col gap-2'>
         <Label htmlFor="title">Text</Label>
         <Input className='w-full' value={text} placeholder={text||"Enter text"} onChange={(e)=>settext(e.target.value)}  />
     <div className='text-slate-500 mt-2'>The place holder of this field </div>
     
      </div>


      <div className='flex flex-col gap-2'>
         <Label htmlFor="title">HelperText</Label>
         <Input className='w-full' value={helpertext} placeholder={helpertext||"Enter helpertext"} onChange={(e)=>sethelpertext(e.target.value)}  />
         <div className='text-slate-500 mt-2'>The helper text will display below main text field</div>

      </div>


      <div className="flex items-center space-x-2">
      <Switch checked={required} onCheckedChange={setrequired}  />
      <Label htmlFor="airplane-mode">Mark true make the field required </Label>
    </div>

      <Button onClick={onsubmit}>
        Save
      </Button>
 </div>)
}