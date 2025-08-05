<script setup lang="ts">
import type {SanityImageAsset} from '~/sanity/types'
import Arrow from '~/assets/svg/arrow.svg'
import {twMerge} from 'tailwind-merge'

const props = defineProps<{
  title: string
  slug: string
  imageSrc: SanityImageAsset
  class?: string
}>()
</script>

<template>
  <div
    :class="
      twMerge(`group relative h-full w-full max-lg:max-h-[420px] max-md:max-w-[420px]`, props.class)
    "
  >
    <div class="size-full lg:hidden">
      <NuxtLink :to="props.slug" class="w-full">
        <NuxtImg
          provider="sanity"
          :src="`${props.imageSrc._id}`"
          :alt="`${props.title} Collection`"
          class="size-full"
        />
      </NuxtLink>
    </div>
    <div class="hidden lg:block lg:size-full">
      <NuxtImg
        provider="sanity"
        :src="`${props.imageSrc._id}`"
        :alt="`${props.title} Collection`"
        class="size-full object-cover transition-all duration-300 group-hover:brightness-[40%] lg:object-center"
      />
      <div class="relative w-full">
        <BaseLink
          variant="secondary"
          class="absolute bottom-10 z-[1] mx-5 hidden w-full max-w-[380px] transition-all duration-300 ease-in group-hover:inline-flex"
          :to="props.slug"
          icon
        >
          {{ props.title }}
          <template #icon> <Arrow class="w-[50px]" :font-controlled="false" /></template>
        </BaseLink>
      </div>
    </div>
  </div>
</template>
