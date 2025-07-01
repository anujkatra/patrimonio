<script setup lang="ts">
import {cn} from '@/utils/cn'
import {computed} from 'vue'
import {cva, type VariantProps} from 'class-variance-authority'

const props = defineProps<{
  variant?: VariantProps<typeof inputVariants>['variant']
  icon?: boolean
}>()

const inputVariants = cva(
  'inline-flex transition-all items-center duration-300 ease-out font-cabinet text-[20px] w-[420px] h-[60px] px-2.5 px-[30px]',
  {
    variants: {
      variant: {
        primary:
          'bg-white hover:bg-black text-black hover:text-white border-[1.5px] border-[0.5px] border-[#202020]',
        secondary:
          'bg-[linear-gradient(264.83deg,rgba(252,251,247,0.5)_-4.61%,rgba(129,178,219,0.5)_44.28%,rgba(214,51,46,0.5)_112.37%)] hover:bg-black hover:bg-none hover:text-white border-[0.5px] border-[#202020]',
        noOutline: 'bg-white hover:bg-black text-black hover:text-white',
      },
      icon: {
        false: 'justify-center',
        true: 'justify-between pr-[40px] hover:pr-[30px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      icon: false,
    },
  },
)

const linkClasses = computed(() =>
  cn(
    inputVariants({
      variant: props.variant,
      icon: props.icon,
    }),
  ),
)
</script>
<template>
  <NuxtLink :class="linkClasses">
    <slot>Explore</slot>
    <span v-if="icon">
      <slot name="icon" />
    </span>
  </NuxtLink>
</template>
