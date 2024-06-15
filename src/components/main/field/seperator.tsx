"use client"
import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Store } from '../function/store';
import { Node } from '../function/state';
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea"
import { Separator } from '@/components/ui/separator';
export default function Seperatorfield({ node }: { node: Node }) {
  
  return (
    <div>
      <div className="grid md:w-full max-w-screen-sm md:min-w-[800px]  items-center gap-1.5">
        <Label htmlFor="title">Seperator</Label>
        <Separator className='w-full text-3xl'/>
      </div>
    </div>
  );
}

export function SeperatorProperty(){

  return(
  <div className='w-full mt-11 flex flex-col gap-4 '>
   No property available for Seperator
 </div>)
}