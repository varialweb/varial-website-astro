export const prerender = false

export const POST = async ({ request }) => {
  console.log('POST REQUEST')

  const form = await request.formData()

  console.log('form', form.get('name'))

  return new Response(
    JSON.stringify({ message: 'hello world' })
  )
}