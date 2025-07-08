<script setup lang="ts">
import {ref} from 'vue'

const isMobileMenuOpen = ref(false)

function closeMenu() {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <header class="fixed z-50 h-24 inset-0 bg-white/80 backdrop-blur-lg p-6">
    <nav class="flex justify-between w-full">
      <NuxtLink class="flex items-center gap-2" to="/">
        <NuxtImg src="/logo.jpg" />
      </NuxtLink>
      <ul
        role="list"
        class="hidden md:flex items-center gap-8 leading-5 text-base tracking-tight font-normal"
      >
        <li>
          <NuxtLink to="/artists" class="hover:underline">Artists</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/gallery" class="hover:underline">Gallery</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/about-us" class="hover:underline">About Us</NuxtLink>
        </li>
      </ul>
      <!-- Mobile Toggle -->
      <button
        class="md:hidden focus:outline-none"
        aria-label="Toggle menu"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
      >
        <svg
          v-if="!isMobileMenuOpen"
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg
          v-else
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>
    <Transition
      enter-from-class="opacity-0"
      enter-active-class="transition duration-300 ease-in-out"
      leave-to-class="opacity-0"
      leave-active-class="transition duration-300 ease-in-out"
    >
      <ul v-if="isMobileMenuOpen" class="md:hidden bg-white text-center px-4">
        <li>
          <NuxtLink to="/artists" @click="closeMenu">Artists</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/gallery" @click="closeMenu">Gallery</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/about-us" @click="closeMenu">About Us</NuxtLink>
        </li>
      </ul>
    </Transition>
  </header>
</template>
