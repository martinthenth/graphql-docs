import { uuid4 } from "@/lib/uuid";
import { API, APIDocs } from "@/types";
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
        ].map((article) => ({ ...article, id: uuid4() })),
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
        ].map((article) => ({ ...article, id: uuid4() })),
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
        ].map((article) => ({ ...article, id: uuid4() })),
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
        ].map((article) => ({ ...article, id: uuid4() })),
      },
    ].map((section) => ({ ...section, id: uuid4() })),
  };

  return docs;
}
