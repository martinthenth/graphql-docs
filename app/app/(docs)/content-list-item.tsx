import { uuid4 } from "@/lib/uuid";
import { APIType, APITypeField, APITypeFieldArgument } from "@/types";
import { HTMLAttributes } from "react";
import { CodeBlock } from "@/components/ui/codeblock";
import { Flex } from "@/components/ui/flex";
import { Grid } from "@/components/ui/grid";
import { H3, H4, H5, P } from "@/components/ui/typography";

interface ApiContentListItemTypeProps extends HTMLAttributes<HTMLDivElement> {
  definition: APIType;
}
interface ApiContentListItemActionProps extends HTMLAttributes<HTMLDivElement> {
  definition: APITypeField;
}
interface ApiContentListItemFieldProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  type: string;
  description: string | null;
}

export function ApiContentListItemType({ definition }: ApiContentListItemTypeProps) {
  const title = definition.description || "";
  const subtitle = "Attributes";
  const fields =
    definition.fields && definition.fieldNames
      ? definition.fieldNames.map((fieldName) => definition.fields![fieldName])
      : [];
  const example = buildExample(fields);

  return (
    <div>
      <H3>{title}</H3>
      <Grid gap="md" items="start" className="grid-cols-2">
        <Grid>
          <header className="py-2">
            <H4>{subtitle}</H4>
          </header>
          <section>
            {fields.map((field) => (
              <ApiContentListItemField
                key={field.name}
                description={field.description}
                name={field.name}
                type={field.type}
              />
            ))}
          </section>
        </Grid>
        <Grid>
          <CodeBlock content={example} language="json" />
        </Grid>
      </Grid>
    </div>
  );
}

export function ApiContentListItemAction({ definition }: ApiContentListItemActionProps) {
  const title = definition.description || "";
  const subtitle = "Parameters";
  const fields =
    definition.arguments && definition.argumentNames
      ? definition.argumentNames.map((argumentName) => definition.arguments![argumentName])
      : [];
  const example = buildExample(fields);

  return (
    <div>
      <H3>{title}</H3>
      <Grid gap="md" items="start" className="grid-cols-2">
        <Grid>
          <header className="py-2">
            <H4>{subtitle}</H4>
          </header>
          <section>
            {fields.map((field) => (
              <ApiContentListItemField
                key={field.name}
                description={field.description}
                name={field.name}
                type={field.type}
              />
            ))}
          </section>
        </Grid>
        <Grid>
          <CodeBlock content={example} language="json" />
        </Grid>
      </Grid>
    </div>
  );
}

function ApiContentListItemField({ description, name, type }: ApiContentListItemFieldProps) {
  return (
    <article className="border-t py-2">
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

function buildExample(fields: APITypeField[] | APITypeFieldArgument[]) {
  let example: Record<string, any> = {};

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
