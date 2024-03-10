# GraphQL-docs

A beautiful GraphQL static documentation website - based on Next.js and Golang.

## Installation

1. Set up [asdf](https://asdf-vm.com) on your computer.
2. Run `asdf install` to install Go, Node.js, and Task.

## Usage

### Generating the GraphQL JSON

1. Run `task docs.generate` to generate `app/lib/graph.yaml`.

### Running the server

1. Run `cd app` to enter the Next.js folder.
2. Run `npm run dev` to run the Next.js server.

### Selecting the fields to render

1. Open `app/app/page.tsx` which contains the documentation page.
2. Find `generateApiDocs/1` which selects the GraphQL types, queries and mutations to render on the page.
3. Add a section to `docs.sections` with the `Type` name, or the `Query` or `Mutation` field name.

#### Example

```typescript
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
```

## Preview

<img width="1371" alt="Screenshot 2024-03-10 at 04 49 44" src="https://github.com/martinthenth/graphql-docs/assets/9060839/5e0af93d-7167-4a99-a8a2-c953ac36eee2">

