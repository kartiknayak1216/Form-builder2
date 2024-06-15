import { number } from 'zod';
import { create } from 'zustand'
import { StateCreator } from 'zustand';

// Define Type
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

// Create the zustand store
export const global: StateCreator<GlobalSchema> = (set) => ({
  store: [],
  addStore: (node: Node) =>
    set((state) => ({
      store: [...state.store, node],
    })),
  removeStore: (id: string) =>
    set((state) => ({
      store: state.store.filter((item) => item.id !== id),
    })),

    updateProperty: (id: string, key: string, value: any) =>
      set((state) => ({
        store: state.store.map(item => 
          item.id === id ? { ...item, properties: { ...item.properties, [key]: value } } : item
        ),


      })),


      AddatTop: ({nodetoadd,node}:{nodetoadd: Node, node: Node}) =>
        set((state) => {

          
          const index = state.store.findIndex((item) => item.id === node.id);
          return {
            store: [...state.store.slice(0, index), nodetoadd, ...state.store.slice(index)],
          };
        }),
              
        
        
              AddatBottom:({nodetoadd,node}:{nodetoadd: Node, node: Node})=>
                set((state) => {
                  const index = state.store.findIndex((item) => item.id === node.id)+1;
                  return {
                    store: [...state.store.slice(0, index), nodetoadd, ...state.store.slice(index)],
                  };}),


                  clearStore: () => set(()=>({
                    store:[]
                  }) )


});

export const useElementStore : StateCreator<elements>=(set) => ({
  property: null,
  setproperty: (child: Node) =>
    set(() => ({
      property: child,
    })),
  removeproperty: () =>
    set(() => ({
      property: null,
    })),
});
