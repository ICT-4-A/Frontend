import React, { useEffect, useState } from "react";
import "./SurveryDetail.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface SurveyContent {
  surveytitle: string;
  surveycnt: number;
}

interface Survey {
  num: number;
  sub: string;
  contents: SurveyContent[];
}

const SurveryDetail: React.FC = () => {
  const REACT_APP_BACK_END_URL = process.env.REACT_APP_BACK_END_URL;
  const { num } = useParams<{ num: string }>();
  const navigate = useNavigate();

  const [surveyDetail, setSurveyDetail] = useState<Survey | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);

  useEffect(() => {
    const fetchSurveyDetail = async () => {
      try {
        const response = await axios.get(
          `${REACT_APP_BACK_END_URL}/api/survey/result/${num}`
        );
        setSurveyDetail(response.data);
      } catch (error) {
        console.error("설문 디테일 호출 실패", error);
      }
    };
    fetchSurveyDetail();
  }, [num, REACT_APP_BACK_END_URL]);

  const handleSubmit = async () => {
    if (!selectedTitle || !surveyDetail) {
      alert("항목을 선택해주세요.");
      return;
    }

    try {
      await axios.post(
        `${REACT_APP_BACK_END_URL}/api/survey/updateCount`,
        {
          surveyNum: surveyDetail.num,
          surveytitle: selectedTitle,
        }
      );

      alert("투표 완료!");
      navigate(`/survey/result/${surveyDetail.num}`);
    } catch (error) {
      console.error("투표 실패", error);
      alert("투표 실패");
    }
  };

  if (!surveyDetail) return <div>로딩중...</div>;

  return (
    <div className="survey-detail-wrap">
      <h2 className="survey-detail-title">영화 취향 설문</h2>

      <div className="survey-detail-box">
        <p className="survey-detail-question">
          <span className="survey-detail-Q-mark">Q.</span>
          {surveyDetail.sub}
        </p>

        <ul className="survey-detail-options">
          {surveyDetail.contents.map((option, idx) => (
            <li key={`${option.surveytitle}-${idx}`}>
              <label className="survey-detail-option-item">
                <input
                  type="radio"
                  name="survey"
                  value={option.surveytitle}
                  checked={selectedTitle === option.surveytitle}
                  onChange={(e) => setSelectedTitle(e.target.value)}
                  className="survey-detail-radio"
                />
                <span className="survey-detail-answer">
                  {option.surveytitle}
                </span>
              </label>
            </li>
          ))}
        </ul>

        <button
          className="survey-detail-submit-btn"
          onClick={handleSubmit}
          disabled={!selectedTitle} >
          설문완료
        </button>
      </div>
    </div>
  );
};

export default SurveryDetail;
