import { v4 as uuidv4 } from 'uuid';
import { Type, Node } from './state';
import { number } from 'zod';

const defaultProperties: Record<Type, Record<string, any>> = {
  TextField: { label: "Label" ,text:"Value here", helpertext:"helpertext",required:false},
  TitleField: { label: null },
  SubTitleField: { label: null },
  ParagraphField: { text: null },
  SeparatorField: {},
  SpacerField: { size:20 },
  NumberField: { label: "Label" , helpertext:"helpertext",required:false},
  TextAreaField: { label: "Label" ,text:"Value here", helpertext:"helpertext",required:false,size:1},
  DateField:{ label: "Label" , helpertext:"helpertext",required:false,
    options: [String||null],instance:String },
  SelectField: { label: "Label" ,text:Number, helpertext:"helpertext",required:false,
  options: [String||null],instance:String },
  CheckboxField:  { label: "Label" , helpertext:"helpertext",required:false}
};

const createNode = (type: Type, addStore: (node: Node) => void): Node => {
  const uniqueId = uuidv4();
  type:type;
  const properties = defaultProperties[type] 

  const newNode: Node = {
    id: uniqueId,
    type: type,
    properties: properties,
  };

  addStore(newNode);
  return newNode;
};

export default createNode;




 export const createNodeonly = (type: Type): Node => {
    const uniqueId = uuidv4();
    type:type;
    const properties = defaultProperties[type] 
  
    const newNode: Node = {
      id: uniqueId,
      type: type,
      properties: properties,
    };
  
    return newNode;
  };
  
  




