import os
import re
import joblib
import pandas as pd
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.svm import LinearSVC
from sklearn.naive_bayes import MultinomialNB
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

BASE_DIR    = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.dirname(BASE_DIR)

DATA_DIR = os.path.join(BACKEND_DIR, "data", "dataset")

TRAIN_PATH = os.path.join(DATA_DIR, "train.txt")
TEST_PATH  = os.path.join(DATA_DIR, "test.txt")
VAL_PATH   = os.path.join(DATA_DIR, "val.txt")

SAVED_DIR = os.path.join(BASE_DIR, "saved_model")
os.makedirs(SAVED_DIR, exist_ok=True)

MODEL_PATH = os.path.join(SAVED_DIR, "emotion_model.pkl")
VECTORIZER_PATH = os.path.join(SAVED_DIR, "vectorizer.pkl")
ENCODER_PATH = os.path.join(SAVED_DIR, "label_encoder.pkl")

EMOTIONS = ["sadness", "joy", "love", "anger", "fear", "surprise"]

def clean_text(text):
    text = str(text).lower()

    contractions = {
        "can't": "cannot", "won't": "will not", "n't": " not",
        "'re": " are", "'s": " is", "'ll": " will",
        "'ve": " have", "'m": " am", "'d": " would",
    }

    for c, e in contractions.items():
        text = text.replace(c, e)

    text = re.sub(r"http\S+|www\S+", "", text)
    text = re.sub(r"@\w+|#\w+", "", text)
    text = re.sub(r"<[^>]+>", "", text)
    text = re.sub(r"[^a-z\s]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()

    return text

def load_data():
    print("\n📂 Loading dataset...")

    train = pd.read_csv(TRAIN_PATH, sep=";", names=["text", "label"])
    test  = pd.read_csv(TEST_PATH,  sep=";", names=["text", "label"])
    val   = pd.read_csv(VAL_PATH,   sep=";", names=["text", "label"])

    df = pd.concat([train, test, val], ignore_index=True)

    print(f"Total samples: {len(df)}")

    df.dropna(inplace=True)
    df["text"] = df["text"].astype(str)
    df["label"] = df["label"].str.strip().str.lower()

    df = df[df["label"].isin(EMOTIONS)].reset_index(drop=True)

    print("\n📊 Class Distribution:")
    print(df["label"].value_counts())

    return df

def preprocess(df):
    print("\n🧹 Cleaning text...")
    df["clean_text"] = df["text"].apply(clean_text)

    le = LabelEncoder()
    le.fit(EMOTIONS)
    df["label_enc"] = le.transform(df["label"])

    return df, le

def split_data(df):
    X = df["clean_text"]
    y = df["label_enc"]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, stratify=y, random_state=42
    )

    return X_train, X_test, y_train, y_test

def build_vectorizer():
    return TfidfVectorizer(
        max_features=50000,
        ngram_range=(1,2),
        sublinear_tf=True
    )

def train_models(X_train_tfidf, y_train, X_test_tfidf, y_test):

    models = {
        "Logistic Regression": LogisticRegression(max_iter=1000),
        "Linear SVC": LinearSVC(),
        "Naive Bayes": MultinomialNB()
    }

    best_model = None
    best_acc = 0

    print("\n🏋️ Training Models:")

    for name, model in models.items():
        model.fit(X_train_tfidf, y_train)
        preds = model.predict(X_test_tfidf)
        acc = accuracy_score(y_test, preds)

        print(f"{name}: {acc:.4f}")

        if acc > best_acc:
            best_acc = acc
            best_model = model

    print(f"\n🏆 Best Model Accuracy: {best_acc:.4f}")
    return best_model

def evaluate(model, vectorizer, le, X_test, y_test):

    X_test_tfidf = vectorizer.transform(X_test)
    preds = model.predict(X_test_tfidf)

    print("\n📊 Classification Report:\n")
    print(classification_report(y_test, preds, target_names=le.classes_))

def save(model, vectorizer, le):

    joblib.dump(model, MODEL_PATH)
    joblib.dump(vectorizer, VECTORIZER_PATH)
    joblib.dump(le, ENCODER_PATH)

    print("\n💾 Model Saved!")

def main():

    df = load_data()

    df, le = preprocess(df)

    X_train, X_test, y_train, y_test = split_data(df)

    vectorizer = build_vectorizer()

    X_train_tfidf = vectorizer.fit_transform(X_train)
    X_test_tfidf = vectorizer.transform(X_test)

    model = train_models(X_train_tfidf, y_train, X_test_tfidf, y_test)

    evaluate(model, vectorizer, le, X_test, y_test)

    save(model, vectorizer, le)

    print("\n✅ Training Complete!")

if __name__ == "__main__":
    main()