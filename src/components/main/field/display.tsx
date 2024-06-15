import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Node } from '../function/state';
import { DM_Serif_Text } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { addDays, format } from "date-fns"
import { DateRange } from 'react-day-picker';

const style = DM_Serif_Text({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
});

export function Seperatordisplay({ node }: { node: Node }) {
  return (
    <div>
        <Separator className='w-full text-3xl mt-2'/>
        </div>
  );
}

export function Spacedisplay({ node }: { node: Node }) {
  const [size, setSize] = useState(node.properties.size*2);

  return (
    <div style={{ height: `${node.properties.size*2}px`, width: '100%' }} />
  );
}

export function Titledisplay({ node }: { node: Node }) {
  const [title, setTitle] = useState(node.properties.label);
  return (
    <div className={cn("text-4xl mt-2", style)}>
      {node.properties.label}
    </div>
  );
}

export function SubTitledisplay({ node }: { node: Node }) {
  const [title, setTitle] = useState(node.properties.label);
  return (
    <div className={cn("text-lg mt-2 text-slate-500")}>
      {node.properties.label}
    </div>
  );
}
export function Paragraphdisplay({ node }: { node: Node }) {

  const [title, setTitle] = useState(node.properties.text);
  return (
    <div>
        <div className='text-sm '>{node.properties.text}</div>
    </div>
  );
}

export  function Textdisplay({ node }: { node: Node }) {
  const [label, setlabel] = useState(node.properties.label || 'Text field');
  const [text, settext] = useState(node.properties.text || '');
  const [helpertext, sethelpertext] = useState(node.properties.helpertext || '');
const required = node.properties.required
  
  return (
    <div>
      <div className="grid md:w-full max-w-screen-sm mt-10   items-center gap-1 ">
      <Label htmlFor="title" className='mt-1'>{node.properties.label}</Label>
        <Input  placeholder={node.properties.text} required={required}  className='mt-1' />
     <div className='text-md text-slate-500  ml-3 mt-1'>{node.properties.helpertext }</div>
     {node.properties.required && <div className='text-sm text-red-500  ml-3 '>This is required field</div>
    }
      </div>

    </div>
  )}

  
export  function Textareadisplay({ node }: { node: Node }) {
  const [label, setlabel] = useState(node.properties.label || 'Text field');
  const [text, settext] = useState(node.properties.text || '');
  const [helpertext, sethelpertext] = useState(node.properties.helpertext || '');
const required = node.properties.required
  
  return (
    <div>
      <div className="grid md:w-full max-w-screen-sm mt-10   items-center gap-1 ">
      <Label htmlFor="title" className='mt-1'>{node.properties.label}</Label>
        <Textarea  placeholder={node.properties.text} required={required}  rows={node.properties.size} className='mt-1' />
     <div className='text-md text-slate-500  ml-3 mt-1'>{node.properties.helpertext }</div>
     {node.properties.required && <div className='text-sm text-red-500  ml-3 '>This is required field</div>
    }
      </div>

    </div>
  )}

  export  function Numberdisplay({ node }: { node: Node }) {
  const [label, setlabel] = useState(node.properties.label || 'Text field');
  const [helpertext, sethelpertext] = useState(node.properties.helpertext || '');
const required = node.properties.required
  
  return (
    <div>
      <div className="grid md:w-full max-w-screen-sm mt-10   items-center gap-1 ">
      <Label htmlFor="title" className='mt-1'>{node.properties.label}</Label>
        <Input  type="number"  className='mt-1' min={1} />
     <div className='text-md text-slate-500  ml-3 mt-1'>{node.properties.helpertext }</div>
     {node.properties.required && <div className='text-sm text-red-500  ml-3 '>This is required field</div>
    }
      </div>

    </div>
  )}
export function Checkfielddisplay({ node }: { node: Node }) {
  const [label, setlabel] = useState(node.properties.label || 'Text field');
  const [text, settext] = useState(node.properties.text || '');
  const [helpertext, sethelpertext] = useState(node.properties.helpertext || '');

  const required = node.properties.required


  return (
    <div className='mt-10'>
     <div className="flex flex-row  items-center gap-2  ">
    <Checkbox required={required} />
<Label htmlFor="title" className='mt-1'>{node.properties.label}</Label>
    </div>
      <div className='text-md text-slate-500  ml-3'>{node.properties.helpertext }</div>
     {node.properties.required && <div className='text-sm text-red-500  ml-3 '>This is required field</div>
    }
      </div>

  
  );
}

export function Optiondisplay({ node }: { node: Node }){
  const [label, setlabel] = useState(node.properties.label || 'Text field');
  const [option, setoption] = useState<string[]>(node.properties.options || '');
  const [helpertext, sethelpertext] = useState(node.properties.helpertext );


return(
  <div>
  <div className="grid md:w-full max-w-screen-sm mt-10   items-center gap-1 ">
  <Label htmlFor="title" className='mt-1'>{node.properties.label}</Label>
  <RadioGroup >
    {node.properties.instance === "Single"?(
      <div>
        {
         option.map((item,index)=>
        <div className="flex items-center space-x-2 space-y-2">
      <RadioGroupItem value={item} />
      <Label htmlFor="r1">{item}</Label>
    </div>)}
      </div>
    ):(
      <div>
      {
       option.map((item,index)=>
        <div className="flex items-center space-x-2 space-y-2">
       <Checkbox />
       <Label htmlFor="terms">{item}</Label>
     </div>)}
    </div>
    )
      
     
    }
</RadioGroup>
 <div className='text-md text-slate-500  ml-3 mt-1'>{node.properties.helpertext }</div>
 {node.properties.required && <div className='text-sm text-red-500  ml-3 '>This is required field</div>
}
  </div>

</div>
)

}

  
export  function Calenderdisplay({ node }: { node: Node }) {
  const [label, setlabel] = useState(node.properties.label || 'Text field');
  const [text, settext] = useState(node.properties.text || '');
  const[date,setDate]= useState<Date>()
  const [dates, setDates] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })
  const [helpertext, sethelpertext] = useState(node.properties.helpertext || '');
const required = node.properties.required
  
  return (
    <div>
      <div className="grid md:w-full max-w-screen-sm mt-10   items-center gap-1 ">
      <Label htmlFor="title" className='mt-1'>{node.properties.label}</Label>
      {
        node.properties.instance ==="Single"?(
          <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
        ):(
          <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !dates && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dates?.from ? (
              dates.to ? (
                <>
                  {format(dates.from, "LLL dd, y")} -{" "}
                  {format(dates.to, "LLL dd, y")}
                </>
              ) : (
                format(dates.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dates?.from}
            selected={dates}
            onSelect={setDates}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
        )
      }     <div className='text-md text-slate-500  ml-3 mt-1'>{node.properties.helpertext }</div>
     {node.properties.required && <div className='text-sm text-red-500  ml-3 '>This is required field</div>
    }
      </div>

    </div>
  )}