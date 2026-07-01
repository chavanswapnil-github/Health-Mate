const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");
const jwt = require("jsonwebtoken");
const DietEntry = require("../models/DietEntry");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// -------------------- USER TOKEN CHECK --------------------
const userAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecretkey");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// -------------------- 1) DIET PLAN --------------------
router.post("/diet-plan", userAuth, async (req, res) => {
  try {
    const form = req.body;

    const prompt = `
Generate a detailed, structured diet plan in Markdown format with these sections:

## Important Considerations
## Estimated Calorie Needs
## Macronutrient Breakdown
## Meal Plan
### Breakfast
### Lunch
### Dinner
### Snacks
## Hydration
## Important Notes

User details:
${JSON.stringify(form, null, 2)}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 4096,
    });

    const diet_plan = completion.choices?.[0]?.message?.content;

    if (!diet_plan) {
      return res.status(500).json({ error: "Empty response from Groq" });
    }

    // -------------------- SAVE DIET PLAN IN DATABASE --------------------
    await DietEntry.create({
      user: req.user.id,
      diet_plan,
      bmi: form.bmi || null,
      height: form.height || null,
      weight: form.weight || null
    });

    res.json({ diet_plan });

  } catch (error) {
    console.error("Groq diet plan error:", error);
    res.status(500).json({ error: error.message });
  }
});

// -------------------- 2) BMI ADVICE --------------------
router.post("/bmi-advice", async (req, res) => {
  try {
    const { bmi } = req.body;

    const prompt = `
Give short BMI advice for BMI = ${bmi}

Format:
- Start with BMI category (**bold**)
- 3-5 bullet points of clear advice
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6,
      max_tokens: 800,
    });

    const advice = completion.choices?.[0]?.message?.content;

    res.json({ advice });

  } catch (err) {
    console.error("BMI advice error:", err);
    res.status(500).json({ error: err.message });
  }
});

// -------------------- 3) CHATBOT --------------------
router.post("/chatbot", async (req, res) => {
  try {
    const { message } = req.body;

    const prompt = `
You are a friendly AI health assistant.
Respond short, clear, helpful, in bullet points if needed.

User said: "${message}"
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You are a smart and friendly health chatbot." },
        { role: "user", content: prompt }
      ],
      temperature: 0.6,
      max_tokens: 800,
    });

    const reply = completion.choices?.[0]?.message?.content;
    console.log("Groq Reply:", reply);

    res.json({ reply });

  } catch (err) {
    console.error("Chatbot error:", err);
    res.status(500).json({
      error: "Chatbot failed",
      details: err.message,
    });
  }
});

module.exports = router;
