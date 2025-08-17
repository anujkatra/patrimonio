<script lang="ts" setup>
import {artistsPageQuery, eventsPageQuery} from '~/sanity/queries'
import type {ArtistsPageQueryResult} from '~/sanity/types'
import Arrow from '~/assets/svg/arrow.svg'

const {data: eventsPageData} = await useSanityQuery<ArtistsPageQueryResult>(eventsPageQuery);
console.log({eventsPageData})

useSiteMetadata({
  title: eventsPageData?.value?.seo?.title ?? 'Events',
  description: eventsPageData?.value?.seo?.description ?? 'Keep yourself upto date with events conducted by Patrimonio Gallery',
  ogImage: '',
})
</script>

<template>
  <main>
    <section class="flex justify-center px-5 py-[50px] md:px-10 md:py-[70px] xl:px-[70px]">
      <div class="flex w-full max-w-[1300px] flex-col items-center gap-5">
        <div class="flex w-full flex-col gap-2.5">
          <h1
            class="font-cabinet text-[35px] leading-none font-normal tracking-normal md:flex-1 lg:text-[50px]"
          >
            {{ eventsPageData?.title }}
          </h1>
          <p class="font-satoshi text-lg leading-none font-light tracking-normal">
            {{ eventsPageData?.subtitle ?? '' }}
          </p>
        </div>
      </div>
    </section>
  </main>
</template>
