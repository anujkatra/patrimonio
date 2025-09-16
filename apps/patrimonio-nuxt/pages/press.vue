<script lang="ts" setup>
import {ourStoryPageQuery} from '~/sanity/queries'
import type {OurStoryPageQueryResult} from '~/sanity/types'

// const {data: ourStoryPageData} = await useSanityQuery<OurStoryPageQueryResult>(ourStoryPageQuery)

// useSiteMetadata({
//   title: ourStoryPageData?.value?.seo?.title ?? 'title',
//   description: ourStoryPageData?.value?.seo?.description ?? 'description',
//   ogImage: '',
// })
</script>

<template>
  <main>
    <section class="flex justify-center px-5 py-[50px] md:px-10 md:py-[70px] xl:px-[70px]">
      <div class="flex w-full max-w-[1300px] flex-col items-center gap-5 lg:gap-[70px] xl:gap-10">
        <!-- <div class="flex w-full border-b-[0.5px] border-solid border-[#202020] pb-5 lg:pb-8"> -->

        <!-- </div> -->
        <p>press</p>
      </div>
    </section>
  </main>
</template>
