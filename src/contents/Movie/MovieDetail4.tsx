// src/components/MovieDetail/MovieDetail.tsx
import React from "react";
import "./MovieDetail.css";

const MovieDetail: React.FC = () => {
  return (
    <div className="movieDetail-wrapper">
      {/* 상단 메인 리뷰 카드 */}
      <section className="movieDetail-mainCard">
        {/* 작성자 / 별점 줄 */}
        <div className="movieDetail-header">
          <div className="movieDetail-user">
            <div className="movieDetail-user-avatar">A</div>
            <div className="movieDetail-user-info">
              <div className="movieDetail-user-name">테스트1</div>
              <span className="movieDetail-tag">선호 장르1</span>
            </div>
          </div>

          <div className="movieDetail-rating">
            <span className="movieDetail-star">★</span>
            <span className="movieDetail-score">2.0</span>
          </div>
        </div>

        {/* 카드 본문 */}
        <div className="movieDetail-body">
          <div className="movieDetail-poster">
            <img src="/images/poster9.jpg" alt="소주전쟁" />
          </div>

          <div className="movieDetail-info">
            <h2 className="movieDetail-title">소주전쟁 2025</h2>
            <div className="movieDetail-sub">
              <span>2025. 05</span>
              <button className="movieDetail-genreTag">액션</button>
            </div>
            <div className="movieDetail-meta">
              <div>감독: 박현우</div>
              <div>배우: 이제훈, 유해진</div>
            </div>

            <div className="movieDetail-reviewTitle">
              1997년 외환위기 당시 '진로'와 골드만삭스 실화를 바탕으로 한 작품
            </div>
            <p className="movieDetail-reviewText">
            '국가부도의 날', '블랙머니'처럼 외국 세력이 개입했던 과거 사건을 다루는 영화인데, 
            사건을 다가가는 태도는 국가부도의 날에 가까우며 인물을 다루는 태도는 블랙머니에 가깝다.            
            </p>

            {/* 좋아요/댓글/조회수 영역 */}
            <div className="movieDetail-actions">
              <button className="action-btn">
                👍 <span>2</span>
              </button>
              <button className="action-btn">
                💬 <span>2</span>
              </button>
            </div>
          </div>
        </div>

        {/* 수정/삭제 */}
        <div className="movieDetail-editRow">
          <button className="link-btn">수정</button>
          <button className="link-btn danger">삭제</button>
        </div>
      </section>

      {/* 댓글 리스트 */}
      <section className="movieDetail-comments">
        {/* 댓글 1 */}
        <div className="comment-card">
          <div className="comment-user">
            <div className="avatar-sm">B</div>
            <div className="comment-user-info">
              <span className="comment-name">테스트 2</span>
              <span className="comment-tag">선호 장르1</span>
            </div>
          </div>
          <p className="comment-text">
            저도 아쉬웠어요ㅜ
          </p>
        </div>

        {/* 댓글 2 */}
        <div className="comment-card">
          <div className="comment-user">
            <div className="avatar-sm">C</div>
            <div className="comment-user-info">
              <span className="comment-name">테스트 3</span>
              <span className="comment-tag">선호 장르1</span>
            </div>
          </div>
          <p className="comment-text">저는 영화 재밌게 봤어요!</p>
        </div>
      </section>

      {/* 댓글 입력 영역 */}
      <section className="movieDetail-commentForm">
        <textarea
          className="comment-input"
          placeholder="댓글을 남겨보세요"
        />
        <button className="comment-submit">등록</button>
      </section>
    </div>
  );
};

export default MovieDetail;
