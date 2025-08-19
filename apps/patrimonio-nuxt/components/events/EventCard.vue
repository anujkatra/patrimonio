<script setup lang="ts">
import {twMerge} from 'tailwind-merge'
import { NuxtImg } from '#components';
import type { SanityImageAssetDocument } from '@sanity/client';

const props = defineProps<{
  excerpt: string
  title: string
  dateRange:{endDate:string , startDate:string}
  imageSrc: SanityImageAssetDocument
  class?: string
  link:string
  venue:string
}>()
</script>

<template>
    <a :href="link" target="_blank" :class="twMerge(`first:border-y h-[400px] not-first:border-b border-patrimonio-black max-md:gap-5 flex flex-col md:flex-row md:py-7 md:justify-between lg:pl-12 items-stretch`,props.class)">
        <div class="flex flex-col py-5 h-full gap-2.5 md:max-w-2/5 md:flex-1">
            <label class="">UPCOMING</label>
            <h3 class="font-cabinet text-2xl/none font-medium">{{ props.title }}</h3>
            <p class="font-cabinet text-lg">{{ props.excerpt }}</p>
            <p class="mt-auto">{{ props?.venue ?? "" }} {{ props?.dateRange?.startDate ? `| ${new Date(props?.dateRange?.startDate)}` : "" }}{{ props?.dateRange?.endDate ? ` -  ${new Date(props.dateRange.endDate)}` : ""}}</p>
        </div>
        <NuxtImg 
        provider="sanity"
        class="md:flex-[0.2]"
        :src="`${props?.imageSrc?._ref}`"
        :alt="`${props.title}`" />
    </a>
</template>