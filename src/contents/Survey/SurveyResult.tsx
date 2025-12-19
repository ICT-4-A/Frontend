// src/contents/Survey/SurveyResult.tsx
import React from "react";
import "./SurveyResult.css";

const SurveyResult: React.FC = () => {
  // TODO: 실제 데이터는 API에서 받아오기
  const totalVotes = 100;
  const results = [
    { id: 1, label: "90분 이하", value: 18 },
    { id: 2, label: "120분 내외", value: 35 },
    { id: 3, label: "150분 이상도 OK", value: 22 },
    { id: 4, label: "재미만 있으면 상관없다", value: 25 },
  ];

  return (
    <div className="survey-wrap">
      <h2 className="survey-title">영화 취향 설문</h2>

      <div className="survey-box">
        <p className="survey-question">
          <span className="Q-mark">Q.</span>
          영화 러닝타임, 어디까지 괜찮아?
        </p>

        <ul className="survey-result-list">
          {results.map((item, index) => {
            const percent = Math.round((item.value / totalVotes) * 100);
            const isTop = index === 0; // 예시: 첫 번째 항목을 강조
            return (
              <li
                key={item.id}
                className={`result-item ${isTop ? "top" : ""}`}
              >
                <div className="result-label-row">
                  <span className="result-label">{item.label}</span>
                  <span className="result-percent">{percent}%</span>
                </div>
                <div className="result-bar-bg">
                  <div
                    className="result-bar-fill"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <div className="result-count">
                  {item.value.toLocaleString()}명
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SurveyResult;
