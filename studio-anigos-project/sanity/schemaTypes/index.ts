import type { SchemaTypeDefinition } from "sanity"

import { pageMediaEditor } from "./pageMediaEditor"
import { localizedHeroText } from "./localizedHeroText"
import { homeHeroEditor } from "./homeHeroEditor"
import { pageHeroEditor } from "./pageHeroEditor"
import { partner } from "./partner"
import { client } from "./client"
import { partnership } from "./partnership"
import { partnershipPage } from "./partnershipPage"
import { newsroomArticle } from "./newsroomArticle"
import { newsroomCategory } from "./newsroomCategory"
import { careerOpening } from "./careerOpening"
import { siteSettings } from "./siteSettings"
import { mediaAsset } from "./mediaAsset"
import { teamDivision } from "./teamDivision"
import { teamMember } from "./teamMember"
import { pageVisibilitySettings } from "./pageVisibilitySettings"

export const schemaTypes: SchemaTypeDefinition[] = [
  mediaAsset,
  pageMediaEditor,
  localizedHeroText,
  homeHeroEditor,
  pageHeroEditor,
  partner,
  client,
  partnership,
  partnershipPage,
  newsroomCategory,
  newsroomArticle,
  careerOpening,
  siteSettings,
  teamDivision,
  teamMember,
  pageVisibilitySettings,
]
