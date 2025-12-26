import React, { useEffect, useState } from "react";
import "./SurveryDetail.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface SurveyContent {
    surveytype: string;
    surveytitle: string;
    surveycnt: number;
    subcode: number; // 옵션 고유 번호
}

interface Survey {
    num:number;
    sub: string;
     code: number;
    contents: SurveyContent[];
}

const SurveryDetail: React.FC = () => {
  const REACT_APP_BACK_END_URL = process.env.REACT_APP_BACK_END_URL;
  const { num } = useParams<{ num: string }>(); 
  const navigate = useNavigate();
  const [surveyDetail, setSurveyDetail] = useState<Survey | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    const fetchSurveyDetail = async () => {
      try {
        const response = await axios.get(`${REACT_APP_BACK_END_URL}/api/survey/result/${num}`);
        setSurveyDetail(response.data);
      } catch (error) {
        console.error("설문조사 디테일 호출 실패", error);
      }
    };
    fetchSurveyDetail();
  }, [num])

  const handleSubmit = async () => {
    if (selectedOption === null) return alert("옵션을 선택해주세요!");
    try {
      await axios.post(`${REACT_APP_BACK_END_URL}/api/survey/updateCount`, {
        subcode: selectedOption,
        surveytype: surveyDetail?.contents.find(c => c.subcode  === selectedOption)?.surveytype
      });
      alert("투표 완료!");
      navigate(`/survey/result/${surveyDetail?.num}`);
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
          <span className="Q-mark">Q.</span> 
          {surveyDetail?.sub}
        </p>

        <ul className="survey-options">
          { surveyDetail?.contents.map(option => (
            <li key={option.subcode}>
              <label className="option-item">
                <input 
                  type="radio" name="survey" 
                  className="survey-radio"
                  checked={selectedOption === Number(option.subcode)}
                  onChange={() => setSelectedOption(Number(option.subcode))}
                />
                <span className="answer-option">{option.surveytitle}</span>
              </label>
          </li>
          ))}
        </ul>

        <button className="submit-btn"
          onClick={handleSubmit}
          disabled={selectedOption === null}>
          설문완료
        </button>
      </div>
    </div>
  );
};

export default SurveryDetail;
