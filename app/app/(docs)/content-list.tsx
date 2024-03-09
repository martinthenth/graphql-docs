import { APIDocsArticle, APIType, APITypeField } from "@/types";
import { HTMLAttributes } from "react";
import { Grid } from "@/components/ui/grid";
import { H2 } from "@/components/ui/typography";
import { ApiContentListItem, ApiContentListItemField } from "./content-list-item";

interface ApiContentListProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  articles: APIDocsArticle[];
}

const code = `{
  "id": "cus_NffrFeUfNV2Hib",
  "object": "customer",
  "address": null,
  "balance": 0,
  "created": 1680893993,
  "currency": null,
  "email": "jennyrosen@example.com",
  "invoice_prefix": "0759376C",
  "invoice_settings": {
    "custom_fields": null,
    "default_payment_method": null,
    "footer": null,
    "rendering_options": null
  },
  "livemode": false,
  "metadata": {
    "order_id": "6735"
  },
  "name": "Jenny Rosen",
  "next_invoice_sequence": 1,
  "phone": null,
  "test_clock": null
}`;

export function ApiContentList({ articles, title }: ApiContentListProps) {
  return (
    <Grid gap="sm">
      <H2>{title}</H2>
      {articles.map((article) =>
        ["Query", "Mutation"].includes(article.type) ? (
          <ApiContentListItemAction article={article} />
        ) : (
          <ApiContentListItemType article={article} />
        ),
      )}
    </Grid>
  );
}

function ApiContentListItemAction({ article }: { article: APIDocsArticle }) {
  const definition = article.definition as APITypeField;
  const title = definition.description || "";
  const subtitle = "Parameters";
  const fields =
    definition.arguments && definition.argumentNames
      ? definition.argumentNames.map((argumentName) => definition.arguments![argumentName])
      : [];

  return (
    <ApiContentListItem key={article.id} example={code} subtitle={subtitle} title={title}>
      {fields.map((field) => (
        <ApiContentListItemField
          key={article.id + field.name}
          description={field.description}
          name={field.name}
          type={field.type}
        />
      ))}
    </ApiContentListItem>
  );
}

function ApiContentListItemType({ article }: { article: APIDocsArticle }) {
  const definition = article.definition as APIType;
  const title = definition.description || "";
  const subtitle = "Attributes";
  const fields =
    definition.fields && definition.fieldNames
      ? definition.fieldNames.map((fieldName) => definition.fields![fieldName])
      : [];

  return (
    <ApiContentListItem key={article.id} example={code} subtitle={subtitle} title={title}>
      {fields.map((field) => (
        <ApiContentListItemField
          key={article.id + field.name}
          description={field.description}
          name={field.name}
          type={field.type}
        />
      ))}
    </ApiContentListItem>
  );
}
