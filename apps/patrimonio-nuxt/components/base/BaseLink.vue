<script setup lang="ts">
import {cn} from '@/utils/cn'
import {computed} from 'vue'
import Arrow from '~/assets/svg/arrow.svg'

const props = defineProps<{
  variant: 'primary'
  hasIcon: boolean
}>()

const variantClasses: Record<string, string> = {
  primary: 'w-[420px] h-[60px] px-2.5 px-[30px] border-[1.5px]',
}

const linkClasses = computed(() =>
  cn(
    'inline-flex transition-all items-center duration-300 ease-in-out font-cabinet text-[20px]',
    variantClasses[props.variant],
    props.hasIcon
      ? 'justify-between pr-[40px] hover:pr-[30px]'
      : 'justify-center hover:text-white hover:bg-black',
  ),
)
</script>
<template>
  <NuxtLink :class="linkClasses">
    <slot>Explore</slot>
    <template v-if="props.hasIcon">
      <Arrow class="w-[50px] text-black" :font-controlled="false"
    /></template>
  </NuxtLink>
</template>
