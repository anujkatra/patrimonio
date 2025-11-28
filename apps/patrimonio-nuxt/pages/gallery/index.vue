<script lang="ts" setup>
import {galleryPageQuery} from '~/sanity/queries'
import type {GalleryPageQueryResult} from '~/sanity/types'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {Checkbox} from '@/components/ui/checkbox'
import {useRoute, useRouter} from 'vue-router'
import FilterDown from '~/assets/svg/filterDown.svg'
import Cancel from '~/assets/svg/cancel.svg'
import Sort from '~/assets/svg/sort.svg'
import Filter from '~/assets/svg/filter.svg'
const sanity = useSanity()
const route = useRoute()
const router = useRouter()

onMounted(() => {
  // Check if 'page' query param exists, if not, add a default
  if (!route.query.page || !route.query.order) {
    router.replace({
      query: {...route.query, page: route.query.page ?? 1, order: route.query.order ?? 'desc'},
    })
  }
})

const itemsPerPage = 12
const params = computed(() => route.query || '')
const selectedArtist = computed(() => route.query.artist || '')
const selectedMedium = computed(() => route.query.medium || '')
const selectedCollection = computed(() => route.query.collection || '')
const page = computed(() => (typeof route.query.page === 'string' ? parseInt(route.query.page) : 1))
const startIndex = computed(() => (page.value - 1) * itemsPerPage)
const endIndex = computed(() => startIndex.value + itemsPerPage)
const selectedYear = computed(() =>
  typeof route.query.year === 'string' ? parseInt(route.query.year) : 0,
)
const forSaleOnly = ref(false)
const paintingOrder = computed(() => route.query.order || '')

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

function handleForSaleOnlyToggle() {
  forSaleOnly.value = !forSaleOnly.value
}

const {data: galleryPageData} = await useSanityQuery<GalleryPageQueryResult>(galleryPageQuery)

useSiteMetadata({
  title: galleryPageData?.value?.seo?.title ?? 'title',
  description: galleryPageData?.value?.seo?.description ?? 'description',
  ogImage: '',
})

const query = computed(
  () => groq`*[_type == "painting" && ($collection == '' || _id in *[_type == "collection" && slug.current == $collection][0].paintings[]._ref) && ($artist == '' || artist._ref == $artist) && ($medium == '' || medium._ref == $medium) && ($startYear == 0 || (year>=$startYear && year<$endYear)) && ($forSaleOnly == false || forSale == true)] | order(year ${paintingOrder.value})[$startIndex...$endIndex]{
  _id,
  slug,
  name,
	"artist":artist->.name,
	year,
	"medium":medium->.name,
  picture,
  publishedAt,
}`,
)

const countQuery = groq`count(*[_type == "painting" && ($artist == '' || artist._ref == $artist) && ($medium == '' || medium._ref == $medium) && ($startYear == 0 || (year>=$startYear && year<$endYear)) && ($forSaleOnly == false || forSale == true)])`

const filterQuery = groq`{
'startYear': *[_type == "painting"] | order(year asc)[0].year,
'endYear': *[_type == "painting"] | order(year desc)[0].year,
'artists': *[_type == "artist"]{_id,name,slug},
'collections': *[_type == "collection"]{_id,title,slug},
'mediums': *[_type == "medium"]{_id,name,slug}}`

const {data: galleryFilterData} = await useSanityQuery(filterQuery)

const {data: galleryPaintingData} = await useAsyncData(
  'galleryPaintingData',
  () =>
    sanity.fetch(query.value, {
      startIndex: startIndex.value,
      endIndex: endIndex.value,
      artist: getIdBySlug(galleryFilterData.value.artists, selectedArtist.value),
      medium: getIdBySlug(galleryFilterData.value.mediums, selectedMedium.value),
      startYear: selectedYear.value,
      endYear: selectedYear.value + 9,
      forSaleOnly: forSaleOnly.value,
      collection: selectedCollection.value,
    }),
  {watch: [params, forSaleOnly, query]},
)
const {data: galleryPaintingDataCount} = await useAsyncData(
  'galleryPaintingDataCount',
  () =>
    sanity.fetch(countQuery, {
      artist: getIdBySlug(galleryFilterData.value.artists, selectedArtist.value),
      medium: getIdBySlug(galleryFilterData.value.mediums, selectedMedium.value),
      startYear: selectedYear.value,
      endYear: selectedYear.value + 9,
      forSaleOnly: forSaleOnly.value,
    }),
  {watch: [selectedArtist, selectedMedium, selectedYear, forSaleOnly]},
)

