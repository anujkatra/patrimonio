<template>
  <footer
    class="bg-patrimonio-beige border-[#202020] w-full border-t-[0.5px] flex flex-col gap-[50px] pt-[50px] px-5 pb-[30px] sm:pt-[70px] sm:px-10 sm:gap-[65px]"
  >
    <div class="flex flex-col gap-[50px] sm:flex-row sm:justify-between">
      <NuxtLink to="/" class="w-full sm:max-w-[341px]">
        <NuxtImg src="/logo.jpg" alt="Website Logo" class="w-full" />
      </NuxtLink>
      <div class="flex flex-col gap-[30px] lg:flex-row lg:gap-[133px]">
        <div class="flex flex-col gap-[5px]">
          <p class="text-xs leading-none">Phone</p>
          <NuxtLink
            to="tel:+91-98210-17338"
            class="text-base leading-none font-medium hover:underline"
          >
            +91-98210-17338
          </NuxtLink>
          <NuxtLink
            to="tel:+91-97691-59827"
            class="text-base leading-none font-medium hover:underline"
          >
            +91-97691-59827
          </NuxtLink>
        </div>
        <div class="flex flex-col gap-[5px]">
          <p class="text-xs leading-none">Email</p>
          <NuxtLink
            to="mailto:sanghvipremal@gmail.com"
            class="text-base leading-none font-medium hover:underline"
          >
            sanghvipremal@gmail.com
          </NuxtLink>
          <NuxtLink
            to="mailto:premal@patrimoniogallery.com"
            class="text-base leading-none font-medium hover:underline"
          >
            premal@patrimoniogallery.com
          </NuxtLink>
          <NuxtLink
            to="mailto:distipremalsanghvi@gmail.com"
            class="text-base leading-none font-medium hover:underline"
          >
            distipremalsanghvi@gmail.com
          </NuxtLink>
        </div>
      </div>
    </div>
    <p class="text-xs text-center leading-none">
      Copyright © {{ new Date().getFullYear() }} Patrimonio Gallery. All Rights Reserved.
    </p>
  </footer>
</template>
