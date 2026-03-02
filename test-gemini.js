const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

async function listModels() {
    let apiKey = "";
    try {
        const envContent = fs.readFileSync(".env", "utf8");
        const match = envContent.match(/GEMINI_API_KEY=(.*)/);
        if (match) apiKey = match[1].trim().replace(/['"]/g, "");
    } catch (err) {
        console.error("Could not read .env file");
        return;
    }

    if (!apiKey) {
        console.error("API Key not found in .env");
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const modelsToTest = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-1.0-pro"];

    console.log(`Testing models with key: ${apiKey.substring(0, 5)}...`);

    for (const modelName of modelsToTest) {
        try {
            console.log(`Testing ${modelName}...`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hello");
            const text = result.response.text();
            console.log(`✅ ${modelName} SUCCESS: "${text.substring(0, 20)}..."`);
        } catch (err) {
            console.log(`❌ ${modelName} FAILED: ${err.message}`);
        }
    }
}

listModels();
