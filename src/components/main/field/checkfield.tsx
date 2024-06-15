"use client"
import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Store } from '../function/store';
import { Node } from '../function/state';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';

export default function Checkfield({ node }: { node: Node }) {
  const { setproperty, updateProperty } = Store();
  const [label, setLabel] = useState(node.properties.label || 'Text field');
  const [text, setText] = useState(node.properties.text || '');
  const [helpertext, setHelpertext] = useState(node.properties.helpertext || '');

  return (
    <div>
      <div className="grid md:w-full max-w-screen-sm md:min-w-[800px] items-center gap-1">
        <div className='flex flex-row gap-2 items-center text-center'>
          <Checkbox />
          <Label htmlFor="title" className='mt-1'>{node.properties.label}</Label>
        </div>
        <div className='text-md text-slate-500 ml-3'>{node.properties.helpertext}</div>
        {node.properties.required && <div className='text-sm text-red-500 ml-3'>This is required field</div>}
      </div>
    </div>
  );
}

export function CheckProperty() {
  const { updateProperty, store, addStore, removeStore, property, setproperty, removeproperty } = Store();

  const [label, setLabel] = useState(property?.properties.label || 'Add label');
  const [helpertext, setHelpertext] = useState(property?.properties.helpertext || 'Helper text');
  const [required, setRequired] = useState(property?.properties.required || false);

  if (!property) {
    return null;
  }

  const onSubmit = () => {
    if (
      property?.properties.label !== label ||
      property?.properties.helpertext !== helpertext ||
      property?.properties.required !== required
    ) {
      updateProperty(property?.id, 'label', label);
      updateProperty(property?.id, 'helpertext', helpertext);
      updateProperty(property?.id, 'required', required);
    }
    removeproperty();
  };

  return (
    <div className='w-full mt-11 flex flex-col gap-9'>
      <div className='flex flex-col gap-2'>
        <Label htmlFor="title">Label</Label>
        <Input className='w-full' value={label} placeholder={label || "Enter label"} onChange={(e) => setLabel(e.target.value)} />
        <div className='text-slate-500 mt-2'>The Label will appear on top of Text field</div>
      </div>

      <div className='flex flex-col gap-2'>
        <Label htmlFor="title">HelperText</Label>
        <Input className='w-full' value={helpertext} placeholder={helpertext || "Enter helpertext"} onChange={(e) => setHelpertext(e.target.value)} />
        <div className='text-slate-500 mt-2'>The helper text will display below the main text field</div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch checked={required} onCheckedChange={setRequired} />
        <Label htmlFor="airplane-mode">Mark true make the field required</Label>
      </div>

      <Button onClick={onSubmit}>
        Save
      </Button>
    </div>
  );
}
