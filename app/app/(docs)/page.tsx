import { uuid4 } from "@/lib/uuid";
import { promises as fs } from "fs";
import { ApiContent } from "./content";
import { ApiSidebar } from "./sidebar";

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
export type APIInput = { description: string | null; fields: APIInputFields };
export type APIInputFields = Record<string, APIInputField>;
export type APIInputField = {
  type: string;
  description: string | null;
  arguments: APIInputFieldArguments | null;
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
export type APIType = { description: string | null; fields: APITypeFields };
export type APITypeFields = Record<string, APITypeField>;
export type APITypeField = {
  type: string;
  description: string | null;
  arguments: APITypeFieldArguments | null;
  directives: APITypeFieldDirectives;
};
export type APITypeFieldArguments = Record<string, APITypeFieldArgument>;
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

const apiFilePath = "/lib/graph.json";

export default async function ApiPage() {
  const docs = await generateApiDocs(apiFilePath);

  return (
    <>
      {/* <ApiSidebar docs={docs} className="w-64" />
      <ApiContent docs={docs} className="w-full" /> */}
    </>
  );
}

async function generateApiDocs(filePath: string) {
  const apiFile = await fs.readFile(process.cwd() + filePath, "utf8");
  const api: API = JSON.parse(apiFile);
  const docs: APIDocs = {
    title: "GraphQL API",
    version: api.version,
    sections: [
      {
        title: "Organizations",
        articles: [
          { type: "Organization", definition: api.types.Organization },
          { type: "Query", definition: api.types.Query.fields["listOrganizations"] },
          { type: "Query", definition: api.types.Query.fields["getOrganizationById"] },
          { type: "Mutation", definition: api.types.Mutation.fields["createOrganization"] },
          { type: "Mutation", definition: api.types.Mutation.fields["updateOrganization"] },
          { type: "Mutation", definition: api.types.Mutation.fields["deleteOrganization"] },
        ].map((article) => ({ ...article, id: uuid4() })),
      },
      {
        id: uuid4(),
        title: "Products",
        articles: [
          { type: "Product", definition: api.types.Product },
          { type: "Query", definition: api.types.Query.fields["listProducts"] },
          { type: "Query", definition: api.types.Query.fields["getProductById"] },
          { type: "Mutation", definition: api.types.Mutation.fields["createProduct"] },
          { type: "Mutation", definition: api.types.Mutation.fields["updateProduct"] },
          { type: "Mutation", definition: api.types.Mutation.fields["deleteProduct"] },
        ].map((article) => ({ ...article, id: uuid4() })),
      },
      {
        id: uuid4(),
        title: "Projects",
        articles: [
          { type: "Project", definition: api.types.Project },
          { type: "Query", definition: api.types.Query.fields["listProjects"] },
          { type: "Query", definition: api.types.Query.fields["getProjectById"] },
          { type: "Mutation", definition: api.types.Mutation.fields["createProject"] },
          { type: "Mutation", definition: api.types.Mutation.fields["updateProject"] },
          { type: "Mutation", definition: api.types.Mutation.fields["deleteProject"] },
        ].map((article) => ({ ...article, id: uuid4() })),
      },
      {
        id: uuid4(),
        title: "Users",
        articles: [
          { type: "User", definition: api.types.User },
          { type: "Query", definition: api.types.Query.fields["listUsers"] },
          { type: "Query", definition: api.types.Query.fields["getUserById"] },
          { type: "Mutation", definition: api.types.Mutation.fields["createUser"] },
          { type: "Mutation", definition: api.types.Mutation.fields["updateUser"] },
          { type: "Mutation", definition: api.types.Mutation.fields["deleteUser"] },
        ].map((article) => ({ ...article, id: uuid4() })),
      },
    ].map((section) => ({ ...section, id: uuid4() })),
  };

  return docs;
}
