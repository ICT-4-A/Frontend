// src/components/Board.tsx
import React from "react";
import "../Board/Board.css";
import { Link } from "react-router-dom";

const Board = () => {
  return (
    <div className="board-container">
      <div className="board-header">
        <h3>게시판</h3>

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
        <table className="table table-striped board-table">

          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">제목</th>
              <th scope="col">닉네임</th>
              <th scope="col">날짜</th>
              <th scope="col">댓글</th>
            </tr>
          </thead>

          <tbody>

            {/* HOT 게시글 */}
            <tr className="hot-row">
              <th scope="row">
                <span className="hot-badge">HOT</span>
              </th>
              <td><Link to="/board/detail1">주말에 보기 좋은 영화 추천 부탁드려요</Link></td>
              <td>필름러버</td>
              <td>2025-12-08</td>
              <td>10</td>
            </tr>

            <tr className="hot-row">
              <th scope="row">
                <span className="hot-badge">HOT</span>
              </th>
              <td><Link to="/board/detail2">관객 평점 9점 이상, 놓치면 후회할 영화!</Link></td>
              <td>영화감상가</td>
              <td>2025-12-08</td>
              <td>6</td>
            </tr>

            <tr className="hot-row">
              <th scope="row">
                <span className="hot-badge">HOT</span>
              </th>
              <td>아직 안 본 사람 후회할 최신작 추천!</td>
              <td>영화속으로</td>
              <td>2025-11-27</td>
              <td>5</td>
            </tr>

            {/* 일반 게시글 */}
            <tr>
              <th scope="row">8</th>
              <td>재밌는 90년대 한국 영화 추천해주세요</td>
              <td>무비러버</td>
              <td>2025-12-11</td>
              <td>2</td>
            </tr>

            <tr>
              <th scope="row">7</th>
              <td>반전 있는 재밌는 영화 리스트</td>
              <td>영화한잔</td>
              <td>2025-12-08</td>
              <td>2</td>
            </tr>

            <tr>
              <th scope="row">6</th>
              <td>코미디 영화 중 웃긴 거 뭐 있을까요?</td>
              <td>시네필</td>
              <td>2025-11-27</td>
              <td>0</td>
            </tr>

            <tr>
              <th scope="row">5</th>
              <td>볼 만한 액션 영화 추천해주세요</td>
              <td>액션러버</td>
              <td>2025-11-20</td>
              <td>1</td>
            </tr>

            <tr>
              <th scope="row">4</th>
              <td>무서운 영화 추천해주세요</td>
              <td>스릴러헌터</td>
              <td>2025-11-09</td>
              <td>5</td>
            </tr>

            <tr>
              <th scope="row">3</th>
              <td>요즘 영화 재밌는 게 없어요</td>
              <td>로코덕후</td>
              <td>2025-10-30</td>
              <td>2</td>
            </tr>

            <tr>
              <th scope="row">2</th>
              <td>가족끼리 보기 좋은 영화 추천 부탁해요!</td>
              <td>영화한잔</td>
              <td>2025-10-25</td>
              <td>3</td>
            </tr>

            <tr>
              <th scope="row">1</th>
              <td>최근 개봉한 영화 중 추천할 만한 거 있나요</td>
              <td>극장탐험가</td>
              <td>2025-10-22</td>
              <td>1</td>
            </tr>

          </tbody>
        </table>

        {/* 글쓰기 버튼 */}
        <div className="write-btn-wrapper">
          <Link to="/board/write" className="btn btn-primary write-btn">
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
