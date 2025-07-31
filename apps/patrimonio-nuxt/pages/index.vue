<script lang="ts" setup>
import {homepageQuery} from '~/sanity/queries'
import type {HomepageQueryResult} from '~/sanity/types'
import Arrow from '~/assets/svg/arrow.svg'
import {ref, reactive} from 'vue'
import emblaCarouselVue from 'embla-carousel-vue'
import Autoplay from 'embla-carousel-autoplay'
// import {GridLayout, GridItem} from 'grid-layout-plus'

// const layout = reactive([
//   {x: 0, y: 0, w: 2, h: 2, i: '0', static: false},
//   {x: 2, y: 0, w: 2, h: 4, i: '1', static: true},
//   {x: 4, y: 0, w: 2, h: 5, i: '2', static: false},
//   {x: 6, y: 0, w: 2, h: 3, i: '3', static: false},
//   {x: 8, y: 0, w: 2, h: 3, i: '4', static: false},
//   {x: 10, y: 0, w: 2, h: 3, i: '5', static: false},
//   {x: 0, y: 5, w: 2, h: 5, i: '6', static: false},
//   {x: 2, y: 5, w: 2, h: 5, i: '7', static: false},
//   {x: 4, y: 5, w: 2, h: 5, i: '8', static: false},
//   {x: 6, y: 3, w: 2, h: 4, i: '9', static: true},
//   {x: 8, y: 4, w: 2, h: 4, i: '10', static: false},
//   {x: 10, y: 4, w: 2, h: 4, i: '11', static: false},
//   {x: 0, y: 10, w: 2, h: 5, i: '12', static: false},
//   {x: 2, y: 10, w: 2, h: 5, i: '13', static: false},
//   {x: 4, y: 8, w: 2, h: 4, i: '14', static: false},
//   {x: 6, y: 8, w: 2, h: 4, i: '15', static: false},
//   {x: 8, y: 10, w: 2, h: 5, i: '16', static: false},
//   {x: 10, y: 4, w: 2, h: 2, i: '17', static: false},
//   {x: 0, y: 9, w: 2, h: 3, i: '18', static: false},
//   {x: 2, y: 6, w: 2, h: 2, i: '19', static: false},
// ])

const [emblaRef] = emblaCarouselVue({loop: true}, [
  Autoplay({delay: 4000, stopOnInteraction: false, stopOnFocusIn: false}),
])

const {data: homepageData} = await useSanityQuery<HomepageQueryResult>(homepageQuery)

useSiteMetadata({
  title: homepageData?.value?.seo?.title ?? 'title',
  description: homepageData?.value?.seo?.description ?? 'description',
  ogImage: '',
})

const landingCarouselData = homepageData.value?.landingCarousel ?? []

const featuredArtistData =
  homepageData.value?.featuredArtists?.map((artist) => {
    return {name: artist.name, imgSrc: artist.picture.asset?._id ?? '', slug: artist.slug.current}
  }) ?? []
const currentActiveArtist = ref(0)

const formatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: '2-digit',
})

const featuredEventsData =
  homepageData.value?.featuredEvents?.map((event) => {
    const startDate = new Date(event.dateRange?.startDate ?? '')
    const endDate = new Date(event.dateRange?.endDate ?? '')
    return {
      title: event.title,
      artist: event.artist ?? '',
      imgSrc: event.pictures?.asset?._id ?? '',
      slug: event.slug.current,
      venue: event.venue,
      startDate: formatter.format(startDate),
      endDate: formatter.format(endDate),
    }
  }) ?? []
const currentActiveEvent = ref(0)

function change(index: number) {
  currentActiveArtist.value = index
}
function previous(index: number) {
  currentActiveEvent.value = index !== 0 ? index - 1 : featuredEventsData.length - 1
}
function next(index: number) {
  currentActiveEvent.value = index !== featuredEventsData.length - 1 ? index + 1 : 0
}
</script>

