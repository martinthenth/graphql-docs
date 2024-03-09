import { uuid4 } from "@/lib/uuid";
import { APIDocsArticle, APIType, APITypeField, APITypeFieldArgument } from "@/types";
import { HTMLAttributes } from "react";
import { CodeBlock } from "@/components/ui/codeblock";
import { Flex } from "@/components/ui/flex";
import { Grid } from "@/components/ui/grid";
import { H3, H4, H5, P } from "@/components/ui/typography";

interface DocsContentListItemProps extends HTMLAttributes<HTMLDivElement> {
  article: APIDocsArticle;
}

interface DocsContentListItemFieldProps extends HTMLAttributes<HTMLDivElement> {
  field: APITypeField | APITypeFieldArgument;
}

export function DocsContentListItem({ article, className }: DocsContentListItemProps) {
  const isQuery = article.type === "Query";
  const isMutation = article.type === "Mutation";
  const isType = !isQuery && !isMutation;
  const definition = article.definition as APIType | APITypeField;

  return (
    <div className={className}>
      <header>
        <H3>{article.definition?.description}</H3>
      </header>
      <Grid gap="md" items="start" className="grid-cols-2">
        <Grid>
          <div>
            <header className="py-2">
              <H4>{isType ? "Type" : article.type}</H4>
              <P className="pt-1">
                {isType && <code className="p-1 rounded-lg bg-stone-100">{article.type}</code>}
                {(isQuery || isMutation) && (
                  <>
                    <code className="p-1 rounded-lg bg-stone-100">
                      {(article.definition as APITypeField).name}
                    </code>
                    :{" "}
                    <code className="p-1 rounded-lg bg-stone-100">
                      {(article.definition as APITypeField).type}
                    </code>
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
                  .map((field) => <DocsContentListItemField key={field.name} field={field} />)}
            </section>
          </div>
        </Grid>
        <Grid gap="md">
          {isType && (
            <div className="rounded-lg overflow-hidden">
              <div className="bg-stone-800 text-white p-2">
                <H5>Object</H5>
              </div>
              <CodeBlock
                content={buildExampleType(
                  (definition as APIType).fieldNames!.map(
                    (fieldName) => (definition as APIType).fields![fieldName],
                  ),
                )}
                language="json"
              />
            </div>
          )}
          {isQuery && (
            <>
              <div className="rounded-lg overflow-hidden">
                <div className="bg-stone-800 text-white p-2">
                  <H5>Query</H5>
                </div>
                <CodeBlock
                  content={buildExampleQuery(definition as APITypeField)}
                  language="graphql"
                />
              </div>
              <div className="rounded-lg overflow-hidden">
                <div className="bg-stone-800 text-white p-2">
                  <H5>Variables</H5>
                </div>
                <CodeBlock content={buildExampleVariables()} language="json" />
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
                  content={buildExampleMutation(definition as APITypeField)}
                  language="graphql"
                />
              </div>
              <div className="rounded-lg overflow-hidden">
                <div className="bg-stone-800 text-white p-2">
                  <H5>Variables</H5>
                </div>
                <CodeBlock content={buildExampleVariables()} language="json" />
              </div>
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

function DocsContentListItemField({ field }: DocsContentListItemFieldProps) {
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
        </Flex>
        {field.description && <P color="secondary">{field.description}</P>}
      </Grid>
    </article>
  );
}

function buildExampleType(fields: APITypeField[]) {
  const example: Record<string, unknown> = {};

  fields.forEach((field) => {
    const value = (() => {
      switch (field.type) {
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
    })();

    example[field.name] = value;
  });

  return JSON.stringify(example, null, 2);
}

function buildExampleQuery(definition: APITypeField) {
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

  return `query ${name.charAt(0).toUpperCase() + name.slice(1)}${args} {
  ${name}${argRefs} {
    id
    name
    createdAt
    updatedAt
    deletedAt
  }
}`;
}

function buildExampleMutation(definition: APITypeField) {
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

  return `mutation ${name.charAt(0).toUpperCase() + name.slice(1)}${args} {
  ${name}${argRefs} {
    id
    name
    createdAt
    updatedAt
    deletedAt
  }
}`;
}

function buildExampleVariables() {
  return "{}";
}
