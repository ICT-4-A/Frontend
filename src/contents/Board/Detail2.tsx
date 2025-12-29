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
          <span className="detail-value">관객 평점 9점 이상, 놓치면 후회할 영화!</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">닉네임</span>
          <span className="detail-value">영화감상가</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">날짜</span>
          <span className="detail-value">2025-12-08</span>
        </div>

        <div className="detail-content-area">
          <p>관객 평점 9점 이상 중, 제가 추천하는 영화 리스트입니다</p>
          <p>살인의 추억(2003)</p>
          <p>기생충(2019)</p>
          <p>올드보이(2003)</p>
          <p>너는 내운명(2005)</p>
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
        <h3>댓글 6</h3>

        <div className="comment-item">
          <div className="comment-nick">test6</div>
          <div className="comment-content">오랜만에 살인의 추억 다시 한 번 봐야겠네요</div>
          <div className="comment-date">2025-12-10</div>
        </div>

        <div className="comment-item">
          <div className="comment-nick">test5</div>
          <div className="comment-content">엽기적인 그녀도 재밌습니다</div>
          <div className="comment-date">2025-12-10</div>
        </div>

        <div className="comment-item">
          <div className="comment-nick">test4</div>
          <div className="comment-content">기생충은 인정이요!</div>
          <div className="comment-date">2025-12-09</div>
        </div>

        <div className="comment-item">
          <div className="comment-nick">test3</div>
          <div className="comment-content">맨발의 꿈도 재밌어요</div>
          <div className="comment-date">2025-12-09</div>
        </div>

        <div className="comment-item">
          <div className="comment-nick">test2</div>
          <div className="comment-content">엽기적인 그녀도 재밌습니다</div>
          <div className="comment-date">2025-12-09</div>
        </div>

        <div className="comment-item">
          <div className="comment-nick">test1</div>
          <div className="comment-content">영화 클래식(2010)도 추천해요!</div>
          <div className="comment-date">2025-12-08</div>
        </div>

    </div>
    
    
    
  )
}

export default BoardDetail