import { ObjectDefinition } from "sanity"

export const twitter: ObjectDefinition = {
  name: "twitter",
  title: "Twitter",
  type: "object",
  fields: [
    {
      type: "image",
      name: "image",
      title: "Image",
      description: "Override image for Twitter. Defaults to use SEO Image",
    },
    {
      type: "text",
      name: "description",
      title: "Description",
      description:
        "Override description for Twitter. Defaults to use SEO description. Twitter Descriptions should be between 70 and 160 characters.",
      validation: (Rule) =>
        Rule.min(70)
          .max(160)
          .warning(
            "Twitter Descriptions should be between 70 and 160 characters."
          ),
    },
    {
      type: "string",
      name: "title",
      title: "Title",
      description:
        "Override title for Twitter. Defaults to use SEO Title. Twitter title should be between 30 and 60 characters.",
      validation: (Rule) =>
        Rule.min(30)
          .max(60)
          .warning("Twitter title should be between 30 and 60 characters."),
    },
  ],
}
