<script lang="ts" setup>
import {artistQuery} from '~/sanity/queries'
import type {ArtistQueryResult} from '~/sanity/types'

const route = useRoute()
const {data: artistData} = await useSanityQuery<ArtistQueryResult>(artistQuery, {
  slug: route.params.slug,
})

if (artistData.value === null) {
  throw createError({
    statusCode: 404,
    message: 'not found',
    fatal: true,
  })
}

useSiteMetadata({
  title: artistData?.value?.seo?.title ?? 'title',
  description: artistData?.value?.seo?.description ?? 'description',
  ogImage: '',
})
</script>

<template>
  <main>
    <section class="flex justify-center px-5 py-[50px] md:px-10 md:py-[70px] xl:px-[70px]">
      <div class="flex w-full max-w-[1300px] flex-col items-center gap-5">
        <div class="flex w-full border-b-[0.5px] border-solid border-[#202020] pb-2.5">
          <h1
            class="font-cabinet py-1 text-[35px]/none font-normal tracking-normal lg:text-[76px] xl:text-8xl/none"
          >
            {{ artistData?.name }}
          </h1>
        </div>
      </div>
    </section>
  </main>
</template>
