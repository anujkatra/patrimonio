<script lang="ts" setup>
import {homepageQuery} from '~/sanity/queries'
import type {HomepageQueryResult} from '~/sanity/types'

const {data: homepageData} = await useSanityQuery<HomepageQueryResult>(homepageQuery)

useSiteMetadata({
  title: homepageData?.value?.seo?.title ?? 'title',
  description: homepageData?.value?.seo?.description ?? 'description',
  ogImage: '',
})
</script>

<template>
  <main class="px-5 py-10">
    <section>
      <div class="flex flex-col justify-center gap-8">
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
    </section>
  </main>
</template>
