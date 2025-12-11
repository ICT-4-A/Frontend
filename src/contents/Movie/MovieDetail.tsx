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
            <img src="/images/poster2.jpg" alt="위키드: 포 굿" />
          </div>

          <div className="movieDetail-info">
            <h2 className="movieDetail-title">위키드: 포 굿</h2>
            <div className="movieDetail-sub">
              <span>2025. 11</span>
              <button className="movieDetail-genreTag">판타지</button>
            </div>
            <div className="movieDetail-meta">
              <div>감독: 존 추</div>
              <div>배우: 신시아 에리보, 아리아나 그란데</div>
            </div>

            <div className="movieDetail-reviewTitle">
              최고의 명작! 시간 가는 줄 모르고 봤어요
            </div>
            <p className="movieDetail-reviewText">
              개인적으로 위키드 캐릭터들의 매력은 잊고 살다가 히스토리에서 나온다고 생각해서
              아리아나 그란데의 어딘지 모르게 어설픈 글리크 연기가 꽤나 매력적으로 느껴졌다...
            </p>

            {/* 좋아요/댓글/조회수 영역 */}
            <div className="movieDetail-actions">
              <button className="action-btn">
                👍 <span>4</span>
              </button>
              <button className="action-btn">
                💬 <span>3</span>
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
            와 이런 사연이 있는 줄은 또 몰랐네요 ㅎㅎ 의도된 오마주였다니... 좋은 정보 감사합니다!
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
