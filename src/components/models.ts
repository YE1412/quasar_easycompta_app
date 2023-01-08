export interface Todo {
  id: number;
  content: string;
};

export interface Meta {
  totalCount: number;
};

interface LangAssocObj {
  class: string;
};

export interface ClassLangAssoc {
  obj: LangAssocObj;
};

// export interface HeadTableText {
//   content: string[];
// };

interface InputObject {
  value?: string;
  type?: string;
  label: string;
  name: string;
  head: string;
  invalidFeed?: string;
  validFeed?: string;
  isValid?: boolean;
  required?: boolean;
  placeholder?: string;
  size?: string;
  disabled?: boolean;
};

export interface InputObjectCollection {
  object: InputObject;
};

export interface ServiceObject {
  serviceId: number;
  nom: string;
  montantHt: number;
  quantite: number;
};

export interface FormState {
  update: boolean;
  add: boolean;
};

export interface Message {
  severity: boolean;
  content: string;
};
