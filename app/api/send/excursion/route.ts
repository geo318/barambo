import { getFormValues } from '/utils'
import { EmailForm } from '/types'
import nodemailer, { SendMailOptions } from 'nodemailer'

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

    const [to, subject] = [SMTP_EMAIL, 'Excursion']
    const file = formData.get('file') as File | null
    let buffer: Buffer | undefined
    try {
      const arrayBuffer = await file?.arrayBuffer()
      buffer = arrayBuffer && Buffer.from(arrayBuffer)
    } catch {}

    const mailOptions: SendMailOptions = {
      from: SMTP_EMAIL,
      to,
      subject,
      html: `<div style='font-size: 16px;'>
        <h1 style='margin-bottom: 10px; font-size: 20px; font-weight: bold'>
          New excursion request
        </h1>
        <p style='margin-bottom:10px; font-size: 16px'>
          <span style='font-weight:600; font-size:14px'>Name: </span>${
            mappedEntries.name
          }
        </p>
        <p style='margin-bottom: 10px; font-size: 16px'>
          <span style='font-weight:600; font-size:14px'>School: </span>${
            mappedEntries.school
          }
        </p>
        <p style='margin-bottom:10px; font-size: 16px'>
          <span style='font-weight:600; font-size:14px'>Class: </span>${
            mappedEntries.class
          }
        </p>
        <p style='margin-bottom:10px; font-size: 16px'>
          <span style='font-weight:600; font-size:14px'>Phone: </span>${
            mappedEntries.phone
          }
        </p>
        <div style='margin-bottom:10px; font-size: 16px'>
          <p style='font-size:14px; font-weight:600;'>Additional Info:</p> 
          <p>${mappedEntries.description ?? '-'}</p>
        </div>
      </div>`,
      attachments: [{ content: buffer, filename: file?.name }],
    }

    await transporter.sendMail(mailOptions)
    return new Response('sent', { status: 200 })
  } catch (error) {
    return new Response(`not sent, ${JSON.stringify(error)}`, { status: 500 })
  }
}
