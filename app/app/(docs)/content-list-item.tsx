import { HTMLAttributes } from "react";
import { CodeBlock } from "@/components/ui/codeblock";
import { Flex } from "@/components/ui/flex";
import { Grid } from "@/components/ui/grid";
import { H3, H4, H5, P } from "@/components/ui/typography";

interface ApiContentListItemProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle: string;
  example: string;
}
interface ApiContentListItemFieldProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  type: string;
  description: string | null;
}

export function ApiContentListItem({
  children,
  example,
  subtitle,
  title,
}: ApiContentListItemProps) {
  return (
    <div>
      <H3>{title}</H3>
      <Grid gap="md" items="start" className="grid-cols-2">
        <Grid>
          <header className="py-2">
            <H4>{subtitle}</H4>
          </header>
          <section>{children}</section>
        </Grid>
        <Grid>
          <CodeBlock content={example} language="json" />
        </Grid>
      </Grid>
    </div>
  );
}

export function ApiContentListItemField({ description, name, type }: ApiContentListItemFieldProps) {
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
