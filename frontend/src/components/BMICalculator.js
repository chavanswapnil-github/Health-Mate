import React, { useState } from "react";

const API_BASE = "http://localhost:5000/api/gemini";

const BMICalculator = () => {
  const [height, setHeight] = useState(""); // in cm
  const [weight, setWeight] = useState(""); // in kg
  const [bmi, setBmi] = useState(null);
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);

  const formatAdvice = (text) => {
    if (!text) return "";
    const bold = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    const lines = bold.replace(/\n/g, "<br/>");
    return lines;
  };

  const calculateBMI = async () => {
    if (!height || !weight) {
      alert("Enter height and weight");
      return;
    }

    const h = Number(height) / 100;
    const w = Number(weight);
    const result = w / (h * h);
    const bmiCalculated = Number(result.toFixed(1));

    setBmi(bmiCalculated);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/bmi-advice`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bmi: bmiCalculated }),
      });

      const data = await res.json();
      setAdvice(data.advice || "No advice generated.");
    } catch (error) {
      console.error(error);
      setAdvice("Error fetching advice.");
    }

    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto border-success" style={{ maxWidth: "600px" }}>
        <h2 className="text-center text-success mb-4">BMI Calculator</h2>

        <input
          type="number"
          className="form-control mb-3"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />

        <input
          type="number"
          className="form-control mb-3"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />

        <button className="btn btn-success w-100" onClick={calculateBMI}>
          Calculate BMI
        </button>

        {bmi && (
          <div className="alert alert-primary text-center mt-4">
            <strong>Your BMI:</strong> {bmi}
          </div>
        )}

        {loading && <p className="text-center mt-3 text-muted">Getting advice...</p>}

        {advice && !loading && (
          <div
            className="alert alert-light border border-success mt-3"
            dangerouslySetInnerHTML={{ __html: formatAdvice(advice) }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default BMICalculator;
