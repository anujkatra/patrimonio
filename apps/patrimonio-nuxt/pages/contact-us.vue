<script lang="ts" setup>
import {contactUsPageQuery} from '~/sanity/queries'
import type {ContactUsPageQueryResult} from '~/sanity/types'

const {data: contactUsPageData} = await useSanityQuery<ContactUsPageQueryResult>(contactUsPageQuery)
const sanity = useSanity()

useSiteMetadata({
  title: contactUsPageData?.value?.seo?.title ?? 'title',
  description: contactUsPageData?.value?.seo?.description ?? 'description',
  ogImage: '',
})

const form = ref({
  name: '',
  email: '',
  phone: '',
  message: '',
  createdAt: '',
})

const submitted = ref(false)

const handleSubmit = async () => {
  submitted.value = true
  try {
    form.value.createdAt = new Date(Date.now()).toLocaleString('en-IN', {timeZoneName: 'short'})
    const response = await sanity.client.create({
      _type: 'contactUsForm',
      ...form.value,
    })

    form.value = {
      name: '',
      email: '',
      phone: '',
      message: '',
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
      <div
        class="flex w-full max-w-[1300px] flex-col gap-[50px] lg:flex-row lg:gap-[62px] xl:gap-[178px]"
      >
        <div class="flex w-full flex-col gap-2.5 md:max-w-[462px] xl:max-w-[571px]">
          <h1
            class="font-cabinet text-[35px]/none font-normal tracking-normal lg:text-[45px]/none xl:text-[65px]/none"
          >
            Contact Us
          </h1>
          <div
            class="font-satoshi flex flex-col gap-5 text-xl/none font-light tracking-normal lg:gap-10"
            :v-if="contactUsPageData?.content"
          >
            <SanityContent :blocks="contactUsPageData?.content" />
          </div>
        </div>
        <div class="w-full md:max-w-[420px] lg:pt-[26px]">
          <form
            class="flex w-full flex-col gap-5 sm:w-[350px] md:w-[420px]"
            @submit.prevent="handleSubmit"
          >
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
              <label for="phone">Your phone number</label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                minlength="10"
                maxlength="10"
                class="solid font-satoshi h-[60px] rounded-none border-[0.5px] border-[#202020] px-[15px] py-2.5 text-xl/none tracking-normal outline-none"
                required
              />
            </div>
            <div class="flex flex-col gap-2.5">
              <label for="email">Your email ID</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                class="solid font-satoshi h-[60px] rounded-none border-[0.5px] border-[#202020] px-[15px] py-2.5 text-xl/none tracking-normal outline-none"
                required
              />
            </div>
            <div class="flex flex-col gap-2.5">
              <label for="message">Your message</label>
              <textarea
                id="message"
                v-model="form.message"
                placeholder="Write your message here..."
                cols="3"
                class="solid font-satoshi h-36 resize-none rounded-none border-[0.5px] border-[#202020] px-[15px] py-2.5 text-xl/none tracking-normal outline-none"
                required
              />
            </div>

            <button
              type="submit"
              :disabled="submitted"
              class="font-cabinet h-[60px] w-full cursor-pointer border-[0.5px] border-[#202020] bg-white bg-[linear-gradient(264.83deg,rgba(252,251,247,0.5)_-4.61%,rgba(129,178,219,0.5)_44.28%,rgba(214,51,46,0.5)_112.37%)] px-[30px] text-center text-[20px] transition-all duration-300 ease-out hover:bg-black hover:bg-none hover:text-white"
            >
              Submit
            </button>
          </form>

          <div v-if="submitted" class="pt-4">
            <p class="font-satoshi text-lg/none tracking-normal">
              Thank you! Your message has been submitted.
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
