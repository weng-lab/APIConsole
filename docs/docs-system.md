# Docs System

The `/docs` pages render Markdown files from `src/docs` for signed-in users.

## Page Registration

Docs pages are not auto-discovered. Adding a Markdown file is not enough.

Register every page in `docsSections` in `src/lib/docs.ts` with:

- `filePath`
- `href`
- `slug`
- `title`

The source path and public URL do not need to match exactly. For example, `getting_started/command_line.md` maps to `/docs/getting-started/command-line`.

## Links

Relative links ending in `.md` are rewritten only when the target file is registered in `docsSections`.

Unregistered Markdown links are left unchanged, which usually means they will not route correctly in the app.

## Images

Docs images are served through `/docs/img/[filename]` from the flat `src/docs/img` directory.

Nested image paths are rejected by the image route.

## Trust Boundary

Markdown rendering enables raw HTML through `rehypeRaw`.

Only trusted Markdown should be committed to `src/docs`.

Do not point this renderer at user-authored or remote Markdown unless sanitization is added, for example with `rehype-sanitize`.
