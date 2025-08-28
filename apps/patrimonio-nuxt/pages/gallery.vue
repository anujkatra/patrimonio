<script lang="ts" setup>
import {galleryPageQuery} from '~/sanity/queries'
import type {GalleryPageQueryResult} from '~/sanity/types'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu'

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

const query = groq`*[_type == "painting"][0..10]{
 _id,
  name,
	"artist":artist->.name,
	year,
	"medium":medium->.name,
  picture,
  "size":count(@),
}`
const {data: galleryPaintingData} = await useSanityQuery(query)

console.log('test', galleryPageData.value, galleryPaintingData.value)
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
        <!-- <div>
          <DropdownMenu>
            <DropdownMenuTrigger>Open</DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div> -->
      </div>
    </section>

    <section class="flex justify-center px-5 py-[50px] md:px-10 md:py-[70px] xl:px-[70px]">
      <div class="flex w-full max-w-[1300px] flex-col gap-5 lg:gap-[70px] xl:gap-10">
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
