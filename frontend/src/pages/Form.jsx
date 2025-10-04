import React, { useState, useEffect } from "react";

export default function Form() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [result, setResult] = useState(null);
  const [allSymptoms, setAllSymptoms] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/symptoms")
      .then((res) => res.json())
      .then((data) => setAllSymptoms(data.symptoms || []))
      .catch((err) => console.error("Failed to load symptoms:", err));
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = allSymptoms.filter(
        (s) =>
          s.toLowerCase().includes(query.toLowerCase()) &&
          !symptoms.includes(s)
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query, symptoms, allSymptoms]);

  const addSymptom = (symptom) => {
    setSymptoms([...symptoms, symptom]);
    setQuery("");
    setSuggestions([]);
  };

  const removeSymptom = (symptom) => {
    setSymptoms(symptoms.filter((s) => s !== symptom));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      age: parseInt(age),
      gender: gender || "male", 
      height: parseFloat(height),
      weight: parseFloat(weight),
      symptoms,
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      setResult(json);
    } catch (err) {
      console.error("Error:", err);
      setResult({ error: "Something went wrong" });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 bg-sky-100 shadow-md rounded-lg">
      <h2 className="text-3xl sm:text-4xl font-bold text-sky-900 mb-8 text-center">
        AI Health Triage Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Age */}
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full border p-3 rounded text-base sm:text-lg"
          required
        />

        {/* Gender */}
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className={`w-full border p-3 rounded text-base sm:text-lg ${
            gender ? "text-gray-700" : "text-gray-400"
          }`}
          required
        >
          <option value="" disabled>
            Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        {/* Height */}
        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="w-full border p-3 rounded text-base sm:text-lg"
          required
        />

        {/* Weight */}
        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full border p-3 rounded text-base sm:text-lg"
          required
        />

        {/* Symptom Search */}
        <input
          type="text"
          placeholder="Search symptoms..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border p-3 rounded text-base sm:text-lg"
        />

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <ul className="border bg-gray-50 rounded max-h-40 overflow-y-auto text-base sm:text-lg">
            {suggestions.map((s, i) => (
              <li
                key={i}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => addSymptom(s)}
              >
                {s}
              </li>
            ))}
          </ul>
        )}

        {/* Selected Symptoms */}
        <div className="flex flex-wrap gap-2 text-sm sm:text-base">
          {symptoms.map((s, i) => (
            <span
              key={i}
              className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full cursor-pointer"
              onClick={() => removeSymptom(s)}
            >
              {s} ✕
            </span>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={symptoms.length < 3}
          className={`w-full p-3 rounded text-white font-semibold text-base sm:text-lg ${
            symptoms.length < 3
              ? "bg-sky-300 cursor-not-allowed"
              : "bg-sky-500 hover:bg-sky-600"
          }`}
        >
          Predict Disease
        </button>
      </form>

      {/* Prediction Result */}
      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-50 text-base sm:text-lg">
          {result.error ? (
            <p className="text-red-600">{result.error}</p>
          ) : (
            <>
              <h3 className="text-2xl mb-4 font-semibold">
                {result.emoji} {result.predicted_condition}
              </h3>
              <p>
                <strong>Urgency:</strong> {result.urgency_level}
              </p>
              <p>
                <strong>Advice:</strong> {result.advice}
              </p>
              {result.bmi && (
                <p>
                  <strong>BMI:</strong> {result.bmi}
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}



