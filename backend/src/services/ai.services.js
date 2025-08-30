const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstructions: 
  `You are a senior code reviewer (7+ years experience).
Your job is to analyze the code and always respond ONLY in this exact JSON format:

{
  "status": "error" | "success",
  "message": "Short message if code is valid or invalid",
  "issues": ["List of issues found in the code"],
  "fixes": ["List of fixes applied to solve the issues"],
  "corrected_code": "Corrected code with proper formatting",
  "summary": "2-3 line explanation of the corrections made"
}

⚠️ Rules:
- Never add extra commentary outside of JSON.
- If the code has no errors, return "status": "success", keep issues and fixes as empty arrays, and corrected_code should just repeat the user code.
- Make sure the JSON is valid (parsable).
  `
});

async function generateContent(prompt) {
  console.log("📤 Code sent to Gemini:", prompt);
  
  const result = await model.generateContent(prompt);
  return result.response.text();
}

module.exports = generateContent;
