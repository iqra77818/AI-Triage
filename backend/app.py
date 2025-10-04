from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import joblib

BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # Gets the directory of app.py

clf = joblib.load(os.path.join(BASE_DIR, "disease_model.pkl"))
symptoms_columns = joblib.load(os.path.join(BASE_DIR, "symptoms_columns.pkl"))


# Urgency map (reuse what you wrote in Colab)
urgency_map = {
    "aids": "High",
    "alcoholic_hepatitis": "High",
    "dengue": "High",
    "gastroenteritis": "High",
    "heart_attack": "High",
    "hepatitis_a": "High",
    "hepatitis_b": "High",
    "hepatitis_c": "High",
    "hepatitis_d": "High",
    "hepatitis_e": "High",
    "hypertension": "High",
    "hypoglycemia": "High",
    "jaundice": "High",
    "malaria": "High",
    "paralysis_brain_hemorrhage": "High",
    "pneumonia": "High",
    "tuberculosis": "High",
    "typhoid": "High",

    "arthritis": "Medium",
    "bronchial_asthma": "Medium",
    "cervical_spondylosis": "Medium",
    "chronic_cholestasis": "Medium",
    "diabetes": "Medium",
    "dimorphic_hemmorhoids_piles": "Medium",
    "gerd": "Medium",
    "hyperthyroidism": "Medium",
    "hypothyroidism": "Medium",
    "osteoarthristis": "Medium",
    "peptic_ulcer_diseae": "Medium",
    "urinary_tract_infection": "Medium",
    "varicose_veins": "Medium",

    "vertigo_paroymsal_positional_vertigo": "Low",
    "acne": "Low",
    "allergy": "Low",
    "chicken_pox": "Low",
    "common_cold": "Low",
    "drug_reaction": "Low",
    "fungal_infection": "Low",
    "impetigo": "Low",
    "migraine": "Low",
    "psoriasis": "Low"
}

app = FastAPI()

# ✅ Enable CORS so frontend (React/Vite) can call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for now allow all origins (later you can restrict to your frontend domain)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SymptomRequest(BaseModel):
    age: int
    gender: str
    height: float
    weight: float
    symptoms: list

@app.post("/predict")
def predict(req: SymptomRequest):
    # Require at least 3 symptoms
    if len(req.symptoms) < 3:
        return {
            "error": "Please select at least 3 symptoms for a reliable prediction."
        }

    input_data = [0] * len(symptoms_columns)
    for symptom in req.symptoms:
        if symptom in symptoms_columns:
            input_data[symptoms_columns.index(symptom)] = 1

    disease = clf.predict([input_data])[0]
    urgency = urgency_map.get(disease.lower(), "Medium")

    # BMI
    h = req.height / 100
    bmi = round(req.weight / (h**2), 2) if h > 0 else None

    if urgency == "High":
        emoji, advice = "🔴", "⚠️ Immediate emergency attention needed. Go to ER!"
    elif urgency == "Medium":
        emoji, advice = "🟡", "📌 Needs doctor evaluation soon. Book appointment."
    else:
        emoji, advice = "🟢", "✅ Usually mild. GP consultation or home care may be enough."

    return {
        "predicted_condition": disease,
        "urgency_level": urgency,
        "emoji": emoji,
        "advice": advice,
        "bmi": bmi
    }


# ✅ New endpoint to return all symptoms
@app.get("/symptoms")
def get_symptoms():
    return {"symptoms": symptoms_columns}



