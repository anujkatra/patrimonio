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
 <p>test</p>
 <p>{{ homepageData }}</p>
</template>

