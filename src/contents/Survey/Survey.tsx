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
  totalVotes: number;
  contents: SurveyContent[];
}

const Survey: React.FC = () => {
  const REACT_APP_BACK_END_URL = process.env.REACT_APP_BACK_END_URL;
  const [survey, setSurvey] = useState<Survey[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10; // 한 페이지 글 수 (HOT 포함)
  const hotCount = 3; // HOT 게시글 수: 3개

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await axios.get(`${REACT_APP_BACK_END_URL}/api/survey/list`);
        setSurvey(response.data || []);
      } catch (error) {
        console.error("설문조사 리스트 호출 실패", error);
      }
    };
    fetchSurvey();
  }, [REACT_APP_BACK_END_URL]);

  const safeSurvey = survey || [];

  // HOT 3: totalVotes 기준 내림차순
  const sortedByVotes = safeSurvey.slice().sort((a, b) => b.totalVotes - a.totalVotes);
  const hot3 = sortedByVotes.slice(0, hotCount);

  // 일반 글: HOT 제외, num 기준 내림차순
  const restAll = sortedByVotes
    .filter((s) => !hot3.includes(s))
    .sort((a, b) => b.num - a.num);

  const generalPerPageFirst = itemsPerPage - hotCount; // 첫 페이지에는 hot 게시판 포함
  const generalPerPageOther = itemsPerPage; // 이후 페이지는 일반 글만 10개

  let displayList: Survey[] = [];
  if (currentPage === 1) {
    displayList = [...hot3, ...restAll.slice(0, generalPerPageFirst)];
  } else {
    const startIndex = generalPerPageFirst + (currentPage - 2) * generalPerPageOther;
    displayList = restAll.slice(startIndex, startIndex + generalPerPageOther);
  }

  // 전체 페이지 계산
  const totalRestPages = Math.ceil((restAll.length - generalPerPageFirst) / generalPerPageOther);
  const totalPages = totalRestPages > 0 ? totalRestPages + 1 : 1;

  const pageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="survey-container">
      <div className="survey-header">
        <h3>영화 취향 설문</h3>
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
            {displayList.map((s, idx) => {
              const isHot = currentPage === 1 && idx < hotCount;
              let no = 0;

              if (!isHot) {
                const generalIdx =
                  currentPage === 1 ? idx - hotCount : generalPerPageFirst + (currentPage - 2) * generalPerPageOther + idx;
                no = restAll.length - generalIdx;
              }

              return (
                <tr key={s.num} className={isHot ? "hot-row" : ""}>
                  <th>{isHot ? <span className="hot-badge">HOT</span> : no}</th>
                  <td>
                    <Link to={`/survey/detail/${s.num}`}>{s.sub}</Link>
                  </td>
                  <td>로코덕후</td>
                  <td>{s.totalVotes}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="write-btn-wrapper">
          <Link to="/survey/surveyform" className="write-btn">
            글쓰기
          </Link>
        </div>

        <nav className="pagination-box" aria-label="Page navigation">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => pageChange(currentPage - 1)}>
                &laquo;
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <li key={page} className={`page-item ${page === currentPage ? "active" : ""}`}>
                <button className="page-link" onClick={() => pageChange(page)}>
                  {page}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => pageChange(currentPage + 1)}>
                &raquo;
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Survey;
