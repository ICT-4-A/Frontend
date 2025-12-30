import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./SurveyResult.css";

interface SurveyContent {
  surveytitle: string;
  surveycnt: number;
}

interface SurveyVO {
  num: number;
  sub: string;
  contents: SurveyContent[];
}

const SurveyResult: React.FC = () => {
  const { num } = useParams<{ num: string }>();
  const REACT_APP_BACK_END_URL = process.env.REACT_APP_BACK_END_URL;

  const [surveyDetail, setSurveyDetail] = useState<SurveyVO | null>(null);

  useEffect(() => {
    const fetchSurveyResult = async () => {
      try {
        const res = await axios.get(
          `${REACT_APP_BACK_END_URL}/api/survey/result/${num}`
        );
        setSurveyDetail(res.data);
      } catch (error) {
        console.error("설문 결과 호출 실패", error);
      }
    };
    fetchSurveyResult();
  }, [num, REACT_APP_BACK_END_URL]);

  if (!surveyDetail) return <div>로딩중...</div>;

  const totalVotes = surveyDetail.contents.reduce(
    (sum, item) => sum + item.surveycnt,
    0
  );

  return (
    <div className="survey-wrap">
      <h2 className="survey-title">{surveyDetail.sub}</h2>

      <div className="survey-box">
        <ul className="survey-result-list">
          {surveyDetail.contents.map((item, idx) => {
            const percent =
              totalVotes > 0
                ? Math.round((item.surveycnt / totalVotes) * 100)
                : 0;

            return (
              <li key={`${item.surveytitle}-${idx}`} className="result-item">
                <div className="result-label-row">
                  <span className="result-label">{item.surveytitle}</span>

                  <span className="result-right">
                    <span className="result-percent">{percent}%</span>
                    <span className="result-count-inline">
                      ({item.surveycnt}명)
                    </span>
                  </span>
                </div>

                <div className="result-bar-bg">
                  <div
                    className="result-bar-fill"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>

        <div className="survey-footer">
          <div className="survey-total-votes">
            총 {totalVotes}명 참여
          </div>

          <Link to="/survey" className="survey-list-link">
            목록으로 이동
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SurveyResult;
