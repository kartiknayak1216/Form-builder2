export type Type ="TextField"
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

  export type FormElement={
  Type:Type
  }

  export type Form={
    FormElements:FormElement[]
  }