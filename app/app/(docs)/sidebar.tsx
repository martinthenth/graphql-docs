import { uuid4 } from "@/lib/uuid";
import { HTMLAttributes } from "react";
import { APIDocs } from "./page";
import { ApiSidebarList } from "./sidebar-list";

interface ApiSidebarProps extends HTMLAttributes<HTMLDivElement> {
  docs: APIDocs;
}

export function ApiSidebar({ className, docs }: ApiSidebarProps) {
  const classNames = ["overflow-y-auto", "shrink-0", "border-r", className].join(" ").trim();

  return (
    <aside className={classNames}>
      <nav className="p-4">
        <ApiSidebarList
          title="Introduction"
          articles={[
            { type: "Getting started" },
            { type: "Authentication" },
            { type: "Rate limits" },
            { type: "Errors" },
          ].map((article) => ({ ...article, id: uuid4() }))}
        />
        {docs.sections.map((section) => (
          <ApiSidebarList key={section.id} title={section.title} articles={section.articles} />
        ))}
      </nav>
    </aside>
  );
}
