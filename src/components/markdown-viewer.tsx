"use client";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import "highlight.js/styles/github-dark.css";
import rehypeHighlight from "rehype-highlight";

interface Props {
  content: string;
}

export function MarkdownViewer({ content }: Props) {
  const cleanContent = content.replace(/^[ \t]*```/gm, "```");

  return (
    <div className="prose max-w-none prose-strong:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-code:bg-muted  prose-code:px-1.5  prose-code:py-0.5  prose-code:rounded-md  prose-code:text-foreground prose-code:before:content-none prose-code:after:con prose-pre:bg-zinc-950 prose-pre:border  prose-pre:border-border prose-pre:p-4 prose-pre:rounded-lg prose-pre:prose-code:bg-transparent  prose-pre:prose-code:text-white  prose-pre:prose-code:p-0">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}>
        {cleanContent}
      </ReactMarkdown>
    </div>
  );
}
