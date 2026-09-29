<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Sanity development

For any change or review involving Sanity, use the project copy of Sanity's official `sanity-best-practices` skill at `.agents/skills/sanity-best-practices/SKILL.md` and read the relevant reference guide(s) before editing. The skill is maintained by Sanity in [sanity-io/agent-toolkit](https://github.com/sanity-io/agent-toolkit); do not replace it with generic Sanity advice.

Project-specific guidance:
- The standalone Studio and its active schema registry are under `studio-anigos-project/`; the Next.js app's Sanity clients, GROQ queries, and API routes are under `lib/` and `app/api/`.
- When changing a schema, trace its reads and writes through the app and keep schema, queries, response types, and editor behavior aligned. Check whether queried document types and fields are actually declared by the active Studio schema; flag mismatches rather than assuming existing dataset documents are editable through Studio.
- Preserve the fixed IDs used for singleton documents in `studio-anigos-project/structure.ts`. Use Sanity-generated IDs for ordinary documents.
- Review image and video asset guidance before changing media fields or delivery. Do not migrate existing video storage or playback without an explicitly scoped change.
- Run the relevant checks for the affected app(s): `npm run typecheck` and `npm run check:content-contracts` from the web app, and `npm run build` from `studio-anigos-project` for Studio schema changes, where applicable.
