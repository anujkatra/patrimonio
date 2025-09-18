<script lang="ts" setup>
import {blogPageQuery, blogQuery, blogCountQuery} from '~/sanity/queries'
import type {BlogCountQueryResult, BlogPageQueryResult, BlogQueryResult} from '~/sanity/types'
import Arrow from '~/assets/svg/arrow.svg'
const sanity = useSanity()
const route = useRoute()
const router = useRouter()

onMounted(() => {
  // Check if 'page' query param exists, if not, add a default
  if (!route.query.page) {
    router.replace({
      query: {...route.query, page: 1},
    })
  }
})

const itemsPerPage = 1
const page = computed(() => (typeof route.query.page === 'string' ? parseInt(route.query.page) : 1))
const startIndex = computed(() => (page.value - 1) * itemsPerPage)
const endIndex = computed(() => startIndex.value + itemsPerPage)

function updatePage(value: number) {
  router.replace({query: {...route.query, page: value}})
}

const blogsQuery = blogQuery

const {data: blogData} = await useAsyncData(
  'blogData',
  () =>
    sanity.fetch<BlogQueryResult>(blogsQuery, {
      startIndex: startIndex.value,
      endIndex: endIndex.value,
    }),
  {watch: [startIndex]},
)

const {data: blogPageData} = await useSanityQuery<BlogPageQueryResult>(blogPageQuery)
const {data: blogCountData} = await useSanityQuery<BlogCountQueryResult>(blogCountQuery)

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
        <div class="flex w-full flex-col gap-5">
          <div
            v-for="blog in blogData"
            :key="blog.slug.current"
            class="border-patrimonio-black flex w-full flex-col gap-5 border-t-[0.5px] pt-5 pb-[50px] last:border-b-[0.5px] md:flex-row lg:gap-[50px]"
          >
            <div class="flex w-full md:flex-1">
              <NuxtImg
                provider="sanity"
                class="w-full object-cover object-center"
                :src="blog?.featuredImage.asset?._ref"
                :alt="blog?.featuredImage?.alt"
              />
            </div>
            <div
              class="flex w-full flex-col gap-[15px] md:flex-1 md:gap-5 lg:gap-[25px] lg:pt-2.5 xl:pt-5"
            >
              <div class="flex w-full flex-col gap-2.5 lg:max-w-[457px]">
                <p class="font-satoshi tracking-none text-[15px]/none uppercase">
                  {{ blog.subtitle }}
                </p>
                <p class="font-cabinet tracking-none text-2xl/none font-medium">{{ blog.title }}</p>
                <p class="font-satoshi tracking-none text-lg/none">{{ blog.excerpt }}</p>
              </div>
              <div
                class="border-patrimonio-black flex justify-between gap-2.5 border-t-[0.5px] pt-[15px] md:h-full md:flex-col lg:h-auto lg:max-w-[457px] lg:pt-[25px]"
              >
                <p class="font-satoshi tracking-none text-[15px]/none">
                  {{ blog.author }} |
                  <NuxtTime
                    :datetime="blog.publishDate"
                    year="numeric"
                    month="short"
                    day="numeric"
                    locale="en-IN"
                  />
                </p>
                <Arrow class="w-[50px] lg:hidden" :font-controlled="false" />
              </div>
            </div>
          </div>
        </div>
        <div class="w-full">
          <Pagination
            :key="page"
            :v-slot="{page}"
            :sibling-count="1"
            :items-per-page="itemsPerPage"
            :total="blogCountData ?? 1"
            :default-page="page"
            :show-edges="true"
            @update:page="(p) => updatePage(p)"
          >
            <PaginationContent v-slot="{items}" class="gap-3">
              <PaginationPrevious size="pagination" />

              <template v-for="(item, index) in items" :key="index">
                <PaginationItem
                  v-if="item.type === 'page'"
                  :value="item.value"
                  :is-active="item.value === page"
                  class="data-[selected=true]:text-patrimonio-beige data-[selected=true]:bg-black"
                  size="pagination"
                >
                  {{ item.value }}
                </PaginationItem>
                <PaginationEllipsis v-else :key="item.type" :index="index">
                  &#8230;
                </PaginationEllipsis>
              </template>
              <PaginationNext size="pagination" />
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </section>
  </main>
</template>
