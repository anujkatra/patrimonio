<script setup lang="ts">
const footerContent = {
  phone: ['+91-98210-17338', '+91-97691-59827'],
  email: [
    'sanghvipremal@gmail.com',
    'premal@patrimoniogallery.com',
    'distipremalsanghvi@gmail.com',
  ],
}
</script>
<template>
  <footer
    class="bg-patrimonio-beige border-[#202020] font-satoshi text-[#202020] w-full border-t-[0.5px] flex flex-col gap-[50px] pt-[50px] px-5 pb-[30px] sm:pt-[70px] sm:px-10 sm:gap-[65px] 2xl:px-[70px]"
  >
    <div class="flex flex-col gap-[50px] sm:flex-row sm:justify-between">
      <NuxtLink to="/" class="w-full sm:max-w-[341px] 2xl:max-w-[523px]">
        <NuxtImg src="/logo.jpg" alt="Website Logo" class="w-full" />
      </NuxtLink>
      <div class="flex flex-col gap-[30px] lg:flex-row lg:gap-[133px]">
        <div class="flex flex-col gap-[5px]">
          <p class="text-xs leading-none">Phone</p>
          <NuxtLink
            v-for="(phone, index) in footerContent.phone"
            :key="index"
            :to="`tel:${phone}`"
            class="text-base leading-none font-semibold hover:underline"
          >
            {{ phone }}
          </NuxtLink>
        </div>
        <div class="flex flex-col gap-[5px]">
          <p class="text-xs leading-none">Email</p>
          <NuxtLink
            v-for="(email, index) in footerContent.email"
            :key="index"
            :to="`mailto:${email}`"
            class="text-base leading-none font-semibold hover:underline"
          >
            {{ email }}
          </NuxtLink>
        </div>
      </div>
    </div>
    <p class="text-xs text-center leading-none">
      Copyright © {{ new Date().getFullYear() }} Patrimonio Gallery. All Rights Reserved.
    </p>
  </footer>
</template>
