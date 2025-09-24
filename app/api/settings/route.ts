import { NextRequest, NextResponse } from 'next/server'
import { getApiBaseUrl } from "@/lib/api";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId') || 'demo-user'

    // Call Python backend to get user settings
    const pyRes = await fetch(`${getApiBaseUrl()}/settings/${userId}`, {
      method: 'GET',
    })

    if (pyRes.ok) {
      const settings = await pyRes.json()
      return NextResponse.json(settings)
    } else {
      // Return default settings if not found
      return NextResponse.json({
        userId: userId,
        language: 'en',
        timezone: 'Asia/Kolkata',
        theme: 'light',
        fontSize: 'medium',
        emailNotifications: true,
        pushNotifications: true,
        interviewReminders: true,
        progressUpdates: true,
        weeklyReports: false,
        microphoneEnabled: true,
        audioQuality: 'high',
        noiseReduction: true,
        autoGainControl: true,
        dataCollection: true,
        analyticsTracking: false,
        shareUsageData: false,
        sessionDuration: 30,
        questionDifficulty: 'Mixed',
        autoSave: true,
        recordingEnabled: true
      })
    }
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const settings = await request.json()

    // Call Python backend to save settings
    const pyRes = await fetch(`${getApiBaseUrl()}/settings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings)
    })

    if (pyRes.ok) {
      const result = await pyRes.json()
      return NextResponse.json({ 
        success: true, 
        message: 'Settings saved successfully',
        data: result 
      })
    } else {
      const error = await pyRes.text()
      return NextResponse.json(
        { error: `Backend error: ${error}` },
        { status: pyRes.status }
      )
    }
  } catch (error) {
    console.error('Error saving settings:', error)
    return NextResponse.json(
      { error: 'Failed to save settings' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updates = await request.json()

    // Call Python backend to update specific settings
    const pyRes = await fetch(`${getApiBaseUrl()}/settings/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates)
    })

    if (pyRes.ok) {
      const result = await pyRes.json()
      return NextResponse.json({ 
        success: true, 
        message: 'Settings updated successfully',
        data: result 
      })
    } else {
      const error = await pyRes.text()
      return NextResponse.json(
        { error: `Backend error: ${error}` },
        { status: pyRes.status }
      )
    }
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Call Python backend to reset settings
    const pyRes = await fetch(`${getApiBaseUrl()}/settings/${userId}`, {
      method: 'DELETE',
    })

    if (pyRes.ok) {
      const result = await pyRes.json()
      return NextResponse.json({ 
        success: true, 
        message: 'Settings reset successfully',
        data: result 
      })
    } else {
      const error = await pyRes.text()
      return NextResponse.json(
        { error: `Backend error: ${error}` },
        { status: pyRes.status }
      )
    }
  } catch (error) {
    console.error('Error resetting settings:', error)
    return NextResponse.json(
      { error: 'Failed to reset settings' },
      { status: 500 }
    )
  }
}