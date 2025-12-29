import React, { useEffect, useState } from "react";
import "./Survey.css";
import { Link } from "react-router-dom";
import axios from "axios";

interface SurveyContent {
  surveytype: string;
  surveytitle: string;
  surveycnt: number;
}

interface Survey {
  num: number;
  sub: string;
  code: number;
  totalVotes: number; // 문항별 전체 투표수
  contents: SurveyContent[];
}

const Survey = () => {
  const REACT_APP_BACK_END_URL = process.env.REACT_APP_BACK_END_URL;
  const [survey, setSurvey] = useState<Survey[]>([]);
  const sortedByVotes = [...survey].sort((a, b) => b.totalVotes - a.totalVotes);
  const top3 = sortedByVotes.slice(0, 3);
  const rest = sortedByVotes
  .slice(3)
  .sort((a, b) => b.num - a.num);

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await axios.get(
          `${REACT_APP_BACK_END_URL}/api/survey/list`
        );
        setSurvey(response.data);
      } catch (error) {
        console.error("설문조사 리스트 호출 실패", error);
      }
    };
    fetchSurvey();
  }, []);

  return (
    <div className="survey-container">
      <div className="survey-header">
        <h3>영화 취향 설문</h3>

        {/* 검색창 */}
        <div className="search-box">
          <img src="/icons/search.png" alt="검색" className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            className="form-control"/>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="survey-table table">
          <thead>
            <tr>
              <th>No</th>
              <th>제목</th>
              <th>닉네임</th>
              <th>투표수</th>
            </tr>
          </thead>

          <tbody>
            {/* TOP 3 고정 */}
            {top3.map((s, index: number) => (
              <tr key={s.num} className="hot-row">
                <th>
                  <span className="hot-badge">HOT</span>
                </th>
                <td>
                  <Link to={`/survey/detail/${s.num}`}>
                    {s.sub}
                  </Link>
                </td>
                <td>로코덕후</td>
                <td>{s.totalVotes}</td>
              </tr>
            ))}

            {/* 일반 설문 */}
            {rest.map((s, index: number) => (
              <tr key={s.num}>
                <th>{rest.length - index}</th>
                <td>
                  <Link to={`/survey/detail/${s.num}`}>
                    {s.sub}
                  </Link>
                </td>
                <td>로코덕후</td>
                <td>{s.totalVotes}</td>
              </tr>
            ))}
          </tbody>


        </table>

        {/* 글쓰기 버튼 */}
        <div className="write-btn-wrapper">
          <Link to="/survey/surveyform" className="write-btn">
            글쓰기
          </Link>
        </div>
      </div>

      {/* 페이지네이션 */}
      <nav aria-label="Page navigation example" className="pagination-box">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Survey;