<template>
  <main>
    <section class="flex justify-center px-5 py-[50px] md:px-10">
      <div class="flex w-full max-w-[1440px] flex-col gap-5 lg:flex-row">
        <div
          v-if="landingCarouselData.length > 0"
          ref="emblaRef"
          class="overflow-hidden lg:order-2 lg:w-fit lg:max-w-[627px] lg:flex-1"
        >
          <div class="flex">
            <div
              v-for="picture in landingCarouselData"
              :key="picture.picture.asset?._id"
              class="flex w-full flex-[0_0_100%] justify-center"
            >
              <NuxtImg
                provider="sanity"
                :src="`${picture.picture.asset?._id}`"
                :alt="`${picture.picture.alt}`"
                class="w-full lg:order-2 lg:max-w-[400px] lg:flex-1"
              />
            </div>
          </div>
        </div>
        <div
          class="flex w-full flex-col gap-2.5 self-center md:flex-row md:items-center md:gap-0 lg:order-1 lg:max-w-[542px] lg:flex-1 lg:flex-col lg:items-start lg:gap-5"
        >
          <p
            class="font-cabinet text-[35px] leading-none font-normal tracking-normal md:flex-1 lg:text-[50px]"
          >
            Curating <br class="hidden md:block" />
            Masterpieces,<br class="hidden md:block" />
            Celebrating Artists
          </p>
          <div class="flex flex-col gap-5 md:flex-1">
            <p class="font-satoshi text-lg leading-none font-light tracking-normal">
              {{ homepageData?.landingText }}
            </p>
            <BaseLink variant="secondary" class="w-full" icon to="/gallery">
              <template #icon> <Arrow class="w-[50px]" :font-controlled="false" /></template>
            </BaseLink>
          </div>
        </div>
      </div>
    </section>

    <section class="flex justify-center border-t-[0.5px] border-[#202020] px-5 py-[50px] md:px-10">
      <div class="flex w-full max-w-[1440px] flex-col gap-5">
        <div class="flex flex-col gap-2.5">
          <h2
            class="font-cabinet text-[32px] leading-none font-normal tracking-normal lg:flex-1 lg:text-[50px]"
          >
            Collections
          </h2>
          <p class="font-satoshi text-lg leading-none font-light tracking-normal">
            Discover an exquisite global collection, thoughtfully presented through curated events,
            exhibitions, and exclusive showcases.
          </p>
        </div>
        <div class="grid grid-cols-2 gap-2.5">
          <div
            v-for="(collection, index) in homepageData?.featuredCollections"
            :key="index"
            class="col-span-1 flex size-full"
          >
            <CollectionTile
              v-if="collection?.paintings?.picture?.asset != null"
              :title="collection.title"
              slug="/gallery"
              :image-src="collection?.paintings?.picture?.asset"
            />
            <!-- :slug="collection.slug.current" -->
          </div>
          <BaseLink variant="secondary" class="col-span-2 w-full lg:mx-auto" icon to="/gallery">
            View All
            <template #icon> <Arrow class="w-[50px]" :font-controlled="false" /></template>
          </BaseLink>
        </div>
        <!-- <GridLayout
          v-model:layout="layout"
          :row-height="30"
          :is-draggable="false"
          :is-resizable="false"
        >
          <template #item="{item}">
            <span class="text">{{ `${item.i}${item.static ? '- Static' : ''}` }}</span>
          </template>
        </GridLayout> -->
      </div>
    </section>

    <section
      class="flex w-full flex-col gap-5 overflow-hidden border-t-[0.5px] border-[#202020] py-[50px] pl-5 md:pl-10"
    >
      <div class="mx-auto flex w-full max-w-[1440px] flex-col gap-2.5 pr-5 md:pr-10">
        <h2
          class="font-cabinet text-[32px] leading-none font-normal tracking-normal lg:flex-1 lg:text-[50px]"
        >
          Featured
        </h2>
        <p class="font-satoshi text-lg leading-none font-light tracking-normal">
          Discover an exquisite global collection, thoughtfully presented through curated events,
          exhibitions, and exclusive showcases.
        </p>
      </div>
      <div class="mx-auto w-full max-w-[1440px]">
        <div
          class="flex h-full w-full gap-2.5 overflow-x-auto overflow-y-hidden pr-5 [scrollbar-width:thin] md:pr-10"
        >
          <template v-for="(painting, index) in homepageData?.featuredPaintings" :key="index">
            <PaintingTile
              v-if="painting?.picture?.asset != null"
              :name="painting.name"
              :artist="painting.artist"
              :year="painting.year"
              :medium="painting.medium ?? ``"
              :image-src="painting.picture.asset"
            />
          </template>
          <template v-for="(painting, index) in homepageData?.featuredPaintings" :key="index">
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

    <section class="relative flex w-full justify-center border-t-[0.5px] border-[#202020]">
      <NuxtImg
        src="/hp-artist-bg-mobile.png"
        class="pointer-events-none absolute size-full opacity-50 md:hidden"
      />
      <NuxtImg
        src="/hp-artist-bg-tablet.png"
        class="pointer-events-none absolute hidden size-full md:block xl:hidden"
      />
      <NuxtImg
        src="/hp-artist-bg-desktop.png"
        class="pointer-events-none absolute hidden size-full xl:block"
      />
      <div class="flex w-full max-w-[1440px] flex-col gap-5 px-5 py-[50px] md:px-10">
        <div class="mx-auto flex w-full max-w-[1440px] flex-col gap-2.5">
          <h2
            class="font-cabinet text-[32px] leading-none font-normal tracking-normal lg:flex-1 lg:text-[50px]"
          >
            Artists’ Overview
          </h2>
          <p class="font-satoshi text-lg leading-none font-light tracking-normal">
            Discover an exquisite global collection, thoughtfully presented through curated events,
            exhibitions, and exclusive showcases.
          </p>
        </div>
        <div
          v-if="featuredArtistData.length !== 0"
          class="relative flex flex-col gap-2.5 lg:flex-row"
        >
          <div
            class="relative flex min-h-[400px] w-full max-w-[650px] self-center sm:min-h-[500px] lg:order-2 lg:max-h-[510px] lg:max-w-full lg:flex-1"
          >
            <Transition mode="out-in" name="fade">
              <NuxtImg
                :key="currentActiveArtist"
                provider="sanity"
                :src="`${featuredArtistData[currentActiveArtist].imgSrc}`"
                :alt="`${featuredArtistData[currentActiveArtist].name}`"
                :class="`pointer-events-none absolute inset-0 m-auto max-h-[400px] w-full object-cover sm:max-h-[500px] lg:max-h-full`"
              />
            </Transition>
          </div>
          <div
            class="flex w-full gap-2.5 pb-4 text-nowrap max-lg:overflow-x-auto max-lg:[scrollbar-width:none] lg:order-1 lg:flex-1 lg:flex-col lg:justify-center lg:gap-4"
          >
            <button
              v-for="(artist, index) in featuredArtistData"
              :key="featuredArtistData[index].slug"
              :class="`h-fit w-full cursor-pointer ${
                featuredArtistData[index].slug === featuredArtistData[currentActiveArtist].slug
                  ? `font-medium underline underline-offset-12`
                  : ``
              }`"
              @click="change(index)"
            >
              {{ artist.name }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="flex justify-center border-t-[0.5px] border-[#202020] px-5 py-[50px] md:px-10">
      <div class="flex w-full max-w-[1440px] flex-col gap-5">
        <div class="flex flex-col gap-2.5">
          <h2
            class="font-cabinet text-[32px] leading-none font-normal tracking-normal lg:flex-1 lg:text-[50px]"
          >
            Upcoming Events
          </h2>
          <p class="font-satoshi text-lg leading-none font-light tracking-normal">
            Discover an exquisite global collection, thoughtfully presented through curated events,
            exhibitions, and exclusive showcases.
          </p>
        </div>
        <div class="flex h-full">
          <div
            class="relative inset-0 flex w-full flex-col items-center justify-center md:grid md:grid-cols-2"
          >
            <Transition mode="out-in" name="fade">
              <div
                :key="currentActiveEvent"
                class="mx-auto w-full flex-1 max-lg:max-w-xl lg:col-span-1"
              >
                <NuxtImg
                  provider="sanity"
                  :src="`${featuredEventsData[currentActiveEvent].imgSrc}`"
                  :alt="`${featuredEventsData[currentActiveEvent].title}`"
                  class="w-full md:aspect-square"
                />
              </div>
            </Transition>
            <div
              class="flex size-full min-h-[260px] flex-1 flex-col gap-10 bg-[linear-gradient(264.83deg,rgba(252,251,247,0.25)_-4.61%,rgba(129,178,219,0.25)_44.28%,rgba(214,51,46,0.25)_112.37%)] px-5 pt-10 max-lg:max-w-xl lg:col-span-1 lg:gap-[60px]"
            >
              <Transition mode="out-in" name="fade">
                <div :key="currentActiveEvent" class="flex flex-col gap-2.5">
                  <p class="font-cabinet text-2xl/none font-bold tracking-normal">
                    {{ featuredEventsData[currentActiveEvent].title }}
                  </p>
                  <div class="flex flex-col gap-2.5">
                    <p class="font-satoshi text-base/none font-light tracking-normal">
                      by {{ featuredEventsData[currentActiveEvent].artist }}
                    </p>
                    <p class="font-satoshi text-sm/none font-light tracking-normal">
                      {{ featuredEventsData[currentActiveEvent].startDate }} |
                      {{ featuredEventsData[currentActiveEvent].venue }}
                    </p>
                  </div>
                </div>
              </Transition>
              <div class="flex gap-2.5">
                <button
                  :class="`flex h-[30px] w-[45px] cursor-pointer justify-center rounded-[86px] border-[0.5px] border-[#202020] hover:bg-black hover:text-white`"
                  @click="previous(currentActiveEvent)"
                >
                  <Arrow class="w-[20px] rotate-180" :font-controlled="false" />
                </button>
                {{ currentActiveEvent + 1 }} / {{ featuredEventsData.length }}
                <button
                  :class="`flex h-[30px] w-[45px] cursor-pointer justify-center rounded-[86px] border-[0.5px] border-[#202020] hover:bg-black hover:text-white`"
                  @click="next(currentActiveEvent)"
                >
                  <Arrow class="w-[20px]" :font-controlled="false" />
                </button>
              </div>
              <div class="hidden lg:block">
                <BaseLink variant="primary" class="bg-patrimonio-beige w-full" icon to="/gallery">
                  View all upcoming events | {{ featuredEventsData.length }} |
                  <template #icon> <Arrow class="w-[50px]" :font-controlled="false" /></template>
                </BaseLink>
              </div>
            </div>
          </div>
        </div>
        <div class="lg:hidden">
          <BaseLink variant="secondary" class="w-full" icon to="/gallery">
            View all upcoming events | {{ featuredEventsData.length }} |
            <template #icon> <Arrow class="w-[50px]" :font-controlled="false" /></template>
          </BaseLink>
        </div>
      </div>
    </section>

    <section class="flex justify-center border-t-[0.5px] border-[#202020] px-5 py-[50px] md:px-10">
      <div class="flex w-full max-w-[1440px] flex-col gap-[50px]">
        <div class="flex flex-col gap-2.5">
          <h2
            class="font-cabinet text-[32px] leading-none font-normal tracking-normal lg:flex-1 lg:text-[50px]"
          >
            Media & Press
          </h2>
          <p class="font-satoshi text-lg leading-none font-light tracking-normal">
            Discover an exquisite global collection, thoughtfully presented through curated events,
            exhibitions, and exclusive showcases.
          </p>
        </div>
        <div
          class="grid auto-rows-fr grid-cols-1 gap-x-5 gap-y-[50px] md:grid-cols-2 lg:grid-cols-3"
        >
          <NuxtLink
            v-for="press in homepageData?.featuredPress"
            :key="press.slug.current"
            :to="`/gallery`"
            class="h-full w-full"
          >
            <!-- :to="`/press/${press.slug.current}`" -->
            <div
              class="bg-patrimonio-beige col-span-1 flex h-full w-full flex-col justify-between gap-5 border border-black p-5"
            >
              <div class="flex">
                <div class="flex flex-col gap-2.5">
                  <p class="font-cabinet text-lg/none font-medium tracking-normal">
                    {{ press.title }}
                  </p>
                  <p
                    class="font-satoshi text-xl/none font-light tracking-normal hover:line-clamp-none"
                  >
                    {{ press.excerpt }}
                  </p>
                </div>
                <Arrow class="w-[50px] self-end" :font-controlled="false" />
              </div>
              <NuxtImg
                provider="sanity"
                :src="`${press.featuredImage.asset?._id}`"
                :alt="`${press.featuredImage.alt}`"
                class="h-40 w-full object-cover"
              />
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<style scoped>
.vgl-layout {
  background-color: #eee;
}

:deep(.vgl-item:not(.vgl-item--placeholder)) {
  background-color: #ccc;
  border: 1px solid black;
}

:deep(.vgl-item--resizing) {
  opacity: 90%;
}

:deep(.vgl-item--static) {
  background-color: #cce;
}

.text {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: auto;
  font-size: 24px;
  text-align: center;
}
</style>
