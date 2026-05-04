import { Box } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type CodeBlockProps = {
  children: React.ReactNode;
  className?: string;
};

const docsCodeTheme = {
  ...oneDark,
  'code[class*="language-"]': {
    ...oneDark['code[class*="language-"]'],
    background: "transparent",
    color: "#e6edf3",
  },
  'pre[class*="language-"]': {
    ...oneDark['pre[class*="language-"]'],
    background: "transparent",
    color: "#e6edf3",
  },
  boolean: { color: "#79c0ff" },
  builtin: { color: "#ffa657" },
  comment: { color: "#8b949e", fontStyle: "italic" },
  function: { color: "#d2a8ff" },
  keyword: { color: "#ff7b72" },
  number: { color: "#79c0ff" },
  operator: { color: "#ff7b72" },
  property: { color: "#7ee787" },
  punctuation: { color: "#c9d1d9" },
  string: { color: "#a5d6ff" },
  variable: { color: "#ffa657" },
};

export function CodeBlock({ children, className }: CodeBlockProps) {
  const language = /language-([\w-]+)/.exec(className ?? "")?.[1];
  const code = String(children).replace(/\n$/, "");

  if (!language) {
    return <code className={className}>{children}</code>;
  }

  return (
    <Box sx={{ mb: 2 }}>
      <SyntaxHighlighter
        PreTag="pre"
        codeTagProps={{
          style: {
            background: "transparent",
            fontFamily:
              '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
          },
        }}
        customStyle={{
          background: "#0d1117",
          border: "1px solid #30363d",
          borderRadius: 6,
          fontSize: "0.8125rem",
          lineHeight: 1.6,
          margin: 0,
          padding: "16px",
        }}
        language={language}
        style={docsCodeTheme}
      >
        {code}
      </SyntaxHighlighter>
    </Box>
  );
}
