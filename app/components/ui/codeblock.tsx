import { HTMLAttributes } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";

export interface CodeBlockProps extends HTMLAttributes<HTMLDivElement> {
  content: string;
  language: "json";
}

export function CodeBlock({ content, language }: CodeBlockProps) {
  return (
    <SyntaxHighlighter language={language} className="text-sm">
      {content}
    </SyntaxHighlighter>
  );
}
