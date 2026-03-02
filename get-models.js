const https = require('https');
const fs = require('fs');

const envContent = fs.readFileSync(".env", "utf8");
const match = envContent.match(/GEMINI_API_KEY=(.*)/);
const apiKey = match ? match[1].trim().replace(/['"]/g, "") : "";

https.get(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        const json = JSON.parse(data);
        if (json.models) {
            fs.writeFileSync('exact_models.txt', json.models.map(m => m.name).join('\n'));
            console.log("DONE");
        }
    });
});
