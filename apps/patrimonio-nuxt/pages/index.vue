<script lang="ts" setup>
import {homepageQuery} from '~/sanity/queries'
import type {HomepageQueryResult} from '~/sanity/types'

const {data: homepageData} = await useSanityQuery<HomepageQueryResult>(homepageQuery)
console.log(homepageData.value, 'test')

useSiteMetadata({
  title: homepageData?.value?.seo?.title ?? 'title',
  description: homepageData?.value?.seo?.description ?? 'description',
  ogImage: '',
})
</script>

<template>
  <div>
    <p class="text-center">{{ homepageData?.title }}</p>
    <p class="text-center">{{ homepageData?.landingText }}</p>
    <NuxtImg
      provider="sanity"
      :src="`${homepageData?.landingImage.asset?._ref}`"
      :alt="`${homepageData?.landingImage.alt}`"
      sizes="md:400px"
      class="mx-auto"
    />
  </div>
</template>
