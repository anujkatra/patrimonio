<script setup lang="ts">
import {ref, watch, onBeforeUnmount} from 'vue'

type HeaderContentProps = {
  link: string
  href: string
}

const headerContent: HeaderContentProps[] = [
  {
    link: 'Artists',
    href: '/artists',
  },
  {
    link: 'Gallery',
    href: '/gallery',
  },
  {
    link: 'Events',
    href: '/events',
  },
  {
    link: 'About Us',
    href: '/about-us',
  },
  {
    link: 'About Us',
    href: '/about-us',
  },
  {
    link: 'About Us',
    href: '/about-us',
  },
  {
    link: 'About Us',
    href: '/about-us',
  },
]

const isMobileMenuOpen = ref(false)

function closeMenu() {
  isMobileMenuOpen.value = false
}

// Disable scroll on body when menu is open
watch(isMobileMenuOpen, (open) => {
  if (open) {
    document.body.classList.add('overflow-hidden')
  } else {
    document.body.classList.remove('overflow-hidden')
  }
})

// Cleanup in case component unmounts with menu still open
onBeforeUnmount(() => {
  document.body.classList.remove('overflow-hidden')
})
</script>

<template>
  <header class="sticky z-50 top-0 bg-white/80">
    <nav class="w-full relative backdrop-blur-lg z-50 bg-white/80">
      <div class="flex justify-between p-6 h-24 border-[#202020] border-b-[0.5px]">
        <NuxtLink class="flex items-center gap-2" to="/">
          <NuxtImg src="/logo.jpg" />
        </NuxtLink>
        <ul
          role="list"
          class="hidden md:flex items-center gap-8 leading-5 text-base tracking-tight font-normal"
        >
          <li v-for="(header, index) in headerContent" :key="index">
            <NuxtLink :to="header.href" class="hover:underline">{{ header.link }}</NuxtLink>
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
      </div>
      <Transition
        enter-from-class="opacity-0"
        enter-active-class="transition duration-300 ease-in-out"
        leave-to-class="opacity-0"
        leave-active-class="transition duration-300 ease-in-out"
      >
        <ul
          v-if="isMobileMenuOpen"
          class="md:hidden fixed top-24 z-50 overflow-hidden bg-white h-[calc(100vh-96px)] text-center w-full px-4"
        >
          <li
            v-for="(header, index) in headerContent"
            :key="index"
            class="border-[#202020] border-b-[0.5px]"
          >
            <NuxtLink
              :to="header.href"
              class="py-[30px] w-full h-full inline-block"
              @click="closeMenu"
              >{{ header.link }}</NuxtLink
            >
          </li>
        </ul>
      </Transition>
    </nav>
  </header>
</template>
