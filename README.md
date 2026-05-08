# 🧠 Emotion Detection System

A Machine Learning-based web application that detects human emotions from text input.
This project uses Natural Language Processing (NLP) techniques with a trained model to classify emotions in real time.

---

## 🚀 Features

* 🔍 Detects emotions from user text
* 📊 Provides confidence score for predictions
* ⚡ Fast API using Flask
* 🌐 Frontend integration (React)
* 🤖 ML model trained using TF-IDF + Logistic Regression

---

## 🧠 Supported Emotions

* 😊 Joy
* 😢 Sadness
* 😠 Anger
* 😨 Fear
* ❤️ Love
* 😲 Surprise

---

## 🛠️ Tech Stack

### Backend

* Python
* Flask
* Scikit-learn
* Pandas / NumPy

### Frontend

* React.js

### ML Model

* TF-IDF Vectorizer
* Logistic Regression

---

## 📁 Project Structure

```
backend/
│
├── model/
│   ├── train.py
│   ├── test.py
│   └── saved_model/
│
├── data/
│   └── dataset/
│
├── app.py
├── requirements.txt
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```
git clone https://github.com/Sneha28-p/emotion-detection.git
cd emotion-detection-app
```

### 2. Install dependencies

```
pip install -r requirements.txt
```

### 3. Run the backend server

```
python app.py
```

---

## 🌐 API Usage

### 🔹 POST `/predict`

Request:

```json
{
  "text": "I feel very happy today"
}
```

Response:

```json
{
  "emotion": "joy",
  "confidence": 0.92
}
```

---

## 🧪 Example Test Inputs

* I feel very happy today
* I am feeling sad and tired
* I am angry about this situation
* I feel nervous and scared

---

## 👥 Contributors

* Sneha Patted

---

## 📜 License

This project is for academic and educational purposes.

---

## 🎓 Project Description

This project aims to assist in mental health awareness by detecting user emotions and guiding them toward appropriate support systems such as counseling or self-help suggestions.

---

⭐ If you like this project, feel free to star the repository!
