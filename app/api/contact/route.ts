import { NextRequest, NextResponse } from 'next/server'

interface ContactFormData {
  name: string
  phone: string
  email: string
  service: string
  date?: string
  time?: string
  message?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, phone' },
        { status: 400 }
      )
    }

    const silentFormsKey = process.env.SILENTFORMS_API_KEY

    if (!silentFormsKey) {
      console.error('SILENTFORMS_API_KEY is not set')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Prepare the message content
    const messageContent = `
Name: ${body.name}
Phone: ${body.phone}
Email: ${body.email}
Service: ${body.service || 'General Inquiry'}
${body.date ? `Preferred Date: ${body.date}` : ''}
${body.time ? `Preferred Time: ${body.time}` : ''}
${body.message ? `Message: ${body.message}` : ''}
    `.trim()

    // Send to SilentForms
    const silentFormsResponse = await fetch('https://silentforms.com/api/v1/forms/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${silentFormsKey}`,
      },
      body: JSON.stringify({
        name: body.name,
        email: body.email,
        phone: body.phone,
        service: body.service,
        date: body.date,
        time: body.time,
        message: body.message || messageContent,
      }),
    })

    if (!silentFormsResponse.ok) {
      const errorData = await silentFormsResponse.text()
      console.error('SilentForms API error:', silentFormsResponse.status, errorData)
      return NextResponse.json(
        { error: 'Failed to submit form to SilentForms' },
        { status: silentFormsResponse.status }
      )
    }

    const responseData = await silentFormsResponse.json()

    return NextResponse.json(
      {
        success: true,
        message: 'Form submitted successfully',
        submissionId: responseData.id,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
