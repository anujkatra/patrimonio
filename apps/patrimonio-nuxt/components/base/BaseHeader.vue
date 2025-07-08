<script setup lang="ts">
import {ref, watch, onBeforeUnmount} from 'vue'
import Cancel from '~/assets/svg/cancel.svg'
import Menu from '~/assets/svg/menu.svg'

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
    link: 'Our Story',
    href: '/about-us',
  },
  {
    link: 'Blog',
    href: '/about-us',
  },
  {
    link: 'Press & Media',
    href: '/about-us',
  },
  {
    link: 'Contact Us',
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
    <nav :class="`w-full relative z-50 bg-white/80 ${isMobileMenuOpen ? `h-screen` : ``}`">
      <div
        class="flex justify-between px-5 pb-5 pt-[50px] border-[#202020] border-b-[0.5px] xl:px-[70px] xl:h-[70px] xl:py-5 xl:gap-10"
      >
        <NuxtLink class="flex items-center gap-2" to="/">
          <NuxtImg
            src="/logo.jpg"
            class="w-full max-w-[170px] md:max-w-[191px] md:h-[35px] h-8"
            @click="closeMenu"
          />
        </NuxtLink>
        <ul
          role="list"
          class="hidden lg:flex items-center gap-8 leading-5 text-base tracking-tight font-normal"
        >
          <li v-for="(header, index) in headerContent" :key="index">
            <NuxtLink :to="header.href" class="hover:underline">{{ header.link }}</NuxtLink>
          </li>
          <li>
            <NuxtImg src="/whatsapp.png" class="w-full h-[35px]" />
          </li>
        </ul>
        <!-- Mobile Toggle -->
        <div class="lg:hidden flex gap-[15px]">
          <NuxtImg src="/whatsapp.png" class="w-full h-[35px]" />
          <button
            class="focus:outline-none hover:cursor-pointer"
            aria-label="Toggle menu"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <Menu v-if="!isMobileMenuOpen" class="size-6" :font-controlled="false" />
            <Cancel v-else class="size-6 text-white" :font-controlled="false" />
          </button>
        </div>
      </div>
      <Transition
        enter-from-class="opacity-0"
        enter-active-class="transition duration-150 ease-in-out"
        leave-to-class="opacity-0"
        leave-active-class="transition duration-150 ease-in-out"
      >
        <ul
          v-if="isMobileMenuOpen"
          class="lg:hidden absolute overflow-y-auto bg-white text-center w-full px-4"
        >
          <li
            v-for="(header, index) in headerContent"
            :key="index"
            class="border-[#202020] border-b-[0.5px] text-xl leading-none"
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
