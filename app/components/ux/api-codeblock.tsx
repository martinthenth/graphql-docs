import { HTMLAttributes } from "react";
import { CodeBlock, CodeBlockProps } from "../ui/codeblock";
import { H5 } from "../ui/typography";

interface ApiCodeBlockProps extends HTMLAttributes<HTMLDivElement> {
  content: CodeBlockProps["content"];
  language: CodeBlockProps["language"];
  title: string;
}

export function ApiCodeBlock({ content, language, title }: ApiCodeBlockProps) {
  return (
    <div className="rounded-lg overflow-hidden">
      <div className="bg-zinc-800 text-white p-2">
        <H5>{title}</H5>
      </div>
      <CodeBlock content={content} language={language} />
    </div>
  );
}
