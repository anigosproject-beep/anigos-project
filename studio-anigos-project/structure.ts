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
        .title("Media Pendukung")
        .id("supporting-static-images")
        .child(
          S.document()
            .schemaType("pageMediaEditor")
            .documentId("pageMediaEditor")
            .title("Media Pendukung")
            .views([S.view.form()])
        ),
      S.listItem()
        .title("Struktur Perusahaan")
        .id("company-structure")
        .child(
          S.list()
            .title("Struktur Perusahaan")
            .items([
              S.listItem()
                .title("Komisaris")
                .id("commissioners")
                .child(
                  S.documentTypeList("teamMember")
                    .title("Komisaris")
                    .filter(
                      '_type == "teamMember" && structuralClass == "komisaris"'
                    )
                    .defaultOrdering([
                      { field: "order", direction: "asc" },
                      { field: "name", direction: "asc" },
                    ])
                ),
              S.listItem()
                .title("Direksi")
                .id("directors")
                .child(
                  S.documentTypeList("teamMember")
                    .title("Direksi")
                    .filter(
                      '_type == "teamMember" && structuralClass == "direksi"'
                    )
                    .defaultOrdering([
                      { field: "order", direction: "asc" },
                      { field: "name", direction: "asc" },
                    ])
                ),
              S.listItem()
                .title("Tim dan Divisi")
                .id("team-and-divisions")
                .child(
                  S.list()
                    .title("Tim dan Divisi")
                    .items([
                      S.documentTypeListItem("teamDivision")
                        .title("Daftar Divisi")
                        .child(
                          S.documentTypeList("teamDivision")
                            .title("Daftar Divisi")
                            .defaultOrdering([
                              { field: "order", direction: "asc" },
                              { field: "name", direction: "asc" },
                            ])
                        ),
                      S.listItem()
                        .title("Anggota Tim")
                        .id("division-members")
                        .child(
                          S.documentTypeList("teamMember")
                            .title("Anggota Tim")
                            .filter(
                              '_type == "teamMember" && structuralClass == "tim-divisi"'
                            )
                            .defaultOrdering([
                              { field: "order", direction: "asc" },
                              { field: "name", direction: "asc" },
                            ])
                        ),
                    ])
                ),
            ])
        ),
      S.listItem()
        .title("Client")
        .id("clients")
        .child(
          S.list()
            .title("Client")
            .items([
              S.listItem()
                .title("Daftar Client Aktif")
                .id("active-clients")
                .child(
                  S.documentTypeList("client")
                    .title("Daftar Client Aktif")
                    .filter('_type == "client" && isActive == true')
                    .defaultOrdering([
                      { field: "companyName", direction: "asc" },
                    ])
                    .initialValueTemplates([
                      S.initialValueTemplateItem("client", {
                        isActive: true,
                      }),
                    ])
                ),
              S.listItem()
                .title("Arsip Client")
                .id("archived-clients")
                .child(
                  S.documentTypeList("client")
                    .title("Arsip Client")
                    .filter('_type == "client" && isActive == false')
                    .defaultOrdering([
                      { field: "companyName", direction: "asc" },
                    ])
                    .initialValueTemplates([
                      S.initialValueTemplateItem("client", {
                        isActive: false,
                      }),
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
