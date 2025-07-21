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
const currentActiveFeaturedArtist = ref(featuredArtistData[0])
console.log('test', featuredArtistData)
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
        class="pointer-events-none absolute size-full opacity-50"
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
        <div class="relative flex flex-col gap-2.5 lg:flex-row">
          <div
            class="relative flex min-h-[400px] w-full max-w-[650px] self-center transition-all duration-300 ease-in-out sm:min-h-[500px] lg:order-2 lg:max-h-[510px] lg:max-w-full lg:flex-1"
          >
            <template v-for="artist in featuredArtistData" :key="artist.slug">
              <Transition
                enter-from-class="opacity-0"
                enter-active-class="transition duration-300 ease-in-out"
                leave-to-class="opacity-0"
                leave-active-class="transition duration-300 ease-in-out"
              >
                <NuxtImg
                  v-if="artist.slug === currentActiveFeaturedArtist.slug"
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
              v-for="artist in homepageData?.featuredArtists"
              :key="artist.slug.current"
              :class="`h-fit w-full cursor-pointer ${artist.slug.current === currentActiveFeaturedArtist.slug ? `font-medium underline underline-offset-12` : ``}`"
              @click="
                currentActiveFeaturedArtist = {
                  name: artist.name,
                  imgSrc: artist.picture.asset?._id ?? ``,
                  slug: artist.slug.current,
                }
              "
            >
              {{ artist.name }}
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
