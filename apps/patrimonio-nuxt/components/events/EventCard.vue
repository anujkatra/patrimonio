<script setup lang="ts">
import {twMerge} from 'tailwind-merge'

const props = defineProps<{
  excerpt?: string
  title?: string
  dateRange?: {endDate: string; startDate: string}
  imageSrc?: string
  class?: string
  link?: string
  venue?: string
}>()
</script>

<template>
  <a
    :href="link"
    target="_blank"
    :class="
      twMerge(
        `border-patrimonio-black flex h-[400px] flex-col items-stretch not-first:border-b first:border-y max-md:gap-5 md:flex-row md:justify-between md:py-7 lg:pl-12`,
        props.class,
      )
    "
  >
    <div class="flex h-full flex-col gap-2.5 py-5 md:max-w-2/5 md:flex-1">
      <label class="">UPCOMING</label>
      <h3 class="font-cabinet text-2xl/none font-medium">{{ props.title }}</h3>
      <p class="font-cabinet text-lg">{{ props.excerpt }}</p>
      <p class="mt-auto">
        {{ props?.venue ?? '' }}
        {{ props?.dateRange?.startDate ? `| ${new Date(props?.dateRange?.startDate)}` : ''
        }}{{ props?.dateRange?.endDate ? ` -  ${new Date(props.dateRange.endDate)}` : '' }}
      </p>
    </div>
    <NuxtImg
      provider="sanity"
      class="md:flex-[0.2]"
      :src="`${props?.imageSrc}`"
      :alt="`${props.title}`"
    />
  </a>
</template>
