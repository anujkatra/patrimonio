<script lang="ts" setup>
import {ourStoryPageQuery} from '~/sanity/queries'
import type {OurStoryPageQueryResult} from '~/sanity/types'

const {data: ourStoryPageData} = await useSanityQuery<OurStoryPageQueryResult>(ourStoryPageQuery)

useSiteMetadata({
  title: ourStoryPageData?.value?.seo?.title ?? 'title',
  description: ourStoryPageData?.value?.seo?.description ?? 'description',
  ogImage: '',
})
console.log('test', ourStoryPageData.value)
</script>

<template>
  <main>
    <p>test</p>
  </main>
</template>
