"use client"; // This should be at the top of the file

import React, { useState } from 'react';
import Designersidebar from './designersidebar';
import { cn } from '@/lib/utils';
import { useDroppable } from '@dnd-kit/core';
import { Store } from './function/store';
import Displaynode from './displaynode';
import Titlefield from './field/titlefield';
import Propertybar from './propertybar';
import { Node } from './function/state';
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
import { ScrollArea } from '../ui/scroll-area';
import { useDndMonitor, DragOverlay, Active } from '@dnd-kit/core';

export default function Designer() {
  const componentMap = {
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
    CheckboxField: Checkfield
  };

  const { setNodeRef, isOver } = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  const [dragged, setDragged] = useState<Active | null>(null);

  useDndMonitor({
    onDragStart: (event) => {
      setDragged(event.active);
    },
    onDragEnd: () => {
      setDragged(null);
    },
    onDragCancel: () => {
      setDragged(null);
    },
  });

  const { store, addStore, property } = Store();
  console.log(store);

  return (
    <div className="flex w-full h-full">
      <div className="p-4 w-full" ref={setNodeRef}>
        <div className={cn('flex flex-col m-auto bg-background h-[150vh] max-w-[920px] rounded-xl items-center overflow-y-scroll', isOver && "ring-2 ring-primary")}>
          <div className=''>
            {store.length ? (
              store.map((item) => {
                const Component = componentMap[item.type];
                return (
                 
                   
                    <Displaynode item={item} key={item.id}>
                      {Component ? <Component node={item} /> : null}
                    </Displaynode>
                  
                )
              })
            ) : (
              <div>Drop here</div>
            )}
          </div>
        </div>
      </div>
      {!property ? (
        <Designersidebar />
      ) : (
        <Propertybar />
      )}
    </div>
  );
}
