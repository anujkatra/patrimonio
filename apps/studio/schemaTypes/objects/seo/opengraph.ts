import { ObjectDefinition } from "sanity"

export const opengraph: ObjectDefinition = {
  name: "opengraph",
  title: "OpenGraph",
  type: "object",
  fields: [
    {
      type: "image",
      name: "image",
      title: "Image",
      description:
        "Override image for sources that utilize opengraph tags. Defaults to use SEO Image",
    },
    {
      type: "text",
      name: "description",
      title: "Description",
      description:
        "Override description for sources that utilize opengraph tags. Defaults to use SEO description. OpenGraph Descriptions should be between 70 and 160 characters.",
      validation: (Rule) =>
        Rule.min(70)
          .max(160)
          .warning(
            "OpenGraph Descriptions should be between 70 and 160 characters."
          ),
    },
    {
      type: "string",
      name: "title",
      title: "Title",
      description:
        "Override title for sources that utilize opengraph tags. Defaults to use SEO Title. SEO Title should be between 30 and 60 characters",
      validation: (Rule) =>
        Rule.min(30)
          .max(60)
          .warning("SEO Title should be between 30 and 60 characters"),
    },
  ],
}
