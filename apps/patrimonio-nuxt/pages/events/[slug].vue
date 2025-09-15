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
      <div class="flex w-full max-w-[1300px] flex-col gap-2.5">
        <h1
          class="font-cabinet text-[35px]/none font-normal tracking-normal lg:text-[45px]/none xl:text-[65px]/none"
        >
          {{ eventData?.title ?? 'Event' }}
        </h1>
        <NuxtImg
          provider="sanity"
          class="w-full"
          :src="eventData?.pictures?.[0]?.asset?._ref"
          :alt="eventData?.pictures?.[0].alt"
        />
        <p v-if="eventData?.type === 'art-show'" class="font-satoshi text-xl/none tracking-normal">
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
        <div class="flex flex-1 flex-col gap-5 lg:gap-10" :v-if="eventData?.content">
          <SanityContent :blocks="eventData?.content" />
        </div>
        <BaseLink variant="secondary" class="w-full" icon to="/">
          Test
          <template #icon> <Arrow class="w-[50px]" :font-controlled="false" /></template>
        </BaseLink>
        <BaseLink variant="primary" class="bg-patrimonio-beige w-full" to="/">
          View all upcoming events
        </BaseLink>
      </div>
    </section>
  </main>
</template>
