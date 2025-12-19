import React from "react";
import "./SurveryDetail.css";
import { Link } from "react-router-dom";

const SurveryDetail: React.FC = () => {
  return (
    <div className="survey-wrap">
      <h2 className="survey-title">영화 취향 설문</h2>

      <div className="survey-box">
        <p className="survey-question">
          <span className="Q-mark">Q.</span> 
          영화 러닝타임, 어디까지 괜찮아?
        </p>

        <ul className="survey-options">
          <li>
            <label className="option-item">
              <input type="radio" name="survey" className="survey-radio"/>
              <span className="answer-option">90분 이하</span>
            </label>
          </li>

          <li>
            <label className="option-item">
              <input type="radio" name="survey" className="survey-radio"/>
              <span className="answer-option">120분 내외</span>
            </label>
          </li>

          <li>
            <label className="option-item">
              <input type="radio" name="survey" className="survey-radio"/>
              <span className="answer-option">150분 이상도 OK</span>
            </label>
          </li>

          <li>
            <label className="option-item">
              <input type="radio" name="survey" className="survey-radio" />
              <span className="answer-option">재미만 있으면 상관없다</span>
            </label>
          </li>
        </ul>

        <Link to="/survey/result"><button className="submit-btn">설문완료</button></Link>
      </div>
    </div>
  );
};

export default SurveryDetail;
