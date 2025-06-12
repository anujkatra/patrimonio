<template>
  <div class="bg-white text-black">
    <section class="min-h-screen pt-24">
      <Header />
      <main class=""><slot /></main>
      <Footer />
    </section>
  </div>
  <Toast />
</template>
