import { APIDocsArticle } from "@/types";
import { HTMLAttributes } from "react";
import { Grid } from "@/components/ui/grid";
import { H2 } from "@/components/ui/typography";
import { DocsContentListItem } from "./content-list-item";

interface DocsContentListProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  articles: APIDocsArticle[];
}

export function DocsContentList({ articles, title }: DocsContentListProps) {
  return (
    <Grid>
      <div className="p-4">
        <H2>{title}</H2>
      </div>
      {articles.map((article) => (
        <DocsContentListItem key={article.id} article={article} className="p-4 border-t" />
      ))}
    </Grid>
  );
}
