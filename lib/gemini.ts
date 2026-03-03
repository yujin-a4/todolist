import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  // eslint-disable-next-line no-console
  console.warn("GEMINI_API_KEY is not set. AI routes will fail until it is configured.");
}

const genAI = new GoogleGenerativeAI(apiKey ?? "");
export const geminiPro = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

export const JSON_ONLY_SUFFIX =
  "반드시 JSON 형식으로만 응답하라. 마크다운 코드블록 없이 순수 JSON만 출력하라.";

export async function generateGeminiJson<T>(prompt: string): Promise<T> {
  const result = await geminiPro.generateContent(`${prompt}\n\n${JSON_ONLY_SUFFIX}`);
  const text = result.response.text();
  return JSON.parse(text) as T;
}
