import React from 'react'
import { Link } from 'react-router-dom'
import "../Board/BoardDetail.css"
const BoardDetail = () => {
  return (
    <div className="detail-wrapper">
      <h2 className="board-title">게시글 상세보기</h2>

      <div className="detail-box">
        <div className="detail-row">
          <span className="detail-label">제목</span>
          <span className="detail-value">주말에 보기 좋은 영화 추천 부탁드려요</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">닉네임</span>
          <span className="detail-value">test</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">날짜</span>
          <span className="detail-value">2025-12-10</span>
        </div>

        <div className="detail-content-area">
          <p>코미디 장르 영화 추천 부탁드려요</p>
          <p>코미디 장르 영화 추천 부탁드려요</p>
          <p>코미디 장르 영화 추천 부탁드려요</p>
          <p>코미디 장르 영화 추천 부탁드려요</p>
          <p>코미디 장르 영화 추천 부탁드려요</p>
          <p>코미디 장르 영화 추천 부탁드려요</p>
        </div>
        <div className="detail-buttons">
          <Link to="/board" className="btn-gray">목록</Link>
        </div>
      </div>

      {/* 댓글 입력 */}
       <div className="comment-write">
        <textarea placeholder="댓글을 입력하세요"></textarea>
        <button className="comment-btn">등록</button>
      </div>

      {/* 댓글 목록 */}
      <h3>댓글 2</h3>

        <div className="comment-item">
          <div className="comment-nick">test1</div>
          <div className="comment-content">저는 'movie1' 추천해요! 완전 웃겨요</div>
          <div className="comment-date">2025-11-30</div>
        </div>

        <div className="comment-item">
          <div className="comment-nick">test3</div>
          <div className="comment-content">'movie2'도 재밌어요</div>
          <div className="comment-date">2025-12-01</div>
          </div>
    </div>
    
    
    
  )
}

export default BoardDetail