import { HTMLAttributes } from "react";

interface CodeProps extends HTMLAttributes<HTMLHeadingElement> {}

export function Code({ children, ...props }: CodeProps) {
  return (
    <code className="p-1 rounded bg-zinc-200" style={{ fontSize: "90%" }} {...props}>
      {children}
    </code>
  );
}
