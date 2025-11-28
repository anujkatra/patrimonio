<script lang="ts" setup>
import {paintingQuery} from '~/sanity/queries'
import type {PaintingQueryResult} from '~/sanity/types'
import Arrow from '~/assets/svg/arrow.svg'

const route = useRoute()
const sanity = useSanity()
const {data: paintingData} = await useSanityQuery<PaintingQueryResult>(paintingQuery, {
  slug: route.params.slug,
})

if (paintingData.value === null) {
  throw createError({
    statusCode: 404,
    message: 'not found',
    fatal: true,
  })
}

useSiteMetadata({
  title: `${paintingData.value.name} - ${paintingData.value.artist}`,
  description: paintingData.value.description ?? '',
  ogImage: '',
})

const form = ref({
  paintingName: paintingData.value.name,
  paintingSlug: paintingData.value.slug.current,
  name: '',
  email: '',
  createdAt: '',
})

const submitted = ref(false)
const showForm = ref(false)

const handleSubmit = async () => {
  submitted.value = true
  try {
    form.value.createdAt = new Date(Date.now()).toLocaleString('en-IN', {timeZoneName: 'short'})
    const response = await sanity.client.create({
      _type: 'paintingForm',
      ...form.value,
    })

    form.value = {
      paintingName: paintingData?.value?.name ?? '',
      paintingSlug: paintingData?.value?.slug?.current ?? '',
      name: '',
      email: '',
      createdAt: '',
    }
  } catch (e) {
    console.error('Error submitting painting form', e)
  } finally {
    submitted.value = false
  }
}
</script>

