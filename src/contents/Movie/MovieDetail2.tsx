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
            <span className="movieDetail-score">5.0</span>
          </div>
        </div>

        {/* 카드 본문 */}
        <div className="movieDetail-body">
          <div className="movieDetail-poster">
            <img src="/images/poster4.jpg" alt="위키드: 포 굿" />
          </div>

          <div className="movieDetail-info">
            <h2 className="movieDetail-title">어벤져스 엔드게임 2019</h2>
            <div className="movieDetail-sub">
              <span>2019. 04</span>
              <button className="movieDetail-genreTag">액션</button>
            </div>
            <div className="movieDetail-meta">
              <div>감독: 앤서니 루소</div>
              <div>배우: 로버트 다우니 주니어, 크리스 에반스</div>
            </div>

            <div className="movieDetail-reviewTitle">
              뜨거운 안녕의 끝에서 열렬한 환영의 시작으로
            </div>
            <p className="movieDetail-reviewText">
             Exciting, entertaining, and emotionally impactful, Avengers: Endgame does whatever it takes 
             to deliver a satisfying finale to Marvel's epic Infinity Saga.
             흥미진진하고 감동적이다. 어벤져스: 엔드게임은 마블의 기념비적인 인피니티 사가를 훌륭하게 마무리짓기 위해 모든 것을 걸었다.
            </p>

            {/* 좋아요/댓글/조회수 영역 */}
            <div className="movieDetail-actions">
              <button className="action-btn">
                👍 <span>1</span>
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
            엔드게임은 마블의 기념비적인 인피니티 사가를 훌륭하게 마무리짓기 위해 모든 것을 걸었다.
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
          <p className="comment-text">저도 영화 너무 재밌게 봤어요!</p>
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
