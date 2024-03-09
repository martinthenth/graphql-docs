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
      {articles.map((article) => (
        <ApiContentListItem
          key={article.id}
          example={code}
          subtitle={["Query", "Mutation"].includes(article.type) ? "Parameters" : "Attributes"}
          title={article.definition!.description || ""}
        >
          {Object.entries(
            (article.definition as APIType).fields ||
              (article.definition as APITypeField).arguments,
          ).map(([fieldName, field]) => (
            <ApiContentListItemField
              key={article.id + fieldName}
              description={field.description}
              name={fieldName}
              type={field.type}
            />
          ))}
        </ApiContentListItem>
      ))}
    </Grid>
  );
}
