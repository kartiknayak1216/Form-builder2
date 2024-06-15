"use client";
import React, { ReactEventHandler, useEffect } from 'react';
import { Store } from './function/store';
import { TitleProperty } from './field/titlefield';
import { SubTitleProperty } from './field/subtitlefield';
import { Button } from '../ui/button';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Separator } from '../ui/separator';
import { ParagraphProperty } from './field/paragraphfield';
import { SeperatorProperty } from './field/seperator';
import { SpacerProperty } from './field/spacerfield';
import { TextProperty } from './field/textfield';
import { NumberProperty } from './field/numberfield';
import { SelectProperty } from './field/optionfield';
import { CheckProperty } from './field/checkfield';
import { TextareaProperty } from './field/textarea';
import { CalenderProperty } from './field/calenderfield';

const componentMap: Record<string, React.ComponentType<any>> = {
  TitleField: TitleProperty,
  SubTitleField: SubTitleProperty,
  ParagraphField:ParagraphProperty,
  SeparatorField:SeperatorProperty,
  SpacerField:SpacerProperty,
  TextField:TextProperty,
  NumberField:NumberProperty,
  SelectField:SelectProperty,
  CheckboxField:CheckProperty,
  TextAreaField: TextareaProperty,
  DateField:CalenderProperty
};

export default function Propertybar() {
  const { store, property ,removeproperty} = Store();
  const value = store.find((item) => item.id === property?.id);

  if (!value || !property) {
    return null;
  }
  const onsubmit =(e:React.MouseEvent)=>{
    e.preventDefault()
    if(property){
      console.log("property",property)

removeproperty()
console.log("property",property)
}
  }
  

  const Component = componentMap[property.type];

  return (
    <div className="min-h-screen">
      <div className="md:w-[400px] w-full max-w-[700px] flex flex-col flex-grow gap-2 border-l-2 border-secondary bg-background h-full">
        <div className=' flex flex-row-reverse  items-center  justify-start  mt-1 mr-3'>
<Button size={'icon'}  onClick={onsubmit}>
  <Cross2Icon width={19} height={19} />
</Button>
        </div>
        <Separator/>
        <div className='ml-10 mr-10'>
        {Component && <Component property={property} />}</div>
      </div>
    </div>
  );
}
