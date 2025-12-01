<script lang="ts" setup>
import {eventsPageCountQuery, eventsPageFilterQuery, eventsPageQuery} from '~/sanity/queries'
import type {
  EventsPageCountQueryResult,
  EventsPageFilterQueryResult,
  EventsPageQueryResult,
} from '~/sanity/types'
import EventCard from '~/components/events/EventCard.vue'
import Filter from '~/assets/svg/filter.svg'
import Cancel from '~/assets/svg/cancel.svg'
import FilterDown from '~/assets/svg/filterDown.svg'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
const sanity = useSanity()
const route = useRoute()
const router = useRouter()

// onMounted(() => {
//   // Check if 'page' query param exists, if not, add a default
//   if (!route.query.page || !route.query.order) {
//     router.replace({
//       query: {...route.query, page: route.query.page ?? 1, order: route.query.order ?? 'desc'},
//     })
//   }
// })
onMounted(() => {
  // Check if 'page' query param exists, if not, add a default
  if (!route.query.page) {
    router.replace({
      query: {...route.query, page: 1},
    })
  }
})

const params = computed(() => route.query || '')
const selectedArtist = computed(() => route.query.artist || '')
const selectedAuctionHouse = computed(() => route.query.auctionHouse || '')
const selectedType = computed(() => route.query.type || '')
const selectedYear = computed(() =>
  typeof route.query.year === 'string' ? parseInt(route.query.year) : 0,
)

function getIdBySlug(object, value) {
  for (let i = 0; i < object.length; i++) {
    if (object[i].slug.current === value) {
      return object[i]._id
    }
  }
  return ''
}

function getValueBySlug(object, value: string, returnValue: string) {
  for (let i = 0; i < object.length; i++) {
    if (object[i].slug.current === value) {
      return object[i][returnValue]
    }
  }
  return ''
}

const {data: eventsPageData} = await useSanityQuery<EventsPageQueryResult>(eventsPageQuery)
const {data: eventsPageCountData} =
  await useSanityQuery<EventsPageCountQueryResult>(eventsPageCountQuery)
const {data: eventsPageFilterData} =
  await useSanityQuery<EventsPageFilterQueryResult>(eventsPageFilterQuery)
// console.log(eventsPageData.value)
// console.log('filter', eventsPageFilterData.value)

const query = computed(
  () => groq`*[_type == "event" && ($type == '' || type == $type) && ($auctionHouse == '' || auctionHouse._ref == $auctionHouse) && ($artist == '' || $artist in artists[]._ref)]{
  _id,
  slug,
  title,
	artists,
  excerpt,
  pictures,
  dateRange,
  venue,
  upcoming,
}`,
)

const {data: eventsData} = await useAsyncData(
  'eventsData',
  () =>
    sanity.fetch(query.value, {
      artist: getIdBySlug(eventsPageFilterData?.value?.artists, selectedArtist.value),
      auctionHouse: getIdBySlug(
        eventsPageFilterData?.value?.auctionHouse,
        selectedAuctionHouse.value,
      ),
      type: selectedType.value,
      startYear: 0,
      endYear: 9,
    }),
  {watch: [params, query]},
)
useSiteMetadata({
  title: eventsPageData?.value?.seo?.title ?? 'Events',
  description:
    eventsPageData?.value?.seo?.description ??
    'Keep yourself upto date with events conducted by Patrimonio Gallery',
  ogImage: '',
})

const selectedFilters = computed(() => {
  return {
    artist: getValueBySlug(eventsPageFilterData?.value?.artists, selectedArtist.value, 'name'),
    auctionHouse: getValueBySlug(
      eventsPageFilterData?.value?.auctionHouse,
      selectedAuctionHouse.value,
      'name',
    ),
  }
})

const soloShowCount = computed(() => eventsPageData.value?.soloShows?.length ?? 0)
const auctionCount = computed(() => eventsPageData.value?.auctions?.length ?? 0)
const artShowCount = computed(() => eventsPageData.value?.artShows?.length ?? 0)
function eventFilter(value: string) {
  if (selectedType.value === value) {
    const {type, ...currentQuery} = {...route.query}
    router.replace({query: currentQuery})
  } else {
    router.replace({
      query: {...route.query, type: value},
    })
  }
}

