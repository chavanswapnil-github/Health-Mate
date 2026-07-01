import React, { useState } from "react";
import DOMPurify from "dompurify";
import Result from "./Result";

const DietForm = () => {
  const [form, setForm] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    activity: "",
    goal: "",
    medical: "",
    allergies: "",
    food_pref: "",
    meals_per_day: "",
    cuisine: "",
  });

  const [dietPlan, setDietPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");   // 🔥 ADD TOKEN HERE

    try {
      const res = await fetch("http://localhost:5000/api/gemini/diet-plan", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`   // 🔥 SEND TOKEN TO BACKEND
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        console.error("Server error:", res.status);
        return;
      }

      const data = await res.json();
      console.log("Diet Plan API Response:", data);
      setDietPlan(data.diet_plan);
    } catch (error) {
      console.error("Error generating diet plan:", error);
    } finally {
      setLoading(false);
    }
  };

  const sanitizedHTML = DOMPurify.sanitize(dietPlan);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 text-success fw-bold">
        Smart Diet Planner
      </h2>

      <div className="card shadow-lg p-4 rounded-4 border-0">
        <form onSubmit={handleSubmit}>
          <div className="row g-4">

            {/* Age */}
            <div className="col-md-6">
              <label className="form-label text-success fw-semibold">Age</label>
              <input
                type="number"
                name="age"
                className="form-control border-success"
                onChange={handleChange}
                required
              />
            </div>

            {/* Gender */}
            <div className="col-md-6">
              <label className="form-label text-success fw-semibold">Gender</label>
              <select
                name="gender"
                className="form-select border-success"
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            {/* Height */}
            <div className="col-md-6">
              <label className="form-label text-success fw-semibold">
                Height (cm)
              </label>
              <input
                type="number"
                name="height"
                className="form-control border-success"
                onChange={handleChange}
                required
              />
            </div>

            {/* Weight */}
            <div className="col-md-6">
              <label className="form-label text-success fw-semibold">
                Weight (kg)
              </label>
              <input
                type="number"
                name="weight"
                className="form-control border-success"
                onChange={handleChange}
                required
              />
            </div>

            {/* Activity Level */}
            <div className="col-md-6">
              <label className="form-label text-success fw-semibold">
                Activity Level
              </label>
              <select
                name="activity"
                className="form-select border-success"
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option>Sedentary</option>
                <option>Moderately Active</option>
                <option>Very Active</option>
              </select>
            </div>

            {/* Goal */}
            <div className="col-md-6">
              <label className="form-label text-success fw-semibold">Goal</label>
              <select
                name="goal"
                className="form-select border-success"
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option>Lose Weight</option>
                <option>Gain Weight</option>
                <option>Maintain</option>
              </select>
            </div>

            {/* Medical Conditions */}
            <div className="col-md-6">
              <label className="form-label text-success fw-semibold">
                Medical Conditions
              </label>
              <input
                type="text"
                name="medical"
                className="form-control border-success"
                onChange={handleChange}
              />
            </div>

            {/* Allergies */}
            <div className="col-md-6">
              <label className="form-label text-success fw-semibold">
                Allergies
              </label>
              <input
                type="text"
                name="allergies"
                className="form-control border-success"
                onChange={handleChange}
              />
            </div>

            {/* Food Preference */}
            <div className="col-md-6">
              <label className="form-label text-success fw-semibold">
                Food Preference
              </label>
              <select
                name="food_pref"
                className="form-select border-success"
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option>Vegetarian</option>
                <option>Vegan</option>
                <option>Non-Vegetarian</option>
              </select>
            </div>

            {/* Meals per day */}
            <div className="col-md-6">
              <label className="form-label text-success fw-semibold">
                Meals Per Day
              </label>
              <input
                type="number"
                name="meals_per_day"
                className="form-control border-success"
                onChange={handleChange}
                required
              />
            </div>

            {/* Cuisine Preference */}
            <div className="col-12">
              <label className="form-label text-success fw-semibold">
                Cuisine Preference
              </label>
              <input
                type="text"
                name="cuisine"
                className="form-control border-success"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="text-center mt-4">
            <button
              className="btn btn-success px-5 fw-bold"
              type="submit"
              disabled={loading}
            >
              {loading ? "Generating..." : "Get Diet Plan"}
            </button>
          </div>
        </form>
      </div>

      {/* Diet Plan Result */}
      {dietPlan && (
        <div className="mt-5">
          <Result dietPlan={sanitizedHTML} />
        </div>
      )}
    </div>
  );
};

export default DietForm;
