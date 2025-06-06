<script lang="ts" setup>
import { homepageQuery } from "~/sanity/queries";
import type { HomepageQueryResult } from "~/sanity/types";

const { data } = await useSanityQuery<HomepageQueryResult>(homepageQuery);

// useSiteMetadata({
//   title: post?.seo?.title || post?.value?.title,
//   description: post?.value?.seoDescription || post?.value?.excerpt,
// });
</script>

<template>
 <p>test</p>
</template>

