import { Box, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { getDocHrefForMarkdownPath, getHeadingId } from "@/lib/docs";

type MarkdownContentProps = {
  markdown: string;
};

function normalizeImageSrc(src: unknown) {
  if (typeof src !== "string") {
    return undefined;
  }

  return src.startsWith("img/") ? `/docs/${src}` : src;
}

export function MarkdownContent({ markdown }: MarkdownContentProps) {
  return (
    <Box
      className="markdown-body"
      sx={{
        color: "text.primary",
        fontSize: "0.875rem",
        lineHeight: 1.7,
        px: { xs: 2.5, sm: 4 },
        py: { xs: 3, sm: 4 },
        "& h1": {
          fontSize: "1.65rem",
          letterSpacing: "-0.03em",
          lineHeight: 1.2,
          mb: 1.5,
          mt: 0,
          scrollMarginTop: "80px",
        },
        "& h2": {
          fontSize: "1.05rem",
          letterSpacing: "-0.01em",
          mb: 1,
          mt: 3,
          scrollMarginTop: "80px",
        },
        "& h3": {
          fontSize: "0.95rem",
          letterSpacing: "-0.01em",
          mb: 1,
          mt: 2.5,
          scrollMarginTop: "80px",
        },
        "& p": { mb: 1.5, mt: 0 },
        "& blockquote": {
          borderLeft: "3px solid #cfcfcf",
          color: "text.secondary",
          m: 0,
          mb: 2,
          pl: 2,
        },
        "& ul, & ol": { mb: 1.5, mt: 0, pl: 3 },
        "& li": { mb: 0.5 },
        "& a": { color: "text.primary", fontWeight: 600 },
        "& img": {
          border: "1px solid #dfdfdf",
          borderRadius: 1,
          display: "block",
          height: "auto",
          maxWidth: "100%",
        },
        "& details": {
          bgcolor: "#f7f7f7",
          border: "1px solid #dfdfdf",
          borderRadius: 1,
          mb: 2,
          p: 2,
        },
        "& summary": { cursor: "pointer", fontWeight: 600 },
        "& pre": {
          bgcolor: "#1f1f1f",
          borderRadius: 1,
          color: "#f4f4f4",
          fontSize: "0.8125rem",
          lineHeight: 1.6,
          mb: 2,
          overflowX: "auto",
          p: 2,
        },
        "& code": {
          fontFamily:
            '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
        },
        "& :not(pre) > code": {
          bgcolor: "#eeeeee",
          borderRadius: 0.5,
          color: "#222222",
          px: 0.5,
          py: 0.15,
        },
      }}
    >
      <ReactMarkdown
        components={{
          a: ({ children, href }) => {
            const isExternal = href?.startsWith("http://") || href?.startsWith("https://");

            return (
              <a
                href={href ? getDocHrefForMarkdownPath(href) : href}
                rel={isExternal ? "noopener noreferrer" : undefined}
                target={isExternal ? "_blank" : undefined}
              >
                {children}
              </a>
            );
          },
          h1: ({ children }) => (
            <Typography component="h1" id={getHeadingId(children)}>
              {children}
            </Typography>
          ),
          h2: ({ children }) => (
            <Typography component="h2" id={getHeadingId(children)}>
              {children}
            </Typography>
          ),
          h3: ({ children }) => (
            <Typography component="h3" id={getHeadingId(children)}>
              {children}
            </Typography>
          ),
          img: ({ alt, src }) => (
            <Box component="img" src={normalizeImageSrc(src)} alt={alt ?? ""} />
          ),
        }}
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
      >
        {markdown}
      </ReactMarkdown>
    </Box>
  );
}
