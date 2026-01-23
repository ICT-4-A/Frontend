import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Board/BoardList.css"; 

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

const HOT_COUNT = 3;
const PAGE_SIZE = 10;

const Survey: React.FC = () => {
  const REACT_APP_BACK_END_URL = process.env.REACT_APP_BACK_END_URL;
  const [surveyList, setSurveyList] = useState<Survey[]>([]);
  const [allSurveys, setAllSurveys] = useState<Survey[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);

  /* 전체 설문 가져오기 */
  const fetchAllSurveys = async () => {
    try {
      const res = await axios.get(`${REACT_APP_BACK_END_URL}/api/survey/list`);
      const surveys: Survey[] = res.data || [];
      // 총 투표수 계산
      const withVotes = surveys.map(s => ({
        ...s,
        totalVotes: s.contents.reduce((sum, c) => sum + c.surveycnt, 0),
      }));
      setAllSurveys(withVotes);
      setTotalItems(withVotes.length);
      setTotalPages(Math.ceil(withVotes.length / PAGE_SIZE));
    } catch (e) {
      console.error("설문조사 로딩 실패", e);
    }
  };

  /* 페이지별 설문 구성 */
  const fetchSurveyList = (page: number) => {
    if (allSurveys.length === 0) return;

    // HOT 설문
    const hotList = [...allSurveys]
      .sort((a, b) => b.totalVotes - a.totalVotes)
      .slice(0, HOT_COUNT);
    const hotNums = new Set(hotList.map(h => h.num));
    const normalList = allSurveys.filter(item => !hotNums.has(item.num));

    if (page === 1) {
      const pageList = normalList.slice(0, PAGE_SIZE - HOT_COUNT);
      setSurveyList([...hotList, ...pageList]);
      setCurrentPage(1);
      setStartPage(1);
      setEndPage(Math.min(5, totalPages));
      return;
    }

    const startIdx = (page - 2) * PAGE_SIZE + (PAGE_SIZE - HOT_COUNT);
    const endIdx = startIdx + PAGE_SIZE;
    setSurveyList(normalList.slice(startIdx, endIdx));
    setCurrentPage(page);
    setStartPage(Math.floor((page - 1) / 5) * 5 + 1);
    setEndPage(Math.min(Math.floor((page - 1) / 5) * 5 + 5, totalPages));
  };

  useEffect(() => {
    fetchAllSurveys();
  }, []);

  useEffect(() => {
    fetchSurveyList(currentPage);
  }, [allSurveys, currentPage]);

  return (
    <div className="bl-container">
      <div className="bl-header">
        <h3 className="bl-pageName">영화 취향 설문</h3>
      </div>

      <table className="bl-boardTable">
        <colgroup>
          <col style={{ width: "12%" }} />
          <col style={{ width: "44%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "13%" }} />
        </colgroup>
        <thead>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>닉네임</th>
            <th>투표수</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {surveyList.map((s, idx) => {
            const isHot = currentPage === 1 && idx < HOT_COUNT;
            let no = 0;
            if (!isHot) {
              const generalIdx =
                currentPage === 1
                  ? idx - HOT_COUNT
                  : (PAGE_SIZE - HOT_COUNT) + (currentPage - 2) * PAGE_SIZE + idx;
              no = totalItems - generalIdx;
            }

            return (
              <tr key={s.num} className={isHot ? "bl-hotPost" : ""}>
                <td className={isHot ? "bl-hotPostRow" : ""}>
                  {isHot ? "HOT" : no}
                </td>
                <td>
                  <Link to={`/survey/detail/${s.num}`} className="bl-titleLink">
                    {s.sub}
                  </Link>
                </td>
                <td>{s.snickname}</td>
                <td>{s.totalVotes}</td>
                <td>—</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* 글쓰기 버튼 */}
      <div className="bl-writeWrapper">
        <Link to="/survey/surveyform" className="bl-button">
          글쓰기
        </Link>
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
      {/* 페이지네이션 */}
      <nav className="bl-paginationBox">
        <ul className="pagination">
          {startPage > 1 && (
            <li>
              <button
                className="bl-pageBtn"
                onClick={() => setCurrentPage(startPage - 1)}
              >
                이전
              </button>
            </li>
          )}
          {Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage).map(page => (
            <li key={page}>
              <button
                className={`bl-pageBtn ${page === currentPage ? "active" : ""}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            </li>
          ))}
          {endPage < totalPages && (
            <li>
              <button
                className="bl-pageBtn"
                onClick={() => setCurrentPage(endPage + 1)}
              >
                다음
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Survey;
