import { APIDocsArticle, APIType, APITypeField } from "@/types";
import { HTMLAttributes } from "react";
import { Grid } from "@/components/ui/grid";
import { H2 } from "@/components/ui/typography";
import { ApiContentListItemAction, ApiContentListItemType } from "./content-list-item";

interface ApiContentListProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  articles: APIDocsArticle[];
}

export function ApiContentList({ articles, title }: ApiContentListProps) {
  return (
    <Grid gap="sm">
      <H2>{title}</H2>
      {articles.map((article) =>
        ["Query", "Mutation"].includes(article.type) ? (
          <ApiContentListItemAction
            key={article.id}
            definition={article.definition as APITypeField}
          />
        ) : (
          <ApiContentListItemType key={article.id} definition={article.definition as APIType} />
        ),
      )}
    </Grid>
  );
}
