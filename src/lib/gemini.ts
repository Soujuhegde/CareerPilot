import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

/**
 * Simplified Gemini caller.
 * Uses only the confirmed models from workspace research.
 */
export async function callGemini(payload: string | any[]): Promise<string> {
    const multipartPayload = Array.isArray(payload) ? payload : [payload];

    // Confirmed working models for this environment
    const models = ["gemini-2.5-flash", "gemini-2.0-flash"];
    let lastError: any = null;

    for (const modelName of models) {
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent(multipartPayload);
            const responseText = result.response.text().trim();

            return responseText
                .replace(/^```json\s*/i, "")
                .replace(/^```\s*/i, "")
                .replace(/\s*```$/, "")
                .trim();
        } catch (err: any) {
            lastError = err;
            console.error(`Gemini Error (${modelName}):`, err.message);
            if (err.message?.includes("404") || err.message?.includes("429") || err.message?.includes("500")) continue;
            throw err;
        }
    }

    throw new Error(lastError?.message || "AI failed to respond.");
}
