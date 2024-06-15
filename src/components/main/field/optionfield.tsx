import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Store } from '../function/store';
import { Node } from '../function/state';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Cross1Icon } from '@radix-ui/react-icons';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Selectfield({ node }: { node: Node }) {
  const { setproperty, updateProperty } = Store();

  return (
    <div>
      <div className="grid md:w-full max-w-screen-sm md:min-w-[800px] items-center gap-1">
        <Label htmlFor="title" className='mt-1'>{node.properties.label}</Label>
        <Input placeholder={"Select Options"} disabled />
        <div className='text-md text-slate-500 ml-3'>{node.properties.helpertext}</div>
        {node.properties.required && <div className='text-sm text-red-500 ml-3'>This is required field</div>}
      </div>
    </div>
  );
}

export function SelectProperty() {
  const { updateProperty, property, removeproperty } = Store();

  // Initialize hooks with default values
  const [label, setLabel] = useState(property?.properties.label || 'Add label');
  const [helpertext, setHelpertext] = useState(property?.properties.helpertext || 'Helper text');
  const [required, setRequired] = useState(property?.properties.required || false);
  const [options, setOptions] = useState<string[]>(property?.properties.options || []);
  const [instance, setInstance] = useState(property?.properties.instance || "Single");

  if (!property) {
    return null;
  }

  const onsubmit = () => {
    if (
      property?.properties.label !== label ||
      property?.properties.helpertext !== helpertext ||
      property?.properties.required !== required ||
      property?.properties.options !== options ||
      property?.properties.instance !== instance
    ) {
      updateProperty(property?.id, 'label', label);
      updateProperty(property?.id, 'helpertext', helpertext);
      updateProperty(property?.id, 'required', required);
      updateProperty(property?.id, 'options', options);
      updateProperty(property?.id, 'instance', instance);
    }
    removeproperty();
  };

  const addOption = () => {
    setOptions([...options, "New option"]);
  };

  const updateOption = (index: number, value: string) => {
    const updatedOptions = options.map((option, i) => i === index ? value : option);
    setOptions(updatedOptions);
  };

  const removeOption = (index: number) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  return (
    <div className='w-full mt-11 flex flex-col gap-9'>
      <div className='flex flex-col gap-2'>
        <Label htmlFor="title">Label</Label>
        <Input className='w-full' value={label} placeholder={label || "Enter label"} onChange={(e) => setLabel(e.target.value)} />
        <div className='text-slate-500 mt-2'>The label will appear on top of the select field</div>
      </div>

      <div className='flex flex-col gap-2'>
        <Label htmlFor="helpertext">Helper Text</Label>
        <Input className='w-full' value={helpertext} placeholder={helpertext || "Enter helper text"} onChange={(e) => setHelpertext(e.target.value)} />
        <div className='text-slate-500 mt-2'>The helper text will display below the main select field</div>
      </div>

      <div className='flex flex-col gap-7'>
        <div className='flex flex-row items-center justify-between'>
          <div>Options</div>
          <Button onClick={addOption}>
            + Add Option
          </Button>
        </div>
       {options.length > 0 &&
       <div>
         {options.map((item, index) =>
           <div className='flex flex-row items-center' key={index}>
             <Input className='border-r-0' value={item} onChange={(e) => updateOption(index, e.target.value)} />
             <Button onClick={() => removeOption(index)} className='border-none'>
               <Cross1Icon />
             </Button>
           </div>
         )}
       </div>
       }
      </div>

      <div className='flex flex-col'>
        <div className='text-md text-slate-500 ml-3'>Select type of instance for form</div>
        <RadioGroup value={instance} onValueChange={setInstance}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Single" />
            <Label htmlFor="r1">Single instance</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Multiple" />
            <Label htmlFor="r2">Multi instance</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex items-center space-x-2">
        <Switch checked={required} onCheckedChange={setRequired} />
        <Label htmlFor="airplane-mode">Mark true to make the field required</Label>
      </div>

      <Button onClick={onsubmit}>
        Save
      </Button>
    </div>
  );
}
