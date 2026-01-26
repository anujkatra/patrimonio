import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './plugins/structure'
import {singletonPlugin} from './plugins/singleton'
import {defineDocuments, defineLocations, presentationTool} from 'sanity/presentation'
import {singletons} from './schemaTypes/singletons'
import {resolveHref} from './lib/utils'

// Environment variables for project configuration
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-projectID'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

// Get the singleton document types
const singletonTypes = singletons.map((data) => data['name'])

export default defineConfig({
  name: 'default',
  title: 'Patrimonio',
  projectId,
  dataset,
  plugins: [
    structureTool({structure}),
    singletonPlugin(singletonTypes),
    presentationTool({
      resolve: {
        mainDocuments: defineDocuments([
          {
            route: '/gallery/:slug',
            filter: `_type == "painting" && slug.current == $slug`,
          },
        ]),
        locations: {
          painting: defineLocations({
            select: {
              name: 'name',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.name || 'Untitled',
                  href: resolveHref('painting', doc?.slug)!,
                },
              ],
            }),
          }),
        },
      },
      previewUrl: {
        origin: process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000',
        previewMode: {
          enable: '/preview/enable',
          disable: '/preview/disable',
        },
      },
    }),
    visionTool(),
    // customActions(),
  ],
  schema: {
    types: schemaTypes,
  },
})
