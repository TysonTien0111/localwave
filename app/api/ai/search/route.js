import { NextResponse } from "next/server";
import { askGemini } from "@/lib/gemini";

export async function POST(req) {
  const { query } = await req.json();
  try {
    const result = await askGemini(
      `You are an AI assistant for a local fashion platform. A user asks: "${query}". Respond with helpful, relevant, and concise information.`
    );
    return NextResponse.json({ result });
  } catch (e) {
    return NextResponse.json({ result: "Sorry, there was an error with the AI." }, { status: 500 });
  }
}