const selectedFilters = computed(() => {
  return {
    artist: getValueBySlug(galleryFilterData.value.artists, selectedArtist.value, 'name'),
    collection: getValueBySlug(
      galleryFilterData.value.collections,
      selectedCollection.value,
      'title',
    ),
    medium: getValueBySlug(galleryFilterData.value.mediums, selectedMedium.value, 'name'),
  }
})

const startYear = galleryFilterData.value.startYear ?? 0
const endYear = galleryFilterData.value.endYear ?? 0
const startDecade = Math.floor(startYear / 10) * 10
const endDecade = Math.floor(endYear / 10) * 10
const decades = []
if (startYear !== 0 && endYear !== 0) {
  for (let i = startDecade; i <= endDecade; i += 10) {
    decades.push({startDate: i, endDate: i + 9})
  }
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
  router.replace({query: {page: 1, order: 'desc'}})
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
    <section class="flex justify-center px-5 pt-[50px] pb-2.5 md:px-10 md:pt-[70px] xl:px-[70px]">
      <div class="flex w-full max-w-[1300px] flex-col gap-2.5">
        <h1
          class="font-cabinet text-[35px]/none font-normal tracking-normal lg:text-[45px]/none xl:text-[65px]/none"
        >
          {{ galleryPageData?.title ?? 'Gallery' }}
        </h1>
        <h1 class="font-satoshi text-lg/none tracking-normal lg:text-xl/none">
          {{ galleryPageData?.subtitle ?? '' }}
        </h1>
      </div>
    </section>

    <section class="flex justify-center px-5 pt-2.5 pb-[50px] md:px-10 md:pb-[70px] xl:px-[70px]">
      <div class="flex w-full max-w-[1300px] flex-col gap-5 lg:gap-[70px] xl:gap-10">
        <div class="flex flex-col gap-[15px]">
          <div class="flex justify-between border-y-[0.5px] border-black py-2.5">
            <div class="flex lg:hidden">
              <button
                class="flex cursor-pointer items-center gap-[15px] px-[15px] hover:bg-black hover:text-white focus:outline-none"
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
                    <div
                      class="font-satoshi flex w-[118px] flex-col text-base/none tracking-normal"
                    >
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
                        <p class="px-2.5 py-[22px]">Collection</p>
                      </button>
                      <button
                        :class="`cursor-pointer ${currentActiveMobileFilter == 3 ? 'font-semibold' : ''}`"
                        @click="currentActiveMobileFilter = 3"
                      >
                        <p class="px-2.5 py-[22px]">Medium</p>
                      </button>
                    </div>
                  </div>
                  <div class="w-full overflow-y-auto pl-[35px]">
                    <Transition mode="out-in" name="fade">
                      <div
                        :key="currentActiveMobileFilter"
                        class="font-satoshi w-[118px] text-base/none tracking-normal"
                      >
                        <div v-if="currentActiveMobileFilter === 0" class="flex w-full flex-col">
                          <button
                            v-for="(decade, index) in decades"
                            :key="index"
                            :class="`cursor-pointer ${decade.startDate == selectedYear ? 'font-semibold' : ''}`"
                            @click="filter('year', decade.startDate)"
                          >
                            <p class="px-2.5 py-[22px]">
                              {{ decade.startDate }} - {{ decade.endDate }}
                            </p>
                          </button>
                        </div>
                        <div
                          v-else-if="currentActiveMobileFilter === 1"
                          class="flex w-full flex-col"
                        >
                          <button
                            v-for="(artist, index) in galleryFilterData?.artists"
                            :key="index"
                            :class="`cursor-pointer ${artist.slug.current == selectedArtist ? 'font-semibold' : ''}`"
                            @click="filter('artist', artist.slug.current)"
                          >
                            <p class="px-2.5 py-[22px]">
                              {{ artist.name }}
                            </p>
                          </button>
                        </div>
                        <div
                          v-else-if="currentActiveMobileFilter === 2"
                          class="flex w-full flex-col"
                        >
                          <button
                            v-for="(collection, index) in galleryFilterData?.collections"
                            :key="index"
                            :class="`cursor-pointer ${collection.slug.current == selectedCollection ? 'font-semibold' : ''}`"
                            @click="filter('collection', collection.slug.current)"
                          >
                            <p class="px-2.5 py-[22px]">
                              {{ collection.title }}
                            </p>
                          </button>
                        </div>
                        <div
                          v-else-if="currentActiveMobileFilter === 3"
                          class="flex w-full flex-col"
                        >
                          <button
                            v-for="(medium, index) in galleryFilterData?.mediums"
                            :key="index"
                            :class="`cursor-pointer ${medium.slug.current == selectedMedium ? 'font-semibold' : ''}`"
                            @click="filter('medium', medium.slug.current)"
                          >
                            <p class="px-2.5 py-[22px]">
                              {{ medium.name }}
                            </p>
                          </button>
                        </div>
                      </div>
                    </Transition>
                  </div>
                </div>
              </div>
            </Transition>
            <div class="hidden items-center gap-5 lg:flex">
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
                        @select="filter('year', decade.startDate)"
                      >
                        {{ decade.startDate }} - {{ decade.endDate }}
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
                        v-for="(artist, index) in galleryFilterData?.artists"
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
                        Collection
                      </p>
                      <FilterDown class="w-3" :font-controlled="false" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem
                        v-for="(collection, index) in galleryFilterData?.collections"
                        :key="index"
                        class="font-satoshi min-h-[50px] cursor-pointer px-[15px] text-base/none font-normal tracking-normal data-[highlighted]:bg-black data-[highlighted]:text-white"
                        @select="filter('collection', collection.slug.current)"
                      >
                        {{ collection.title }}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div
                  class="flex h-10 justify-center px-2.5 hover:bg-black hover:text-white xl:px-[15px]"
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger class="flex cursor-pointer items-center gap-[15px]">
                      <p class="font-satoshi text-base/none font-normal tracking-normal">Medium</p>
                      <FilterDown class="w-3" :font-controlled="false" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem
                        v-for="(medium, index) in galleryFilterData?.mediums"
                        :key="index"
                        class="font-satoshi min-h-[50px] cursor-pointer px-[15px] text-base/none font-normal tracking-normal data-[highlighted]:bg-black data-[highlighted]:text-white"
                        @select="filter('medium', medium.slug.current)"
                      >
                        {{ medium.name }}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div class="h-8 border-l-[0.5px] border-black" />
              <div class="flex gap-2.5">
                <label
                  for="available"
                  class="font-satoshi cursor-pointer text-base/none font-normal tracking-normal"
                >
                  <span class="pr-2">
                    <Checkbox
                      id="available"
                      :model-value="forSaleOnly"
                      class="cursor-pointer"
                      @update:model-value="() => handleForSaleOnlyToggle()"
                    />
                  </span>
                  Show only available artworks
                </label>
              </div>
            </div>
            <div class="flex h-10 justify-center hover:bg-black hover:text-white">
              <Select default-value="desc" @update:model-value="(value) => filter('order', value)">
                <SelectTrigger
                  class="font-satoshi flex h-10! cursor-pointer justify-center gap-[15px] border-none px-[15px] text-base/none font-normal tracking-normal shadow-none"
                >
                  <Sort class="size-5 hover:text-white" :font-controlled="false" />
                  <SelectValue placeholder="Order By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      value="asc"
                      class="font-satoshi min-h-[50px] cursor-pointer px-[15px] text-base/none font-normal tracking-normal data-[highlighted]:bg-black data-[highlighted]:text-white"
                    >
                      Oldest First
                    </SelectItem>
                    <SelectItem
                      value="desc"
                      class="font-satoshi min-h-[50px] cursor-pointer px-[15px] text-base/none font-normal tracking-normal data-[highlighted]:bg-black data-[highlighted]:text-white"
                    >
                      Latest First
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div
            v-if="
              selectedArtist !== '' ||
              selectedYear !== 0 ||
              selectedMedium !== '' ||
              selectedCollection !== ''
            "
            class="flex justify-between border-b-[0.5px] border-black pb-[15px]"
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
                v-if="selectedCollection !== ''"
                class="group/collection flex cursor-pointer justify-between gap-[5px] px-[5px]"
                @click="filter('collection', '')"
              >
                <p>Collection</p>
                <div class="flex items-center gap-[5px]">
                  <p class="font-medium">{{ selectedFilters.collection }}</p>
                  <div
                    class="flex size-5 items-center justify-center group-hover/collection:bg-black group-hover/collection:text-white"
                  >
                    <Cancel class="size-2.5" :font-controlled="false" />
                  </div>
                </div>
              </div>
              <div
                v-if="selectedMedium !== ''"
                class="group/medium flex cursor-pointer justify-between gap-[5px] px-[5px]"
                @click="filter('medium', '')"
              >
                <p>Medium</p>
                <div class="flex items-center gap-[5px]">
                  <p class="font-medium">{{ selectedFilters.medium }}</p>

                  <div
                    class="flex size-5 items-center justify-center group-hover/medium:bg-black group-hover/medium:text-white"
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
        </div>
        <div
          class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-[50px] lg:gap-y-[30px]"
        >
          <NuxtLink
            v-for="(painting, index) in galleryPaintingData"
            :key="index"
            :to="`/gallery/${painting.slug.current}`"
          >
            <div class="flex w-full max-w-[400px] flex-col gap-5">
              <div class="w-full overflow-hidden">
                <NuxtImg
                  provider="sanity"
                  :src="`${painting?.picture.asset?._ref}`"
                  :alt="`${painting?.picture.alt}`"
                  class="aspect-square w-full object-cover object-center transition-all duration-500 md:hover:scale-125"
                />
              </div>
              <div class="flex w-full flex-col gap-[5px] py-5 pr-5">
                <h3 class="font-cabinet pb-0.5 text-2xl/none font-medium tracking-normal">
                  {{ painting.name }}
                </h3>
                <div
                  class="font-satoshi flex flex-col gap-2.5 text-xl/none font-light tracking-normal"
                >
                  <p class="line-clamp-1 pb-1">by {{ painting.artist }}</p>
                  <div class="flex gap-2.5 text-lg/none">
                    <p>{{ painting.year }}</p>
                    <p>|</p>
                    <p>{{ painting.medium }}</p>
                  </div>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
        <div class="w-full">
          <Pagination
            :key="galleryPaintingData"
            :v-slot="{page}"
            :sibling-count="1"
            :items-per-page="itemsPerPage"
            :total="galleryPaintingDataCount"
            :default-page="page"
            :show-edges="true"
            @update:page="(p) => updatePage(p)"
          >
            <PaginationContent v-slot="{items}" class="gap-3">
              <PaginationPrevious size="pagination" />

              <template v-for="(item, index) in items" :key="index">
                <PaginationItem
                  v-if="item.type === 'page'"
                  :value="item.value"
                  :is-active="item.value === page"
                  class="data-[selected=true]:text-patrimonio-beige data-[selected=true]:bg-black"
                  size="pagination"
                >
                  {{ item.value }}
                </PaginationItem>
                <PaginationEllipsis v-else :key="item.type" :index="index">
                  &#8230;
                </PaginationEllipsis>
              </template>
              <PaginationNext size="pagination" />
            </PaginationContent>
          </Pagination>
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
