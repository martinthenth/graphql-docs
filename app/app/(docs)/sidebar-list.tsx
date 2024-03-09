"use client";

import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { HTMLAttributes, useState } from "react";
import { Button } from "@/components/ui/button";
import { P } from "@/components/ui/typography";
import { APIDocsArticle } from "./page";

interface ApiSidebarListProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  articles: APIDocsArticle[];
}

export function ApiSidebarList({ articles, title }: ApiSidebarListProps) {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <header>
        <Button
          onClick={() => setOpen(!open)}
          justify="between"
          variant="minimal"
          className="w-full"
        >
          {title}
          {open ? (
            <ChevronDownIcon className="w-4 h-4" />
          ) : (
            <ChevronRightIcon className="w-4 h-4" />
          )}
        </Button>
      </header>
      {open && (
        <article>
          {articles.map((article) => (
            <Button
              key={article.id}
              justify="start"
              variant="minimal"
              className="w-full font-normal"
            >
              <P color="secondary">{article.definition?.description || article.type}</P>
            </Button>
          ))}
        </article>
      )}
    </div>
  );
}
