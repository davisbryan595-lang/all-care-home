import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const accessKey = process.env.SILENTFORMS_ACCESS_KEY
    if (!accessKey) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const response = await fetch('https://api.silentforms.com/v1/submissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        to_email: 'allcarerepairservices@outlook.com',
        name: body.name,
        phone: body.phone,
        email: body.email,
        service: body.service,
        date: body.date,
        time: body.time,
        message: body.message,
      }),
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to submit form' },
        { status: response.status }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
