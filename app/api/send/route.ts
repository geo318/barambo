import { Resend } from 'resend'
import { getFormValues } from '/utils'
import { EmailForm } from '/types'
import { EmailTemplate } from '/components'

const resend = new Resend(process.env.RESEND_API_KEY)

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData()
    const [mappedEntries] = getFormValues<EmailForm>(formData)

    const res = await resend.emails.send({
      from: 'Barambo <noreply@barambo.ge>',
      to: [
        // 'info@barambo.ge',
        'geo.lomidze@gmail.com',
      ],
      subject: 'Reserve excursion',
      react: EmailTemplate({
        ...mappedEntries,
      }) as React.ReactElement,
    })

    return new Response(res.id, { status: 201 })
  } catch (error) {
    // return new Response(`not sent, ${JSON.stringify(error)}`, { status: 500 })
  }
}
