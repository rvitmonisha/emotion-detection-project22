import { useState } from "react";

// ─── STEP 1: EMOTION → STRESS LEVEL MAPPING ───────────────────────────────
const EMOTION_MAP = {
  calm:     { level: "low",    bar: 15 },
  joy:      { level: "low",    bar: 10 },
  happy:    { level: "low",    bar: 12 },
  neutral:  { level: "low",    bar: 25 },
  stress:   { level: "medium", bar: 55 },
  worry:    { level: "medium", bar: 60 },
  sadness:  { level: "medium", bar: 50 },
  sad:      { level: "medium", bar: 50 },
  surprise: { level: "medium", bar: 45 },
  anxiety:  { level: "high",   bar: 85 },
  fear:     { level: "high",   bar: 90 },
  anger:    { level: "high",   bar: 80 },
  disgust:  { level: "high",   bar: 75 },
};

// ─── STEP 2: DECISION SYSTEM ──────────────────────────────────────────────
const DECISIONS = {
  low: {
    color: "#1D9E75",
    bg: "#E1F5EE",
    border: "#5DCAA5",
    badge: "#085041",
    badgeBg: "#9FE1CB",
    label: "Low",
    title: "You seem calm and well.",
    message:
      "Your emotional state looks balanced right now. Take a moment to appreciate this and keep up your healthy habits.",
    tips: [
      "Keep up your daily routine",
      "Great time for light exercise or mindfulness",
      "Stay hydrated and sleep well",
    ],
    showDoctor: false,
  },
  medium: {
    color: "#BA7517",
    bg: "#FAEEDA",
    border: "#EF9F27",
    badge: "#633806",
    badgeBg: "#FAC775",
    label: "Medium",
    title: "You seem a bit stressed today.",
    message:
      "It's okay to feel this way. A few small actions can help you feel more grounded and in control.",
    tips: [
      "Take short breaks every hour",
      "Try deep breathing for 2 minutes",
      "Limit caffeine and talk to a friend",
    ],
    showDoctor: false,
  },
  high: {
    color: "#A32D2D",
    bg: "#FCEBEB",
    border: "#F09595",
    badge: "#791F1F",
    badgeBg: "#F7C1C1",
    label: "High",
    title: "You seem under significant stress.",
    message:
      "Your wellbeing matters. Please don't carry this alone — rest, reach out to someone, and consider professional support.",
    tips: [
      "Pause and breathe slowly (4-7-8 technique)",
      "Avoid isolation — talk to someone you trust",
      "Consult a mental health professional",
    ],
    showDoctor: true,
  },
};

