import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  priority: 'high',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export async function POST(req: NextRequest, res: NextResponse) {
  const { email, subject, text, message } = await req.json()

  const mailOptions = {
    from: process.env.EMAIL,
    to: 'lucascurtoo@gmail.com',
    subject,
    text,
    html: generateEmailTemplate(message, email),
    headers: {
      'x-priority': '1',
      'x-msmail-priority': 'High',
      importance: 'high',
    },
  }

  try {
    await transporter.sendMail(mailOptions)
    return new Response(
      JSON.stringify({ message: 'Email sent successfully' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return new Response(JSON.stringify({ message: 'Error sending email' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

const generateEmailTemplate = (message: string, email: string) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
  </head>
  <body>
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2 style="color: #333;">Enviado por tu aplicación</h2>
      <p>El mail es:</p>
      <p style="padding: 10px;">
        ${email}
      </p>
      <p>El mensaje es:</p>
      <p style="padding: 10px;">
        ${message}
      </p>
      <br>
      <p>Fin</p>
    </div>
  </body>
  </html>
`
