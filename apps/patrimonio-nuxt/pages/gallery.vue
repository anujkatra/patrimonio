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
console.log('test', galleryPageData.value)
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
  </main>
</template>
