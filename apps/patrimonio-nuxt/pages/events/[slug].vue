<script lang="ts" setup>
import {eventQuery} from '~/sanity/queries'
import type {EventQueryResult} from '~/sanity/types'
import Arrow from '~/assets/svg/arrow.svg'

const route = useRoute()
const {data: eventData} = await useSanityQuery<EventQueryResult>(eventQuery, {
  slug: route.params.slug,
})

if (eventData.value === null) {
  throw createError({
    statusCode: 404,
    message: 'not found',
    fatal: true,
  })
}

useSiteMetadata({
  title: eventData.value.title,
  description: eventData.value.excerpt ?? '',
  ogImage: '',
})
</script>

<template>
  <main>
    <section
      class="border-patrimonio-black flex justify-center border-b-[0.5px] px-5 py-[50px] md:px-10 md:py-[70px] xl:px-[70px]"
    >
      <div class="flex w-full max-w-[1300px] gap-5 xl:gap-10">
        <div class="flex w-full flex-col gap-2.5 md:flex-1 md:gap-5">
          <h1
            class="font-cabinet text-[35px]/none font-normal tracking-normal lg:text-[45px]/none xl:text-[65px]/none"
          >
            {{ eventData?.title ?? 'Event' }}
          </h1>
          <NuxtImg
            provider="sanity"
            class="w-full md:hidden"
            :src="eventData?.pictures?.[0]?.asset?._ref"
            :alt="eventData?.pictures?.[0].alt"
          />
          <p
            v-if="eventData?.type === 'art-show'"
            class="font-satoshi text-xl/none tracking-normal"
          >
            Art Show
          </p>
          <p
            v-else-if="eventData?.type === 'auction'"
            class="font-satoshi text-xl/none tracking-normal"
          >
            Auction
          </p>
          <p
            v-else-if="eventData?.type === 'solo-show'"
            class="font-satoshi text-xl/none tracking-normal"
          >
            Solo Show
          </p>
          <div
            class="font-satoshi flex flex-col gap-5 text-xl/none font-light tracking-normal lg:gap-10"
            :v-if="eventData?.content"
          >
            <SanityContent :blocks="eventData?.content" />
          </div>
          <BaseLink variant="secondary" class="w-full" icon to="/">
            Join the Auction
            <template #icon> <Arrow class="w-[50px]" :font-controlled="false" /></template>
          </BaseLink>
          <BaseLink variant="primary" class="bg-patrimonio-beige w-full" to="/">
            Download Catalogue (PDF)
          </BaseLink>
        </div>
        <div class="hidden w-full md:block md:flex-1">
          <NuxtImg
            provider="sanity"
            class="w-full"
            :src="eventData?.pictures?.[0]?.asset?._ref"
            :alt="eventData?.pictures?.[0].alt"
          />
        </div>
      </div>
    </section>

    <section
      class="border-patrimonio-black flex w-full flex-col items-center justify-center gap-5 overflow-hidden border-b-[0.5px] py-[50px] pl-5 md:py-[70px] md:pl-10 xl:pl-[70px]"
    >
      <div class="mx-auto flex w-full max-w-[1370px] flex-col gap-2.5 pr-5 md:pr-10 xl:pr-[70px]">
        <h2
          class="font-cabinet text-[32px] leading-none font-normal tracking-normal lg:flex-1 lg:text-[50px]"
        >
          Displayed Works
        </h2>
      </div>
      <div class="mx-auto flex w-full max-w-[1370px] flex-col justify-between gap-5">
        <div
          class="flex h-full w-full gap-2.5 overflow-x-auto overflow-y-hidden pr-5 [scrollbar-width:thin] md:pr-10 xl:pr-[70px]"
        >
          <template v-for="(painting, index) in eventData?.paintings" :key="index">
            <PaintingTile
              v-if="painting?.picture?.asset != null"
              :name="painting.name"
              :artist="painting.artist"
              :year="painting.year"
              :medium="painting.medium ?? ``"
              :image-src="painting.picture.asset"
            />
          </template>
          <template v-for="(painting, index) in eventData?.paintings" :key="index">
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
      </div>
    </section>
  </main>
</template>
