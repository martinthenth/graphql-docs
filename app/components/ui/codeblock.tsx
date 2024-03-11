import { HTMLAttributes } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import graphql from "react-syntax-highlighter/dist/esm/languages/prism/graphql";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import atomOneDark from "react-syntax-highlighter/dist/esm/styles/prism/one-dark";

SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("graphql", graphql);

export interface CodeBlockProps extends HTMLAttributes<HTMLDivElement> {
  content: string;
  language: "graphql" | "json";
}

export function CodeBlock({ content, language }: CodeBlockProps) {
  return (
    <SyntaxHighlighter
      language={language}
      className="text-sm"
      style={atomOneDark}
      customStyle={{
        borderRadius: "0",
        fontFamily:
          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        margin: "0",
      }}
    >
      {content}
    </SyntaxHighlighter>
  );
}
