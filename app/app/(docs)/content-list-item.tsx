import { uuid4 } from "@/lib/uuid";
import { APIDocsArticle, APIInput, APIType, APITypeField } from "@/types";
import { HTMLAttributes } from "react";
import { Anchor } from "@/components/ui/anchor";
import { Code } from "@/components/ui/code";
import { Grid } from "@/components/ui/grid";
import { H3, H4, P } from "@/components/ui/typography";
import { ApiCodeBlock } from "@/components/ux/api-codeblock";
import { DocsContentListItemField } from "./content-list-item-field";

interface DocsContentListItemProps extends HTMLAttributes<HTMLDivElement> {
  article: APIDocsArticle;
}

export function DocsContentListItem({ article, className }: DocsContentListItemProps) {
  const isQuery = article.type === "Query";
  const isMutation = article.type === "Mutation";
  const isType = !isQuery && !isMutation;
  const definition = article.definition as APIType | APITypeField;
  const anchor = ["Query", "Mutation"].includes(article.type)
    ? (article.definition as APITypeField).name
    : article.type;

  return (
    <div className={className}>
      <Anchor id={anchor} />
      <header>
        <H3>{article.definition.description}</H3>
      </header>
      <Grid gap="md" items="start" className="grid-cols-2">
        <Grid>
          <div>
            <header className="py-2">
              <H4>{isType ? "Type" : article.type}</H4>
              <P className="pt-1">
                {isType && <Code>{article.type}</Code>}
                {(isQuery || isMutation) && (
                  <>
                    <Code>{(article.definition as APITypeField).name}</Code>:{" "}
                    <Code>{(article.definition as APITypeField).type}</Code>
                  </>
                )}
              </P>
            </header>
          </div>
          <div>
            <header className="py-2">
              <H4>{isType ? "Attributes" : "Parameters"}</H4>
            </header>
            <section>
              {isType &&
                (definition as APIType)
                  .fieldNames!.map((fieldName) => (definition as APIType).fields![fieldName])
                  .map((field) => <DocsContentListItemField key={field.name} field={field} />)}
              {(isQuery || isMutation) &&
                (definition as APITypeField)
                  .argumentNames!.map(
                    (argumentName) => (definition as APITypeField).arguments![argumentName],
                  )
                  .map((field) => (
                    <DocsContentListItemField
                      key={field.name}
                      field={field}
                      inputs={article.inputs}
                    />
                  ))}
            </section>
          </div>
        </Grid>
        <Grid gap="md">
          {isType && (
            <ApiCodeBlock
              title={article.definition.description || "Object"}
              language="json"
              content={stringify(buildExampleObject(definition as APIType))}
            />
          )}
          {isQuery && (
            <ApiCodeBlock
              title="Query"
              language="graphql"
              content={buildExampleGraphQL("query", definition as APITypeField)}
            />
          )}
          {isMutation && (
            <ApiCodeBlock
              title="Mutation"
              language="graphql"
              content={buildExampleGraphQL("mutation", definition as APITypeField)}
            />
          )}
          {(isQuery || isMutation) && (
            <ApiCodeBlock
              title="Variables"
              language="json"
              content={stringify(buildExampleVariables(definition as APITypeField, article.inputs))}
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
}

function buildExampleGraphQL(action: "query" | "mutation", definition: APITypeField) {
  const name = definition.name;
  let args = definition.argumentNames?.reduce((acc, argumentName) => {
    if (!acc) return argumentName;
    return `${acc}$${argumentName}: ${definition.arguments![argumentName].type}, `;
  }, "(");
  if (args == "(") {
    args = "";
  } else {
    if (args?.endsWith(", ")) {
      args = args.slice(0, -2);
      args = args + ")";
    }
  }

  let argRefs = definition.argumentNames?.reduce((acc, argumentName) => {
    if (!acc) return argumentName;
    return `${acc}${argumentName}: $${argumentName}, `;
  }, "(");
  if (argRefs == "(") {
    argRefs = "";
  } else {
    if (argRefs?.endsWith(", ")) {
      argRefs = argRefs.slice(0, -2);
      argRefs = argRefs + ")";
    }
  }

  return `${action} ${name.charAt(0).toUpperCase() + name.slice(1)}${args} {
  ${name}${argRefs} {
    id
    name
    createdAt
    updatedAt
    deletedAt
  }
}`;
}

function buildExampleObject(definition: APIType | APIInput) {
  const object: Record<string, unknown> = {};

  if (definition.fieldNames) {
    definition.fieldNames.forEach((fieldName) => {
      const field = definition.fields![fieldName];
      const value = generateValue(field.type);

      object[fieldName] = value;
    });
  }

  return object;
}

function buildExampleVariables(definition: APITypeField, inputs: Record<string, APIInput> = {}) {
  const variables: Record<string, unknown> = {};

  if (definition.argumentNames) {
    definition.argumentNames.forEach((argumentName) => {
      const argument = definition.arguments![argumentName];
      const input = inputs[argument.type];
      let value: unknown = null;

      if (input) {
        value = buildExampleObject(input);
      } else {
        value = generateValue(argument.type);
      }

      variables[argumentName] = value;
    });
  }

  return variables;
}

function generateValue(type: string) {
  switch (type) {
    case "ID":
      return "id";
    case "UUID":
      return uuid4();
    case "Int":
      return 42;
    case "String":
      return "string";
    case "Boolean":
      return true;
    case "DateTime":
      return new Date().toISOString();
    default:
      return null;
  }
}

function stringify(value: object) {
  return JSON.stringify(value, null, 2);
}
