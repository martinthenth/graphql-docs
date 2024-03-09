import { APIDocsArticle, APIType, APITypeField } from "@/types";
import { HTMLAttributes } from "react";
import { Grid } from "@/components/ui/grid";
import { H2 } from "@/components/ui/typography";
import { DocsContentListItemAction, DocsContentListItemType } from "./content-list-item";

interface DocsContentListProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  articles: APIDocsArticle[];
}

export function DocsContentList({ articles, title }: DocsContentListProps) {
  return (
    <Grid gap="sm">
      <H2>{title}</H2>
      {articles.map((article) =>
        ["Query", "Mutation"].includes(article.type) ? (
          <DocsContentListItemAction
            key={article.id}
            definition={article.definition as APITypeField}
          />
        ) : (
          <DocsContentListItemType key={article.id} definition={article.definition as APIType} />
        ),
      )}
    </Grid>
  );
}
