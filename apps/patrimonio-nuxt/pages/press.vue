<script lang="ts" setup>
import {pressPageQuery, pressQuery} from '~/sanity/queries'
import type {PressPageQueryResult, PressQueryResult} from '~/sanity/types'
import Arrow from '~/assets/svg/arrow.svg'

const {data: pressPageData} = await useSanityQuery<PressPageQueryResult>(pressPageQuery)
const {data: pressData} = await useSanityQuery<PressQueryResult>(pressQuery)

useSiteMetadata({
  title: pressPageData?.value?.seo?.title ?? 'title',
  description: pressPageData?.value?.seo?.description ?? 'description',
  ogImage: '',
})
</script>

<template>
  <main>
    <section class="flex justify-center px-5 py-[50px] md:px-10 md:py-[70px] xl:px-[70px]">
      <div class="flex w-full max-w-[1300px] flex-col items-center gap-5 lg:gap-[70px] xl:gap-10">
        <div class="flex w-full flex-col gap-2.5">
          <h1
            class="font-cabinet text-[35px] leading-none font-normal tracking-normal md:flex-1 lg:text-[50px]"
          >
            {{ pressPageData?.title }}
          </h1>
          <p class="font-satoshi text-lg leading-none font-light tracking-normal">
            {{ pressPageData?.subtitle ?? '' }}
          </p>
        </div>
        <div
          class="grid w-full grid-cols-1 gap-5 md:grid-cols-2 md:gap-y-[50px] lg:grid-cols-3 lg:gap-y-5"
        >
          <NuxtLink
            v-for="pressItem in pressData"
            :key="pressItem._id"
            :to="pressItem.link"
            class="w-full max-w-[462px] lg:max-w-[420px]"
            target="_blank"
          >
            <div
              class="border-patrimonio-black flex h-full flex-col justify-between gap-5 border-[0.5px] p-5"
            >
              <div class="flex justify-between">
                <div class="flex flex-col gap-2.5">
                  <p class="font-cabinet text-lg/none font-medium tracking-normal">
                    {{ pressItem.title }}
                  </p>
                  <p class="font-satoshi text-base/none font-light tracking-normal">
                    {{ pressItem.excerpt }}
                  </p>
                </div>
                <div class="flex items-end">
                  <Arrow class="w-[35px]" :font-controlled="false" />
                </div>
              </div>
              <NuxtImg
                provider="sanity"
                class="aspect-video w-full max-w-[350px] object-cover object-center md:max-w-[422px]"
                :src="pressItem?.featuredImage.asset?._ref"
                :alt="pressItem?.featuredImage?.alt"
              />
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>
