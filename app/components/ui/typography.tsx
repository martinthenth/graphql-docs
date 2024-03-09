import { HTMLAttributes } from "react";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  color?: "primary" | "secondary" | "tertiary";
}

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  color?: "primary" | "secondary" | "tertiary" | "danger";
  size?: "sm" | "md" | "lg";
}

export function Title({ children, className, color, ...props }: HeadingProps) {
  const colorClasses = getColorClass(color);
  const classNames = ["text-3xl", "font-semibold", ...colorClasses, className].join(" ");

  return (
    <h1 className={classNames} {...props}>
      {children}
    </h1>
  );
}

export function H1({ children, className, color, ...props }: HeadingProps) {
  const colorClasses = getColorClass(color);
  const classNames = ["text-2xl", "font-semibold", ...colorClasses, className].join(" ");

  return (
    <h1 className={classNames} {...props}>
      {children}
    </h1>
  );
}

export function H2({ children, className, color, ...props }: HeadingProps) {
  const colorClasses = getColorClass(color);
  const classNames = ["text-xl", "font-semibold", ...colorClasses, className].join(" ");
  return (
    <h2 className={classNames} {...props}>
      {children}
    </h2>
  );
}

export function H3({ children, className, color, ...props }: HeadingProps) {
  const colorClasses = getColorClass(color);
  const classNames = ["text-lg", "font-medium", ...colorClasses, className].join(" ");

  return (
    <h3 className={classNames} {...props}>
      {children}
    </h3>
  );
}

export function H4({ children, className, color, ...props }: HeadingProps) {
  const colorClasses = getColorClass(color);
  const classNames = ["text-base", "font-medium", ...colorClasses, className].join(" ");

  return (
    <h4 className={classNames} {...props}>
      {children}
    </h4>
  );
}

export function H5({ children, className, color, ...props }: HeadingProps) {
  const colorClasses = getColorClass(color);
  const classNames = ["text-sm", "font-medium", ...colorClasses, className].join(" ");

  return (
    <h5 className={classNames} {...props}>
      {children}
    </h5>
  );
}

export function H6({ children, className, color, ...props }: HeadingProps) {
  const colorClasses = getColorClass(color);
  const classNames = ["text-xs", "font-medium", ...colorClasses, className].join(" ");

  return (
    <h6 className={classNames} {...props}>
      {children}
    </h6>
  );
}

export function P({ children, className, color, size = "md", ...props }: TextProps) {
  const colorClasses = getColorClass(color);
  const fontSizeClasses = getFontSizeClass(size);
  const classNames = [...colorClasses, ...fontSizeClasses, className].join(" ");

  return (
    <p className={classNames} {...props}>
      {children}
    </p>
  );
}

function getColorClass(color?: string) {
  if (color === "primary") return ["text-black"];
  if (color === "secondary") return ["text-stone-700"];
  if (color === "tertiary") return ["text-stone-500"];
  if (color === "danger") return ["text-red-500"];
  return [];
}

function getFontSizeClass(size?: string) {
  if (size === "sm") return ["text-xs"];
  if (size === "md") return ["text-sm"];
  if (size === "lg") return ["text-base"];
  return [];
}
