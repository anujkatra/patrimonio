<script lang="ts" setup>
import {eventQuery} from '~/sanity/queries'
import type {EventQueryResult} from '~/sanity/types'

const route = useRoute()
const {data: eventData} = await useSanityQuery<EventQueryResult>(eventQuery, {
  slug: route.params.slug,
})

if (eventData.value === null) {
  throw createError({
    statusCode: 404,
    message: 'not found',
    fatal: true,
  })
}

useSiteMetadata({
  title: eventData.value.title,
  description: eventData.value.excerpt ?? '',
  ogImage: '',
})
</script>

<template>
  <main>
    <p>{{ eventData?.title }}</p>
  </main>
</template>
