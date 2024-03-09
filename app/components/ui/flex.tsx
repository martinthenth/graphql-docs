import { HTMLAttributes } from "react";

interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  dir?: "row" | "col";
  gap?: "sm" | "md" | "lg" | "xl";
  items?: "start" | "center" | "end";
  justify?: "start" | "center" | "end" | "between";
}

export function Flex({ children, className, dir, gap, items, justify, ...props }: FlexProps) {
  const directionClasses = getDirectionClasses(dir);
  const gapClasses = getGapClasses(gap);
  const itemsClasses = getItemsClasses(items);
  const justifyClasses = getJustifyClasses(justify);
  const classNames = [
    "flex",
    ...directionClasses,
    ...gapClasses,
    ...itemsClasses,
    ...justifyClasses,
    className,
  ]
    .join(" ")
    .trim();

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}

function getDirectionClasses(dir?: "row" | "col") {
  if (dir == "row") return ["flex-row"];
  if (dir == "col") return ["flex-col"];
  return [];
}

function getGapClasses(gap?: "sm" | "md" | "lg" | "xl") {
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

function getJustifyClasses(justify?: "start" | "center" | "end" | "between") {
  if (justify == "start") return ["justify-start"];
  if (justify == "center") return ["justify-center"];
  if (justify == "end") return ["justify-end"];
  if (justify == "between") return ["justify-between"];
  return [];
}
