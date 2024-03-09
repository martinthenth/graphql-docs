import { HTMLAttributes } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";

export interface CodeBlockProps extends HTMLAttributes<HTMLDivElement> {
  content: string;
  language: "graphql" | "json";
}

export function CodeBlock({ content, language }: CodeBlockProps) {
  return (
    <SyntaxHighlighter language={language} className="text-sm">
      {content}
    </SyntaxHighlighter>
  );
}
