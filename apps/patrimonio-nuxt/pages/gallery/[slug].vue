<script lang="ts" setup>
import {paintingQuery} from '~/sanity/queries'
import type {PaintingQueryResult} from '~/sanity/types'
import Arrow from '~/assets/svg/arrow.svg'

const route = useRoute()
const {data: paintingData} = await useSanityQuery<PaintingQueryResult>(paintingQuery, {
  slug: route.params.slug,
})

if (paintingData.value === null) {
  throw createError({
    statusCode: 404,
    message: 'not found',
    fatal: true,
  })
}

console.log('test', paintingData.value)

useSiteMetadata({
  title: `${paintingData.value.name} - ${paintingData.value.artist}`,
  description: paintingData.value.description ?? '',
  ogImage: '',
})
</script>

<template>
  <main>
    <!-- <section class="flex justify-center px-5 py-[50px] md:px-10 md:py-[70px] xl:px-[70px]">
      <div class="flex w-full max-w-[1300px] flex-col items-center gap-5 lg:gap-[30px] xl:gap-10">
        <div class="flex w-full border-b-[0.5px] border-solid border-[#202020] pb-2.5">
          <h1
            class="font-cabinet py-1 text-[35px]/none font-normal tracking-normal lg:text-[76px] xl:text-8xl/none"
          >
            {{ paintingData?.name }}
          </h1>
        </div>
        <div class="flex w-full flex-col gap-5 md:flex-row lg:gap-10">
          <div class="w-full flex-1">
            <NuxtImg
              provider="sanity"
              :src="`${paintingData?.picture.asset?._ref}`"
              :alt="`${paintingData?.picture.alt}`"
              class="aspect-[12/9] w-full object-cover object-center"
            />
          </div>
          <div class="flex flex-1 flex-col gap-5 lg:gap-10" :v-if="paintingData?.description">
            <SanityContent :blocks="paintingData?.description ?? []" />
          </div>
        </div>
      </div>
    </section>

    <section
      v-if="paintingData?.featuredPaintings"
      class="flex w-full flex-col items-center justify-center gap-5 overflow-hidden border-t-[0.5px] border-[#202020] py-[50px] pl-5 md:py-[70px] md:pl-10 xl:pl-[70px]"
    >
      <div class="mx-auto flex w-full max-w-[1370px] flex-col gap-2.5 pr-5 md:pr-10 xl:pr-[70px]">
        <h2
          class="font-cabinet text-[32px] leading-none font-normal tracking-normal lg:flex-1 lg:text-[50px]"
        >
          His Work
        </h2>
        <p class="font-satoshi text-lg leading-none font-light tracking-normal">
          Discover an exquisite global collection, thoughtfully presented through curated events,
          exhibitions, and exclusive showcases.
        </p>
      </div>
      <div class="mx-auto flex w-full max-w-[1370px] flex-col justify-between gap-5">
        <div
          class="flex h-full w-full gap-2.5 overflow-x-auto overflow-y-hidden pr-5 [scrollbar-width:thin] md:pr-10 xl:pr-[70px]"
        >
          <template v-for="(painting, index) in paintingData?.featuredPaintings" :key="index">
            <PaintingTile
              v-if="painting?.picture?.asset != null"
              :name="painting.name"
              :artist="painting.artist"
              :year="painting.year"
              :medium="painting.medium ?? ``"
              :image-src="painting.picture.asset"
            />
          </template>
          <template v-for="(painting, index) in paintingData?.featuredPaintings" :key="index">
            <PaintingTile
              v-if="painting?.picture?.asset != null"
              :name="painting.name"
              :artist="painting.artist"
              :year="painting.year"
              :medium="painting.medium ?? ``"
              :image-src="painting.picture.asset"
            />
          </template>
        </div>
        <div class="flex w-full pr-5 md:justify-end md:pr-10 xl:pr-[70px]">
          <BaseLink variant="secondary" class="w-full" icon to="/gallery">
            View All
            <template #icon> <Arrow class="w-[50px]" :font-controlled="false" /></template>
          </BaseLink>
        </div>
      </div>
    </section> -->
  </main>
</template>
