<script lang="ts" setup>
import { homepageQuery } from "~/sanity/queries";
import type { HomepageQueryResult } from "~/sanity/types";

const {data:homepageData} = await useSanityQuery<HomepageQueryResult>(homepageQuery);

useSiteMetadata({
  title: homepageData?.value?.seo?.title ?? "title",
  description:homepageData?.value?.seo?.description ?? "description",
  ogImage:"",
});
</script>

<template>
 <p class="text-center">index vue test</p>
 <p class="text-center">{{homepageData?.title}}</p>
 <p class="text-center">{{homepageData?.landingText}}</p>
 <NuxtImg provider="sanity" :src="`${homepageData?.landingImage.asset?._id}`" :alt="`${homepageData?.landingImage.alt}`" sizes="md:400px" class="mx-auto" />
</template>

