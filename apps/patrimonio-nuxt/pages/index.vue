<script lang="ts" setup>
import {homepageQuery} from '~/sanity/queries'
import type {HomepageQueryResult} from '~/sanity/types'

const {data: homepageData} = await useSanityQuery<HomepageQueryResult>(homepageQuery)
const {_type, ...seoRobots} = homepageData.value?.seo?.robots
  ? homepageData.value.seo.robots
  : {noindex: false, nofollow: false, _type: 'robots'}
const {$urlFor} = useNuxtApp()
useSiteMetadata({
  title: homepageData?.value?.seo?.title ?? 'title',
  description: homepageData?.value?.seo?.description ?? 'description',
  ogImage: $urlFor(`${homepageData?.value?.seo?.image?.asset?._ref}`).url(),
  robots: seoRobots ?? {noindex: false, nofollow: false},
})
</script>

<template>
  <div>
    <p class="text-center">{{ homepageData?.title }}</p>
    <p class="text-center">{{ homepageData?.landingText }}</p>
    <NuxtImg
      provider="sanity"
      :src="`${homepageData?.landingImage.asset?._id}`"
      :alt="`${homepageData?.landingImage.alt}`"
      sizes="md:400px"
      class="mx-auto"
    />
  </div>
</template>
