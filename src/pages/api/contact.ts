import Mailgun from "mailgun.js"
import FormData from "form-data"

export const prerender = false

export const POST = async ({ request }) => {
  const form = await request.formData()
  const mailgun = new Mailgun(FormData)
  // @ts-ignore
  const DOMAIN = import.meta.env.MG_DOMAIN
  // @ts-ignore
  const API_KEY = import.meta.env.MG_API_KEY

  const mg = mailgun.client({
    username: 'api',
    key: API_KEY,
  })

  const name = form.get('name')
  const email = form.get('email')
  const phone = form.get('phone')
  const business = form.get('business')
  const website = form.get('website')
  const comments = form.get('comments')

  const now = new Date()
  let success = false

  const customerEmail = {
    // @ts-ignore
    from: `Varial Web Development <${import.meta.env.MAIL_FROM}>`,
    to: email,
    subject: 'Contact request received',
    html: `
      <h1>Your contact request has been received!</h1>
      <p>Thank you for choosing Varial! We will be in contact with you soon.</p> 
    `
  }

  const staffEmail = {
    // @ts-ignore
    from: `Varial Web Development <${import.meta.env.MAIL_FROM}>`,
    // @ts-ignore
    to: import.meta.env.MAIL_TO,
    subject: `Contact request received at ${now}`,
    html: `
        <p>Date: ${now}</p>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <p>Business: ${business}</p>
        <p>Website: ${website}</p>
        <p>Details: ${comments}</p>
      `
  }

  await mg.messages.create(DOMAIN, staffEmail)
  .then(async response => {
    if (response.status === 200) {
      await mg.messages.create(DOMAIN, customerEmail)
      .then(async (response) => {
        if (response.status === 200) {
          success = true
        }
      })
      .catch(error => console.error(error))
    }
  })
  .catch(error => console.error(error))

  if (success) {
    return new Response(
      JSON.stringify({ success: true })
    )
  } else {
    return new Response(
      JSON.stringify({ success: false })
    )
  }
}