import type { SchemaTypeDefinition } from "sanity"

import { pageMediaEditor } from "./pageMediaEditor"
import { localizedHeroText } from "./localizedHeroText"
import { homeHeroEditor } from "./homeHeroEditor"
import { pageHeroEditor } from "./pageHeroEditor"
import { partner } from "./partner"
import { newsroomArticle } from "./newsroomArticle"
import { newsroomCategory } from "./newsroomCategory"
import { careerOpening } from "./careerOpening"
import { siteSettings } from "./siteSettings"
import { mediaAsset } from "./mediaAsset"

export const schemaTypes: SchemaTypeDefinition[] = [
  mediaAsset,
  pageMediaEditor,
  localizedHeroText,
  homeHeroEditor,
  pageHeroEditor,
  partner,
  newsroomCategory,
  newsroomArticle,
  careerOpening,
  siteSettings,
]
