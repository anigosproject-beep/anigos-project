import type { StructureResolver } from "sanity/structure"

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Petro Anigos")
    .items([
      S.listItem()
        .title("Hero")
        .id("hero")
        .child(
          S.list()
            .title("Hero")
            .items([
              S.listItem()
                .title("Home Hero")
                .id("home-hero-editor")
                .child(
                  S.document()
                    .schemaType("homePage")
                    .documentId("homePage")
                    .title("Home Hero")
                    .views([S.view.form()])
                ),
              S.listItem()
                .title("Page Hero")
                .id("page-hero-editor")
                .child(
                  S.document()
                    .schemaType("pageHeroEditor")
                    .documentId("pageHeroEditor")
                    .title("Page Hero")
                    .views([S.view.form()])
                ),
            ])
        ),
      S.listItem()
        .title("Gambar Statis Pendukung")
        .id("supporting-static-images")
        .child(
          S.document()
            .schemaType("pageMediaEditor")
            .documentId("pageMediaEditor")
            .title("Gambar Statis Pendukung")
            .views([S.view.form()])
        ),
      S.listItem()
        .title("Mitra")
        .id("partners")
        .child(
          S.list()
            .title("Mitra")
            .items([
              S.listItem()
                .title("Daftar Item Mitra Aktif")
                .id("active-partners")
                .child(
                  S.documentTypeList("partner")
                    .title("Daftar Item Mitra Aktif")
                    .filter('_type == "partner" && isActive == true')
                    .defaultOrdering([
                      { field: "companyName", direction: "asc" },
                    ])
                ),
              S.listItem()
                .title("Arsip Mitra")
                .id("archived-partners")
                .child(
                  S.documentTypeList("partner")
                    .title("Arsip Mitra")
                    .filter('_type == "partner" && isActive == false')
                    .defaultOrdering([
                      { field: "companyName", direction: "asc" },
                    ])
                ),
            ])
        ),
      S.listItem()
        .title("Artikel")
        .id("newsroom")
        .child(
          S.list()
            .title("Artikel")
            .items([
              S.documentTypeListItem("newsroomArticle")
                .title("Daftar Artikel")
                .child(
                  S.documentTypeList("newsroomArticle")
                    .title("Daftar Artikel")
                    .defaultOrdering([{ field: "date", direction: "desc" }])
                ),
              S.documentTypeListItem("newsroomCategory")
                .title("Kategori dan Subkategori")
                .child(
                  S.documentTypeList("newsroomCategory")
                    .title("Kategori dan Subkategori")
                    .defaultOrdering([{ field: "name", direction: "asc" }])
                ),
            ])
        ),
      S.listItem()
        .title("Karir")
        .id("career-openings")
        .child(
          S.list()
            .title("Karir")
            .items([
              S.listItem()
                .title("Lowongan Aktif")
                .id("active-career-openings")
                .child(
                  S.documentTypeList("careerOpening")
                    .title("Lowongan Aktif")
                    .filter('_type == "careerOpening" && isActive == true')
                    .defaultOrdering([
                      { field: "order", direction: "asc" },
                      { field: "title.id", direction: "asc" },
                    ])
                ),
              S.listItem()
                .title("Arsip Lowongan")
                .id("archived-career-openings")
                .child(
                  S.documentTypeList("careerOpening")
                    .title("Arsip Lowongan")
                    .filter('_type == "careerOpening" && isActive == false')
                    .defaultOrdering([
                      { field: "order", direction: "asc" },
                      { field: "title.id", direction: "asc" },
                    ])
                ),
            ])
        ),
      S.listItem()
        .title("Dukungan")
        .id("site-support")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Dukungan")
            .views([S.view.form()])
        ),
    ])
