"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Store } from '@/components/main/function/store';
import { Form } from '@prisma/client';
import { Node } from '@/components/main/function/state';
import { 
  Calenderdisplay, 
  Checkfielddisplay, 
  Numberdisplay, 
  Optiondisplay, 
  Paragraphdisplay, 
  Seperatordisplay, 
  Spacedisplay, 
  SubTitledisplay, 
  Textareadisplay, 
  Textdisplay, 
  Titledisplay 
} from '@/components/main/field/display';
import { Button } from '@/components/ui/button';
import { useUser } from "@clerk/clerk-react";
import { toast } from 'sonner';
import { Loader } from 'lucide-react';


export default function Pages({ params }: { params: { id: string } }) {
  const { id } = params;
  const { store, addStore, removeStore, clearStore } = Store();
  type DataType = Form;

  const [data, setData] = useState<DataType | null>(null);
  const [error, setError] = useState<string>("");
  const [contentNodes, setContentNodes] = useState<Node[]>([]);
  const router = useRouter();
  const { isSignedIn, user, isLoaded } = useUser();


  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {

  
    setLoading(true)
    try {
      const response = await fetch('/api/form-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        userId:user?.id,
        formId:id
        })
      })
  
      const body = await response.json()
      
      if (response.ok) {
        toast.success(body.message)
        
      } else {
        toast.error(body.error)
      }
    } catch (error) {
      console.log(error)
      toast.error("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }





  const extract = async () => {
    try {
      const response = await fetch(`/api/jobbyid?id=${id}`, { method: 'GET' });
      const body = await response.json();
      if (response.ok) {
        setData(body.user);
        clearStore();
        const nodes: Node[] = body.user.content;
        nodes.forEach(node => addStore(node));
        setContentNodes(nodes);
      } else {
        setError(body.error);
      }
    } catch (error) {
      setError("An error occurred during fetch");
    }
  };

  useEffect(() => {
    extract();
  }, [id]);

  const componentMap = {
    TitleField: Titledisplay,
    TextField: Textdisplay,
    SubTitleField: SubTitledisplay,
    ParagraphField: Paragraphdisplay,
    SeparatorField: Seperatordisplay,
    SpacerField: Spacedisplay,
    NumberField: Numberdisplay,
    TextAreaField: Textareadisplay,
    DateField: Calenderdisplay,
    SelectField: Optiondisplay,
    CheckboxField: Checkfielddisplay,
  };

  return (
    <div className='flex flex-col items-center justify-center gap-6'>
      <div className="max-w-[620px] flex flex-col gap-6 flex-grow bg-background h-full rounded-2xl p-8 overflow-y-auto items-center justify-center mx-auto w-full border border-gray-300 shadow-lg">
        {contentNodes.length > 0 ? (
          contentNodes.map((item) => {
            const Component = componentMap[item.type];
            return (
              <div key={item.id} className="w-full">
                {Component ? <Component node={item} /> : null}
              </div>
            );
          })
        ) : (
          <div>No form created</div>
        )}
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>
      <Button  size={'lg'} className='mt-4 px-4 py-2 text-sm' onClick={onSubmit}>{
        loading?(
            <div className='animate-spin'><Loader/></div>
        ):(
            <div>
          Submit      </div>
        )
}
</Button>
    </div>
  );
}
