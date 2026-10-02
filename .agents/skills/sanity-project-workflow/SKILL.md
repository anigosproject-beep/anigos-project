---
name: sanity-project-workflow
description: Project-specific workflow for Sanity changes in Petro Anigos, complementing Sanity's official sanity-best-practices skill with verified community lessons and local validation gates.
---

# Sanity Project Workflow — Petro Anigos

**References checked:** 2 October 2026.
**Installed tooling checked:** `@sanity/client` 8.6.x in the web app and
Studio; `sanity` / `@sanity/vision` 5.31.x in the Studio.

Use this skill together with the vendored Sanity-maintained
`.agents/skills/sanity-best-practices/SKILL.md` whenever changing or reviewing
Sanity Studio, schemas, GROQ, preview, content operations, or frontend
integration. The official skill and current Sanity documentation are the source
of truth for supported APIs. This file adds project workflow and carefully
qualified community evidence; it does not replace or fork official guidance.

## 1. Establish the project surface before editing

1. Read the relevant topic in the official skill first, then inspect the actual
   project files. For this repository:
   - Studio config and CLI: `studio-anigos-project/sanity.config.ts`,
     `studio-anigos-project/sanity.cli.ts`
   - Active schema and Studio navigation: `studio-anigos-project/sanity/`,
     `studio-anigos-project/structure.ts`
   - Frontend client, queries, adapters, routes: `lib/`, `app/api/`, and their
     consuming pages/components
   - Sanity implementation tracker: `docs/sanity-implementation/`
2. Check installed Sanity versions in the relevant `package.json`; do not
   transfer code from an issue, old Studio version, or another framework without
   checking current official API documentation.
3. Identify whether a change affects only Studio authoring, the stored dataset,
   frontend reads, or all three. Trace schema fields through queries, response
   types, consumers, and seed/migration paths.
4. Treat current code and live read-only observations as evidence; treat older
   Markdown as a plan until reconciled with the code.
5. Confirm project ID, dataset, and deployment target before any write, seed
   apply, migration, or deployment. If configured targets conflict, stop before
   mutation and report the conflict. Never expose token values.

## 2. Model data and editor workflows deliberately

- Model durable business concepts and relationships, not page layout details.
  Use references for independently managed/reused records and embedded objects
  for data owned by one parent document.
- Let Sanity generate IDs for ordinary documents. Use fixed IDs only for
  intentional singletons enforced by Studio Structure; keep references tied to
  actual returned/query results rather than guessed IDs.
- Keep schema, Structure lists/filters, previews, and editor labels aligned.
  Test what an operator can find and edit, not only whether the Studio builds.
- Use supported Form Components APIs. Extend a default input with
  `renderDefault()` when appropriate, and use documented form-state APIs for
  sibling-field values. Do not copy private/internal hooks from a community
  snippet.
- Keep custom inputs and document-list previews distinct: a form input is not a
  list-row preview. Follow the current official Studio API for each surface.
- For localized fields, define the read/write contract and fallback behavior
  explicitly in both schema and GROQ; do not assume an editor's missing locale
  value will be supplied by the query.

## 3. Validate authoring and data paths

- Put simple constraints on fields and cross-field/document constraints at the
  appropriate schema level. Make errors blocking only when publication would
  produce invalid or unusable content; use actionable warnings for recommendations.
- Sanity validation is an editor workflow, not a guarantee that API mutations,
  imports, or scripts obey schema rules. Add independent validation for those
  write paths and inspect existing documents before introducing stricter rules.
- Keep schema-derived and GROQ-derived TypeScript types aligned with the queries
  actually used. Use Sanity TypeGen where it fits the project's current toolchain,
  then run type checks; do not hand-assume that required validation makes every
  generated or historical dataset value non-null.
- GROQ: parameterize inputs, use explicit projections/aliases, dereference only
  fields required by the consumer, include stable array `_key` values when
  projecting arrays used by React, and test nontrivial queries with Vision or a
  targeted read-only query.
- Keep `published` production reads separate from authenticated `drafts` preview
   reads. Draft reads must stay server-side, use the project's authorized
   preview path, and bypass CDN caching as required by the selected integration.
   Verify both perspectives rather than inferring behavior from configuration.
- Follow official media guidance before adding or changing delivery. In
  particular, treat Sanity `file` assets for user-facing video as a design risk:
  current official guidance recommends a streaming/transcoding service for
  production playback. Do not migrate existing playback or storage as an
  incidental schema change; document the risk and scope a separate decision.

## 4. Operate seeds and migrations safely

Before writing:

1. Export/backup where appropriate and verify the explicit target project and
   dataset.
2. Run a read-only dry-run that reports create/update/skip/conflict counts and
   representative stable identifiers.
3. Review the report and test against a non-production dataset when available.
4. Apply only with explicit opt-in, least-privilege credentials, and safe
   idempotent behavior; do not overwrite conflicting content silently.
5. Verify the resulting documents and record what changed without recording
   secrets.

Remember that dry-run success does not prove a live mutation will succeed.
Sanity migrations can run while webhooks remain active; check current official
migration/import guidance for webhook behavior, transaction and rate limits,
and rollback options before a large batch. Never delete or rewrite production
content solely to make a report pass.

## 5. Validate the exact affected app

Run the smallest checks that cover the change:

- Studio schema, Structure, or input changes: `npm run build` from
  `studio-anigos-project`.
