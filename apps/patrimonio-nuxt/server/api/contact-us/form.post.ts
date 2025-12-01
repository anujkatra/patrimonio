interface BodyProps {
  name: string
  email: string
  phone: string
  message: string
  createdAt: string
}

export default defineEventHandler(async (event) => {
  try {
    const body: BodyProps = await readBody(event)
    const sanity = useSanity()
    const response = await sanity.client.create({
      _type: 'contactUsForm',
      ...body,
    })
    return {status: 'Success'}
  } catch (err) {
    console.log('err', err)
    throw createError({
      statusCode: 500,
      statusMessage: `Error: ${err}`,
    })
  }
})