// ─── STEP 3: STRESS BAR COMPONENT ─────────────────────────────────────────
function StressBar({ level, barPercent }) {
  const cfg = DECISIONS[level];
  return (
    <div style={{ marginTop: 8 }}>
      <div
        style={{
          height: 6,
          borderRadius: 3,
          background: "#e5e7eb",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${barPercent}%`,
            background: cfg.color,
            borderRadius: 3,
            transition: "width 0.6s ease",
          }}
        />
      </div>
    </div>
  );
}

// ─── STEP 4: DOCTOR TRIGGER LOGIC ─────────────────────────────────────────
function DoctorBanner() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "14px 16px",
        background: "#FCEBEB",
        border: "1px solid #F09595",
        borderRadius: 10,
        marginTop: 12,
      }}
    >
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: "50%",
          background: "#E24B4A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontWeight: 700,
          fontSize: 16,
          flexShrink: 0,
        }}
      >
        +
      </div>
      <div>
        <p style={{ fontWeight: 600, color: "#501313", fontSize: 14, marginBottom: 2 }}>
          Consider consulting a doctor
        </p>
        <p style={{ fontSize: 13, color: "#791F1F", lineHeight: 1.6 }}>
          Your stress indicators suggest professional support may help. Please
          reach out to a healthcare provider or counsellor at your earliest
          convenience.
        </p>
      </div>
    </div>
  );
}

// ─── STEP 5: RESULT CARD ──────────────────────────────────────────────────
function ResultCard({ emotion, level, barPercent }) {
  const cfg = DECISIONS[level];
  return (
    <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Metric row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div
          style={{
            background: "#f9fafb",
            borderRadius: 10,
            padding: "12px 14px",
            border: "0.5px solid #e5e7eb",
          }}
        >
          <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>Detected emotion</p>
          <p style={{ fontSize: 20, fontWeight: 600, color: "#111827", textTransform: "capitalize" }}>
            {emotion}
          </p>
        </div>
        <div
          style={{
            background: "#f9fafb",
            borderRadius: 10,
            padding: "12px 14px",
            border: "0.5px solid #e5e7eb",
          }}
        >
          <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>
            Stress level{" "}
            <span
              style={{
                display: "inline-block",
                fontSize: 11,
                fontWeight: 600,
                padding: "1px 8px",
                borderRadius: 20,
                background: cfg.badgeBg,
                color: cfg.badge,
                marginLeft: 4,
              }}
            >
              {cfg.label}
            </span>
          </p>
          <p style={{ fontSize: 20, fontWeight: 600, color: cfg.color }}>{cfg.label}</p>
          <StressBar level={level} barPercent={barPercent} />
        </div>
      </div>

      {/* Insight card */}
      <div
        style={{
          background: cfg.bg,
          border: `1px solid ${cfg.border}`,
          borderLeft: `4px solid ${cfg.color}`,
          borderRadius: 10,
          padding: "14px 16px",
        }}
      >
        <p style={{ fontWeight: 600, fontSize: 15, color: cfg.badge, marginBottom: 6 }}>
          {cfg.title}
        </p>
        <p style={{ fontSize: 13, color: cfg.color, lineHeight: 1.7, marginBottom: 10 }}>
          {cfg.message}
        </p>
        <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 5 }}>
          {cfg.tips.map((tip, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: cfg.badge }}>
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: cfg.color,
                  marginTop: 6,
                  flexShrink: 0,
                }}
              />
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Doctor trigger — only if HIGH */}
      {cfg.showDoctor && <DoctorBanner />}
    </div>
  );
}

// ─── MAIN DASHBOARD COMPONENT ─────────────────────────────────────────────
export default function Dashboard() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);   // { emotion, level, barPercent }
  const [error, setError] = useState("");

  // Called when user submits text → hits app.py API
  async function analyzeText() {
    if (!text.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      // ── API CALL to Member 2's app.py ─────────────────────────────────
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error("Server error: " + res.status);

      const data = await res.json();
      // data = { "emotion": "anxiety" }

      const emotion = (data.emotion || "").toLowerCase().trim();
      const mapped = EMOTION_MAP[emotion];

      if (!mapped) {
        setError(`Unknown emotion returned: "${emotion}". Check app.py output.`);
        return;
      }

      setResult({ emotion, level: mapped.level, barPercent: mapped.bar });
    } catch (err) {
      setError("Could not connect to backend. Make sure app.py is running on port 5000.");
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      analyzeText();
    }
  }

  function reset() {
    setText("");
    setResult(null);
    setError("");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f4ff 0%, #faf5ff 100%)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "40px 16px",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}
    >
      <div style={{ width: "100%", maxWidth: 520 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: "#e0e7ff",
              marginBottom: 12,
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#6366f1" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="9" cy="10" r="1.2" fill="#fff" />
              <circle cx="15" cy="10" r="1.2" fill="#fff" />
            </svg>
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827", margin: 0 }}>
            Emotion & Stress Analyzer
          </h1>
          <p style={{ fontSize: 14, color: "#6b7280", marginTop: 6 }}>
            Type how you feel — we'll detect your emotion and stress level
          </p>
        </div>

        {/* Main card */}
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            padding: 24,
          }}
        >
          {/* Text input area */}
          <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>
            How are you feeling?
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKey}
            placeholder="e.g. I've been feeling really overwhelmed lately and can't seem to relax..."
            rows={4}
            style={{
              width: "100%",
              padding: "12px 14px",
              border: "1px solid #d1d5db",
              borderRadius: 10,
              fontSize: 14,
              color: "#111827",
              resize: "vertical",
              outline: "none",
              fontFamily: "inherit",
              lineHeight: 1.6,
              boxSizing: "border-box",
              transition: "border-color 0.15s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
            onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
          />

          {/* Buttons */}
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <button
              onClick={analyzeText}
              disabled={loading || !text.trim()}
              style={{
                flex: 1,
                padding: "11px 0",
                background: loading || !text.trim() ? "#a5b4fc" : "#6366f1",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
                cursor: loading || !text.trim() ? "not-allowed" : "pointer",
                transition: "background 0.15s",
              }}
            >
              {loading ? "Analyzing..." : "Analyze Emotion"}
            </button>
            {result && (
              <button
                onClick={reset}
                style={{
                  padding: "11px 18px",
                  background: "transparent",
                  color: "#6b7280",
                  border: "1px solid #d1d5db",
                  borderRadius: 10,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                Reset
              </button>
            )}
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                marginTop: 12,
                padding: "10px 14px",
                background: "#fef2f2",
                border: "1px solid #fca5a5",
                borderRadius: 8,
                fontSize: 13,
                color: "#b91c1c",
              }}
            >
              {error}
            </div>
          )}

          {/* Result display */}
          {result && (
            <ResultCard
              emotion={result.emotion}
              level={result.level}
              barPercent={result.barPercent}
            />
          )}
        </div>

        {/* Footer */}
        <p style={{ textAlign: "center", fontSize: 12, color: "#9ca3af", marginTop: 20 }}>
          Emotion Detection Project · Member 4 — Logic & Dashboard
        </p>
      </div>
    </div>
  );
}
