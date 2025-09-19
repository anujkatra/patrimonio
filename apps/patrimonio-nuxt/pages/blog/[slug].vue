<script lang="ts" setup>
import {individualBlogQuery} from '~/sanity/queries'
import type {IndividualBlogQueryResult} from '~/sanity/types'

const route = useRoute()
const {data: blogData} = await useSanityQuery<IndividualBlogQueryResult>(individualBlogQuery, {
  slug: route.params.slug,
})

if (blogData.value === null) {
  throw createError({
    statusCode: 404,
    message: 'not found',
    fatal: true,
  })
}

useSiteMetadata({
  title: blogData?.value?.seo?.title ?? 'title',
  description: blogData?.value?.seo?.description ?? 'description',
  ogImage: '',
})
</script>

<template>
  <main>
    <section class="flex justify-center px-5 py-[50px] md:px-10 md:py-[70px] xl:px-[70px]">
      <div class="flex w-full max-w-[1300px] flex-col items-center gap-5 lg:gap-10">
        <div class="flex w-full flex-col gap-5 lg:gap-10">
          <div
            class="flex flex-col gap-[15px] md:gap-5 md:text-center lg:mx-auto lg:w-[85%] xl:w-3/4"
          >
            <div class="flex flex-col gap-2.5">
              <p class="font-satoshi text-[15px]/none tracking-normal uppercase">
                {{ blogData?.subtitle }}
              </p>
              <p class="font-cabinet text-2xl/none font-medium tracking-normal lg:text-[45px]/none">
                {{ blogData?.title }}
              </p>
            </div>
            <p class="font-satoshi text-[15px]/none tracking-normal">
              <span>
                {{ blogData?.author }}
              </span>
              <span v-if="blogData?.publishDate">
                |
                <NuxtTime
                  :datetime="blogData?.publishDate"
                  year="numeric"
                  month="short"
                  day="numeric"
                  locale="en-IN"
              /></span>
            </p>
          </div>
          <div class="flex w-full">
            <NuxtImg
              provider="sanity"
              class="w-full object-cover object-center"
              :src="blogData?.featuredImage.asset?._ref"
              :alt="blogData?.featuredImage?.alt"
            />
          </div>
          <div
            class="font-satoshi flex flex-col gap-5 text-base/none tracking-normal lg:mx-auto lg:max-w-[814px] lg:gap-10 lg:text-lg/none"
            :v-if="blogData?.description"
          >
            <SanityContent :blocks="blogData?.description ?? []" />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
