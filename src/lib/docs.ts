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
        filePath: "getting_started/auth.md",
        href: "/docs/getting-started/auth",
        slug: ["getting-started", "auth"],
        title: "Authentication",
      },
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
  title: "cCRE Queries",
  items: [
    {
      filePath: "queries/cCREQueries/ccres.md",
      href: "/docs/queries/ccres",
      slug: ["queries", "ccres"],
      title: "cCRE Details",
    },
    {
      filePath: "queries/cCREQueries/genes.md",
      href: "/docs/queries/ccre-genesdetails",
      slug: ["queries", "ccre-genesdetails"],
      title: "cCRE - Gene Details",
    },
     {
      filePath: "queries/cCREQueries/variants.md",
      href: "/docs/queries/ccre-variantsdetails",
      slug: ["queries", "ccre-variantsdetails"],
      title: "cCRE - Variant Details",
    },
    {
      filePath: "queries/cCREQueries/conservation.md",
      href: "/docs/queries/conservation",
      slug: ["queries", "conservation"],
      title: "Conservation",
    },
    {
      filePath: "queries/cCREQueries/tfmotifs.md",
      href: "/docs/queries/tfmotifs",
      slug: ["queries", "tfmotifs"],
      title: "TF Motifs",
    },
    {
        filePath: "queries/cCREQueries/functionalcharacterizationdata.md",
        href: "/docs/queries/functional-characterization-data",
        slug: ["queries", "functional-characterization-data"],
        title: "Functional Characterization",
    },
    {
        filePath: "queries/cCREQueries/additionalchromatinsig.md",
        href: "/docs/queries/additional-chromatin-signature",
        slug: ["queries", "additional-chromatin-signature"],
        title: "Additional Chromatin Signature",
    },
  ],
  },
  {
    title: "Gene Queries",
    items: [
      {
        filePath: "queries/geneQueries/geneexpression.md",
        href: "/docs/queries/gene-expression",
        slug: ["queries", "gene-expression"],
        title: "Gene Expression",
      },
      {
        filePath: "queries/geneQueries/ccres.md",
        href: "/docs/queries/linked-ccres",
        slug: ["queries", "linked-ccres"],
        title: "Linked cCREs",
      },
      {
        filePath: "queries/geneQueries/rampage.md",
        href: "/docs/queries/rampage",
        slug: ["queries", "rampage"],
        title: "RAMPAGE",
      },
      {
        filePath: "queries/geneQueries/variants.md",
        href: "/docs/queries/gene-eqtls",
        slug: ["queries", "gene-eqtls"],
        title: "Gene eQTLs",
      },
    ],
  }, 
  {
    title: "Variant Queries",
    items: [
      {
        filePath: "queries/variantQueries/variant.md",
        href: "/docs/queries/variant",
        slug: ["queries", "variant"],
        title: "Variants",
      }
      
    ],
  },
  {
    title: "GWAS Queries",
    items: [
      {
        filePath: "queries/gwasQueries/gwas.md",
        href: "/docs/queries/gwas",
        slug: ["queries", "gwas"],
        title: "GWAS",
      }
      
    ],
  },
];

export const docsPages = docsSections.flatMap((section) => section.items);

export function getDocBySlug(slug: string[] = []) {
  return docsPages.find((page) => page.slug.join("/") === slug.join("/")) ?? null;
}

function isExternalHref(href: string) {
  return /^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("//");
}

export function getDocHrefForMarkdownPath(href: string, currentFilePath: string) {
  if (href.startsWith("#") || isExternalHref(href)) {
    return href;
  }

  const [hrefWithoutHash, hash] = href.split("#", 2);

  if (!hrefWithoutHash.endsWith(".md")) {
    return href;
  }

  const currentDirectory = path.posix.dirname(currentFilePath);
  const normalizedHref = path.posix.normalize(
    path.posix.join(currentDirectory === "." ? "" : currentDirectory, hrefWithoutHash),
  );
  const page = docsPages.find((doc) => doc.filePath === normalizedHref);

  if (!page) {
    return href;
  }

  return hash ? `${page.href}#${hash}` : page.href;
}

export function getDocImageSrc(src: string, currentFilePath: string) {
  if (isExternalHref(src) || src.startsWith("/") || src.startsWith("#")) {
    return src;
  }

  const currentDirectory = path.posix.dirname(currentFilePath);
  const normalizedSrc = path.posix.normalize(
    path.posix.join(currentDirectory === "." ? "" : currentDirectory, src),
  );

  return normalizedSrc.startsWith("img/") ? `/docs/${normalizedSrc}` : src;
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
