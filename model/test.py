import os
import sys
import re
import argparse
import joblib
import pandas as pd
import numpy as np

from sklearn.metrics import accuracy_score, classification_report

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.dirname(BASE_DIR)

DATA_DIR = os.path.join(BACKEND_DIR, "data", "dataset")

TRAIN_PATH = os.path.join(DATA_DIR, "train.txt")
TEST_PATH  = os.path.join(DATA_DIR, "test.txt")
VAL_PATH   = os.path.join(DATA_DIR, "val.txt")

SAVED_DIR = os.path.join(BASE_DIR, "saved_model")

MODEL_PATH = os.path.join(SAVED_DIR, "emotion_model.pkl")
VECTORIZER_PATH = os.path.join(SAVED_DIR, "vectorizer.pkl")
ENCODER_PATH = os.path.join(SAVED_DIR, "label_encoder.pkl")

EMOTIONS = ["sadness", "joy", "love", "anger", "fear", "surprise"]

def clean_text(text):
    text = str(text).lower()

    text = re.sub(r"http\S+|www\S+", "", text)
    text = re.sub(r"@\w+|#\w+", "", text)
    text = re.sub(r"[^a-z\s]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()

    return text

def load_model():
    if not os.path.exists(MODEL_PATH):
        print("❌ Model not found. Run train.py first.")
        sys.exit(1)

    model = joblib.load(MODEL_PATH)
    vectorizer = joblib.load(VECTORIZER_PATH)
    encoder = joblib.load(ENCODER_PATH)

    print("✅ Model loaded successfully")
    return model, vectorizer, encoder

def load_dataset():
    train = pd.read_csv(TRAIN_PATH, sep=";", names=["text", "label"])
    test  = pd.read_csv(TEST_PATH,  sep=";", names=["text", "label"])
    val   = pd.read_csv(VAL_PATH,   sep=";", names=["text", "label"])

    df = pd.concat([train, test, val], ignore_index=True)

    df.dropna(inplace=True)
    df["label"] = df["label"].str.strip().str.lower()

    df = df[df["label"].isin(EMOTIONS)]

    df["clean_text"] = df["text"].apply(clean_text)

    return df

def predict(text, model, vectorizer, encoder):
    cleaned = clean_text(text)
    vec = vectorizer.transform([cleaned])

    pred = model.predict(vec)[0]

    if hasattr(model, "predict_proba"):
        probs = model.predict_proba(vec)[0]
        confidence = max(probs)
    else:
        confidence = None

    emotion = encoder.inverse_transform([pred])[0]

    return emotion, confidence

def evaluate(model, vectorizer, encoder):
    df = load_dataset()

    X = df["clean_text"]
    y = encoder.transform(df["label"])

    X_vec = vectorizer.transform(X)
    preds = model.predict(X_vec)

    acc = accuracy_score(y, preds)

    print("\n📊 Accuracy:", acc)
    print("\n📋 Classification Report:\n")
    print(classification_report(y, preds, target_names=encoder.classes_))

def interactive(model, vectorizer, encoder):
    print("\n💬 Interactive Mode (type 'exit' to quit)\n")

    while True:
        text = input("Enter text: ")

        if text.lower() == "exit":
            break

        emotion, confidence = predict(text, model, vectorizer, encoder)

        if confidence:
            print(f"Emotion: {emotion} ({confidence:.2f})\n")
        else:
            print(f"Emotion: {emotion}\n")

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--text", type=str, help="Single prediction")
    parser.add_argument("--evaluate", action="store_true")
    parser.add_argument("--interactive", action="store_true")

    args = parser.parse_args()

    model, vectorizer, encoder = load_model()

    if args.text:
        emotion, confidence = predict(args.text, model, vectorizer, encoder)
        print(f"\nResult: {emotion} ({confidence:.2f})")

    elif args.evaluate:
        evaluate(model, vectorizer, encoder)

    else:
        interactive(model, vectorizer, encoder)

if __name__ == "__main__":
    main()