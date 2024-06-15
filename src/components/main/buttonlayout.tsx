import React from 'react'
import { PiTextHTwoBold } from 'react-icons/pi'
import { IoCheckboxOutline } from "react-icons/io5";
import { GoMultiSelect } from "react-icons/go";
import { IoIosCalendar } from "react-icons/io";
import { BsTextareaResize } from "react-icons/bs";
import { ImListNumbered } from "react-icons/im";
import { RxSpaceBetweenVertically } from "react-icons/rx";
import { MdOutlineTextFields } from "react-icons/md";
import { BsTypeH1, BsTypeH2 } from "react-icons/bs";
import { TbSeparator } from "react-icons/tb";
import { ImParagraphRight } from "react-icons/im";
import { SidebarButton } from './button';
import { Type } from './function/state';
import { Separator } from '@radix-ui/react-dropdown-menu';



export default function Buttonlayout() {
  
    const collection:{ Icon: React.ElementType; label: string; type: Type; }[]= [
        { Icon:  BsTypeH1, label: "Title", type: "TitleField" },
        { Icon:  BsTypeH2, label: "Subtitle", type: "SubTitleField" },
        { Icon:  ImParagraphRight, label: "Paragraph", type: "ParagraphField" },
        { Icon:TbSeparator , label: "Separator", type: "SeparatorField" },
        { Icon:RxSpaceBetweenVertically , label: "Spacer", type: "SpacerField" },
       
    ];
    const collections:{ Icon: React.ElementType; label: string; type: Type; }[]= [
        { Icon: MdOutlineTextFields, label: "Title", type: "TextField" },
               { Icon: ImListNumbered, label: "Number Field", type: "NumberField" },
        { Icon: BsTextareaResize , label: "Text Area ", type: "TextAreaField" },
        { Icon: IoIosCalendar, label: "Date Field", type: "DateField" },
        { Icon:GoMultiSelect , label: "Select Field", type: "SelectField" },
        { Icon: IoCheckboxOutline, label: "Checkbox", type: "CheckboxField" }
    ];

    
  return (
    <div className='flex flex-col gap-7'>

        <div className='flex flex-col'>
<div className=' text-slate-500'>Layout Elements</div>
<div className=' mt-9 grid grid-cols-2 md:grid-cols-2 gap-x-2 md:ml-0 md:mr-0 md:gap-x-5 gap-6'>




{


    collection.map((item,index)=>(
        <SidebarButton Icon={item.Icon} label={item.label} type={item.type} key={index}/>

    ))
}
    </div>
    </div>






    <div className='flex flex-col'>
<div className='text-slate-500'>Form Element</div>
<div className=' mt-9 grid grid-cols-2 md:grid-cols-2 gap-x-2 md:ml-0 md:mr-0 md:gap-x-5 gap-6'>
{


    collections.map((item,index)=>(
        <SidebarButton Icon={item.Icon} label={item.label} type={item.type} key={index}/>

    ))
}
    </div>
    </div>
    
    
    </div>
  )
}
