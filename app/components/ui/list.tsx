import { HTMLAttributes } from "react";

interface ListProps extends HTMLAttributes<HTMLHeadingElement> {}
interface ListItemProps extends HTMLAttributes<HTMLHeadingElement> {}

export function List({ children }: ListProps) {
  return <ol className="list-decimal space-y-1 pl-6 text-sm">{children}</ol>;
}

export function ListItem({ children }: ListItemProps) {
  return <li>{children}</li>;
}
