import { readFile } from "node:fs/promises";
import path from "node:path";
import type React from "react";

export type DocPage = {
  filePath: string;
  href: string;
  slug: string[];
  title: string;
};

export type DocSection = {
  items: DocPage[];
  title: string;
};

export const docsSections: DocSection[] = [
  {
    title: "Overview",
    items: [
      {
        filePath: "index.md",
        href: "/docs",
        slug: [],
        title: "SCREEN GraphQL API",
      },
    ],
  },
  {
    title: "Getting Started",
    items: [
      {
        filePath: "getting_started/command_line.md",
        href: "/docs/getting-started/command-line",
        slug: ["getting-started", "command-line"],
        title: "Command Line",
      },
      {
        filePath: "getting_started/python.md",
        href: "/docs/getting-started/python",
        slug: ["getting-started", "python"],
        title: "Python",
      },
      {
        filePath: "getting_started/javascript.md",
        href: "/docs/getting-started/javascript",
        slug: ["getting-started", "javascript"],
        title: "JavaScript",
      },
    ],
  },
  {
    title: "Queries",
    items: [
      {
        filePath: "queries/ccres.md",
        href: "/docs/queries/ccres",
        slug: ["queries", "ccres"],
        title: "Searching cCREs",
      },
      {
        filePath: "queries/ccredetails.md",
        href: "/docs/queries/ccre-details",
        slug: ["queries", "ccre-details"],
        title: "cCRE Details",
      },
      {
        filePath: "queries/functionalcharacterizationdata.md",
        href: "/docs/queries/functional-characterization-data",
        slug: ["queries", "functional-characterization-data"],
        title: "Functional Characterization",
      },
      {
        filePath: "queries/geneexpression.md",
        href: "/docs/queries/gene-expression",
        slug: ["queries", "gene-expression"],
        title: "Gene Expression",
      },
      {
        filePath: "queries/gwas.md",
        href: "/docs/queries/gwas",
        slug: ["queries", "gwas"],
        title: "GWAS",
      },
      {
        filePath: "queries/rampage.md",
        href: "/docs/queries/rampage",
        slug: ["queries", "rampage"],
        title: "RAMPAGE",
      },
      {
        filePath: "queries/searchautocomplete.md",
        href: "/docs/queries/search-autocomplete",
        slug: ["queries", "search-autocomplete"],
        title: "Search Autocomplete",
      },
    ],
  },
];

export const docsPages = docsSections.flatMap((section) => section.items);

export function getDocBySlug(slug: string[] = []) {
  return docsPages.find((page) => page.slug.join("/") === slug.join("/")) ?? null;
}

export function getDocHrefForMarkdownPath(href: string) {
  const normalizedHref = href.replace(/^\.\//, "");
  const page = docsPages.find((doc) => doc.filePath === normalizedHref);

  return page?.href ?? href;
}

export async function readDocMarkdown(doc: DocPage) {
  return readFile(path.join(process.cwd(), "src/docs", doc.filePath), "utf8");
}

export function getHeadingId(children: React.ReactNode) {
  return String(children)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
