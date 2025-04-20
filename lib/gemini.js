// filepath: lib/gemini.js
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-001:generateContent";

export async function askGemini(prompt) {
  if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is not set in .env");
  const res = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );
  const text = await res.text();
  console.log("Gemini API raw response:", text); // <-- Add this line
  try {
    const data = JSON.parse(text);
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";
  } catch (e) {
    throw new Error("Gemini API did not return valid JSON.");
  }
}
