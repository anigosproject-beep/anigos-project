import type { SchemaTypeDefinition } from "sanity"

import { pageMediaEditor } from "./pageMediaEditor"
import { localizedHeroText } from "./localizedHeroText"
import { localizedMediaText } from "./localizedMediaText"
import { localizedArticleText } from "./localizedArticleText"
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
import { serviceGalleryEditor } from "./serviceGalleryEditor"
import { galleryCategory } from "./galleryCategory"
import { galleryPhoto } from "./galleryPhoto"

export const schemaTypes: SchemaTypeDefinition[] = [
  mediaAsset,
  pageMediaEditor,
  localizedHeroText,
  localizedMediaText,
  localizedArticleText,
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
  serviceGalleryEditor,
  galleryCategory,
  galleryPhoto,
]