- Frontend client/query/route changes: `npm run typecheck` and the relevant
  app lint/tests.
- Contract, seed, or migration changes: run their checker and a dry-run; confirm
  the checker actually points at current source files.
- Preview changes: verify a draft is visible only through authorized preview
  while the production path remains published-only.
- Review the final diff and ensure no credentials, generated build output, or
  unrelated edits were added.

If a configured quality gate fails because its paths or assumptions are stale,
report that as a real blocker; do not describe an unrun or broken gate as passed.

### Tooling already available in this repository

| Need | Existing tool | How to use it / constraint |
|---|---|---|
| Test GROQ interactively | `@sanity/vision` is installed in the Studio | Use Vision for targeted, read-only query checks; confirm the selected project/dataset and perspective first. |
| Query Content Lake in application/scripts | `@sanity/client` is installed in both apps | Reuse the existing client/config helpers and keep credentials server-side. |
| Validate Studio schema and custom inputs | Sanity CLI `sanity build` in Studio | Run the Studio build after schema, Structure, or input changes. |
| Check frontend types | TypeScript `npm run typecheck` in the web app | Run after query, response type, or consumer changes. |
| Check content contracts / structure impact | Web-app scripts `check:content-contracts` and `check:structure-impact` | Inspect script paths and outputs before relying on them. The contract checker was previously observed trying to open a missing `studio-anigos-project/sanity/lib/page.ts`; treat that as a known stale gate until corrected and verified. |

Do not assume that a package listed by the official skill is installed here.
The checked manifests do not declare `next-sanity`, standalone `groq`, or a
Sanity TypeGen package/CLI workflow. The frontend currently uses
`@sanity/client` and its own query helper. Therefore:

- Do not rewrite the current client integration to `defineLive` / `sanityFetch`
  from `next-sanity` just because the broad official guide describes that
  option. First confirm the package/version, architecture fit, and a separately
  scoped migration plan.
- Do not claim generated query types or add TypeGen commands unless the exact
  installed Sanity CLI supports them and a configuration/build check proves the
  workflow. TypeGen is a promising candidate for a future evaluation, not an
  available repository tool today.
- Prefer the installed Vision, Sanity CLI, `@sanity/client`, and project checks
  before proposing new extensions or dependencies.

## 6. Community evidence: use as signals, not as API documentation

The following GitHub posts were checked for positive feedback or a confirmed
resolution. They inform workflow cautions, not supported API contracts:

The community evidence here is from GitHub issue/PR threads in `sanity-io/sanity`;
it is not a survey of independent forum posts or GitHub Discussions.

| Community post | Positive signal / outcome | Safe lesson |
|---|---|---|
| [Official support for schema typegen — #4159](https://github.com/sanity-io/sanity/issues/4159) | 4 👍; closed as completed. A Sanity maintainer later announced TypeGen and linked official documentation. | Query/schema typing addressed a real developer need. Use the current official TypeGen docs rather than older third-party generators. |
| [Required fields omitted by schema extraction — #6150](https://github.com/sanity-io/sanity/issues/6150) and [fix PR #6151](https://github.com/sanity-io/sanity/pull/6151) | 1 👍; the linked fix was merged and the issue closed as completed. | Check that required validation is reflected in generated schema/type artifacts for the installed version; do not infer runtime dataset validity from generated types alone. |
| [Migration delete failure — #6925](https://github.com/sanity-io/sanity/issues/6925) | The author confirmed rerunning on v3.47.1 worked; the confirmation comment received 🚀. | A successful dry-run is not proof of a successful write. Exercise mutations and inspect their actual result/error on a safe target. |
| [Reading another field from a custom input — #4338](https://github.com/sanity-io/sanity/issues/4338) | 4 👍; maintainer discussion points toward supported slug-source behavior. | Cross-field context is a common editor need. Use documented form APIs or field-specific callbacks; do not adopt private APIs from snippets. |

Feedback counts are snapshots, not quality scores. Closed or highly reacted
posts are not automatically proof that a requested feature shipped. For example,
the TypeGen reusable-partials request [#9222](https://github.com/sanity-io/sanity/issues/9222)
has 8 👍 but was closed `not_planned`; it is a pain-point signal only, not evidence
that TypeGen shares reusable fragment types. Likewise, the CSV GUI request
[#4660](https://github.com/sanity-io/sanity/issues/4660) has positive reactions
but remains open, so do not claim Studio includes that workflow.

## References

### Official Sanity documentation

- [Schema types](https://www.sanity.io/docs/studio/schema-types)
- [Validation](https://www.sanity.io/docs/studio/validation)
- [Structure tool](https://www.sanity.io/docs/studio/structure-introduction)
- [Form components](https://www.sanity.io/docs/studio/form-components)
- [Presenting and previewing content](https://www.sanity.io/docs/content-lake/presenting-and-previewing-content)
- [GROQ introduction](https://www.sanity.io/docs/content-lake/groq-introduction)
- [Schema and content migrations](https://www.sanity.io/docs/content-lake/schema-and-content-migrations)
- [Importing data](https://www.sanity.io/docs/content-lake/importing-data)
- [Sanity TypeGen](https://www.sanity.io/docs/sanity-typegen)

### Local project references

- Official skill: `.agents/skills/sanity-best-practices/SKILL.md`
- Project Sanity tracker: `docs/sanity-implementation/README.md`
- Project operating rules: `AGENTS.md`
