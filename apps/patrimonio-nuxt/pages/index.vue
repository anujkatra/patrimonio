<script lang="ts" setup>
import {homepageQuery} from '~/sanity/queries'
import type {HomepageQueryResult} from '~/sanity/types'
import Arrow from '~/assets/svg/arrow.svg'
import {cn} from '@/utils/cn'

const {data: homepageData} = await useSanityQuery<HomepageQueryResult>(homepageQuery)
const isActive = true

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
    <Arrow
      :class="cn('size-10 text-amber-300', isActive && 'bg-blue-600 mx-auto')"
      :font-controlled="false"
    />
    <NuxtImg
      provider="sanity"
      :src="`${homepageData?.landingImage.asset?._id}`"
      :alt="`${homepageData?.landingImage.alt}`"
      sizes="md:400px"
      class="mx-auto"
    />
  </div>
</template>
