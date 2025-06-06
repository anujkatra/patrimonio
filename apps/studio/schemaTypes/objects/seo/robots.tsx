import React from "react"
import { ObjectDefinition } from "sanity"

export const robots: ObjectDefinition = {
  name: "robots",
  title: "Robots",
  type: "object",
  description: (
    <>
      Web crawler settings. See{" "}
      <a
        target="_blank"
        rel="noreferrer"
        href="https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag#directives"
      >
        https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag#directives
      </a>
    </>
  ),
  fields: [
    {
      type: "boolean",
      name: "noindex",
      title: "noindex",
      initialValue: false,
    },
    {
      type: "boolean",
      name: "nofollow",
      title: "nofollow",
      initialValue: false,
    },
    {
      type: "boolean",
      name: "noarchive",
      title: "noarchive",
      initialValue: false,
    },
    {
      type: "boolean",
      name: "nositelinkssearchbox",
      title: "nositelinkssearchbox",
      initialValue: false,
    },
    {
      type: "boolean",
      name: "nosnippet",
      title: "nosnippet",
      initialValue: false,
    },
    {
      type: "boolean",
      name: "indexifembedded",
      title: "indexifembedded",
      description:
        "Overrides a `noindex` if this page is embedded in another page, such as an iframe.",
      initialValue: false,
    },
    {
      type: "number",
      name: "maxSnippet",
      title: "max-snippet",
      description: "-1 implies no length limit, 0 implies no snippet",
      initialValue: -1,
      validation: (Rule) => Rule.min(-1),
    },
    {
      type: "string",
      name: "maxImagePreview",
      title: "max-image-preview",
      options: {
        list: [
          {
            title: "none",
            value: "none",
          },
          {
            title: "standard",
            value: "standard",
          },
          {
            title: "large",
            value: "large",
          },
        ],
      },
      initialValue: "large",
    },
    {
      type: "number",
      name: "maxVideoPreview",
      title: "max-video-preview",
      description: "-1 implies no length limit, 0 implies no video preview",
      initialValue: -1,
      validation: (Rule) => Rule.min(-1),
    },
    {
      type: "boolean",
      name: "notranslate",
      title: "notranslate",
      initialValue: false,
    },
    {
      type: "boolean",
      name: "noimageindex",
      title: "noimageindex",
      initialValue: false,
    },
    {
      type: "date",
      name: "unavailable_after",
      title: "unavailable_after",
    },
  ],
}
