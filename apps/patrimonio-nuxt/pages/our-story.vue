<script lang="ts" setup>
import {ourStoryPageQuery} from '~/sanity/queries'
import type {OurStoryPageQueryResult} from '~/sanity/types'
import Milestone from '~/assets/svg/milestone.svg'

const {data: ourStoryPageData} = await useSanityQuery<OurStoryPageQueryResult>(ourStoryPageQuery)

useSiteMetadata({
  title: ourStoryPageData?.value?.seo?.title ?? 'title',
  description: ourStoryPageData?.value?.seo?.description ?? 'description',
  ogImage: '',
})
</script>

<template>
  <main>
    <section class="flex justify-center px-5 py-[50px] md:px-10 md:py-[70px] xl:px-[70px]">
      <div class="flex w-full max-w-[1300px] flex-col items-center gap-5 lg:gap-[70px] xl:gap-10">
        <div class="flex w-full border-b-[0.5px] border-solid border-[#202020] pb-5 lg:pb-8">
          <h1
            class="font-cabinet text-[35px]/none font-normal tracking-normal lg:text-[45px]/none xl:text-[65px]/none"
          >
            Our Story
          </h1>
        </div>
        <div class="flex w-full flex-col gap-5 md:flex-row lg:gap-[100px] xl:gap-[155px]">
          <div class="flex flex-1 flex-col gap-2.5">
            <h1
              class="font-cabinet text-[32px]/none font-normal tracking-normal md:text-[35px]/none"
            >
              {{ ourStoryPageData?.title }}
            </h1>
            <div class="flex flex-col gap-5 lg:gap-10" :v-if="ourStoryPageData?.content">
              <SanityContent :blocks="ourStoryPageData?.content ?? []" />
            </div>
          </div>
          <div class="w-full flex-1">
            <NuxtImg
              src="/logo.png"
              class="max-h-[65px] w-full md:max-h-[71px] md:max-w-[382px] xl:max-h-[79px] xl:max-w-[425px]"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="relative flex justify-center px-5 pb-[50px] md:px-10 md:pb-[70px] xl:px-[70px]">
      <NuxtImg
        src="/our-story-team-bg-mobile.png"
        class="pointer-events-none absolute bottom-0 size-full opacity-50 md:hidden"
      />
      <NuxtImg
        src="/our-story-team-bg-tablet.png"
        class="pointer-events-none absolute bottom-0 hidden size-full md:block xl:hidden"
      />
      <NuxtImg
        src="/our-story-team-bg-desktop.png"
        class="pointer-events-none absolute bottom-0 hidden size-full xl:block"
      />
      <div class="flex w-full max-w-[1300px] flex-col items-center gap-[50px]">
        <template v-if="ourStoryPageData?.ourTeam">
          <div
            v-for="(teamMember, index) in ourStoryPageData.ourTeam"
            :key="index"
            class="flex w-full flex-col gap-[50px] md:gap-[70px]"
          >
            <div class="w-full border-b-[0.5px] border-solid border-[#202020] pb-5">
              <h1
                class="font-cabinet text-[32px]/none font-normal tracking-normal lg:text-[35px]/none"
              >
                {{ teamMember.title }}
              </h1>
            </div>
            <div class="flex flex-col gap-5 md:flex-row lg:gap-10">
              <div class="w-full flex-1">
                <NuxtImg
                  provider="sanity"
                  :src="`${teamMember?.picture.asset?._ref}`"
                  :alt="`${teamMember?.picture.alt}`"
                  class="aspect-[12/9] w-full object-cover object-center"
                />
              </div>
              <div class="flex flex-1 flex-col gap-5">
                <div>
                  <h1 class="font-cabinet text-2xl/none tracking-normal xl:text-[65px]/none">
                    {{ teamMember.name }}
                  </h1>
                  <h1 class="font-satoshi text-lg/none tracking-normal lg:text-xl/none">
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

    <template v-if="ourStoryPageData?.milestones">
      <section class="flex justify-center px-5 py-[50px] md:px-10 md:py-[70px] xl:px-[70px]">
        <div class="flex w-full max-w-[1300px] flex-col gap-5">
          <h1 class="font-cabinet text-[35px]/none font-normal tracking-normal">
            Milestones & Collaborations
          </h1>
          <div
            class="grid w-full grid-cols-1 justify-center gap-[50px] border-[0.5px] border-[#202020] px-10 py-[70px] md:grid-cols-2 lg:grid-cols-3 xl:gap-x-[100px]"
          >
            <div
              v-for="(milestone, index) in ourStoryPageData.milestones"
              :key="index"
              class="col-span-1 mx-auto flex w-full max-w-[240px] flex-col gap-2.5"
            >
              <p class="font-satoshi text-xl/none font-medium tracking-normal lg:text-2xl/none">
                {{ milestone.year }}
              </p>
              <Milestone class="text-patrimonio-blue w-full" :font-controlled="false" />
              <p class="font-satoshi text-lg/none font-light tracking-normal lg:text-xl/none">
                {{ milestone.milestone }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </template>
  </main>
</template>
