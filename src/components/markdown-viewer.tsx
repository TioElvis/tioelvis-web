"use client";
import { useState } from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import "highlight.js/styles/github-dark.css";
import rehypeHighlight from "rehype-highlight";
import { IconCheck, IconCopy } from "@tabler/icons-react";

import { Button } from "./ui/button";

interface Props {
  content: string;
}

function Copy({ text }: { text: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Button
      onClick={handleCopy}
      aria-label="Copy code"
      variant="outline"
      className="absolute right-2 top-2 p-2">
      {isCopied ? <IconCheck className="text-green-300" /> : <IconCopy />}
    </Button>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const extractTextFromNode = (node: any): string => {
  if (node.type === "text") {
    return node.value || "";
  }
  if (node.children) {
    return (
      node.children
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((child: any) => extractTextFromNode(child))
        .join("")
    );
  }
  return "";
};

export function MarkdownViewer({ content }: Props) {
  const cleanContent = content.replace(/^[ \t]*```/gm, "```");

  return (
    <div className="prose max-w-none prose-strong:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-code:bg-muted  prose-code:px-1.5  prose-code:py-0.5  prose-code:rounded-md  prose-code:text-foreground prose-code:before:content-none prose-code:after:con prose-pre:bg-zinc-950 prose-pre:border  prose-pre:border-border prose-pre:p-4 prose-pre:rounded-lg prose-pre:prose-code:bg-transparent  prose-pre:prose-code:text-white  prose-pre:prose-code:p-0">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          pre({ node, children, ...props }) {
            let codeText = "";

            if (node && node.children && node.children.length > 0) {
              const codeNode = node.children[0];
              codeText = extractTextFromNode(codeNode);
            }

            return (
              <pre {...props} className="relative group">
                <div className="absolute right-2 top-2">
                  <Copy text={codeText} />
                </div>
                {children}
              </pre>
            );
          },
        }}>
        {cleanContent}
      </ReactMarkdown>
    </div>
  );
}
