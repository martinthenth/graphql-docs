import { uuid4 } from "@/lib/uuid";
import {
  API,
  APIDocs,
  APIDocsArticle,
  APIDocsSection,
  APIInput,
  APIType,
  APITypeField,
} from "@/types";
import { promises as fs } from "fs";
import YAML from "yaml";
import { DocsContent } from "./content";
import { DocsSidebar } from "./sidebar";

const filePath = "/lib/graph.yaml";

export default async function DocsPage() {
  const file = await fs.readFile(process.cwd() + filePath, "utf8");
  const api: API = YAML.parse(file);
  const docs = buildDocs(api);

  return (
    <>
      <DocsSidebar docs={docs} className="w-64" />
      <DocsContent docs={docs} className="w-full" />
    </>
  );
}

function buildDocs(api: API) {
  const docs: APIDocs = {
    title: "GraphQL API",
    version: api.version,
    sections: [
      {
        title: "Flags",
        articles: [
          { type: "Flag", definition: api.types.Flag },
          { type: "Query", definition: api.types.Query.fields!["getFlagByName"] },
          { type: "Mutation", definition: api.types.Mutation.fields!["createFlag"] },
          { type: "Mutation", definition: api.types.Mutation.fields!["toggleFlag"] },
          { type: "Mutation", definition: api.types.Mutation.fields!["deleteFlag"] },
        ].map((article) => enrichArticle(article, api)),
      },
      {
        title: "Organizations",
        articles: [
          { type: "Organization", definition: api.types.Organization },
          { type: "Query", definition: api.types.Query.fields!["listOrganizations"] },
          { type: "Query", definition: api.types.Query.fields!["getOrganizationById"] },
          { type: "Mutation", definition: api.types.Mutation.fields!["createOrganization"] },
          { type: "Mutation", definition: api.types.Mutation.fields!["updateOrganization"] },
          { type: "Mutation", definition: api.types.Mutation.fields!["deleteOrganization"] },
        ].map((article) => enrichArticle(article, api)),
      },
      {
        id: uuid4(),
        title: "Projects",
        articles: [
          { type: "Project", definition: api.types.Project },
          { type: "Query", definition: api.types.Query.fields!["listProjects"] },
          { type: "Query", definition: api.types.Query.fields!["getProjectById"] },
          { type: "Mutation", definition: api.types.Mutation.fields!["createProject"] },
          { type: "Mutation", definition: api.types.Mutation.fields!["updateProject"] },
          { type: "Mutation", definition: api.types.Mutation.fields!["deleteProject"] },
        ].map((article) => enrichArticle(article, api)),
      },
      {
        id: uuid4(),
        title: "Users",
        articles: [
          { type: "User", definition: api.types.User },
          { type: "Query", definition: api.types.Query.fields!["listUsers"] },
          { type: "Query", definition: api.types.Query.fields!["getUserById"] },
          { type: "Mutation", definition: api.types.Mutation.fields!["createUser"] },
          { type: "Mutation", definition: api.types.Mutation.fields!["updateUser"] },
          { type: "Mutation", definition: api.types.Mutation.fields!["deleteUser"] },
        ].map((article) => enrichArticle(article, api)),
      },
    ].map((section) => enrichSection(section)),
  };

  return docs;
}

function enrichSection(section: { title: string; articles: APIDocsArticle[] }): APIDocsSection {
  return { ...section, id: uuid4() };
}

function enrichArticle(
  article: {
    type: string;
    definition: APIType | APITypeField;
  },
  api: API,
): APIDocsArticle {
  const inputs: Record<string, APIInput> = {};

  if (["Query", "Mutation"].includes(article.type)) {
    const definition = article.definition as APITypeField;

    if (definition.arguments) {
      for (const [, argument] of Object.entries(definition.arguments)) {
        const input = api.inputs[argument.type];

        if (input) {
          inputs[argument.type] = input;
        }
      }
    }
  }

  return { ...article, id: uuid4(), inputs: inputs };
}
