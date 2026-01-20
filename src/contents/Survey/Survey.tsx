import React, { useEffect, useState } from "react";
import "./Survey.css";
import { Link } from "react-router-dom";
import axios from "axios";

interface SurveyContent {
  surveytitle: string;
  surveycnt: number;
}

interface Survey {
  num: number;
  sub: string;
  totalVotes: number;
  contents: SurveyContent[];
  snickname: string;
}

const Survey: React.FC = () => {
  const REACT_APP_BACK_END_URL = process.env.REACT_APP_BACK_END_URL;
  const [survey, setSurvey] = useState<Survey[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const hotCount = 3;

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await axios.get(
          `${REACT_APP_BACK_END_URL}/api/survey/list`
        );
        console.log('API 응답 :' , response.data)
        setSurvey(response.data || []);
      } catch (error) {
        console.error("설문조사 리스트 호출 실패", error);
      }
    };
    fetchSurvey();
  }, []);

  const safeSurvey = survey || [];

  // HOT 3 (투표수 기준)
  const sortedByVotes = safeSurvey
    .map((s) => ({
      ...s,
      totalVotes: s.contents.reduce((sum, c) => sum + c.surveycnt, 0),
    }))
    .sort((a, b) => b.totalVotes - a.totalVotes);

  const hot3 = sortedByVotes.slice(0, hotCount);
  const restAll = sortedByVotes
    .filter((s) => !hot3.includes(s))
    .sort((a, b) => b.num - a.num);

  const generalPerPageFirst = itemsPerPage - hotCount;
  const generalPerPageOther = itemsPerPage;

  let displayList: Survey[] = [];
  if (currentPage === 1) {
    displayList = [...hot3, ...restAll.slice(0, generalPerPageFirst)];
  } else {
    const startIndex =
      generalPerPageFirst + (currentPage - 2) * generalPerPageOther;
    displayList = restAll.slice(
      startIndex,
      startIndex + generalPerPageOther
    );
  }

  const totalRestPages = Math.ceil(
    (restAll.length - generalPerPageFirst) / generalPerPageOther
  );
  const totalPages = totalRestPages > 0 ? totalRestPages + 1 : 1;

  const pageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="survey-container">
      <div className="survey-header">
        <h3 className="page-name">영화 취향 설문</h3>
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
              console.log('렌더링 데이터 :', s);
              const isHot = currentPage === 1 && idx < hotCount;

              let no = 0;
              if (!isHot) {
                const generalIdx =
                  currentPage === 1
                    ? idx - hotCount
                    : generalPerPageFirst +
                      (currentPage - 2) * generalPerPageOther +
                      idx;
                no = restAll.length - generalIdx;
              }

              return (
                <tr key={s.num} className={isHot ? "hot-row" : ""}>
                  <th>
                    {isHot ? (
                      <span className="hot-text">HOT</span>
                    ) : (
                      no
                    )}
                  </th>
                  <td>
                    <Link to={`/survey/detail/${s.num}`}>{s.sub}</Link>
                  </td>
                  <td>{s.sub}</td>
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
