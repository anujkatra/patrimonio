<script setup lang="ts">
import {twMerge} from 'tailwind-merge'
import type {DateRange} from '~/sanity/types'

const props = defineProps<{
  excerpt?: string
  title?: string
  dateRange?: DateRange
  imageSrc?: string
  class?: string
  link?: string
  venue: string
}>()
</script>

<template>
  <a
    :href="link"
    target="_blank"
    :class="
      twMerge(
        `border-patrimonio-black flex h-full flex-col gap-5 border-b-[0.5px] pb-[50px] md:max-h-[360px] md:flex-row md:justify-between`,
        props.class,
      )
    "
  >
    <div class="flex w-full flex-col gap-2.5 md:max-w-[457px] md:flex-1 md:gap-5">
      <label class="">UPCOMING</label>
      <div class="flex flex-col gap-2.5 md:gap-5">
        <h3 class="font-cabinet text-2xl/none font-bold">{{ props.title }}</h3>
        <p class="font-satoshi text-lg/none font-light">{{ props.excerpt }}</p>
      </div>
      <div class="font-satoshi flex h-5 items-center gap-2.5 text-sm/none font-light md:gap-5">
        <p>{{ props?.venue }}</p>
        <div class="border-patrimonio-black h-full border-l-[0.5px]" />
        <div>
          <NuxtTime
            :datetime="props.dateRange?.startDate ?? ''"
            year="numeric"
            month="short"
            day="numeric"
          />
          <span v-if="props.dateRange?.endDate">
            -
            <NuxtTime
              :datetime="props.dateRange.endDate"
              year="numeric"
              month="short"
              day="numeric"
          /></span>
        </div>
      </div>
    </div>
    <NuxtImg
      provider="sanity"
      class="w-full max-w-[630px] object-cover"
      :src="`${props?.imageSrc}`"
      :alt="`${props.title}`"
    />
  </a>
</template>
