<script lang="ts" setup>
import {homepageQuery} from '~/sanity/queries'
import type {HomepageQueryResult} from '~/sanity/types'
import Arrow from '~/assets/svg/arrow.svg'
import {ref} from 'vue'

const {data: homepageData} = await useSanityQuery<HomepageQueryResult>(homepageQuery)

useSiteMetadata({
  title: homepageData?.value?.seo?.title ?? 'title',
  description: homepageData?.value?.seo?.description ?? 'description',
  ogImage: '',
})

const featuredArtistData =
  homepageData.value?.featuredArtists?.map((artist) => {
    return {name: artist.name, imgSrc: artist.picture.asset?._id ?? '', slug: artist.slug.current}
  }) ?? []
const currentActiveFeaturedArtist = ref(0)

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
      imgSrc: event.pictures?.asset?._id ?? '',
      slug: event.slug.current,
      venue: event.venue,
      startDate: formatter.format(startDate),
      endDate: formatter.format(endDate),
    }
  }) ?? []
const currentActiveEvent = ref(0)

function change(index: number) {
  currentActiveFeaturedArtist.value = index
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
        <NuxtImg
          provider="sanity"
          :src="`${homepageData?.landingImage.asset?._id}`"
          :alt="`${homepageData?.landingImage.alt}`"
          class="mx-auto w-full max-w-[400px] lg:order-2 lg:flex-1"
        />
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
            class="relative flex min-h-[400px] w-full max-w-[650px] self-center transition-all duration-300 ease-in-out sm:min-h-[500px] lg:order-2 lg:max-h-[510px] lg:max-w-full lg:flex-1"
          >
            <template v-for="(artist, index) in featuredArtistData" :key="artist.slug">
              <Transition
                enter-from-class="opacity-0"
                enter-active-class="transition duration-300 ease-in-out"
                leave-to-class="opacity-0"
                leave-active-class="transition duration-300 ease-in-out"
              >
                <NuxtImg
                  v-if="
                    featuredArtistData[index].slug ===
                    featuredArtistData[currentActiveFeaturedArtist].slug
                  "
                  provider="sanity"
                  :src="`${artist.imgSrc}`"
                  :alt="`${artist.name}`"
                  :class="`pointer-events-none absolute inset-0 m-auto max-h-[400px] w-full object-cover sm:max-h-[500px] lg:max-h-full`"
                />
              </Transition>
            </template>
          </div>
          <div
            class="flex w-full gap-2.5 pb-4 text-nowrap max-lg:overflow-x-auto max-lg:[scrollbar-width:none] lg:order-1 lg:flex-1 lg:flex-col lg:justify-center lg:gap-4"
          >
            <button
              v-for="(artist, index) in featuredArtistData"
              :key="featuredArtistData[index].slug"
              :class="`h-fit w-full cursor-pointer ${
                featuredArtistData[index].slug ===
                featuredArtistData[currentActiveFeaturedArtist].slug
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
        <TransitionGroup name="fade" tag="div">
          <div
            v-for="(event, index) in featuredEventsData"
            :key="event.slug"
            class="flex w-full flex-col items-center justify-center lg:grid lg:grid-cols-2"
          >
            <template
              v-if="featuredEventsData[index].slug === featuredEventsData[currentActiveEvent].slug"
            >
              <div class="mx-auto w-full flex-1 max-lg:max-w-xl lg:col-span-1">
                <NuxtImg
                  provider="sanity"
                  :src="`${event.imgSrc}`"
                  :alt="`${event.title}`"
                  class="w-full object-cover"
                />
              </div>
              <div
                class="flex size-full min-h-[260px] flex-1 flex-col gap-5 bg-[linear-gradient(264.83deg,rgba(252,251,247,0.25)_-4.61%,rgba(129,178,219,0.25)_44.28%,rgba(214,51,46,0.25)_112.37%)] px-5 pt-10 max-lg:max-w-xl lg:col-span-1"
              >
                <div class="flex flex-col gap-[5px]">
                  <p class="font-cabinet text-2xl/none font-bold tracking-normal">
                    {{ event.title }}
                  </p>
                  <div class="flex flex-col gap-2.5">
                    <p class="font-satoshi text-base/none font-light tracking-normal">by Artist</p>
                    <p class="font-satoshi text-sm/none font-light tracking-normal">
                      {{ event.startDate }} | {{ event.venue }}
                    </p>
                  </div>
                </div>
                <div class="flex gap-2.5">
                  <button
                    :class="`flex h-[30px] w-[45px] cursor-pointer justify-center rounded-[86px] border-[0.5px] border-[#202020] hover:bg-black hover:text-white`"
                    @click="previous(index)"
                  >
                    <Arrow class="w-[20px] rotate-180" :font-controlled="false" />
                  </button>
                  {{ index + 1 }} / {{ featuredEventsData.length }}
                  <button
                    :class="`flex h-[30px] w-[45px] cursor-pointer justify-center rounded-[86px] border-[0.5px] border-[#202020] hover:bg-black hover:text-white`"
                    @click="next(index)"
                  >
                    <Arrow class="w-[20px]" :font-controlled="false" />
                  </button>
                </div>
              </div>
            </template>
          </div>
        </TransitionGroup>
      </div>
    </section>
  </main>
</template>
