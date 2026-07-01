from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
CORS(app)

GENAI_API_KEY = os.getenv("GENAI_API_KEY")
if not GENAI_API_KEY:
    raise ValueError("Please set the GENAI_API_KEY environment variable.")

genai.configure(api_key=GENAI_API_KEY)
model = genai.GenerativeModel('gemini-2.0-flash')

@app.route('/generate-diet-plan', methods=['POST'])
def generate_diet():
    data = request.get_json()

    required_fields = [
        "age", "gender", "height", "weight", "activity", "goal",
        "medical", "allergies", "food_pref", "meals_per_day", "cuisine"
    ]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400

    format_instruction = """
    Please provide the response using Markdown format with the following **section headers**:

    ## Important Considerations  
    - Explain considerations based on medical conditions, allergies, and dietary preferences.  
    - Mention things to watch out for during the diet.

    ## Estimated Calorie Needs  
    - Show BMR calculation using Mifflin-St Jeor formula.  
    - Include activity multiplier, maintenance calories, and surplus/deficit.  
    - Final estimated target calories.

    ## Macronutrient Breakdown  
    - Breakdown of protein, carbs, fats in both percentage and gram ranges.  
    - Align it with calories and meals per day.

    ## Meal Plan  
    - For each meal (Breakfast, Lunch, Snack 1, Dinner, Snack 2), provide:
        - 2 vegetarian options each
        - Ingredients list
        - Brief explanation of nutritional benefit

    ## Important Notes  
    - Mention monitoring progress, flexibility, hydration, lifestyle suggestions  
    - Encourage professional guidance where applicable
    """

    prompt = f"""
    You are a certified dietitian. Create a structured, personalized, and vegetarian diet plan for the following person:

    - Age: {data['age']}
    - Gender: {data['gender']}
    - Height: {data['height']} cm
    - Weight: {data['weight']} kg
    - Activity Level: {data['activity']}
    - Goal: {data['goal']}
    - Medical Conditions: {data['medical'] or 'None'}
    - Allergies: {data['allergies'] or 'None'}
    - Food Preference: {data['food_pref']}
    - Meals Per Day: {data['meals_per_day']}
    - Cuisine Preference: {data['cuisine'] or 'No preference'}

    {format_instruction}
    """

    try:
        response = model.generate_content(prompt)
        diet_plan = response.text
        print(diet_plan)
        return jsonify({"diet_plan": diet_plan})
    except Exception as e:
        return jsonify({"error": f"Error generating diet plan: {str(e)}"}), 500

@app.route('/get-bmi-advice', methods=['POST'])
def get_bmi_advice():
    data = request.get_json()
    bmi = data.get("bmi")

    if not bmi:
        return jsonify({"error": "BMI not provided"}), 400

    prompt = f"""
    A user has a BMI of {bmi:.2f}. Please:
    1. Explain what this BMI means in simple terms.
    2. Offer lifestyle or dietary advice to improve or maintain their health.
    3. If the BMI is too low or too high, provide motivational, supportive tips.
    Use bullet points, and keep the tone friendly and medically accurate.
    """

    try:
        response = model.generate_content(prompt)
        advice = response.text
        return jsonify({"advice": advice})
    except Exception as e:
        return jsonify({"error": f"Error generating advice: {str(e)}"}), 500

@app.route('/chatbot-query', methods=['POST'])
def chatbot_query():
    data = request.get_json()
    user_question = data.get("message")

    if not user_question:
        return jsonify({"error": "Message is required"}), 400

    prompt = f"""
    You are a friendly AI health assistant. Reply to the user’s message in 2-3 lines maximum. Keep it vegetarian unless explicitly asked otherwise.
    Be concise, accurate, and simple. Here is the user's question:

    "{user_question}"
    """

    try:
        response = model.generate_content(prompt)
        reply = response.text.strip()
        return jsonify({"reply": reply})
    except Exception as e:
        return jsonify({"error": f"Error generating reply: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(debug=True)