<template>
  <main>
    <section class="flex justify-center px-5 py-[50px] md:px-10 md:py-[70px] xl:px-[70px]">
      <div class="flex w-full max-w-[1300px] flex-col gap-10 lg:flex-row">
        <div class="hidden w-full flex-1 lg:block">
          <NuxtImg
            provider="sanity"
            class="aspect-square max-h-[600px] w-full max-w-[600px]"
            :src="`${paintingData?.picture?.asset?._ref}`"
            :alt="`${paintingData?.picture?.alt}`"
          />
        </div>
        <div class="w-full flex-1">
          <Transition mode="out-in" name="fade">
            <div v-if="showForm == false" class="flex w-full flex-col gap-2.5 lg:max-w-[540px]">
              <p
                class="font-cabinet text-[35px]/none font-normal tracking-normal lg:pt-5 lg:text-[45px]/none xl:text-[65px]/none"
              >
                {{ paintingData?.name }}
              </p>
              <NuxtImg
                provider="sanity"
                class="w-full lg:hidden"
                :src="`${paintingData?.picture?.asset?._ref}`"
                :alt="`${paintingData?.picture?.alt}`"
              />
              <p
                v-if="paintingData?.description"
                class="font-satoshi text-base/none font-light tracking-normal md:text-xl/none"
              >
                {{ paintingData.description }}
              </p>
              <p
                class="font-satoshi border-y-[0.5px] border-solid border-[#202020] py-2.5 text-base/none tracking-normal md:text-xl/none"
              >
                by {{ paintingData?.artist }}
              </p>
              <p
                v-if="paintingData?.year || paintingData?.medium"
                class="font-satoshi border-b-[0.5px] border-solid border-[#202020] pb-2.5 text-base/none tracking-normal md:text-xl/none"
              >
                <span v-if="paintingData?.year">{{ paintingData?.year }} | </span>
                <span v-if="paintingData?.medium">{{ paintingData?.medium }}</span>
              </p>
              <button
                class="mt-2.5 hidden h-[60px] w-full max-w-[420px] cursor-pointer items-center justify-between border-[0.5px] border-[#202020] bg-white bg-[linear-gradient(264.83deg,rgba(252,251,247,0.5)_-4.61%,rgba(129,178,219,0.5)_44.28%,rgba(214,51,46,0.5)_112.37%)] pr-[40px] pl-[30px] transition-all duration-300 ease-out hover:bg-black hover:bg-none hover:pr-[30px] hover:text-white lg:flex"
                @click="showForm = true"
              >
                <p class="font-cabinet text-xl/none">Inquire About This Artwork</p>
                <Arrow class="w-[50px]" :font-controlled="false" />
              </button>
            </div>
            <div v-else class="flex w-full flex-col gap-5 lg:max-w-[540px]">
              <p class="font-cabinet text-[32px]/none font-normal tracking-normal">
                Inquire About This Artwork
              </p>
              <p
                class="font-satoshi border-b-[0.5px] border-solid border-[#202020] pb-5 text-lg/none font-light tracking-normal md:text-xl/none"
              >
                Interested in this piece? Share your details and we’ll be in touch with
                availability, pricing, and acquisition options.
              </p>
              <form
                class="flex w-full flex-col gap-5 sm:w-[350px] md:w-[420px]"
                @submit.prevent="handleSubmit"
              >
                <div class="flex flex-col gap-2.5">
                  <label for="name">Selected artwork</label>
                  <input
                    id="name"
                    v-model="form.paintingName"
                    type="text"
                    class="solid font-satoshi h-[60px] rounded-none border-[0.5px] border-[#202020] px-[15px] py-2.5 text-xl/none tracking-normal outline-none"
                    required
                    readonly
                  />
                </div>
                <div class="hidden">
                  <input
                    id="slug"
                    v-model="form.paintingSlug"
                    type="text"
                    class="solid font-satoshi h-[60px] rounded-none border-[0.5px] border-[#202020] px-[15px] py-2.5 text-xl/none tracking-normal outline-none"
                    required
                    readonly
                    hidden
                  />
                </div>
                <div class="flex flex-col gap-2.5">
                  <label for="name">Your name</label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    class="solid font-satoshi h-[60px] rounded-none border-[0.5px] border-[#202020] px-[15px] py-2.5 text-xl/none tracking-normal outline-none"
                    required
                  />
                </div>
                <div class="flex flex-col gap-2.5">
                  <label for="name">Your email ID</label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    class="solid font-satoshi h-[60px] rounded-none border-[0.5px] border-[#202020] px-[15px] py-2.5 text-xl/none tracking-normal outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  class="font-cabinet h-[60px] w-full cursor-pointer border-[0.5px] border-[#202020] bg-white bg-[linear-gradient(264.83deg,rgba(252,251,247,0.5)_-4.61%,rgba(129,178,219,0.5)_44.28%,rgba(214,51,46,0.5)_112.37%)] px-[30px] text-center text-[20px] transition-all duration-300 ease-out hover:bg-black hover:bg-none hover:text-white"
                >
                  Send
                </button>
                <button
                  type="button"
                  class="font-cabinet flex h-[60px] w-full cursor-pointer items-center justify-center border-[0.5px] border-[#202020] bg-white px-[30px] text-[20px] transition-all duration-300 ease-out hover:bg-black hover:bg-none hover:text-white"
                  @click="showForm = false"
                >
                  Cancel
                </button>
              </form>

              <div v-if="submitted">
                <p class="font-satoshi text-lg/none tracking-normal">
                  Thank you! Your message has been submitted.
                </p>
              </div>
            </div>
          </Transition>
        </div>
        <div class="flex w-full flex-col gap-5 pt-[30px] lg:hidden lg:max-w-[540px]">
          <p class="font-cabinet text-[32px]/none font-normal tracking-normal">
            Inquire About This Artwork
          </p>
          <p
            class="font-satoshi border-b-[0.5px] border-solid border-[#202020] pb-5 text-lg/none font-light tracking-normal md:text-xl/none"
          >
            Interested in this piece? Share your details and we’ll be in touch with availability,
            pricing, and acquisition options.
          </p>
          <form
            class="flex w-full flex-col gap-5 sm:w-[350px] md:w-[420px]"
            @submit.prevent="handleSubmit"
          >
            <div class="flex flex-col gap-2.5">
              <label for="name">Selected artwork</label>
              <input
                id="name"
                v-model="form.paintingName"
                type="text"
                class="solid font-satoshi h-[60px] rounded-none border-[0.5px] border-[#202020] px-[15px] py-2.5 text-xl/none tracking-normal outline-none"
                required
                readonly
              />
            </div>
            <div class="hidden">
              <input
                id="slug"
                v-model="form.paintingSlug"
                type="text"
                class="solid font-satoshi h-[60px] rounded-none border-[0.5px] border-[#202020] px-[15px] py-2.5 text-xl/none tracking-normal outline-none"
                required
                readonly
                hidden
              />
            </div>
            <div class="flex flex-col gap-2.5">
              <label for="name">Your name</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                class="solid font-satoshi h-[60px] rounded-none border-[0.5px] border-[#202020] px-[15px] py-2.5 text-xl/none tracking-normal outline-none"
                required
              />
            </div>
            <div class="flex flex-col gap-2.5">
              <label for="name">Your email ID</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                class="solid font-satoshi h-[60px] rounded-none border-[0.5px] border-[#202020] px-[15px] py-2.5 text-xl/none tracking-normal outline-none"
                required
              />
            </div>

            <button
              type="submit"
              :disabled="submitted"
              class="font-cabinet h-[60px] w-full cursor-pointer border-[0.5px] border-[#202020] bg-white bg-[linear-gradient(264.83deg,rgba(252,251,247,0.5)_-4.61%,rgba(129,178,219,0.5)_44.28%,rgba(214,51,46,0.5)_112.37%)] px-[30px] text-center text-[20px] transition-all duration-300 ease-out hover:bg-black hover:bg-none hover:text-white"
            >
              Send
            </button>
          </form>

          <div v-if="submitted">
            <p class="font-satoshi text-lg/none tracking-normal">
              Thank you! Your message has been submitted.
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
