import React, { useEffect, useState } from "react";
import "./SurveryDetail.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface SurveyContent {
  surveytype: string;   // A, B, C, D
  surveytitle: string;
  surveycnt: number;
}

interface Survey {
  num: number;  // surveyNum
  sub: string;
  code: number;
  contents: SurveyContent[];
}

const SurveryDetail: React.FC = () => {
  const REACT_APP_BACK_END_URL = process.env.REACT_APP_BACK_END_URL;
  const { num } = useParams<{ num: string }>();
  const navigate = useNavigate();

  const [surveyDetail, setSurveyDetail] = useState<Survey | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // 설문 데이터 조회
  useEffect(() => {
    const fetchSurveyDetail = async () => {
      try {
        const response = await axios.get(
          `${REACT_APP_BACK_END_URL}/api/survey/result/${num}`
        );
        setSurveyDetail(response.data);
      } catch (error) {
        console.error("설문조사 디테일 호출 실패", error);
      }
    };

    fetchSurveyDetail();
  }, [num, REACT_APP_BACK_END_URL]);

  // 설문 제출
  const handleSubmit = async () => {
    if (!surveyDetail?.num) {
      alert("설문 정보가 없습니다.");
      return;
    }

    if (!selectedOption) {
      alert("옵션을 선택해주세요!");
      return;
    }

    console.log("최종 전송값:", {
      surveyNum: surveyDetail.num,
      surveytype: selectedOption,
    });

    try {
      await axios.post(
        `${REACT_APP_BACK_END_URL}/api/survey/updateCount`,
        {
          surveyNum: surveyDetail.num, 
          surveytype: selectedOption  
        }
      );

      alert("투표 완료!");
      navigate(`/survey/result/${surveyDetail.num}`);
    } catch (error) {
      console.error("투표 실패", error);
      alert("투표 실패");
    }
  };

  return (
    <div className="survey-wrap">
      <h2 className="survey-title">영화 취향 설문</h2>

      <div className="survey-box">
        <p className="survey-question">
          <span className="Q-mark">Q.</span> {surveyDetail?.sub}
        </p>

        <ul className="survey-options">
          {surveyDetail?.contents.map((option) => (
            <li key={option.surveytype}>
              <label className="option-item">
                <input
                  type="radio"
                  name="survey"
                  value={option.surveytype}
                  checked={selectedOption === option.surveytype}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                <span className="answer-option">
                  {option.surveytitle}
                </span>
              </label>
            </li>
          ))}
        </ul>

        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={!selectedOption}
        >
          설문완료
        </button>
      </div>
    </div>
  );
};

export default SurveryDetail;
