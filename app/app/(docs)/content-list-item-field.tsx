import { APIInput, APITypeField, APITypeFieldArgument } from "@/types";
import { HTMLAttributes } from "react";
import { Flex } from "@/components/ui/flex";
import { Grid } from "@/components/ui/grid";
import { H5, P } from "@/components/ui/typography";

interface DocsContentListItemFieldProps extends HTMLAttributes<HTMLDivElement> {
  field: APITypeField | APITypeFieldArgument;
  inputs?: Record<string, APIInput>;
}

export function DocsContentListItemField({ field, inputs }: DocsContentListItemFieldProps) {
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
