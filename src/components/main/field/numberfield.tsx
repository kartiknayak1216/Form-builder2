"use client"
import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Store } from '../function/store';
import { Node } from '../function/state';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

export default function Numberfield({ node }: { node: Node }) {
  

  return (
    <div>
      <div className="grid md:w-full max-w-screen-sm md:min-w-[800px] items-center gap-1">
        <Label htmlFor="title" className='mt-1'>{node.properties.label}</Label>
        <Input placeholder={node.properties.text} disabled />
        <div className='text-md text-slate-500 ml-3'>{node.properties.helpertext}</div>
        {node.properties.required && <div className='text-sm text-red-500 ml-3'>This is a required field</div>}
      </div>
    </div>
  );
}

export function NumberProperty() {
  const { updateProperty, store, addStore, removeStore, property, setproperty, removeproperty } = Store();


  const [label, setLabel] = useState(property?.properties.label || 'Add label');
  const [text, setText] = useState(property?.properties.text || 'Text field');
  const [helpertext, setHelpertext] = useState(property?.properties.helpertext || 'Helper text');
  const [required, setRequired] = useState(property?.properties.required || false);





  useEffect(() => {
    if (property) {
      setLabel(property.properties.label || 'Add label');
      setText(property.properties.text || 'Text field');
      setHelpertext(property.properties.helpertext || 'Helper text');
      setRequired(property.properties.required || false);
    }
  }, [property]);

  const onSubmit = () => {
    if (property) {
      if (property.properties.label !== label) updateProperty(property.id, 'label', label);
      if (property.properties.text !== text) updateProperty(property.id, 'text', text);
      if (property.properties.helpertext !== helpertext) updateProperty(property.id, 'helpertext', helpertext);
      if (property.properties.required !== required) updateProperty(property.id, 'required', required);
      removeproperty();
    }
  };

  return (
    <div className='w-full mt-11 flex flex-col gap-9'>
      <div className='flex flex-col gap-2'>
        <Label htmlFor="title">Label</Label>
        <Input className='w-full' value={label} placeholder="Enter label" onChange={(e) => setLabel(e.target.value)} />
        <div className='text-slate-500 mt-2'>The Label will appear on top of the Number field</div>
      </div>

      <div className='flex flex-col gap-2'>
        <Label htmlFor="title">Number Field</Label>
        <Input className='w-full' value={text} placeholder="Enter text" onChange={(e) => setText(e.target.value)} type="number" min={1} />
        <div className='text-slate-500 mt-2'>The placeholder of this field</div>
      </div>

      <div className='flex flex-col gap-2'>
        <Label htmlFor="title">HelperText</Label>
        <Input className='w-full' value={helpertext} placeholder="Enter helpertext" onChange={(e) => setHelpertext(e.target.value)} />
        <div className='text-slate-500 mt-2'>The helper text will display below the main text field</div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch checked={required} onCheckedChange={setRequired} />
        <Label htmlFor="airplane-mode">Mark true to make the field required</Label>
      </div>

      <Button onClick={onSubmit}>Save</Button>
    </div>
  );
}
