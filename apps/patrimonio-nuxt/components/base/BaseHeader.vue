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
    href: '/our-story',
  },
  {
    link: 'Blog',
    href: '/blog',
  },
  {
    link: 'Press & Media',
    href: '/press',
  },
  {
    link: 'Contact Us',
    href: '/contact-us',
  },
]

const isMobileMenuOpen = ref(false)

const whatsappNumber = '919821017338'

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
  <header
    :class="`font-satoshi sticky top-0 z-50 bg-white text-[#202020] ${isMobileMenuOpen ? `` : `border-b-[0.5px] border-[#202020]`}`"
  >
    <nav :class="`relative w-full overflow-y-auto ${isMobileMenuOpen ? `min-h-screen` : ``}`">
      <div
        :class="`mx-auto flex w-full max-w-[1440px] justify-between px-5 pt-[50px] pb-5 md:px-10 xl:h-[70px] xl:gap-10 xl:px-[70px] xl:py-5 ${isMobileMenuOpen ? `border-b-[0.5px] border-[#202020]` : ``}`"
      >
        <NuxtLink class="flex items-center gap-2" to="/">
          <NuxtImg
            src="/logo.png"
            class="h-8 w-full max-w-[170px] md:h-[35px] md:max-w-[191px]"
            @click="closeMenu"
          />
        </NuxtLink>
        <ul
          role="list"
          class="hidden items-center gap-6 text-base leading-none font-normal lg:flex xl:gap-8 2xl:gap-10"
        >
          <li v-for="(header, index) in headerContent" :key="index">
            <NuxtLink
              :to="header.href"
              class="underline-offset-[9px] hover:underline lg:hover:font-semibold"
              >{{ header.link }}</NuxtLink
            >
          </li>
          <li>
            <NuxtLink :to="`https://wa.me/${whatsappNumber}`" target="_blank" class="w-full">
              <NuxtImg src="/whatsapp.png" class="h-[35px]" />
            </NuxtLink>
          </li>
        </ul>
        <!-- Mobile Toggle -->
        <div class="flex gap-[15px] lg:hidden">
          <NuxtLink
            :to="`https://wa.me/${whatsappNumber}`"
            target="_blank"
            class="max-sm:self-center"
            ><NuxtImg src="/whatsapp-mobile.png" class="size-6 sm:hidden" />
            <NuxtImg src="/whatsapp.png" class="hidden h-[35px] w-full sm:block" />
          </NuxtLink>

          <button
            class="hover:cursor-pointer focus:outline-none"
            aria-label="Toggle menu"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <Menu v-if="!isMobileMenuOpen" class="size-6" :font-controlled="false" />
            <Cancel v-else class="size-6 bg-white text-black" :font-controlled="false" />
          </button>
        </div>
      </div>
      <Transition
        enter-from-class="opacity-0"
        enter-active-class="transition duration-150 ease-in-out"
        leave-to-class="opacity-0"
        leave-active-class="transition duration-150 ease-in-out"
      >
        <ul v-if="isMobileMenuOpen" class="absolute w-full bg-white px-4 text-center lg:hidden">
          <li
            v-for="(header, index) in headerContent"
            :key="index"
            class="border-b-[0.5px] border-[#202020] text-xl leading-none"
          >
            <NuxtLink
              :to="header.href"
              class="inline-block h-full w-full py-[30px]"
              @click="closeMenu"
              >{{ header.link }}</NuxtLink
            >
          </li>
        </ul>
      </Transition>
    </nav>
  </header>
</template>
