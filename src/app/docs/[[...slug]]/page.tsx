import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsLayout } from "@/components/docs/DocsLayout";
import { MarkdownContent } from "@/components/docs/MarkdownContent";
import { docsPages, getDocBySlug, readDocMarkdown } from "@/lib/docs";

type DocsPageProps = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateMetadata({ params }: DocsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDocBySlug(slug);

  if (!doc) {
    return {
      title: "Docs | API Console",
    };
  }

  return {
    title: `${doc.title} | API Console Docs`,
    description: "Authenticated documentation for using the SCREEN GraphQL API.",
  };
}

export function generateStaticParams() {
  return docsPages.map((page) => ({ slug: page.slug }));
}

export default async function DocsPage({ params }: DocsPageProps) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  const markdown = await readDocMarkdown(doc);

  return (
    <DocsLayout activeHref={doc.href} title={doc.title}>
      <MarkdownContent markdown={markdown} />
    </DocsLayout>
  );
}
