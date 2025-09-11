<script lang="ts" setup>
import {eventsPageQuery} from '~/sanity/queries'
import type { EventsPageQueryResult} from '~/sanity/types'
import Arrow from '~/assets/svg/arrow.svg'
import EventCard from '~/components/events/EventCard.vue';

const {data: eventsPageData} = await useSanityQuery<EventsPageQueryResult>(eventsPageQuery);
console.log({eventsPageData})

useSiteMetadata({
  title: eventsPageData?.value?.seo?.title ?? 'Events',
  description: eventsPageData?.value?.seo?.description ?? 'Keep yourself upto date with events conducted by Patrimonio Gallery',
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
          <h2 class="text-2xl my-10">Auctions</h2>
          <div v-for="auction in eventsPageData?.auctions">
            <EventCard :key="auction?._id ?? auction.title" :title="auction?.title" :imageSrc="auction?.pictures?.[0]?.asset" :excerpt="auction?.excerpt" :venue="auction.venue"  />
          </div>
          <h2 class="text-2xl my-10">Art Shows</h2>
          <div v-for="auction in eventsPageData?.artShows">
            <EventCard :key="auction?._id ?? auction.title" :title="auction?.title" :imageSrc="auction?.pictures?.[0]?.asset" :excerpt="auction?.excerpt" :venue="auction.venue"  />
          </div>
          <h2 class="text-2xl my-10">Solo Shows</h2>
          <div v-for="auction in eventsPageData?.soloShows">
            <EventCard :key="auction?._id ?? auction.title" :title="auction?.title" :imageSrc="auction?.pictures?.[0]?.asset" :excerpt="auction?.excerpt" :venue="auction.venue"  />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
