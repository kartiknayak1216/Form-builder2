"use client";
import React, { useState, ReactNode } from 'react';
import { useDndMonitor, DragOverlay, Active } from '@dnd-kit/core';
import { v4 as uuidv4 } from 'uuid';
import { SidebarButtonlayout } from './button';
import { Store } from './function/store';
import createNode from './function/create';
import Titlefield from './field/titlefield';
import SubTitlefield from './field/subtitlefield';
import Paragraphfield from './field/paragraphfield';
import Seperatorfield from './field/seperator';
import Spacerfield from './field/spacerfield';
import Textfield from './field/textfield';
import Numberfield from './field/numberfield';
import Selectfield from './field/optionfield';
import Checkfield from './field/checkfield';
import Textareafield from './field/textarea';
import Calenderfield from './field/calenderfield';
import { cn } from '@/lib/utils';

export default function Dragwrapper() {
  const [dragged, setDragged] = useState<Active | null>(null);
  const { addStore, property,removeStore } = Store();
  const [isnode, setisnode] = useState<boolean>(false);
  const [isbutton, setisbutton] = useState<boolean>(false);
  const [type, settype] = useState<string>("");

  const componentMap: Record<string, React.FC<any>> = {
    TitleField: Titlefield,
    TextField: Textfield,
    SubTitleField: SubTitlefield,
    ParagraphField: Paragraphfield,
    SeparatorField: Seperatorfield,
    SpacerField: Spacerfield,
    NumberField: Numberfield,
    TextAreaField: Textareafield,
    DateField: Calenderfield,
    SelectField: Selectfield,
    CheckboxField: Checkfield,
  };
  const uniqueId = uuidv4()

  useDndMonitor({
    onDragStart: (event) => {
      setDragged(event.active);
      setisnode(false);
      if (event.active.data.current?.isButton) {
        setisbutton(true);
      }
      settype(event.active.data.current?.type || "");
    },
    onDragEnd: (event) => {
      const { over } = event;

      if (over?.id === "designer-drop-area" && !isnode) {
        console.log("dragger");
        setDragged(null);

if(event.active.data.current?.isButton){
  createNode(event.active.data.current?.type, addStore);

}

if(!event.active.data.current?.isButton){
const node={
  type:event.active.data.current?.type,
  id:event.active.data.current?.id,
  properties:event.active.data.current?.properties
}
removeStore(event.active.data.current?.id)

addStore(node)


}

        setisnode(true);
      }
      setisbutton(false);
    },
    onDragCancel: () => {
      setDragged(null);
    },
  });

  console.log(property);

  let node = <div>No drag</div>;

  if (!dragged) {
    return null; // Return null if dragged is null to avoid rendering errors
  }

  if (dragged && isbutton) {
    node = (
      <SidebarButtonlayout
        Icon={dragged.data.current?.style.Icon}
        label={dragged.data.current?.style.label}
        type={dragged.data.current?.style.type}
      />
    );
  } else if (dragged && !isbutton) {
      node = (
         <div>
      <div className={cn('relative w-full h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset mt-9 justify-between')}>
        <div className='absolute w-full h-1/2 rounded-t-md' />
        <div className='absolute w-full h-1/2 rounded-t-md' />
        <div className={cn("flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2")}>
        Drag to required position
        </div>
      </div>
    </div>
     
     );
    }
  

  return <DragOverlay>{node}</DragOverlay>;
}
