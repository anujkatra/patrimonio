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
      <div class="absolute bottom-10 z-[1] mx-auto flex w-full justify-center">
        <BaseLink
          variant="secondary"
          class="hidden w-full max-w-[380px] transition-all duration-300 ease-in group-hover:inline-flex lg:mx-4 lg:max-xl:px-5 lg:max-xl:py-[15px] lg:max-xl:pr-[30px] lg:max-xl:text-lg/none lg:max-xl:hover:pr-5 xl:mx-5"
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
