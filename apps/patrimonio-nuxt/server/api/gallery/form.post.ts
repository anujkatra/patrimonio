interface BodyProps {
  paintingName: string
  paintingSlug: string
  name: string
  email: string
  createdAt: string
}

export default defineEventHandler(async (event) => {
  try {
    const body: BodyProps = await readBody(event)
    const sanity = useSanity()
    console.log('body in api', body)
    const response = await sanity.client.create({
      _type: 'paintingForm',
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
