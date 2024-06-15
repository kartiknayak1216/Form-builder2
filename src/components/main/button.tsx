import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { Type } from "./type/formtype";
import { Button } from "../ui/button";

type props={
  label:string,
  Icon:React.ElementType,
  type:Type
}

 export function SidebarButton({ label,Icon,type}: props) {
  const draggable = useDraggable({
    id: type,
    data: {
      type:type,
     isButton:true,
      style:{
        label:label,
        Icon:Icon,
        type:type
      }
    },
  });

  return (
    <Button
      ref={draggable.setNodeRef}
      variant={"outline"}
      className={cn(
        "flex flex-col gap-2 h-[40px] w-[40px] md:h-[120px] md:w-[120px] cursor-grab",
        draggable.isDragging && "ring-2 ring-primary",
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className="h-8 w-8 text-primary cursor-grab" />
      <p className="text-xs hidden md:block" >{label}</p>
    </Button>
  );
}

export function SidebarButtonlayout({ label,Icon,type}: props) {

  return (
    <Button
      variant={"outline"}
      className={cn(
        "flex flex-col gap-2 h-[40px] w-[40px] md:h-[120px] md:w-[120px]  rounded-md border",
      )}
 
    >
      <Icon className="h-8 w-8 text-primary cursor-grab" />
      <p className="text-xs hidden md:block">{label}</p>
    </Button>
  );
}

