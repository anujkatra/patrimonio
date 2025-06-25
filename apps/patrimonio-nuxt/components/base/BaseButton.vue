<script setup>
import {computed} from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (val) => ['primary', 'secondary', 'danger', 'outline'].includes(val),
  },
  type: {
    type: String,
    default: 'button',
    validator: (val) => ['button', 'link'].includes(val),
  },
  href: {
    type: String,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const isLink = computed(() => props.type === 'link' || !!props.href)
const isNuxtLink = computed(() => props.href?.startsWith('/'))
const isButton = computed(() => !isLink.value)

const componentType = computed(() => {
  if (props.to || props.href) return resolveComponent('NuxtLink')
  return 'button'
})

const baseClasses =
  'inline-flex items-center px-4 py-2 rounded transition duration-150 ease-in-out focus:outline-none'

const variantClasses = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-300 text-black hover:bg-gray-400',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  outline: 'border border-gray-600 text-gray-600 hover:bg-gray-100',
  link: 'text-blue-600 underline hover:text-blue-800',
}

const buttonClasses = computed(
  () =>
    `${baseClasses} ${variantClasses[props.variant]} ${
      props.disabled && isButton.value ? 'opacity-50 cursor-not-allowed' : ''
    }`,
)
defineEmits(['click'])
</script>
<template>
  <component
    :is="componentType"
    :to="isNuxtLink ? href : undefined"
    :href="!isNuxtLink ? href : undefined"
    :class="buttonClasses"
    :disabled="isButton && disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </component>
</template>
