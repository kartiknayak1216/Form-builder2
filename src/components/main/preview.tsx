import { cn } from '@/lib/utils';
import React from 'react';
import { Store } from './function/store';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '../ui/button';
import { Calenderdisplay, Checkfielddisplay, Numberdisplay, Optiondisplay, Paragraphdisplay, Seperatordisplay, Spacedisplay, SubTitledisplay, Textareadisplay, Textdisplay, Titledisplay } from './field/display';

export default function Preview() {
  const { store } = Store();

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
       <div>
            {store.length > 0 ? (
              store.map((item) => {
                const Component = componentMap[item.type];
                return (
                  <div key={item.id}>
                    {Component ? <Component node={item} /> : null}
                  </div>
                );
              })
            ) : (
              <div>No form created</div>
            )}
          </div>
  );
}
