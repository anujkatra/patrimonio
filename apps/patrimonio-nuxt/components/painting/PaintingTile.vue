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
  <div
    :class="
      twMerge(
        `group flex w-full max-w-[300px] flex-col md:max-w-[350px] lg:h-[490px] lg:gap-5 lg:pb-5`,
        props.class,
      )
    "
  >
    <div class="w-full overflow-hidden">
      <NuxtImg
        provider="sanity"
        :src="`${props.imageSrc._id}`"
        :alt="`${props.name}`"
        class="aspect-square min-w-[300px] object-cover object-center transition-all duration-500 md:min-w-[350px] lg:group-hover:scale-125"
      />
    </div>
    <div
      class="flex max-h-fit w-full flex-col gap-[5px] p-5 transition-all duration-500 lg:h-[100px] lg:overflow-hidden lg:group-hover:h-full lg:group-hover:overflow-visible lg:group-hover:bg-[linear-gradient(264.83deg,rgba(252,251,247,0.25)_-4.61%,rgba(129,178,219,0.25)_44.28%,rgba(214,51,46,0.25)_112.37%)]"
    >
      <h3 class="font-cabinet pb-0.5 text-2xl/none font-medium tracking-normal">
        {{ name }}
      </h3>
      <div class="font-satoshi flex flex-col gap-2.5 text-xl/none font-light tracking-normal">
        <p class="line-clamp-1 pb-1">by {{ artist }}</p>
        <div
          class="flex gap-2.5 text-lg/none transition-all duration-500 lg:opacity-0 lg:group-hover:opacity-100"
        >
          <p>{{ year }}</p>
          <p>|</p>
          <p>{{ medium }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
