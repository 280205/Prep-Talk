import { NextRequest, NextResponse } from "next/server";
import { getApiBaseUrl } from "@/lib/api";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "hr";
  const count = searchParams.get("count") || "1";
  const jobDomain = searchParams.get("jobDomain") || "";

  // Proxy to FastAPI backend with direct URL
  const backendUrl = `${getApiBaseUrl()}/question/generate?category=${encodeURIComponent(category)}&count=${encodeURIComponent(count)}&job_domain=${encodeURIComponent(jobDomain)}`;
  const backendRes = await fetch(backendUrl);
  if (!backendRes.ok) {
    return NextResponse.json({ error: "Failed to generate question(s) from backend" }, { status: 500 });
  }
  const data = await backendRes.json();
  
  // If frontend expects single question, return just one question from the array
  if (data.questions && data.questions.length > 0) {
    const randomIndex = Math.floor(Math.random() * data.questions.length);
    return NextResponse.json({ 
      question: data.questions[randomIndex],
      category: data.category,
      generated: data.generated
    });
  }
  
  return NextResponse.json({ error: "No questions generated" }, { status: 500 });
}