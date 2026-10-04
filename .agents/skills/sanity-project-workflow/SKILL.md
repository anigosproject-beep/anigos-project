---
name: sanity-project-workflow
description: Project-specific workflow for Sanity changes in Petro Anigos, complementing Sanity's official sanity-best-practices skill with verified community lessons and local validation gates.
---

# Sanity Project Workflow — Petro Anigos

**References checked:** 4 October 2026.
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

## 1.1 Verified current repository map

The application repository is nested under the workspace's `petro-anigos/`
directory. Treat this as the application root. The active standalone Studio is
`studio-anigos-project/`; do not treat the older `studio-clean/` or Studio
copies under `docs/` as active unless the task explicitly says otherwise.

- Active standalone Studio:
  `studio-anigos-project/sanity.config.ts`,
  `studio-anigos-project/sanity.cli.ts`, and
  `studio-anigos-project/structure.ts`.
- The schema registry is
  `studio-anigos-project/sanity/schemaTypes/index.ts`. It currently registers
  17 types: `mediaAsset`, `pageMediaEditor`, `localizedHeroText`,
  `localizedArticleText`, `homePage`, `pageHeroEditor`, `partner`, `client`,
  `partnership`, `partnershipPage`, `newsroomCategory`, `newsroomArticle`,
  `careerOpening`, `siteSettings`, `teamDivision`, `teamMember`, and
  `pageVisibilitySettings`.
- Page Hero and Page Media slot definitions are shared from
  `studio-anigos-project/sanity/page-hero-registry.ts` and
  `studio-anigos-project/sanity/page-media-registry.ts`; page visibility and
  content constraints live under `shared/`. Update the registry, Studio schema,
  query, and frontend consumer together when changing a slot contract.
- Studio and web clients share the target lock in `shared/sanity-target.ts`.
  The web integration currently uses `@sanity/client` with custom published /
  draft clients and cache wrappers; it does not declare `next-sanity`. Keep
  changes compatible with this integration unless a separately scoped migration
  is requested.
- The custom Structure exposes singleton editors and filtered content lists.
  `homePage`, `pageHeroEditor`, `pageMediaEditor`, `pageVisibilitySettings`,
  and `siteSettings` are opened at fixed document IDs. The config currently
  removes delete/unpublish actions for three protected editor singletons and
  all `mediaAsset` documents; check whether action protection needs updating
  whenever singleton IDs or protected document types change.
- The GROQ in `lib/sanity-queries.ts` also reads types including `product`,
  `fleetOption`, and `jangkauanPage` that are not in the active Studio registry.
  Treat this as a schema/content ownership question to investigate, not proof
  that the query or data is unused or broken: inspect the current dataset
  read-only (for example with Vision) and trace consumers before removing a
  query or restoring a Studio type. Preserve production content during that
  investigation.
- Localized fields generally use `{id, en}` and GROQ fallbacks such as
  `coalesce(field[$lang], field.id, ...)`; keep the language contract consistent
  through schema validation, projections, response types, and UI.
- The home client-logo marquee and `/tentang-kami/client` directory must both
  consume `/api/kemitraan/clients`; that query combines active `client`
  documents with active legacy `partner` documents explicitly marked
  `isClient`. `/api/kemitraan` is the separate partner showcase source, not a
  substitute for the client directory.
- There are separate localization paths: hardcoded interface copy is maintained
  in `lib/i18n.ts` as static `id` and `en` dictionaries, while editorial Sanity
  copy uses localized `{id, en}` fields and the
  `app/api/sanity/translation-webhook/route.ts` workflow. The webhook does not
  observe or translate edits to `lib/i18n.ts`. `app/api/translate/route.ts` is
  a manual one-text translation endpoint; it does not persist output and the
  main UI does not call it. Do not translate on every render. For static UI
  localization, translate/review and commit the English dictionary; for Sanity,
  verify the external webhook configuration and required deployment secrets
  before assuming automatic translation is active.
- `lib/translation-handler.ts` keeps only a bounded, process-local cache for
  duplicate requests and in-flight deduplication; it is not durable across
  serverless instances or restarts. Durable translation memory for Sanity is
  the English value plus source/target hashes written to the Sanity document.
  Avoid describing the in-memory map as a persistent translation library.
- Media localization uses the registered `localizedMediaText` object for
  public-facing image alt text, gallery captions, and `pageMediaEditor.flipTitle`.
  Home Product slot `name` / `description` and partnership copy already use
  localized objects. Logo alt values remain strings so legal/proper names are
  not sent to DeepL; internal `mediaAsset.notes`, filenames, and slot IDs are
  also excluded. `flipDescription` currently has no frontend consumer.
- Keep the translation webhook allowlist and Sanity webhook filter aligned for
  media-bearing types. The recursive translator must recognize `{id}` values
  created by legacy migration as well as fully populated `{id, en}` objects;
  only Indonesian text is sent to English, with generated output/hash persisted
  to avoid repeat DeepL calls. The `migrate:media-locales` Studio script defaults
  to dry-run and wraps legacy strings without calling DeepL.
- GROQ projections for localized media fields should select the current locale
  with Indonesian fallback and retain support for legacy plain strings until
  migration completes. Team gallery reads pass locale into the query and map
  nested `image.alt` correctly; do not select the gallery item's nonexistent
  top-level `alt`.
- Home Hero and Page Media author video in Sanity `file` fields with explicit
  size guidance. This is existing behavior, not an endorsement for new
  production video delivery: follow the official streaming guidance above and
  scope any delivery migration separately.

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
| [Reading another field from a custom input — #4338](https://github.com/sanity-io/sanity/issues/4338) | 4 👍; in an April 2026 maintainer comment, the thread points to the documented slug `source` callback receiving the current document. | Cross-field context is a common editor need. Use documented form APIs or field-specific callbacks; do not adopt private APIs from a community snippet. Recheck current Form Components and slug docs before implementation. |

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
