import { create } from "zustand";
import { global, useElementStore } from "./state";

export type Type =
  | "TextField"
  | "TitleField"
  | "SubTitleField"
  | "ParagraphField"
  | "SeparatorField"
  | "SpacerField"
  | "NumberField"
  | "TextAreaField"
  | "DateField"
  | "SelectField"
  | "CheckboxField";

// Define the node interface
export interface Node {
  type: Type;
  id: string;
  properties: {
    [key: string]: any|null
  };
  
}

// Define the schema interface
interface GlobalSchema {
  store: Node[];
  addStore: (node: Node) => void;
  removeStore: (id: string) => void;
  clearStore: () => void;
  updateProperty: (id: string, key: string, value: any) => void;
  AddatTop:({nodetoadd,node}:{nodetoadd: Node, node: Node})=>void
  AddatBottom:({nodetoadd,node}:{nodetoadd: Node, node: Node})=>void
}


interface elements {
  property:Node|null
  setproperty:(child:Node)=>void,

  removeproperty:()=>void
}



type combin= GlobalSchema & elements
export const Store = create<combin>()((...a)=>({
   ...global(...a),
   ...useElementStore(...a)
    }))