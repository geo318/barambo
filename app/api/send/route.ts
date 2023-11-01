import { getFormValues } from '/utils'
import { EmailForm } from '/types'
import nodemailer from 'nodemailer'

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData()
    const [mappedEntries] = getFormValues<EmailForm>(formData)

    const { SMTP_EMAIL, SMTP_PASSWORD } = process.env

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD,
      },
    })

    const [to, subject] = ['geo.lomidze@gmail.com', 'Excursion']

    const mailOptions = {
      from: SMTP_EMAIL,
      to,
      subject,
      html: `<div>${JSON.stringify(mappedEntries)}</div>`,
    }

    await transporter.sendMail(mailOptions)
    return new Response('sent', { status: 200 })
  } catch (error) {
    return new Response(`not sent, ${JSON.stringify(error)}`, { status: 500 })
  }
}
