<script lang="ts" setup>
import {blogPageQuery} from '~/sanity/queries'
import type {BlogPageQueryResult} from '~/sanity/types'

const {data: blogPageData} = await useSanityQuery<BlogPageQueryResult>(blogPageQuery)
// const {data: pressData} = await useSanityQuery<PressQueryResult>(pressQuery)

useSiteMetadata({
  title: blogPageData?.value?.seo?.title ?? 'title',
  description: blogPageData?.value?.seo?.description ?? 'description',
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
            {{ blogPageData?.title }}
          </h1>
          <p
            v-if="blogPageData?.subtitle"
            class="font-satoshi text-lg leading-none font-light tracking-normal"
          >
            {{ blogPageData?.subtitle }}
          </p>
        </div>
      </div>
    </section>
  </main>
</template>
