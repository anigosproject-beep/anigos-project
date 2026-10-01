import type { ReactNode } from "react"

import type { SanityRichTextBlock } from "@/lib/sanity-content-types"

type TextSpan = {
  _key?: string
  text?: string
  marks?: string[]
}

function safeHref(href: string | undefined) {
  if (!href) return undefined
  return /^(https?:|mailto:|tel:)/i.test(href) ? href : undefined
}

function renderBlockText(block: SanityRichTextBlock): ReactNode[] {
  return (block.children ?? []).map((span, index) => {
    const textSpan = span as TextSpan
    let content: ReactNode = textSpan.text ?? ""

    for (const mark of textSpan.marks ?? []) {
      const annotation = block.markDefs?.find((definition) => definition._key === mark)
      const href = annotation?._type === "link" ? safeHref(annotation.href) : undefined

      if (href) {
        content = (
          <a
            key={`${textSpan._key ?? index}-${mark}`}
            href={href}
            className="text-primary underline underline-offset-4"
            rel={/^https?:/i.test(href) ? "noreferrer" : undefined}
            target={/^https?:/i.test(href) ? "_blank" : undefined}
          >
            {content}
          </a>
        )
      } else if (mark === "strong") {
        content = <strong key={`${textSpan._key ?? index}-${mark}`}>{content}</strong>
      } else if (mark === "em") {
        content = <em key={`${textSpan._key ?? index}-${mark}`}>{content}</em>
      } else if (mark === "underline") {
        content = <u key={`${textSpan._key ?? index}-${mark}`}>{content}</u>
      } else if (mark === "strike-through") {
        content = <s key={`${textSpan._key ?? index}-${mark}`}>{content}</s>
      }
    }

    return <span key={textSpan._key ?? index}>{content}</span>
  })
}

export function TeamBiography({
  blocks,
}: {
  blocks?: SanityRichTextBlock[]
}) {
  if (!blocks?.length) return null

  const content: ReactNode[] = []

  for (let index = 0; index < blocks.length; ) {
    const block = blocks[index]
    if (block._type !== "block") {
      index += 1
      continue
    }

    if (block.listItem === "bullet" || block.listItem === "number") {
      const listType = block.listItem
      const listItems: ReactNode[] = []

      while (
        index < blocks.length &&
        blocks[index]._type === "block" &&
        blocks[index].listItem === listType
      ) {
        const item = blocks[index]
        listItems.push(
          <li key={item._key ?? index}>{renderBlockText(item)}</li>
        )
        index += 1
      }

      const List = listType === "number" ? "ol" : "ul"
      content.push(
        <List
          key={block._key ?? `list-${index}`}
          className={`pl-6 ${listType === "number" ? "list-decimal" : "list-disc"}`}
        >
          {listItems}
        </List>
      )
      continue
    }

    const text = renderBlockText(block)
    if (block.style === "h2" || block.style === "h3") {
      const HeadingTag = block.style
      content.push(
        <HeadingTag
          key={block._key ?? index}
          className="font-semibold text-foreground"
        >
          {text}
        </HeadingTag>
      )
    } else if (block.style === "blockquote") {
      content.push(
        <blockquote
          key={block._key ?? index}
          className="border-l-2 border-primary/40 pl-4 italic"
        >
          {text}
        </blockquote>
      )
    } else {
      content.push(<p key={block._key ?? index}>{text}</p>)
    }
    index += 1
  }

  return (
    <div className="space-y-5 [text-align:justify] text-base leading-8 text-muted-foreground">
      {content}
    </div>
  )
}
