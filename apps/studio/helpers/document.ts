import {
    ConditionalPropertyCallbackContext,
    DocumentDefinition,
    Reference,
  } from "sanity"
  
  /**
   * Adds a default data tab "Page Data" and an SEO tab, includes SEO object.
   */
  export const withSeo = (
    doc: Omit<DocumentDefinition, "groups" | "fields"> &
      Partial<Pick<DocumentDefinition, "groups" | "fields">>
  ) => {
    return {
      ...doc,
      groups: [
        {
          name: "pageData",
          title: "Page Data",
          default: true,
        },
        ...(doc.groups ?? []),
        {
          name: "seo",
          title: "SEO",
        },
      ],
      fields: [
        ...(doc.fields?.map((field) => ({
          ...field,
          group: field.group ?? "pageData",
        })) ?? []),
        { type: "seo", group: "seo", name: "seo" },
      ],
    }
  }