import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SurveyForm.css";

const REACT_APP_BACK_END_URL = process.env.REACT_APP_BACK_END_URL;

const SurveyForm: React.FC = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);

  const handleOptionChange = (index: number, value: string) => {
    const copy = [...options];
    copy[index] = value;
    setOptions(copy);
  };

  const handleSubmit = async () => {
    if (!question || options.some((opt) => !opt.trim())) {
      alert("질문과 옵션을 모두 작성해주세요.");
      return;
    }

    const payload = {
      sub: question,
      contents: options.map((opt) => ({
        surveytitle: opt,
      })),
    };

    try {
      await axios.post(
        `${REACT_APP_BACK_END_URL}/api/survey/addsurvey`,
        payload,
         {
          withCredentials: true,  // 세션 쿠키 전송 
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      alert("설문 작성 완료!");
      navigate("/survey");
    } catch (error) {
      console.error("설문 작성 실패", error);
      alert("설문 작성 실패");
    }
  };

  return (
    <div className="survey-form-wrap">
      <div className="survey-form-container">
        <h2 className="survey-form-title">영화 취향 설문 작성</h2>

        <div className="survey-form-question">
          <span>질문</span>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="질문을 입력하세요"
            className="survey-input"
          />
        </div>

        <div className="survey-options">
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`옵션 ${index + 1}`}
              className="survey-input survey-option-input"
            />
          ))}
        </div>

        <div className="survey-form-submit">
          <button className="survey-submit-btn" onClick={handleSubmit}>
            작성 완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyForm;
