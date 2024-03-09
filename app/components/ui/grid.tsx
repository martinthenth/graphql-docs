import { HTMLAttributes } from "react";

interface GridProps extends HTMLAttributes<HTMLDivElement> {
  gap?: "xs" | "sm" | "md" | "lg" | "xl";
  items?: "start" | "center" | "end";
}

export function Grid({ children, className, gap, items, ...props }: GridProps) {
  const gapClasses = getGapClasses(gap);
  const itemsClasses = getItemsClasses(items);
  const classNames = ["grid", ...gapClasses, ...itemsClasses, className].join(" ");

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}

function getGapClasses(gap?: "xs" | "sm" | "md" | "lg" | "xl") {
  if (gap == "xs") return ["gap-1"];
  if (gap == "sm") return ["gap-2"];
  if (gap == "md") return ["gap-4"];
  if (gap == "lg") return ["gap-6"];
  if (gap == "xl") return ["gap-8"];
  return [];
}

function getItemsClasses(items?: "start" | "center" | "end") {
  if (items == "start") return ["items-start"];
  if (items == "center") return ["items-center"];
  if (items == "end") return ["items-end"];
  return [];
}
