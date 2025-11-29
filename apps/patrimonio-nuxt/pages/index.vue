<script lang="ts" setup>
import {homepageQuery} from '~/sanity/queries'
import type {HomepageQueryResult} from '~/sanity/types'
import Arrow from '~/assets/svg/arrow.svg'
import {ref} from 'vue'
import emblaCarouselVue from 'embla-carousel-vue'
import Autoplay from 'embla-carousel-autoplay'

const [emblaRef] = emblaCarouselVue({loop: true, watchDrag: false}, [
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
    return {
      title: event.title,
      artist: event.artist ?? '',
      imgSrc: event.pictures?.asset?._id ?? '',
      slug: event.slug.current,
      venue: event.venue,
      startDate: formatter.format(startDate),
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

const featuredCollectionsLayout = [
  'lg:row-span-7',
  'lg:row-span-6',
  'lg:row-span-5',
  'lg:row-span-5 lg:col-start-1',
  'lg:row-span-4 lg:row-start-9 lg:col-start-2',
  'lg:row-span-7 lg:row-start-6 lg:col-start-3',
]
</script>

<template>
  <main>
    <section class="flex justify-center px-5 py-[50px] md:px-10 md:py-[70px] xl:px-[70px]">
      <div
        class="flex w-full max-w-[1300px] flex-col items-center gap-5 lg:flex-row lg:justify-between"
      >
        <div
          v-if="landingCarouselData.length > 0"
          ref="emblaRef"
          class="overflow-hidden lg:order-2 lg:flex-1"
        >
          <div class="flex">
            <div
              v-for="picture in landingCarouselData"
              :key="picture.picture.asset?._id"
              class="ml-5 flex w-full flex-[0_0_100%] justify-end"
            >
              <NuxtImg
                provider="sanity"
                :src="`${picture.picture.asset?._id}`"
                :alt="`${picture.picture.alt}`"
                class="aspect-square object-cover lg:max-w-[400px]"
              />
            </div>
          </div>
        </div>
        <div class="flex w-full self-center lg:order-1 lg:flex-1">
          <div
            class="flex w-full flex-col gap-2.5 md:flex-row md:items-center md:gap-0 lg:max-w-[542px] lg:flex-col lg:items-start lg:gap-5"
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
      </div>
    </section>

    <section
      v-if="homepageData?.featuredCollections && homepageData?.featuredCollections.length > 0"
      class="flex justify-center border-t-[0.5px] border-[#202020] px-5 py-[50px] md:px-10 md:py-[70px] xl:px-[70px]"
    >
      <div class="flex w-full max-w-[1300px] flex-col gap-5">
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
        <div class="grid grid-cols-2 gap-2.5 md:gap-5 lg:auto-rows-[40px] lg:grid-cols-3">
          <div
            v-for="(collection, index) in homepageData?.featuredCollections"
            :key="index"
            :class="`col-span-1 flex size-full ${featuredCollectionsLayout[index]}`"
          >
            <CollectionTile
              v-if="collection?.paintings?.picture?.asset != null"
              :title="collection.title"
              :slug="collection.slug.current"
              :image-src="collection?.paintings?.picture?.asset"
              class="max-md:aspect-square"
            />
          </div>
          <BaseLink
            variant="secondary"
            class="col-span-2 h-full min-h-[60px] w-full lg:col-span-1 lg:col-start-2 lg:row-span-2 lg:row-start-7 lg:max-w-[unset]"
            icon
            to="/gallery"
          >
            View All &nbsp;| {{ homepageData?.featuredCollections?.length ?? '' }} |
            <template #icon> <Arrow class="w-[50px]" :font-controlled="false" /></template>
          </BaseLink>
        </div>
      </div>
    </section>

    <section
      v-if="homepageData?.featuredPaintings && homepageData?.featuredPaintings.length > 0"
      class="flex w-full flex-col items-center justify-center gap-5 overflow-hidden border-t-[0.5px] border-[#202020] py-[50px] pl-5 md:py-[70px] md:pl-10 xl:pl-[70px]"
    >
      <div class="mx-auto flex w-full max-w-[1370px] flex-col gap-2.5 pr-5 md:pr-10 xl:pr-[70px]">
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
      <div class="mx-auto flex w-full max-w-[1370px] flex-col justify-between gap-5">
        <div
          class="flex h-full w-full gap-2.5 overflow-x-auto overflow-y-hidden pr-5 [scrollbar-width:thin] md:pr-10 xl:pr-[70px]"
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
        <div class="flex w-full pr-5 md:justify-end md:pr-10 xl:pr-[70px]">
          <BaseLink variant="secondary" class="w-full" icon to="/gallery">
            View All
            <template #icon> <Arrow class="w-[50px]" :font-controlled="false" /></template>
          </BaseLink>
        </div>
      </div>
    </section>

    <section
      v-if="homepageData?.featuredArtists && homepageData?.featuredArtists.length > 0"
      class="relative flex w-full justify-center border-t-[0.5px] border-[#202020]"
    >
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
      <div
        class="flex w-full max-w-[1440px] flex-col gap-5 px-5 py-[50px] md:px-10 md:py-[70px] xl:px-[70px]"
      >
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
        <div class="relative flex flex-col gap-2.5 lg:flex-row">
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
            class="flex w-full gap-5 pb-4 text-nowrap max-lg:overflow-x-auto max-lg:[scrollbar-width:none] lg:order-1 lg:flex-1 lg:flex-col lg:justify-center"
          >
            <button
              v-for="(artist, index) in featuredArtistData"
              :key="featuredArtistData[index].slug"
              :class="`font-satoshi h-fit w-full cursor-pointer py-2.5 text-lg leading-none font-normal md:text-[22px] ${
                featuredArtistData[index].slug === featuredArtistData[currentActiveArtist].slug
                  ? `font-semibold underline underline-offset-10`
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

    <section
      v-if="featuredEventsData.length > 0"
      class="flex justify-center border-t-[0.5px] border-[#202020] px-5 py-[50px] md:px-10 md:py-[70px] xl:px-[70px]"
    >
      <div class="flex w-full max-w-[1300px] flex-col gap-5">
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
                  View all upcoming events &nbsp;| {{ featuredEventsData.length }} |
                  <template #icon> <Arrow class="w-[50px]" :font-controlled="false" /></template>
                </BaseLink>
              </div>
            </div>
          </div>
        </div>
        <div class="lg:hidden">
          <BaseLink variant="secondary" class="w-full" icon to="/gallery">
            View all upcoming events &nbsp;| {{ featuredEventsData.length }} |
            <template #icon> <Arrow class="w-[50px]" :font-controlled="false" /></template>
          </BaseLink>
        </div>
      </div>
    </section>

    <section
      v-if="homepageData?.featuredPress && homepageData?.featuredPress.length > 0"
      class="flex justify-center border-t-[0.5px] border-[#202020] px-5 py-[50px] md:px-10 md:py-[70px] xl:px-[70px]"
    >
      <div class="flex w-full max-w-[1300px] flex-col gap-[50px]">
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
            :to="press.link"
            class="h-full w-full"
          >
            <div
              class="bg-patrimonio-beige col-span-1 flex h-full w-full max-w-[350px] flex-col justify-between gap-5 border border-black p-5 md:max-w-[462px] lg:h-[470px] lg:max-w-[420px] lg:justify-between lg:py-[30px]"
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
                <Arrow class="w-[50px] self-end lg:hidden" :font-controlled="false" />
              </div>
              <NuxtImg
                provider="sanity"
                :src="`${press.featuredImage.asset?._id}`"
                :alt="`${press.featuredImage.alt}`"
                class="h-40 w-full object-cover lg:h-60"
              />
            </div>
          </NuxtLink>
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
