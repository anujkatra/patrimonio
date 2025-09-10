<script lang="ts" setup>
import {paintingQuery} from '~/sanity/queries'
import type {PaintingQueryResult} from '~/sanity/types'

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

useSiteMetadata({
  title: `${paintingData.value.name} - ${paintingData.value.artist}`,
  description: paintingData.value.description ?? '',
  ogImage: '',
})
</script>

<template>
  <main>
    <section class="flex justify-center px-5 py-[50px] md:px-10 md:py-[70px] xl:px-[70px]">
      <div class="flex w-full max-w-[1300px] flex-col gap-10 lg:flex-row">
        <div class="hidden lg:flex">
          <NuxtImg
            provider="sanity"
            class="aspect-square w-[600px]"
            :src="`${paintingData?.picture?.asset?._ref}`"
            :alt="`${paintingData?.picture?.alt}`"
          />
        </div>
        <div class="flex w-full flex-col gap-2.5 lg:max-w-[540px]">
          <p
            class="font-cabinet text-[35px]/none font-normal tracking-normal lg:pt-5 lg:text-[45px]/none xl:text-[65px]/none"
          >
            {{ paintingData?.name }}
          </p>
          <NuxtImg
            provider="sanity"
            class="w-full lg:hidden"
            :src="`${paintingData?.picture?.asset?._ref}`"
            :alt="`${paintingData?.picture?.alt}`"
          />
          <p
            v-if="paintingData?.description"
            class="font-satoshi text-base/none font-light tracking-normal md:text-xl/none"
          >
            {{ paintingData.description }}
          </p>
          <p
            class="font-satoshi border-y-[0.5px] border-solid border-[#202020] py-2.5 text-base/none tracking-normal md:text-xl/none"
          >
            by {{ paintingData?.artist }}
          </p>
          <p
            v-if="paintingData?.year || paintingData?.medium"
            class="font-satoshi border-b-[0.5px] border-solid border-[#202020] pb-2.5 text-base/none tracking-normal md:text-xl/none"
          >
            <span v-if="paintingData?.year">{{ paintingData?.year }} | </span>
            <span v-if="paintingData?.medium">{{ paintingData?.medium }}</span>
          </p>
        </div>
      </div>
    </section>
  </main>
</template>
