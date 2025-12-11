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
          <span className="detail-value">필름러버</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">날짜</span>
          <span className="detail-value">2025-12-08</span>
        </div>

        <div className="detail-content-area">
          <p>코미디 장르 영화 추천 부탁드려요</p>
          <p>요즘 영화를 보고 싶은데 뭐가 재밌는지 모르겠어요</p>
          <p>댓글 많이 많이 달아주세요</p>
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
          <div className="comment-nick">test9</div>
          <div className="comment-content">아 이병헌 감독의 극한직업도 추천해요</div>
          <div className="comment-date">2025-12-08</div>
        </div>

        <div className="comment-item">
          <div className="comment-nick">test9</div>
          <div className="comment-content">수상한 그녀 보셨나요? 이거 재밌어요</div>
          <div className="comment-date">2025-12-08</div>
        </div>

        <div className="comment-item">
          <div className="comment-nick">test8</div>
          <div className="comment-content">내 안의 그놈이요!</div>
          <div className="comment-date">2025-12-07</div>
        </div>

        <div className="comment-item">
          <div className="comment-nick">test7</div>
          <div className="comment-content">맘마미아2(2018) 재밌게 봤어요</div>
          <div className="comment-date">2025-12-07</div>
        </div>

         <div className="comment-item">
          <div className="comment-nick">test6</div>
          <div className="comment-content">나의 첫번째 슈퍼스타 추천해요</div>
          <div className="comment-date">2025-12-06</div>
        </div>

        <div className="comment-item">
          <div className="comment-nick">test5</div>
          <div className="comment-content">'movie2'도 재밌어요</div>
          <div className="comment-date">2025-12-06</div>
        </div>

         <div className="comment-item">
          <div className="comment-nick">test4</div>
          <div className="comment-content">최근에 개봉한 보스 웃겨요</div>
          <div className="comment-date">2025-12-06</div>
        </div>

        <div className="comment-item">
          <div className="comment-nick">test3</div>
          <div className="comment-content">너무 유명하지만 [써니]요</div>
          <div className="comment-date">2025-12-06</div>
        </div>

         <div className="comment-item">
          <div className="comment-nick">test2</div>
          <div className="comment-content">옛날 영화지만 미녀는 괴로워 재밌습니다</div>
          <div className="comment-date">2025-12-05</div>
        </div>

        <div className="comment-item">
          <div className="comment-nick">test1</div>
          <div className="comment-content">조정석 나온 파일럿 재밌었어요</div>
          <div className="comment-date">2025-12-05</div>
        </div>
    </div>
    
    
    
  )
}

export default BoardDetail