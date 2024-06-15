import React from 'react';
import { SidebarButton, SidebarButtonlayout } from './button';
import { PiTextHTwoBold } from "react-icons/pi";
import Buttonlayout from './buttonlayout';

export default function Designersidebar() {
  return (


    <div className="min-h-screen">
      <div className="md:w-[400px] w-full max-w-[700px] flex flex-col flex-grow gap-2  border-l-2 border-secondary bg-background h-full">
     
     <div className='mx-auto mt-11  '>
<Buttonlayout/>
     </div>
      </div>
    </div>
  );
}
