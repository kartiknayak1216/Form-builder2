"use client";
import React, { ReactNode, useState } from 'react';
import { Node } from './function/state';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Delete } from 'lucide-react';
import { Store } from './function/store';
import { useDroppable, useDndMonitor, useDraggable } from '@dnd-kit/core';
import { Button } from '../ui/button';
import { BiSolidTrash } from 'react-icons/bi';
import { cn } from '@/lib/utils';
import { v4 as uuidv4 } from 'uuid';
import createNode, { createNodeonly } from './function/create';

export default function Displaynode({ children, item }: { children: ReactNode; item: Node }) {
  const { addStore, setproperty, removeStore, property, removeproperty, AddatBottom, AddatTop } = Store();
  const istrue = property?.id === item.id;
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
  const [mouseIsdelete, setMouseIsdelete] = useState<boolean>(false);
  const [isNode, setIsNode] = useState<boolean>(false);
  

  const { setNodeRef: setUpperhalfNodeRef, isOver: overUp } = useDroppable({
    id: `upper-${item.id}`,
    data: {
      id: item.id,
      type: item.type,
      property: { ...item.properties },
      isTopHalfDesignerElement: true,
    },
  });

  const { setNodeRef: setBottomhalfNodeRef, isOver: overBottom } = useDroppable({
    id: `bottom-${item.id}`,
    data: {
      id: item.id,
      type: item.type,
      properties: { ...item.properties },
      isBottomHalfDesignerElement: true,
    },
  });

  const draggable = useDraggable({
    id: item.id,
    data: {
      id:item.id,
      type:item.type,
     isButton:false,
     properties:item.properties
    },
  });

  

  useDndMonitor({
    onDragStart: () => {
      setIsNode(false); // Reset the flag at the beginning of each drag event
    },
    onDragEnd: (event) => {
      console.log(event);
      const { over } = event;

      if (!over) return;

      const nodeType = event.active.data.current?.type;
      if (!nodeType) return;

      if (!isNode) {
        const nodeToAdd = createNodeonly(nodeType);



       
        if (over.id === `upper-${item.id}`) {
          console.log("upper")

          if(event.active.data.current?.isButton){

          AddatTop({
            nodetoadd: nodeToAdd,
            node: {
              id: item.id,
              type: item.type,
              properties: item.properties,
            },
          });} 

          if(!event.active.data.current?.isButton){

            const node={
              type:event.active.data.current?.type,
              id:event.active.data.current?.id,
              properties:event.active.data.current?.properties
            }

            removeStore(event.active.data.current?.id)

            AddatTop({
              nodetoadd: node,
              node: {
                id: item.id,
                type: item.type,
                properties: item.properties,
              },
            })

        }} else if (over.id === `bottom-${item.id}`) {
          console.log("bottom");
          if(event.active.data.current?.isButton){

            AddatBottom({
              nodetoadd: nodeToAdd,
              node: {
                id: item.id,
                type: item.type,
                properties: item.properties,
              },
            });}
  
            if(!event.active.data.current?.isButton){
  
              const node={
                type:event.active.data.current?.type,
                id:event.active.data.current?.id,
                properties:event.active.data.current?.properties
              }
  
              removeStore(event.active.data.current?.id)
  
              AddatBottom({
                nodetoadd: node,
                node: {
                  id: item.id,
                  type: item.type,
                  properties: item.properties,
                },
              })
  
          } 
        }

        setIsNode(true);
      }
    },
  });

  const onsubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!mouseIsdelete) {
      console.log("property", property);
      removeproperty();
      setproperty(item);
      console.log("property", property);
    }
  };

  const onTrashClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (istrue && mouseIsdelete) {
      removeproperty();
    }
    removeStore(item.id);
    setMouseIsdelete(false);
  };

  return (
    <div ref={draggable.setNodeRef}
    {...draggable.listeners}
    {...draggable.attributes}
>
      {overUp && <div className="absolute top-0 w-full rounded-md h-[7px] bg-primary rounded-b-none" />}
      <div
        className={cn('relative w-full h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset mt-9 justify-between')}
        onMouseEnter={() => setMouseIsOver(true)}
        onMouseLeave={() => {
          setMouseIsOver(false);
          setMouseIsdelete(false);
        }}
        onClick={onsubmit}
      >
        <div className='absolute w-full h-1/2 rounded-t-md' ref={setUpperhalfNodeRef} />
        <div className='absolute w-full h-1/2 rounded-t-md' ref={setBottomhalfNodeRef} />
        {
          mouseIsOver && (
            <div className='absolute inset-0 flex items-center justify-between text-center bg-background/50'>
              <p className='text-muted-foreground text-sm pl-4 text-center'>
                Click for properties or drag to move
              </p>
              <Button
                className='flex items-center justify-center h-full border rounded-md rounded-l-none bg-red-500'
                variant='outline'
                onMouseEnter={() => setMouseIsdelete(true)}
                onMouseLeave={() => setMouseIsdelete(false)}
                onClick={onTrashClick}
              >
                <BiSolidTrash className='h-6 w-6' />
              </Button>
            </div>
          )
        }
        <div className={cn("flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2", mouseIsOver && "opacity-30 invisible")}>
          {children}
        </div>
      </div>
      {overBottom && <div className="absolute top-0 w-full rounded-md h-[7px] bg-primary rounded-b-none" />}
    </div>
  );
}





