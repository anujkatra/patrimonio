<script lang="ts" setup>
import {artistsPageQuery} from '~/sanity/queries'
import type {ArtistsPageQueryResult} from '~/sanity/types'
import Arrow from '~/assets/svg/arrow.svg'

const {data: artistsPageData} = await useSanityQuery<ArtistsPageQueryResult>(artistsPageQuery)

useSiteMetadata({
  title: artistsPageData?.value?.seo?.title ?? 'title',
  description: artistsPageData?.value?.seo?.description ?? 'description',
  ogImage: '',
})
</script>

<template>
  <main>
    <section class="flex justify-center px-5 py-[50px] md:px-10 md:py-[70px] xl:px-[70px]">
      <div class="flex w-full max-w-[1300px] flex-col items-center gap-5">
        <div class="flex w-full flex-col gap-2.5">
          <h1
            class="font-cabinet text-[35px] leading-none font-normal tracking-normal md:flex-1 lg:text-[50px]"
          >
            {{ artistsPageData?.title }}
          </h1>
          <p class="font-satoshi text-lg leading-none font-light tracking-normal">
            {{ artistsPageData?.subtitle ?? '' }}
          </p>
        </div>
        <div
          v-if="artistsPageData?.featuredArtists"
          class="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-x-[100px] lg:gap-y-10"
        >
          <div
            v-for="item in artistsPageData?.featuredArtists"
            :key="item.slug.current"
            class="group flex w-full max-w-[350px] flex-col gap-4 md:max-w-[462px] lg:max-w-[600px]"
          >
            <div
              class="w-full max-w-[350px] gap-4 overflow-hidden md:max-w-[462px] lg:max-w-[600px]"
            >
              <NuxtImg
                provider="sanity"
                :src="`${item?.picture.asset?._ref}`"
                :alt="`${item?.picture.alt}`"
                class="aspect-[12/9] w-full object-cover object-center transition duration-300 ease-out lg:scale-[1.2] lg:group-hover:scale-100"
              />
            </div>
            <div class="flex justify-between">
              <div class="flex flex-col gap-[5px]">
                <p class="font-satoshi text-lg/none font-medium tracking-normal">
                  {{ item.name }}
                </p>
                <p class="font-satoshi text-base/none font-light tracking-normal">
                  {{ item.location }}
                </p>
              </div>
              <Arrow
                class="w-[70px] px-2.5 transition-all duration-300 ease-out lg:pr-[30px] lg:opacity-0 lg:group-hover:pr-2.5 lg:group-hover:opacity-100"
                :font-controlled="false"
              />
            </div>
          </div>
        </div>
        <!-- <NuxtImg
          v-for="(item, index) in artistsPageData?.featuredArtists"
          :key="index"
          provider="sanity"
          :src="`${item?.picture.asset?._ref}`"
          :alt="`${item?.picture.alt}`"
          class="mx-auto max-w-[400px]"
        /> -->
      </div>
    </section>
  </main>
</template>
