export type API = {
  version: string;
  directives: APIDirectives;
  enums: APIEnums;
  inputs: APIInputs;
  types: APITypes;
};
export type APIDirectives = Record<string, object>;
export type APIEnums = Record<string, APIEnum>;
export type APIEnum = { description: string | null; values: APIEnumValues };
export type APIEnumValues = Record<string, APIEnumValue>;
export type APIEnumValue = { description: string | null };
export type APIInputs = Record<string, APIInput>;
export type APIInput = { description: string | null; fields: APIInputFields; fieldNames: string[] };
export type APIInputFields = Record<string, APIInputField>;
export type APIInputField = {
  name: string;
  type: string;
  description: string | null;
  arguments: APIInputFieldArguments | null;
  argumentNames: string[] | null;
  directives: APIInputFieldDirectives;
};
export type APIInputFieldArguments = Record<string, APIInputFieldArgument>;
export type APIInputFieldArgument = {
  type: string;
  description: string | null;
  directives: APIInputFieldArgumentDirectives | null;
};
export type APIInputFieldArgumentDirectives = Record<string, APIInputFieldArgumentDirective>;
export type APIInputFieldArgumentDirective = { required?: string };
export type APIInputFieldDirectives = Record<string, APIInputFieldDirective>;
export type APIInputFieldDirective = { required?: string };
export type APITypes = Record<string, APIType>;
export type APIType = {
  description: string | null;
  fields: APITypeFields | null;
  fieldNames: string[] | null;
};
export type APITypeFields = Record<string, APITypeField>;
export type APITypeField = {
  name: string;
  type: string;
  description: string | null;
  arguments: APITypeFieldArguments | null;
  argumentNames: string[] | null;
  directives: APITypeFieldDirectives;
};
export type APITypeFieldArguments = Record<string, APITypeFieldArgument>;
export type APITypeFieldArgument = {
  name: string;
  type: string;
  description: string | null;
  directives: APITypeFieldArgumentDirectives | null;
};
export type APITypeFieldArgumentDirectives = Record<string, APITypeFieldArgumentDirective>;
export type APITypeFieldArgumentDirective = { required?: string };
export type APITypeFieldDirectives = Record<string, APITypeFieldDirective>;
export type APITypeFieldDirective = { required?: string; permissions?: string };

export type APIDocs = { title: string; version: string; sections: APIDocsSection[] };
export type APIDocsSection = { id: string; title: string; articles: APIDocsArticle[] };
export type APIDocsArticle = {
  id: string;
  type: string;
  definition?: APIType | APITypeField;
  inputs?: APIInputs;
};
