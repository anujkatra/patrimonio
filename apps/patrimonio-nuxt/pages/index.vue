<script lang="ts" setup>
import {homepageQuery} from '~/sanity/queries'
import type {HomepageQueryResult} from '~/sanity/types'
import Arrow from '~/assets/svg/arrow.svg'

const {data: homepageData} = await useSanityQuery<HomepageQueryResult>(homepageQuery)

useSiteMetadata({
  title: homepageData?.value?.seo?.title ?? 'title',
  description: homepageData?.value?.seo?.description ?? 'description',
  ogImage: '',
})
</script>

<template>
  <div class="flex flex-col gap-8 justify-center">
    <p class="text-center">{{ homepageData?.title }}</p>
    <p class="text-center">{{ homepageData?.landingText }}</p>
    <NuxtImg
      provider="sanity"
      :src="`${homepageData?.landingImage.asset?._id}`"
      :alt="`${homepageData?.landingImage.alt}`"
      sizes="md:400px"
      class="mx-auto"
    />
    <div class="mx-auto flex gap-4">
      <BaseLink variant="primary" to="https://google.com" target="_blank" class="text-4xl" />
      <BaseLink variant="secondary" icon to="/about-us" class="text-4xl">
        <template #icon> <Arrow class="w-[50px]" :font-controlled="false" /></template>
        Test
      </BaseLink>
    </div>
  </div>
</template>
