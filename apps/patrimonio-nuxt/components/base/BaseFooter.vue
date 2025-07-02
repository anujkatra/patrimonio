<template>
  <footer
    class="bg-patrimonio-beige border-[#202020] w-full border-t-[0.5px] flex flex-col gap-[50px] pt-[50px] px-5 pb-[30px]"
  >
    <div class="flex flex-col gap-[50px] sm:flex-row sm:justify-between">
      <NuxtLink to="/" class="w-full max-w-[341px]">
        <NuxtImg src="/logo.jpg" alt="Website Logo" class="w-full" />
      </NuxtLink>
      <div class="flex flex-col gap-[30px]">
        <div class="flex flex-col gap-[5px]">
          <p class="text-xs leading-none">Phone</p>
          <NuxtLink to="tel:+91-98210-17338" class="text-base leading-none font-medium">
            +91-98210-17338
          </NuxtLink>
          <NuxtLink to="tel:+91-97691-59827" class="text-base leading-none font-medium">
            +91-97691-59827
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
