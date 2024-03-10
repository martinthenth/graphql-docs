import { APIDocs } from "@/types";
import { HTMLAttributes } from "react";
import { Grid } from "@/components/ui/grid";
import { DocsContentIntro } from "./content-intro";
import { DocsContentList } from "./content-list";

interface DocsContentProps extends HTMLAttributes<HTMLDivElement> {
  docs: APIDocs;
}

export function DocsContent({ className, docs }: DocsContentProps) {
  const classNames = ["overflow-y-auto", className].join(" ").trim();

  return (
    <main className={classNames}>
      <Grid>
        <DocsContentIntro />
        {docs.sections.map((section) => (
          <DocsContentList
            key={section.id}
            title={section.title}
            articles={section.articles}
            className="border-t"
          />
        ))}
      </Grid>
    </main>
  );
}
