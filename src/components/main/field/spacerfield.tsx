"use client";
import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Store } from '../function/store';
import { Slider } from '@/components/ui/slider';
import { SpaceBetweenVerticallyIcon } from '@radix-ui/react-icons';
import { Node } from '../function/state';

export default function Spacerfield({ node }: { node: Node }) {
  const { updateProperty } = Store();
  const [size, setSize] = useState(node.properties.size);

  useEffect(() => {
    updateProperty(node.id, 'size', size);
  }, [size]);

  return (
    <div>
      <div className="grid md:w-full max-w-screen-sm md:min-w-[800px] items-center gap-1.5 text-center">
        <Label htmlFor="Subtitle" className="text-center justify-center items-center">{`Spacer Field: ${node.properties.size}`}</Label>
        <div className='text-center mx-auto'><SpaceBetweenVerticallyIcon width={32} height={32} /></div>
      </div>
    </div>
  );
}

export function SpacerProperty() {
  const { updateProperty, property, removeproperty } = Store();

  if (!property) {
    return null;
  }

  const [size, setSize] = useState(property?.properties.size ||20);

const onsubmit =()=>{
    if (property?.properties.size !== size) {
        updateProperty(property?.id, 'size', size);
      }
}

  useEffect(() => {

    if (property?.properties.size !== size) {
      updateProperty(property?.id, 'size', size);
    }
  }, [size]);

  return (
    <div className="w-full mt-11 flex flex-col gap-7 justify-center">
      <div className="flex flex-col gap-2">
        <Label htmlFor="title" >{`Spacefield:${size}`}</Label>
        <Slider
          defaultValue={[size]}
          max={100}
          step={1}
          className="w-[90%] mt-4"
          onValueChange={(value) => {setSize(value[0]),onsubmit}}
        />
      </div>
      
    </div>
  );
}
