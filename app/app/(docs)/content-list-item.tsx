import { uuid4 } from "@/lib/uuid";
import { APIDocsArticle, APIInput, APIType, APITypeField, APITypeFieldArgument } from "@/types";
import { HTMLAttributes } from "react";
import { Anchor } from "@/components/ui/anchor";
import { Code } from "@/components/ui/code";
import { CodeBlock } from "@/components/ui/codeblock";
import { Flex } from "@/components/ui/flex";
import { Grid } from "@/components/ui/grid";
import { H3, H4, H5, P } from "@/components/ui/typography";

interface DocsContentListItemProps extends HTMLAttributes<HTMLDivElement> {
  article: APIDocsArticle;
}

interface DocsContentListItemFieldProps extends HTMLAttributes<HTMLDivElement> {
  field: APITypeField | APITypeFieldArgument;
  inputs?: Record<string, APIInput>;
}

export function DocsContentListItem({ article, className }: DocsContentListItemProps) {
  const isQuery = article.type === "Query";
  const isMutation = article.type === "Mutation";
  const isType = !isQuery && !isMutation;
  const definition = article.definition as APIType | APITypeField;

  return (
    <div className={className}>
      <Anchor
        id={
          ["Query", "Mutation"].includes(article.type)
            ? (article.definition as APITypeField).name
            : article.type
        }
      />
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
            <div className="rounded-lg overflow-hidden">
              <div className="bg-stone-800 text-white p-2">
                <H5>Object</H5>
              </div>
              <CodeBlock content={buildExampleObject(definition as APIType)} language="json" />
            </div>
          )}
          {isQuery && (
            <>
              <div className="rounded-lg overflow-hidden">
                <div className="bg-stone-800 text-white p-2">
                  <H5>Query</H5>
                </div>
                <CodeBlock
                  content={buildExampleGraphQL("query", definition as APITypeField)}
                  language="graphql"
                />
              </div>
              <div className="rounded-lg overflow-hidden">
                <div className="bg-stone-800 text-white p-2">
                  <H5>Variables</H5>
                </div>
                <CodeBlock
                  content={buildExampleVariables(definition as APITypeField, article.inputs)}
                  language="json"
                />
              </div>
            </>
          )}
          {isMutation && (
            <>
              <div className="rounded-lg overflow-hidden">
                <div className="bg-stone-800 text-white p-2">
                  <H5>Mutation</H5>
                </div>
                <CodeBlock
                  content={buildExampleGraphQL("mutation", definition as APITypeField)}
                  language="graphql"
                />
              </div>
              <div className="rounded-lg overflow-hidden">
                <div className="bg-stone-800 text-white p-2">
                  <H5>Variables</H5>
                </div>
                <CodeBlock
                  content={buildExampleVariables(definition as APITypeField, article.inputs)}
                  language="json"
                />
              </div>
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

function DocsContentListItemField({ field, inputs }: DocsContentListItemFieldProps) {
  const isRequired = field.directives?.constraint?.required === "true";
  const input = inputs && inputs[field.type];

  return (
    <article className="border-t py-2 last:pb-0">
      <Grid gap="xs">
        <Flex gap="sm" items="end">
          <H5>
            <code>{field.name}</code>
          </H5>
          <P color="tertiary" size="sm" className="pb-px">
            {field.type}
          </P>
          <P color="tertiary" size="sm" className="pb-px">
            {isRequired ? "required" : "optional"}
          </P>
        </Flex>
        {field.description && <P color="secondary">{field.description}</P>}
      </Grid>
      {input && (
        <div className="pl-4">
          <header className="py-2">
            <H5>{field.type}</H5>
          </header>
          <section>
            {input.fieldNames
              .map((fieldName) => input.fields[fieldName])
              .map((field) => (
                <DocsContentListItemField key={field.name} field={field} inputs={inputs} />
              ))}
          </section>
        </div>
      )}
    </article>
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

  return JSON.stringify(object, null, 2);
}

function buildExampleVariables(definition: APITypeField, inputs: Record<string, APIInput> = {}) {
  const variables: Record<string, unknown> = {};

  if (definition.argumentNames) {
    definition.argumentNames.forEach((argumentName) => {
      const argument = definition.arguments![argumentName];
      const input = inputs[argument.type];
      let value: unknown = null;

      if (input) {
        const object: Record<string, unknown> = {};

        if (input.fieldNames) {
          input.fieldNames.forEach((fieldName) => {
            const field = input.fields![fieldName];
            const value = generateValue(field.type);

            object[fieldName] = value;
          });
        }

        value = object;
      } else {
        value = generateValue(argument.type);
      }

      variables[argumentName] = value;
    });
  }

  return JSON.stringify(variables, null, 2);
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
