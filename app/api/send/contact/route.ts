import { getFormValues } from '/utils'
import { ContactForm } from '/types'
import nodemailer, { SendMailOptions } from 'nodemailer'

export const POST = async (req: Request) => {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  })
  try {
    const formData = await req.formData()
    const [mappedEntries] = getFormValues<ContactForm>(formData)

    const { email: to, subject } = mappedEntries

    const mailOptions: SendMailOptions = {
      from: SMTP_EMAIL,
      to,
      subject: subject.toUpperCase(),
      html: `
        <div style='font-size: 16px;'>
          <h1 style='margin-bottom: 10px; font-size: 20px; font-weight: bold'>
            New excursion request
          </h1>
          <p style='margin-bottom:10px; font-size: 16px'>
            <span style='font-weight:600; font-size:14px'>Name: </span>${
              mappedEntries.name
            } ${mappedEntries.last_name}
          </p>
          <p style='margin-bottom: 10px; font-size: 16px'>
            <span style='font-weight:600; font-size:14px'>Phone: </span>${
              mappedEntries.phone
            }
          </p>
          <p style='margin-bottom:10px; font-size: 16px'>
            <span style='font-weight:600; font-size:14px'>Email: </span>${
              mappedEntries.email
            }
          </p>
          <div style='margin-bottom:10px; font-size: 16px'>
            <p style='font-size:14px; font-weight:600;'>Additional Info:</p> 
            <p>${mappedEntries.description ?? '-'}</p>
          </div>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)
    return new Response('sent', { status: 200 })
  } catch (error) {
    return new Response(`not sent, ${JSON.stringify(error)}`, { status: 500 })
  }
}
