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
  <main>
    <section class="flex justify-center px-5 py-[50px] md:px-10">
      <div class="flex max-w-6xl flex-col gap-5 lg:flex-row">
        <NuxtImg
          provider="sanity"
          :src="`${homepageData?.landingImage.asset?._id}`"
          :alt="`${homepageData?.landingImage.alt}`"
          sizes="100vw sm:400px"
          class="mx-auto lg:order-2 lg:w-full lg:flex-1"
        />
        <div
          class="flex flex-col gap-2.5 self-center md:flex-row md:items-center md:gap-0 lg:order-1 lg:w-full lg:max-w-[542px] lg:flex-1 lg:flex-col lg:items-start lg:gap-5"
        >
          <p
            class="font-cabinet text-[35px] leading-none font-normal tracking-normal md:flex-1 lg:text-[50px]"
          >
            Curating <br class="hidden md:block" />
            Masterpieces,<br class="hidden md:block" />Celebrating Artists
          </p>
          <div class="flex flex-col gap-5 md:flex-1">
            <p class="font-satoshi text-lg leading-none font-light tracking-normal">
              {{ homepageData?.landingText }}
            </p>
            <BaseLink variant="secondary" class="w-full" icon to="/gallery">
              <template #icon> <Arrow class="w-[50px]" :font-controlled="false" /></template>
            </BaseLink>
          </div>
        </div>
      </div>
    </section>
    <section class="flex justify-center border-t-[0.5px] border-[#202020] px-5 py-[50px] md:px-10">
      <div class="flex max-w-6xl flex-col gap-5">
        <div class="flex flex-col gap-2.5">
          <h2
            class="font-cabinet text-[32px] leading-none font-normal tracking-normal lg:flex-1 lg:text-[50px]"
          >
            Collections
          </h2>
          <p class="font-satoshi text-lg leading-none font-light tracking-normal">
            Discover an exquisite global collection, thoughtfully presented through curated events,
            exhibitions, and exclusive showcases.
          </p>
        </div>
        <div class="grid grid-cols-2 gap-2.5">
          <div
            v-for="(collection, index) in homepageData?.featuredCollections"
            :key="index"
            class="col-span-1"
          >
            <NuxtImg
              provider="sanity"
              :src="`${collection?.paintings?.picture?.asset?._id}`"
              :alt="`${collection?.paintings?.picture?.alt}`"
              class="w-full"
            />
          </div>
          <BaseLink variant="secondary" class="col-span-2 w-full" icon to="/gallery">
            View All
            <template #icon> <Arrow class="w-[50px]" :font-controlled="false" /></template>
          </BaseLink>
        </div>
      </div>
    </section>
  </main>
</template>
