<script lang="ts" setup>
import {ourStoryPageQuery} from '~/sanity/queries'
import type {OurStoryPageQueryResult} from '~/sanity/types'

const {data: ourStoryPageData} = await useSanityQuery<OurStoryPageQueryResult>(ourStoryPageQuery)

useSiteMetadata({
  title: ourStoryPageData?.value?.seo?.title ?? 'title',
  description: ourStoryPageData?.value?.seo?.description ?? 'description',
  ogImage: '',
})
console.log('test', ourStoryPageData.value)
</script>

<template>
  <main>
    <section class="flex justify-center px-5 py-[50px] md:px-10 md:py-[70px] xl:px-[70px]">
      <div class="flex w-full max-w-[1300px] flex-col items-center gap-5 lg:gap-[30px] xl:gap-10">
        <div class="flex w-full border-b-[0.5px] border-solid border-[#202020] pb-2.5">
          <h1
            class="font-cabinet py-1 text-[35px]/none font-normal tracking-normal lg:text-[76px] xl:text-8xl/none"
          >
            Our Story
          </h1>
        </div>
        <div class="flex w-full flex-col gap-5 md:flex-row lg:gap-10">
          <div class="flex flex-1 flex-col gap-[5px]">
            <h1 class="font-cabinet text-[32px]/none font-normal tracking-normal">
              {{ ourStoryPageData?.title }}
            </h1>
            <div class="flex flex-col gap-5 lg:gap-10" :v-if="ourStoryPageData?.content">
              <SanityContent :blocks="ourStoryPageData?.content ?? []" />
            </div>
          </div>
          <div class="w-full flex-1">
            <NuxtImg src="/logo.png" class="max-h-[65px] w-full" />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