const startYear = new Date(eventsPageFilterData?.value?.startYear ?? '').getFullYear()
const endYear = new Date(
  eventsPageFilterData?.value?.endYear?.endDate ??
    eventsPageFilterData?.value?.endYear?.startDate ??
    '',
).getFullYear()
const startDecade = Math.floor(startYear / 10) * 10
const endDecade = Math.floor(endYear / 10) * 10
const decades = []
for (let i = startDecade; i <= endDecade; i += 10) {
  decades.push({starDate: i, endDate: i + 9})
}

function filter(key: string, value: string) {
  if (value === '' || value === '0') {
    const {[key]: _, ...currentQuery} = {...route.query}
    router.replace({query: {...currentQuery, page: 1}})
  } else if (isFilterMenuOpen.value && route.query[key] == value) {
    // Toggle filter if it already exists
    const {[key]: _, ...currentQuery} = {...route.query}
    router.replace({query: {...currentQuery, page: 1}})
  } else router.replace({query: {...route.query, page: 1, [key]: value}})
}

function updatePage(value: number) {
  router.replace({query: {...route.query, page: value}})
}
function reset() {
  router.replace({query: {page: 1}})
}

const isFilterMenuOpen = ref(false)

function closeMenu() {
  isFilterMenuOpen.value = false
}

// Disable scroll on body when menu is open
watch(isFilterMenuOpen, (open) => {
  if (open) {
    document.body.classList.add('overflow-hidden')
  } else {
    document.body.classList.remove('overflow-hidden')
  }
})

