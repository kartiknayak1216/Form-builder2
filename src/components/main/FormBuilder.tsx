import { Form } from '@prisma/client';
import React from 'react';
import PreviewDialogBtn from '../previewdialog';
import SaveFormBtn from '../global/saveform';
import PublishFormBtn from '../global/publishform';
import Designer from './designer';
import { DndContext ,DragOverlay } from '@dnd-kit/core';
import Dragwrapper from './Dragwrapper';
import {MouseSensor, TouchSensor, useSensor} from '@dnd-kit/core';
import { Input } from '../ui/input';
import { Button } from '../ui/button';


 

export default function FormBuilder({ form }: { form: Form }) {
 
  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });
 
  return (

    
    <div>
    {
      form.published?(<div>
        <div className='text-center'> Form has already published</div>
         <div className="flex w-full max-w-sm items-center space-x-2 text-center mx-auto  justify-center">
      <Input type="text" placeholder={`http://localhost:3000/publish/${form.id}`}  disabled/>
      <Button type="submit" >Coppy</Button>
    </div>
      </div>):( <DndContext sensors={[mouseSensor,touchSensor]} >
        <main className="flex flex-col max-w-screen min-h-screen">
          <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
            <h2 className="truncate font-medium">
              <span className="text-muted-foreground mr-2">Form:</span>
              {form.title}
            </h2>
            <div className="flex items-center gap-2">
              <PreviewDialogBtn />
              {!form.published && (
                <>
                  <SaveFormBtn id={form.id} />
                  
                  <PublishFormBtn id={form.id} />
                </>
              )}
            </div>
          </nav>
          
          <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] md:h-auto bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
            <Designer />
          </div>
        </main>
        <Dragwrapper />
      </DndContext>)
    }
    
    </div>


   
  );
}
