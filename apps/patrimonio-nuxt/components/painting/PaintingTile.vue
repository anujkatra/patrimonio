<script setup lang="ts">
import type {SanityImageAsset} from '~/sanity/types'
import {twMerge} from 'tailwind-merge'

const props = defineProps<{
  name: string
  artist: string
  year: number
  medium?: string
  imageSrc: SanityImageAsset
  class?: string
}>()
</script>

<template>
  <div :class="twMerge(`group flex w-[300px] flex-col gap-5 pb-5 md:w-[350px]`, props.class)">
    <NuxtImg
      provider="sanity"
      :src="`${props.imageSrc._id}`"
      :alt="`${props.name}`"
      class="aspect-square min-w-[300px] md:min-w-[350px]"
    />
    <div class="flex w-full flex-col gap-[5px]">
      <h3 class="font-cabinet text-2xl/none font-medium tracking-normal">{{ name }}</h3>
      <div class="font-satoshi flex flex-col gap-2.5 text-xl/none font-light tracking-normal">
        <p>by {{ artist }}</p>
        <div class="flex gap-2.5 text-lg/none">
          <p>{{ year }}</p>
          <p>|</p>
          <p>{{ medium }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
