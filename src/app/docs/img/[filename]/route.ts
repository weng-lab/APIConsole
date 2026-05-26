import { readFile } from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";

const contentTypes: Record<string, string> = {
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

type ImageRouteProps = {
  params: Promise<{ filename: string }>;
};

export async function GET(_: Request, { params }: ImageRouteProps) {
  const { filename } = await params;
  const extension = path.extname(filename).toLowerCase();
  const contentType = contentTypes[extension];

  if (!contentType || filename.includes("/") || filename.includes("..")) {
    notFound();
  }

  try {
    const image = await readFile(
      path.join(process.cwd(), "src/docs/img", filename),
    );

    return new Response(image, {
      headers: {
        "Cache-Control": "private, max-age=3600",
        "Content-Type": contentType,
      },
    });
  } catch {
    notFound();
  }
}
