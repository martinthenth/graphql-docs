import { APIDocs } from "@/types";
import { HTMLAttributes } from "react";
import { Grid } from "@/components/ui/grid";
import { ApiContentList } from "./content-list";

interface ApiContentProps extends HTMLAttributes<HTMLDivElement> {
  docs: APIDocs;
}

export function ApiContent({ className, docs }: ApiContentProps) {
  const classNames = ["overflow-y-auto", className].join(" ").trim();

  return (
    <main className={classNames}>
      <div className="p-4">
        <Grid gap="lg">
          {docs.sections.map((section) => (
            <ApiContentList key={section.id} title={section.title} articles={section.articles} />
          ))}
        </Grid>
      </div>
    </main>
  );
}
