<script setup lang="ts">
</script>

<template>
  <header
    class="fixed z-50 h-24 inset-0 bg-white/80 flex justify-between backdrop-blur-lg p-6"
  >
  <NuxtLink class="flex items-center gap-2" to="/">
         <NuxtImg src="/logo.jpg"/>
        </NuxtLink>
         <nav class="flex align-middle">
          <ul
            role="list"
            class="flex items-center gap-6 md:gap-8 leading-5 text-sm md:text-base tracking-tight font-normal"
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
            <li>
              <NuxtLink to="/" class="hover:underline">Events</NuxtLink>
            </li>
          </ul>
        </nav>
     </header>
</template>
