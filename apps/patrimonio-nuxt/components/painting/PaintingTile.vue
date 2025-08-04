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
        `group flex w-full max-w-[300px] flex-col gap-5 pb-5 md:max-w-[350px] lg:h-[435px]`,
        props.class,
      )
    "
  >
    <div class="h-full w-full overflow-hidden">
      <NuxtImg
        provider="sanity"
        :src="`${props.imageSrc._id}`"
        :alt="`${props.name}`"
        class="min-w-[300px] object-cover object-center transition-all duration-500 group-hover:scale-125 md:min-w-[350px]"
      />
    </div>
    <div
      class="flex h-[80px] max-h-fit w-full flex-col gap-[5px] overflow-hidden p-5 transition-all duration-500 group-hover:h-full group-hover:overflow-visible group-hover:bg-[linear-gradient(264.83deg,rgba(252,251,247,0.25)_-4.61%,rgba(129,178,219,0.25)_44.28%,rgba(214,51,46,0.25)_112.37%)]"
    >
      <h3 class="font-cabinet text-2xl/none font-medium tracking-normal">{{ name }}</h3>
      <div class="font-satoshi flex flex-col gap-2.5 text-xl/none font-light tracking-normal">
        <p>by {{ artist }}</p>
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
