<script lang="ts" setup>
import {eventsPageQuery} from '~/sanity/queries'
import type {EventsPageQueryResult} from '~/sanity/types'
import EventCard from '~/components/events/EventCard.vue'

const {data: eventsPageData} = await useSanityQuery<EventsPageQueryResult>(eventsPageQuery)
console.log(eventsPageData.value)

useSiteMetadata({
  title: eventsPageData?.value?.seo?.title ?? 'Events',
  description:
    eventsPageData?.value?.seo?.description ??
    'Keep yourself upto date with events conducted by Patrimonio Gallery',
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
            {{ eventsPageData?.title }}
          </h1>
          <p class="font-satoshi text-lg leading-none font-light tracking-normal">
            {{ eventsPageData?.subtitle ?? '' }}
          </p>
          <h2 class="my-10 text-2xl">Auctions</h2>
          <div v-for="auction in eventsPageData?.auctions" :key="auction._id">
            <EventCard
              :title="auction?.title"
              :link="auction.slug.current"
              :image-src="auction?.pictures?.[0]?.asset?._ref"
              :excerpt="auction?.excerpt"
              :venue="auction.venue"
              :upcoming="auction.upcoming"
            />
          </div>
          <h2 class="my-10 text-2xl">Art Shows</h2>
          <div v-for="artShow in eventsPageData?.artShows" :key="artShow._id">
            <EventCard
              :title="artShow?.title"
              :link="artShow.slug.current"
              :image-src="artShow?.pictures?.[0]?.asset?._ref"
              :excerpt="artShow?.excerpt"
              :venue="artShow.venue"
              :upcoming="artShow.upcoming"
            />
          </div>
          <h2 class="my-10 text-2xl">Solo Shows</h2>
          <div v-for="soloShow in eventsPageData?.soloShows" :key="soloShow._id">
            <EventCard
              :title="soloShow?.title"
              :link="soloShow.slug.current"
              :image-src="soloShow?.pictures?.[0]?.asset?._ref"
              :excerpt="soloShow?.excerpt"
              :venue="soloShow.venue"
              :upcoming="soloShow.upcoming"
            />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
