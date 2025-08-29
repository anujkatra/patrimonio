<script lang="ts" setup>
import {galleryPageQuery} from '~/sanity/queries'
import type {GalleryPageQueryResult} from '~/sanity/types'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {useRoute, useRouter} from 'vue-router'
const sanity = useSanity()
const route = useRoute()
const router = useRouter()

onMounted(() => {
  // Check if 'page' query param exists, if not, add a default
  if (!route.query.page) {
    router.replace({query: {...route.query, page: 1}})
  }
})

const params = computed(() => route.query || '')
const artist = computed(() => route.query.artist || '')
const medium = computed(() => route.query.medium || '')
const page = computed(() => (typeof route.query.page === 'string' ? parseInt(route.query.page) : 1))
const startIndex = computed(() => (page.value - 1) * 3)
const endIndex = computed(() => startIndex.value + 3)
const selectedYear = computed(() =>
  typeof route.query.year === 'string' ? parseInt(route.query.year) : 0,
)

// watch(
//   () => route.query,
//   () => {
//     selectedYear.value = route.query.year || ''
//     // refresh()
//   },
// )

console.log('page', page.value, startIndex.value, endIndex.value)

function getIdBySlug(object, value) {
  for (let i = 0; i < object.length; i++) {
    if (object[i].slug.current === value) {
      return object[i]._id
    }
  }
  return ''
}

const {data: galleryPageData} = await useSanityQuery<GalleryPageQueryResult>(galleryPageQuery)

useSiteMetadata({
  title: galleryPageData?.value?.seo?.title ?? 'title',
  description: galleryPageData?.value?.seo?.description ?? 'description',
  ogImage: '',
})

// const query = groq`*[_type == "painting" && topic == $topic][0..10]`
// const { data: galleryPaintingData } = useSanityQuery(query, { topic: 'News' })

// groq testing
// const query = groq`*[_type == "painting" && ($name == '' || artist->.name == $name)][0..10]`
// const {data: galleryPaintingData} = useSanityQuery(query, {name: ''})

// let lastId = ''
// async function fetchNextPage() {
//   if (lastId === null) {
//     return []
//   }
//   const {result} = await fetch(
//     groq`*[_type == "article" && _id > $lastId] | order(_id) [0...100] {
//       _id, title, body
//     }`,
//     {lastId},
//   )

//   if (result.length > 0) {
//     lastId = result[result.length - 1]._id
//   } else {
//     lastId = '' // Reached the end
//   }
//   return result
// }

const query = groq`*[_type == "painting" && ($artist == '' || artist._ref == $artist) && ($medium == '' || medium._ref == $medium) && ($startYear == 0 || (year>=$startYear && year<$endYear))] | order(year desc)[$startIndex...$endIndex]{
 _id,
  name,
	"artist":artist->.name,
	year,
	"medium":medium->.name,
  picture,
  publishedAt,
}`
const filterQuery = groq`{
'startYear': *[_type == "painting"] | order(year asc)[0].year,
'endYear': *[_type == "painting"] | order(year desc)[0].year,
'artists': *[_type == "artist"]{_id,name,slug},
'collections': *[_type == "collection"]{_id,title,slug},
'mediums': *[_type == "medium"]{_id,name,slug}}`
const {data: galleryFilterData} = await useSanityQuery(filterQuery)
// const {data: galleryPaintingData} = await useSanityQuery(query, {
//   startIndex: startIndex.value,
//   endIndex: endIndex.value,
// })
const {data: galleryPaintingData} = await useAsyncData(
  'galleryPaintingData',
  () =>
    sanity.fetch(query, {
      startIndex: startIndex.value,
      endIndex: endIndex.value,
      artist: getIdBySlug(galleryFilterData.value.artists, artist.value),
      medium: getIdBySlug(galleryFilterData.value.mediums, medium.value),
      startYear: selectedYear.value,
      endYear: selectedYear.value + 9,
    }),
  {watch: [params]},
)
// console.log('test', galleryPageData.value, galleryPaintingData.value)
console.log('test1', galleryPaintingData.value, galleryFilterData.value.artists)

const startYear = galleryFilterData.value.startYear
const endYear = galleryFilterData.value.endYear
const startDecade = Math.floor(startYear / 10) * 10
const endDecade = Math.floor(endYear / 10) * 10
const decades = []
for (let i = startDecade; i <= endDecade; i += 10) {
  decades.push({starDate: i, endDate: i + 9})
}
console.log('year', startYear, endYear, params.value.artist)

function filter(key: string, value: string) {
  router.replace({query: {...route.query, page: 1, [key]: value}})
  console.log('in filt', artist.value, selectedYear.value)
}
function reset() {
  router.replace({query: {page: 1}})
}
</script>

<template>
  <main>
    <section class="flex justify-center px-5 py-[50px] md:px-10 md:py-[70px] xl:px-[70px]">
      <div class="flex w-full max-w-[1300px] flex-col gap-5 lg:gap-[70px] xl:gap-10">
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

    <section class="flex justify-center px-5 py-[50px] md:px-10 md:py-[70px] xl:px-[70px]">
      <div class="flex w-full max-w-[1300px] flex-col gap-5 lg:gap-[70px] xl:gap-10">
        <div class="flex flex-col gap-5">
          <div class="flex justify-between">
            <div class="flex gap-2.5">
              <p>{{ params }}</p>
              <p>{{ selectedYear }}</p>
              <p><button @click="reset">reset</button></p>
              <div class="h-10 px-[15px]">
                <DropdownMenu>
                  <DropdownMenuTrigger class="cursor-pointer"> Year </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem v-for="(decade, index) in decades" :key="index"
                      ><button @click="filter('year', decade.starDate)">
                        {{ decade.starDate }} - {{ decade.endDate }}
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div class="h-10 px-[15px]">
                <DropdownMenu>
                  <DropdownMenuTrigger class="cursor-pointer"> Artist </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem
                      v-for="(artist, index) in galleryFilterData?.artists"
                      :key="index"
                      ><button @click="filter('artist', artist.slug.current)">
                        {{ artist.name }}
                      </button></DropdownMenuItem
                    >
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div class="h-10 px-[15px]">
                <DropdownMenu>
                  <DropdownMenuTrigger class="cursor-pointer">Collections</DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem
                      v-for="(collection, index) in galleryFilterData?.collections"
                      :key="index"
                      ><button @click="filter('collection', collection.slug.current)">
                        {{ collection.title }}
                      </button></DropdownMenuItem
                    >
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div class="h-10 px-[15px]">
                <DropdownMenu>
                  <DropdownMenuTrigger class="cursor-pointer">Medium</DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem
                      v-for="(medium, index) in galleryFilterData?.mediums"
                      :key="index"
                      ><button @click="filter('medium', medium.slug.current)">
                        {{ medium.name }}
                      </button></DropdownMenuItem
                    >
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-5">
          <div
            v-for="(painting, index) in galleryPaintingData"
            :key="index"
            class="flex w-full max-w-[400px] flex-col gap-5"
          >
            <div class="w-full overflow-hidden">
              <NuxtImg
                provider="sanity"
                :src="`${painting?.picture.asset?._ref}`"
                :alt="`${painting?.picture.alt}`"
                class="aspect-square w-full object-cover object-center"
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
        </div>
      </div>
    </section>
  </main>
</template>
