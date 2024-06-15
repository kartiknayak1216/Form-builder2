"use client"
import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Store } from '../function/store';
import { Node } from '../function/state';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function Calenderfield({ node }: { node: Node }) {
  const { setproperty,updateProperty } = Store()
  const [label, setlabel] = useState(node.properties.label || 'Text field');
  const [helpertext, sethelpertext] = useState(node.properties.helpertext || '');

  
  return (
    <div>
      <div className="grid md:w-full max-w-screen-sm md:min-w-[800px]  items-center gap-1 ">
      <Label htmlFor="title" className='mt-1'>{node.properties.label}</Label>
        <Input  placeholder={"Select a date"}  disabled />
     <div className='text-md text-slate-500  ml-3'>{node.properties.helpertext }</div>
     {node.properties.required && <div className='text-sm text-red-500  ml-3 '>This is required field</div>
    }
      </div>

    </div>
  );
}

export function CalenderProperty(){
  const { updateProperty,store, addStore, removeStore,property,setproperty,removeproperty } = Store()

  if(!property){
    return
  }


  const [label, setlabel] = useState(property.properties.label || 'Add label');
  const [helpertext, sethelpertext] = useState(property.properties.helpertext || 'Helper text');
  const [required, setrequired] = useState(property.properties.required||false)
  const [instance, setInstance] = useState(property.properties.instance || "Single");




const onsubmit =()=>{
  if  (property?.properties.instance !== instance
    ||property?.properties.label !== label ||property?.properties.helpertext !== helpertext ||property?.properties.required !== required) {
    updateProperty(property?.id , 'label', label)
    updateProperty(property?.id , 'helpertext', helpertext)
    updateProperty(property?.id , 'required', required)
    updateProperty(property?.id, 'instance', instance);



  }
  removeproperty()
}



  return(
  <div className='w-full mt-11 flex flex-col gap-9'>
      <div className='flex flex-col gap-2'>
         <Label htmlFor="title">Label</Label>
         <Input className='w-full' value={label} placeholder={label||"Enter label"} onChange={(e)=>setlabel(e.target.value)}  />
         <div className='text-slate-500 mt-2'>The Label will appear on top of Number field</div>

      </div>

      <div className='flex flex-col gap-2'>
         <Label htmlFor="title"> Date Field</Label>
         <div className='flex flex-col'>
        <div className='text-md text-slate-500 ml-3'>Select type of instance for form</div>
        <RadioGroup value={instance} onValueChange={setInstance}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Single" />
            <Label htmlFor="r1">Single Date</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Multiple" />
            <Label htmlFor="r2">Multi Date</Label>
          </div>
        </RadioGroup>
      </div>
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