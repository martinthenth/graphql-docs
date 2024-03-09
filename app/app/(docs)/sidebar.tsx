import { uuid4 } from "@/lib/uuid";
import { APIDocs } from "@/types";
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
          articles={[{ type: "Getting started" }].map((article) => ({ ...article, id: uuid4() }))}
        />
        {docs.sections.map((section) => (
          <DocsSidebarList key={section.id} title={section.title} articles={section.articles} />
        ))}
      </nav>
    </aside>
  );
}
