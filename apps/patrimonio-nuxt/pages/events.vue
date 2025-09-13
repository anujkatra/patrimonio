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
const soloShowCount = computed(() => eventsPageData.value?.soloShows?.length ?? 0)
const auctionCount = computed(() => eventsPageData.value?.auctions?.length ?? 0)
const artShowCount = computed(() => eventsPageData.value?.artShows?.length ?? 0)
const eventFilterType = ref('')
function eventFilter(value: string) {
  if (eventFilterType.value === value) eventFilterType.value = ''
  else eventFilterType.value = value
}
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
        </div>
        <div class="font-satoshi flex w-full gap-2.5 text-base/none tracking-normal">
          <button
            :class="`hover:text-patrimonio-beige flex h-10 cursor-pointer items-center gap-[5px] px-[15px] hover:bg-black md:gap-[15px] ${eventFilterType === 'auction' ? 'text-patrimonio-beige bg-black' : ''}`"
            @click="eventFilter('auction')"
          >
            <span>Auction</span>
            <span>| {{ auctionCount }} |</span>
          </button>
          <button
            :class="`hover:text-patrimonio-beige flex h-10 cursor-pointer items-center gap-[5px] px-[15px] hover:bg-black md:gap-[15px] ${eventFilterType === 'soloShow' ? 'text-patrimonio-beige bg-black' : ''}`"
            @click="eventFilter('soloShow')"
          >
            <span>Solo Show</span>
            <span>| {{ soloShowCount }} |</span>
          </button>
          <button
            :class="`hover:text-patrimonio-beige flex h-10 cursor-pointer items-center gap-[5px] px-[15px] hover:bg-black md:gap-[15px] ${eventFilterType === 'artShow' ? 'text-patrimonio-beige bg-black' : ''}`"
            @click="eventFilter('artShow')"
          >
            <span>Art Fair</span>
            <span>| {{ artShowCount }} |</span>
          </button>
        </div>
        <div class="flex w-full flex-col gap-10">
          <Transition mode="out-in" name="fade" appear>
            <div
              v-show="eventFilterType == 'auction' || eventFilterType == ''"
              class="flex w-full flex-col gap-5"
            >
              <h2 class="font-cabinet text-3xl/none">Auctions</h2>
              <div v-for="auction in eventsPageData?.auctions" :key="auction._id">
                <EventCard
                  :title="auction?.title"
                  :link="auction.slug.current"
                  :image-src="auction?.pictures?.[0]?.asset?._ref"
                  :excerpt="auction?.excerpt"
                  :venue="auction.venue"
                  :upcoming="auction.upcoming"
                  :date-range="auction.dateRange"
                />
              </div>
            </div>
          </Transition>
          <Transition mode="out-in" name="fade" appear>
            <div
              v-show="eventFilterType == 'artShow' || eventFilterType == ''"
              class="flex w-full flex-col gap-5"
            >
              <h2 class="font-cabinet text-3xl/none">Art Shows</h2>
              <div v-for="artShow in eventsPageData?.artShows" :key="artShow._id">
                <EventCard
                  :title="artShow?.title"
                  :link="artShow.slug.current"
                  :image-src="artShow?.pictures?.[0]?.asset?._ref"
                  :excerpt="artShow?.excerpt"
                  :venue="artShow.venue"
                  :upcoming="artShow.upcoming"
                  :date-range="artShow.dateRange"
                />
              </div>
            </div>
          </Transition>
          <Transition mode="out-in" name="fade" appear>
            <div
              v-show="eventFilterType == 'soloShow' || eventFilterType == ''"
              class="flex w-full flex-col gap-5"
            >
              <h2 class="font-cabinet text-3xl/none">Solo Shows</h2>
              <div v-for="soloShow in eventsPageData?.soloShows" :key="soloShow._id">
                <EventCard
                  :title="soloShow?.title"
                  :link="soloShow.slug.current"
                  :image-src="soloShow?.pictures?.[0]?.asset?._ref"
                  :excerpt="soloShow?.excerpt"
                  :venue="soloShow.venue"
                  :upcoming="soloShow.upcoming"
                  :date-range="soloShow.dateRange"
                />
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
