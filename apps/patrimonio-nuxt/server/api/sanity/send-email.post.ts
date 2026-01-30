export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  // Sanity webhook payload
  const { _type, _id } = body

  // Optional: only react to certain document types
  if (_type !== 'paintingForm' && _type !== 'contactUsForm') {
    return { ok: true, ignored: true }
  }

  const mailgunDomain = process.env.MAILGUN_DOMAIN
  const mailgunApiKey = process.env.MAILGUN_API_KEY

  const auth = Buffer.from(`api:${mailgunApiKey}`).toString('base64')

  const res = await fetch(
    `https://api.mailgun.net/v3/${mailgunDomain}/messages`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        from: `Test <test@${mailgunDomain}>`,
        to: 'anujkatra94@gmail.com',
        subject: 'New inquiry recieved on website',
        html:`<><p>A new "${_type === 'paintingForm'?'painting':'contact'}" inquiry was recieved.</p><br /><p><a href="https://patrimonio-sanity-git-anujk-add-e-e1d8a8-yashbajaj234s-projects.vercel.app/structure/${_type}/${_id}">Link</a></p></>`,
      }),
    }
  )

  if (!res.ok) {
    const error = await res.text()
    console.error('Mailgun error:', error)
    throw new Error('Failed to send email')
  }

  return { ok: true }
})