const currentActiveMobileFilter = ref(0)
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
            :class="`hover:text-patrimonio-beige flex h-10 cursor-pointer items-center gap-[5px] px-[15px] hover:bg-black md:gap-[15px] ${selectedType === 'auction' ? 'text-patrimonio-beige bg-black' : ''}`"
            @click="eventFilter('auction')"
          >
            <span>Auction</span>
            <span v-show="eventsPageCountData?.auction"
              >| {{ eventsPageCountData?.auction }} |</span
            >
          </button>
          <button
            :class="`hover:text-patrimonio-beige flex h-10 cursor-pointer items-center gap-[5px] px-[15px] hover:bg-black md:gap-[15px] ${selectedType === 'solo-show' ? 'text-patrimonio-beige bg-black' : ''}`"
            @click="eventFilter('solo-show')"
          >
            <span>Solo Show</span>
            <span v-show="eventsPageCountData?.soloShow"
              >| {{ eventsPageCountData?.soloShow }} |</span
            >
          </button>
          <button
            :class="`hover:text-patrimonio-beige flex h-10 cursor-pointer items-center gap-[5px] px-[15px] hover:bg-black md:gap-[15px] ${selectedType === 'art-show' ? 'text-patrimonio-beige bg-black' : ''}`"
            @click="eventFilter('art-show')"
          >
            <span>Art Fair</span>
            <span v-show="eventsPageCountData?.artShow"
              >| {{ eventsPageCountData?.artShow }} |</span
            >
          </button>
        </div>
        <div class="border-patrimonio-black w-full items-center border-y-[0.5px] py-2.5">
          <div class="flex lg:hidden">
            <button
              class="flex h-10 cursor-pointer items-center gap-[15px] px-[15px] hover:bg-black hover:text-white focus:outline-none"
              aria-label="Toggle menu"
              @click="isFilterMenuOpen = !isFilterMenuOpen"
            >
              <Filter class="size-5" :font-controlled="false" />
              <p class="font-satoshi text-base/none font-normal tracking-normal">Filters</p>

              <FilterDown class="w-3" :font-controlled="false" />
            </button>
          </div>
          <Transition mode="out-in" name="fade">
            <div
              v-if="isFilterMenuOpen"
              class="fixed inset-0 z-[60] flex min-h-svh w-full flex-col bg-white text-center lg:hidden"
            >
              <div class="flex justify-between border-b-[0.5px] border-[#202020] px-[15px] py-5">
                <p class="font-satoshi text-lg/none tracking-normal">Filters</p>
                <button
                  class="hover:cursor-pointer focus:outline-none"
                  aria-label="Toggle menu"
                  @click="closeMenu"
                >
                  <Cancel class="size-5" :font-controlled="false" />
                </button>
              </div>
              <div class="flex h-full px-5">
                <div class="border-r-[0.5px] border-[#202020]">
                  <div class="font-satoshi flex w-[118px] flex-col text-base/none tracking-normal">
                    <!-- @TODO Switch to font medium after fixing font issue -->
                    <button
                      :class="`cursor-pointer ${currentActiveMobileFilter == 0 ? 'font-semibold' : ''}`"
                      @click="currentActiveMobileFilter = 0"
                    >
                      <p class="px-2.5 py-[22px]">Year</p>
                    </button>
                    <button
                      :class="`cursor-pointer ${currentActiveMobileFilter == 1 ? 'font-semibold' : ''}`"
                      @click="currentActiveMobileFilter = 1"
                    >
                      <p class="px-2.5 py-[22px]">Artist</p>
                    </button>
                    <button
                      :class="`cursor-pointer ${currentActiveMobileFilter == 2 ? 'font-semibold' : ''}`"
                      @click="currentActiveMobileFilter = 2"
                    >
                      <p class="px-2.5 py-[22px]">Auction House</p>
                    </button>
                  </div>
                </div>
                <div class="pl-[35px]">
                  <Transition mode="out-in" name="fade">
                    <div
                      :key="currentActiveMobileFilter"
                      class="font-satoshi w-[118px] text-base/none tracking-normal"
                    >
                      <div v-if="currentActiveMobileFilter === 0" class="flex w-full flex-col">
                        <button
                          v-for="(decade, index) in decades"
                          :key="index"
                          :class="`cursor-pointer ${decade.starDate == selectedYear ? 'font-semibold' : ''}`"
                          @click="filter('year', decade.starDate)"
                        >
                          <p class="px-2.5 py-[22px]">
                            {{ decade.starDate }} - {{ decade.endDate }}
                          </p>
                        </button>
                      </div>
                      <div v-else-if="currentActiveMobileFilter === 1" class="flex w-full flex-col">
                        <button
                          v-for="(artist, index) in eventsPageFilterData?.artists"
                          :key="index"
                          :class="`cursor-pointer ${artist.slug.current == selectedArtist ? 'font-semibold' : ''}`"
                          @click="filter('artist', artist.slug.current)"
                        >
                          <p class="px-2.5 py-[22px]">
                            {{ artist.name }}
                          </p>
                        </button>
                      </div>
                      <div v-else-if="currentActiveMobileFilter === 2" class="flex w-full flex-col">
                        <button
                          v-for="(auctionHouse, index) in eventsPageFilterData?.auctionHouse"
                          :key="index"
                          :class="`cursor-pointer ${auctionHouse.slug.current == selectedAuctionHouse ? 'font-semibold' : ''}`"
                          @click="filter('auctionHouse', auctionHouse.slug.current)"
                        >
                          <p class="px-2.5 py-[22px]">
                            {{ auctionHouse.name }}
                          </p>
                        </button>
                      </div>
                    </div>
                  </Transition>
                </div>
              </div>
            </div>
          </Transition>
          <div class="hidden w-full items-center gap-5 lg:flex">
            <Filter class="size-5" :font-controlled="false" />
            <div class="flex gap-0 xl:gap-2.5">
              <div
                class="flex h-10 justify-center px-2.5 hover:bg-black hover:text-white xl:px-[15px]"
              >
                <DropdownMenu>
                  <DropdownMenuTrigger class="flex cursor-pointer items-center gap-[15px]">
                    <p class="font-satoshi text-base/none font-normal tracking-normal">Year</p>
                    <FilterDown class="w-3" :font-controlled="false" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem
                      v-for="(decade, index) in decades"
                      :key="index"
                      class="font-satoshi min-h-[50px] cursor-pointer px-[15px] text-base/none font-normal tracking-normal data-[highlighted]:bg-black data-[highlighted]:text-white"
                      @select="filter('year', decade.starDate)"
                    >
                      {{ decade.starDate }} - {{ decade.endDate }}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div
                class="flex h-10 justify-center px-2.5 hover:bg-black hover:text-white xl:px-[15px]"
              >
                <DropdownMenu>
                  <DropdownMenuTrigger class="flex cursor-pointer items-center gap-[15px]">
                    <p class="font-satoshi text-base/none font-normal tracking-normal">Artist</p>
                    <FilterDown class="w-3" :font-controlled="false" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem
                      v-for="(artist, index) in eventsPageFilterData?.artists"
                      :key="index"
                      class="font-satoshi min-h-[50px] cursor-pointer px-[15px] text-base/none font-normal tracking-normal data-[highlighted]:bg-black data-[highlighted]:text-white"
                      @select="filter('artist', artist.slug.current)"
                    >
                      {{ artist.name }}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div
                class="flex h-10 justify-center px-2.5 hover:bg-black hover:text-white xl:px-[15px]"
              >
                <DropdownMenu>
                  <DropdownMenuTrigger class="flex cursor-pointer items-center gap-[15px]">
                    <p class="font-satoshi text-base/none font-normal tracking-normal">
                      Auction House
                    </p>
                    <FilterDown class="w-3" :font-controlled="false" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem
                      v-for="(auctionHouse, index) in eventsPageFilterData?.auctionHouse"
                      :key="index"
                      class="font-satoshi min-h-[50px] cursor-pointer px-[15px] text-base/none font-normal tracking-normal data-[highlighted]:bg-black data-[highlighted]:text-white"
                      @select="filter('auctionHouse', auctionHouse.slug.current)"
                    >
                      {{ auctionHouse.name }}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="selectedYear !== 0 || selectedArtist !== '' || selectedAuctionHouse !== ''"
          class="flex w-full justify-between border-b-[0.5px] border-black pb-[15px]"
        >
          <div class="flex w-full flex-col gap-y-5 md:flex-row md:flex-wrap">
            <div class="flex w-full justify-between md:w-auto">
              <p class="px-[5px]">Showing results for:</p>
              <div class="flex min-w-[82px] gap-2.5 md:hidden">
                <button class="h-6 cursor-pointer" @click="reset">
                  <p
                    class="text-patrimonio-blue font-satoshi text-base/none font-medium tracking-normal"
                  >
                    Reset filters
                  </p>
                </button>
              </div>
            </div>
            <div
              v-if="selectedYear !== 0"
              class="group/year flex cursor-pointer justify-between gap-[5px] px-[5px]"
              @click="filter('year', '0')"
            >
              <p>Year</p>
              <div class="flex items-center gap-[5px]">
                <p class="font-medium">{{ selectedYear }} - {{ selectedYear + 9 }}</p>
                <div
                  class="flex size-5 items-center justify-center group-hover/year:bg-black group-hover/year:text-white"
                >
                  <Cancel class="size-2.5" :font-controlled="false" />
                </div>
              </div>
            </div>
            <div
              v-if="selectedArtist !== ''"
              class="group/artist flex cursor-pointer justify-between gap-[5px] px-[5px]"
              @click="filter('artist', '')"
            >
              <p>Artist</p>
              <div class="flex items-center gap-[5px]">
                <p class="font-medium">{{ selectedFilters.artist }}</p>
                <div
                  class="flex size-5 items-center justify-center group-hover/artist:bg-black group-hover/artist:text-white"
                >
                  <Cancel class="size-2.5" :font-controlled="false" />
                </div>
              </div>
            </div>
            <div
              v-if="selectedAuctionHouse !== ''"
              class="group/collection flex cursor-pointer justify-between gap-[5px] px-[5px]"
              @click="filter('auctionHouse', '')"
            >
              <p>Auction House</p>
              <div class="flex items-center gap-[5px]">
                <p class="font-medium">{{ selectedFilters.auctionHouse }}</p>
                <div
                  class="flex size-5 items-center justify-center group-hover/collection:bg-black group-hover/collection:text-white"
                >
                  <Cancel class="size-2.5" :font-controlled="false" />
                </div>
              </div>
            </div>
          </div>
          <div class="hidden min-w-[82px] gap-2.5 md:flex">
            <button class="h-6 cursor-pointer" @click="reset">
              <p
                class="text-patrimonio-blue font-satoshi text-base/none font-medium tracking-normal"
              >
                Reset filters
              </p>
            </button>
          </div>
        </div>
        <div class="flex w-full flex-col gap-10">
          <Transition mode="out-in" name="fade" appear>
            <div v-show="eventsData" class="flex w-full flex-col gap-5">
              <h2 class="font-cabinet text-3xl/none">Events</h2>
              <div v-for="event in eventsData" :key="event._id">
                <EventCard
                  :title="event?.title"
                  :link="event.slug.current"
                  :image-src="event?.pictures?.[0]?.asset?._ref"
                  :excerpt="event?.excerpt"
                  :venue="event.venue"
                  :upcoming="event.upcoming"
                  :date-range="event.dateRange"
                  :slug="event.slug.current"
                />
              </div>
            </div>
          </Transition>
          <!-- <Transition mode="out-in" name="fade" appear>
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
          </Transition> -->
          <!-- <Transition mode="out-in" name="fade" appear>
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
          </Transition> -->
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
