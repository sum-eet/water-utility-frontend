import React from "react";
import { useNavigate } from "react-router-dom";
import "./ScoreExplanation.css";

const ScoreExplanation = () => {
  const navigate = useNavigate();

  return (
    <div className="score-page">
      {/* Header Section */}
      <header className="score-header">
        <button onClick={() => navigate("/")} className="back-button">
          &#8592; Back
        </button>
        <img src="/Logo.avif" alt="Dr. Water Logo" className="header-logo" />
      </header>

      {/* Main Content */}
      <div className="score-container">
        <h1>Rationale for the Utility Score Calculation</h1>
        <p className="intro-text">
          The scoring system is designed to provide a standardized measure of
          water utility performance based on the available data, considering
          critical health and safety factors. The score is calculated as a
          percentage, normalized to a range from 0 to 100, making it easily
          interpretable and comparable across utilities.
        </p>

        <h2>Key Factors in the Score Calculation:</h2>
        <ol className="key-factors-list">
          <li>
            <strong>Severity of Contaminants:</strong> Certain contaminants pose
            a higher health risk. For example, contaminants linked to cancer are
            given a higher severity score compared to less harmful substances.
          </li>
          <li>
            <strong>Frequency and Magnitude of Violations:</strong> The "Times
            Above Guideline" metric quantifies how much a utility exceeds safety
            levels for detected contaminants.
          </li>
          <li>
            <strong>Average Utility Level:</strong> Indicates the concentration
            of contaminants present. Lower levels indicate better water quality.
          </li>
          <li>
            <strong>Number of Contaminants Detected:</strong> More contaminants
            typically indicate poorer water quality.
          </li>
          <li>
            <strong>Data Completeness and Transparency:</strong> Utilities with
            comprehensive data are indirectly favored.
          </li>
        </ol>

        <h2>Formula for Score Calculation:</h2>
        <div className="formula-box">
          <code>
            Score = 40% × Severity Score + 40% × Average Times Above Guideline +
            20% × Average Utility Level
          </code>
        </div>

        <h2>Why This Approach?</h2>
        <p>
          This scoring system provides a balanced assessment of a utility's
          performance, emphasizing health risks and transparency. Normalization
          ensures comparability, making it easier to identify high-performing
          utilities.
        </p>

        <h3>Use Case:</h3>
        <p>
          <strong>Example:</strong> Nottingham Country Municipal Utility
          District (TX1012315)
        </p>
        <ul className="example-list">
          <li>Score: 55.4</li>
          <li>
            Exceeds guidelines for contaminants like Arsenic (1,075x) and Radium
            (53x).
          </li>
          <li>
            Arsenic and Bromodichloromethane are linked to potential cancer
            risks.
          </li>
          <li>
            Contaminants like Selenium and Manganese are present at lower
            levels.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ScoreExplanation;
