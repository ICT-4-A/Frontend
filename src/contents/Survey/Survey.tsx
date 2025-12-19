import React from "react";
import "../Board/Board.css";
import { Link } from "react-router-dom";

const Board = () => {
  return (
    <div className="board-container">
      <div className="board-header">
        <h3>영화 취향 설문</h3>
        {/* 검색창 */}
        <div className="search-box">
          <img src="/icons/search.png" alt="검색" className="search-icon" />
          <input 
            type="text"
            placeholder="Search..."
            className="form-control"
          />
        </div>
      </div>  

      <div className="table-wrapper">
        <table className="board-table">
          <thead>
            <tr>
              <th>No</th>
              <th>제목</th>
              <th>닉네임</th>
            </tr>
          </thead>

          <tbody>

            {/* HOT 게시글*/}
            <tr className="hot-row">
              <th><span className="hot-badge">HOT</span></th>
              <td><Link to="/survey/detail">영화 러닝타임, 어디까지 괜찮아?</Link></td>
              <td>필름러버</td>
              
            </tr>

            <tr className="hot-row">
              <th><span className="hot-badge">HOT</span></th>
              <td>설문 2</td>
              <td>영화감상가</td>
              
            </tr>

            <tr className="hot-row">
              <th><span className="hot-badge">HOT</span></th>
              <td>설문 3</td>
              <td>영화속으로</td>
            </tr>

            {/* 일반 설문조사 */}

            <tr>
              <th>3</th>
              <td>설문 4</td>
              <td>로코덕후</td>
            </tr>

            <tr>
              <th>2</th>
              <td>설문 5</td>
              <td>영화한잔</td>
            </tr>

            <tr>
              <th>1</th>
              <td>설문 6</td>
              <td>극장탐험가</td>
            </tr>

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

export default Board;
