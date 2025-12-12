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
            <img src="/images/poster7.jpg" alt="옥자" />
          </div>

          <div className="movieDetail-info">
            <h2 className="movieDetail-title">옥자 2017</h2>
            <div className="movieDetail-sub">
              <span>2019. 04</span>
              <button className="movieDetail-genreTag">액션</button>
            </div>
            <div className="movieDetail-meta">
              <div>감독: 봉준호</div>
              <div>배우: 틸다 스윈튼, 스티븐 연, 안서현</div>
            </div>

            <div className="movieDetail-reviewTitle">
              사회 비판적 메시지와 우화적인 풍자, 재미까지!
            </div>
            <p className="movieDetail-reviewText">
            지금까지 봉준호 감독이 다뤄온 주제들이 뭉쳐 또 한 번 자기 확장을 이뤘다. 반려동물, 가족, 시스템과 자본주의에 대한 비판 등 
            일관된 이야기를 매번 다른 형식으로 보여주고, 여전히 관객의 예상을 보기 좋게 넘어서는 연출 감각이 놀랍다. 배두나, 고아성을 잇는 
            봉준호 월드의 새로운 히로인 안서현의 연기를 주목하길 바란다. 봉준호 감독이 극장 상영까지 염두에 두고 설계한 화면을 
            고스란히 감상하기 위해서라도 극장 관람을 강력히 권한다
            </p>

            {/* 좋아요/댓글/조회수 영역 */}
            <div className="movieDetail-actions">
              <button className="action-btn">
                👍 <span>0</span>
              </button>
              <button className="action-btn">
                💬 <span>1</span>
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
