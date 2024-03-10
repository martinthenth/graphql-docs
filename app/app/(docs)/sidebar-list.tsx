"use client";

import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { HTMLAttributes, useState } from "react";
import { Button } from "@/components/ui/button";
import { P } from "@/components/ui/typography";

interface DocsSidebarListProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  items: { id: string; title: string }[];
}

export function DocsSidebarList({ items, title }: DocsSidebarListProps) {
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
          {items.map((item) => (
            <Button key={item.id} justify="start" variant="minimal" className="w-full font-normal">
              <P color="secondary">{item.title}</P>
            </Button>
          ))}
        </article>
      )}
    </div>
  );
}
