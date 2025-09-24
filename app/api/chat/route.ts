import { NextRequest, NextResponse } from "next/server"
import { getApiBaseUrl } from "@/lib/api"

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json()
    
    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      )
    }

    console.log("Forwarding chat request to backend API")
    
    // Use deployed backend for server-side calls
    const backendUrl = getApiBaseUrl()
    
    // Forward the request to the backend
    const response = await fetch(`${backendUrl}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, context }),
    })

    if (response.ok) {
      const data = await response.json()
      return NextResponse.json(data)
    } else {
      const errorData = await response.json()
      console.error("Backend chat API error:", errorData)
      return NextResponse.json(
        { error: errorData.error || "Failed to get response from backend" },
        { status: response.status }
      )
    }

  } catch (error) {
    console.error("Chat API proxy error:", error)
    return NextResponse.json(
      { error: `Failed to process request: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
}
