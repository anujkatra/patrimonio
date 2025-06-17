<script lang="ts" setup>
import {aboutUsPageQuery} from '~/sanity/queries'
import type {AboutUsPageQueryResult} from '~/sanity/types'

const {data: pageData} = await useSanityQuery<AboutUsPageQueryResult>(aboutUsPageQuery)

useSiteMetadata({
  title: pageData?.value?.seo?.title ?? 'title',
  description: pageData?.value?.seo?.description ?? 'description',
  ogImage: '',
})
</script>

<template>
  <div class="flex flex-col gap-2 items-start px-6">
    <p class="text-center">{{ pageData?.title }}</p>
    <div v-if="pageData?.pictures" class="flex flex-col md:flex-row gap-2">
      <NuxtImg
        v-for="(item, index) in pageData?.pictures"
        :key="index"
        provider="sanity"
        :src="`${item?.asset?._ref}`"
        :alt="`${item?.alt}`"
        sizes="md:400px"
        class="mx-auto aspect-square"
      />
    </div>
  </div>
</template>
