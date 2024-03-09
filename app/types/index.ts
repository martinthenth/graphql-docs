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
  type: string;
  description: string | null;
  arguments: APIInputFieldArgument[] | null;
  argumentNames: string[] | null;
  directives: APIInputFieldDirectives;
};
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
export type APIType = { description: string | null; fields: APITypeFields; fieldNames: string[] };
export type APITypeFields = Record<string, APITypeField>;
export type APITypeField = {
  type: string;
  description: string | null;
  arguments: APITypeFieldArgument[] | null;
  argumentNames: string[] | null;
  directives: APITypeFieldDirectives;
};
export type APITypeFieldArgument = {
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
export type APIDocsArticle = { id: string; type: string; definition?: APIType | APITypeField };
