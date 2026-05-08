import os
import re
import sys
import joblib
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS   # ✅ IMPORTANT

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SAVED_DIR = os.path.join(BASE_DIR, "model", "saved_model")

MODEL_PATH = os.path.join(SAVED_DIR, "emotion_model.pkl")
VECTORIZER_PATH = os.path.join(SAVED_DIR, "vectorizer.pkl")
ENCODER_PATH = os.path.join(SAVED_DIR, "label_encoder.pkl")

app = Flask(__name__)
CORS(app)

clf = None
vectorizer = None
le = None

def load_model():
    global clf, vectorizer, le

    clf = joblib.load(MODEL_PATH)
    vectorizer = joblib.load(VECTORIZER_PATH)
    le = joblib.load(ENCODER_PATH)

    print("Model loaded")

def clean_text(text):
    text = str(text).lower()
    text = re.sub(r"http\S+|www\S+", "", text)
    text = re.sub(r"[^a-z\s]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text

def predict_emotion(text):
    cleaned = clean_text(text)
    vec = vectorizer.transform([cleaned])

    pred = clf.predict(vec)[0]
    emotion = le.inverse_transform([pred])[0]

    confidence = None
    if hasattr(clf, "predict_proba"):
        probs = clf.predict_proba(vec)[0]
        confidence = float(np.max(probs))

    return emotion, confidence


@app.route("/")
def home():
    return jsonify({"message": "Emotion API running 🚀"})

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    if not data or "text" not in data:
        return jsonify({"error": "Text is required"}), 400

    text = data["text"]

    emotion, confidence = predict_emotion(text)

    return jsonify({
        "emotion": emotion,
        "confidence": round(confidence, 2) if confidence else None
    })

if __name__ == "__main__":
    try:
        load_model()
    except Exception as e:
        print("Error loading model:", e)
        sys.exit(1)

    app.run(debug=True)