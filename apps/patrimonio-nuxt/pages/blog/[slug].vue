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
      <div class="flex w-full max-w-[1300px] flex-col items-center gap-5 lg:gap-[30px] xl:gap-10">
        <p>Blog Page {{ blogData?.title }}</p>
      </div>
    </section>
  </main>
</template>
