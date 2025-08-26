<script lang="ts" setup>
import {ourStoryPageQuery} from '~/sanity/queries'
import type {OurStoryPageQueryResult} from '~/sanity/types'

const {data: ourStoryPageData} = await useSanityQuery<OurStoryPageQueryResult>(ourStoryPageQuery)

useSiteMetadata({
  title: ourStoryPageData?.value?.seo?.title ?? 'title',
  description: ourStoryPageData?.value?.seo?.description ?? 'description',
  ogImage: '',
})
console.log('test', ourStoryPageData.value?.ourTeam)
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

    <section class="flex justify-center px-5 py-[50px] md:px-10 md:py-[70px] xl:px-[70px]">
      <div class="flex w-full max-w-[1300px] flex-col items-center gap-[50px]">
        <template v-if="ourStoryPageData?.ourTeam">
          <div
            v-for="(teamMember, index) in ourStoryPageData.ourTeam"
            :key="index"
            class="flex w-full flex-col gap-5"
          >
            <div class="w-full border-b-[0.5px] border-solid border-[#202020] pb-2.5">
              <h1 class="font-cabinet text-[32px]/none font-normal tracking-normal">
                {{ teamMember.title }}
              </h1>
            </div>
            <div class="flex flex-col gap-5 md:flex-row">
              <div class="order-1 w-full flex-1 md:order-2">
                <NuxtImg
                  provider="sanity"
                  :src="`${teamMember?.picture.asset?._ref}`"
                  :alt="`${teamMember?.picture.alt}`"
                  class="aspect-[12/9] w-full object-cover object-center"
                />
              </div>
              <div class="order-2 flex flex-1 flex-col gap-5 md:order-1">
                <div>
                  <h1 class="font-cabinet text-2xl/none tracking-normal">{{ teamMember.name }}</h1>
                  <h1 class="font-satoshi text-lg/none tracking-normal">
                    {{ teamMember.designation }}
                  </h1>
                </div>
                <div class="flex flex-col gap-5 lg:gap-10" :v-if="teamMember.content">
                  <SanityContent :blocks="teamMember.content ?? []" />
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </section>
  </main>
</template>
