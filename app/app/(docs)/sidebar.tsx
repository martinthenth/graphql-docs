import { APIDocs, APITypeField } from "@/types";
import { HTMLAttributes } from "react";
import { DocsSidebarList } from "./sidebar-list";

interface DocsSidebarProps extends HTMLAttributes<HTMLDivElement> {
  docs: APIDocs;
}

export function DocsSidebar({ className, docs }: DocsSidebarProps) {
  const classNames = ["overflow-y-auto", "shrink-0", "border-r", className].join(" ").trim();

  return (
    <aside className={classNames}>
      <nav className="p-4">
        <DocsSidebarList
          title="Introduction"
          items={[{ id: "123", title: "Getting started", anchor: "getting-started" }]}
        />
        {docs.sections.map((section) => (
          <DocsSidebarList
            key={section.id}
            title={section.title}
            items={section.articles.map((article) => ({
              id: article.id,
              title: article.definition.description || article.type,
              anchor: ["Query", "Mutation"].includes(article.type)
                ? (article.definition as APITypeField).name
                : article.type,
            }))}
          />
        ))}
      </nav>
    </aside>
  );
}
