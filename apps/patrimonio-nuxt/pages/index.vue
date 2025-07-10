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
  <main class="px-5">
    <section class="py-[50px]">
      <div class="flex flex-col gap-5">
        <NuxtImg
          provider="sanity"
          :src="`${homepageData?.landingImage.asset?._id}`"
          :alt="`${homepageData?.landingImage.alt}`"
          sizes="100vw sm:400px"
          class="mx-auto"
        />
        <div class="flex flex-col gap-2.5">
          <p class="font-cabinet text-[35px] leading-none font-normal tracking-normal">
            {{ homepageData?.title }}
          </p>
          <div class="flex flex-col gap-5">
            <p class="font-satoshi text-lg leading-none font-light tracking-normal">
              {{ homepageData?.landingText }}
            </p>
            <BaseLink variant="secondary" icon to="/gallery">
              <template #icon> <Arrow class="w-[50px]" :font-controlled="false" /></template>
            </BaseLink>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
