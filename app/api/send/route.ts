import { Resend } from 'resend'
import { emailSchema } from '/schema'
import { getFormValues } from '/utils'
import { EmailForm } from '/types'
import { EmailTemplate } from '/components'
import { CreateEmailResponse } from 'resend/build/src/emails/interfaces'

const resend = new Resend(process.env.RESEND_API_KEY)

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData()
    const [mappedEntries, fileList] = getFormValues<EmailForm>(formData)

    const [...files] = await Promise.all(
      fileList.map(async (file) => {
        return {
          content: Buffer.from(await file.arrayBuffer()),
          filename: file.name,
        }
      })
    )

    const res: CreateEmailResponse = await resend.emails.send({
      from: 'Wallypay <noreply@wallypay.eu>',
      to: [mappedEntries.email, 'support@wallypay.eu'],
      subject: 'Order Wallypay card',
      react: EmailTemplate({
        ...mappedEntries,
      }) as React.ReactElement,
      attachments: files,
    })

    return new Response(res.id, { status: 201 })
  } catch (error) {
    return new Response(`not sent, ${JSON.stringify(error)}`, { status: 500 })
  }
}
