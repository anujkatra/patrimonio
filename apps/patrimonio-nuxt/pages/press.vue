<script lang="ts" setup>
import {pressPageQuery, pressQuery} from '~/sanity/queries'
import type {PressPageQueryResult, PressQueryResult} from '~/sanity/types'

const {data: pressPageData} = await useSanityQuery<PressPageQueryResult>(pressPageQuery)
const {data: pressData} = await useSanityQuery<PressQueryResult>(pressQuery)

useSiteMetadata({
  title: pressPageData?.value?.seo?.title ?? 'title',
  description: pressPageData?.value?.seo?.description ?? 'description',
  ogImage: '',
})
console.log('test', pressPageData.value, pressData.value)
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
      </div>
    </section>
  </main>
</template>
