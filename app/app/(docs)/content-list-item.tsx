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
              <H4>{article.type}</H4>
              <P>
                <span className="p-1 bg-stone-100 rounded-lg inline-block">
                  <code>{article.type}</code>
                </span>
              </P>
            </header>
          </div>
          <div>
            <header className="py-2">
              <H4>Attributes / parameters</H4>
            </header>
            <section>
              {isType && (
                <DocsContentListItemAttributes
                  attributes={(definition as APIType).fieldNames!.map(
                    (fieldName) => (definition as APIType).fields![fieldName],
                  )}
                />
              )}
              {isQuery ||
                (isMutation && (
                  <DocsContentListItemParameters
                    parameters={(definition as APITypeField).argumentNames!.map(
                      (argumentName) => (definition as APITypeField).arguments![argumentName],
                    )}
                  />
                ))}
            </section>
          </div>
        </Grid>
        <Grid>
          {/* <div className="rounded-lg overflow-hidden">
            <div className="bg-stone-800 text-white p-2">
              <H5>The thing object</H5>
            </div>
            <CodeBlock content={example} language="json" />
          </div> */}
        </Grid>
      </Grid>
    </div>
  );
}

function DocsContentListItemAttributes({ attributes }: { attributes: APITypeField[] }) {
  return (
    <section>
      {attributes.map((attribute) => (
        <DocsContentListItemField
          key={attribute.name}
          type={attribute.type}
          name={attribute.name}
          description={attribute.description}
        />
      ))}
    </section>
  );
}

function DocsContentListItemParameters({ parameters }: { parameters: APITypeFieldArgument[] }) {
  return (
    <section>
      {parameters.map((parameter) => (
        <DocsContentListItemField
          key={parameter.name}
          type={parameter.type}
          name={parameter.name}
          description={parameter.description}
        />
      ))}
    </section>
  );
}

function DocsContentListItemField({ description, name, type }: DocsContentListItemFieldProps) {
  return (
    <article className="border-t py-2 last:pb-0">
      <Grid gap="xs">
        <Flex gap="sm" items="end">
          <H5>
            <code>{name}</code>
          </H5>
          <P color="tertiary" size="sm">
            {type}
          </P>
        </Flex>
        {description && <P color="secondary">{description}</P>}
      </Grid>
    </article>
  );
}

// OLD

interface DocsContentListItemTypeProps extends HTMLAttributes<HTMLDivElement> {
  definition: APIType;
}
interface DocsContentListItemActionProps extends HTMLAttributes<HTMLDivElement> {
  definition: APITypeField;
}
interface DocsContentListItemFieldProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  type: string;
  description: string | null;
}

export function DocsContentListItemType({ className, definition }: DocsContentListItemTypeProps) {
  const title = definition.description || "";
  const subtitle = "Attributes";
  const fields =
    definition.fields && definition.fieldNames
      ? definition.fieldNames.map((fieldName) => definition.fields![fieldName])
      : [];
  const example = buildExample(fields);

  return (
    <div className={className}>
      <div>
        <H3>{title}</H3>
        <P>`Product`</P>
      </div>
      <Grid gap="md" items="start" className="grid-cols-2">
        <Grid>
          <header className="py-2">
            <H4>{subtitle}</H4>
          </header>
          <section>
            {fields.map((field) => (
              <DocsContentListItemField
                key={field.name}
                description={field.description}
                name={field.name}
                type={field.type}
              />
            ))}
          </section>
        </Grid>
        <Grid>
          <div className="rounded-lg overflow-hidden">
            <div className="bg-stone-800 text-white p-2">
              <H5>The thing object</H5>
            </div>
            <CodeBlock content={example} language="json" />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export function DocsContentListItemAction({
  className,
  definition,
}: DocsContentListItemActionProps) {
  const title = definition.description || "";
  const subtitle = "Parameters";
  const fields =
    definition.arguments && definition.argumentNames
      ? definition.argumentNames.map((argumentName) => definition.arguments![argumentName])
      : [];
  const example = buildExample(fields);

  return (
    <div className={className}>
      <div>
        <H3>{title}</H3>
        <P>`getProductById`</P>
      </div>
      <Grid gap="md" items="start" className="grid-cols-2">
        <Grid>
          <header className="py-2">
            <H4>{subtitle}</H4>
          </header>
          <section>
            {fields.map((field) => (
              <DocsContentListItemField
                key={field.name}
                description={field.description}
                name={field.name}
                type={field.type}
              />
            ))}
          </section>
        </Grid>
        <Grid gap="md">
          <div className="rounded-lg overflow-hidden">
            <div className="bg-stone-800 text-white p-2">
              <H5>Request</H5>
            </div>
            <CodeBlock content={example} language="json" />
          </div>
          <div className="rounded-lg overflow-hidden">
            <div className="bg-stone-800 text-white p-2">
              <H5>Variables</H5>
            </div>
            <CodeBlock content={example} language="json" />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

function buildExample(fields: APITypeField[] | APITypeFieldArgument[]) {
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
