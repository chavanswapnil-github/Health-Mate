const Groq = require("groq-sdk");
require("dotenv").config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function test() {
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: "Say hello in one sentence."
        }
      ]
    });

    console.log("✅ Success:");
    console.log(response.choices[0].message.content);
  } catch (err) {
    console.error("❌ Error:");
    console.error(err);
  }
}

test();