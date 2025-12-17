// src/contents/Movie/MovieForm.tsx
import React from "react";
import "./MovieForm.css";

const MovieForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 업로드 처리 로직 추가 예정
  };

  return (
    <div className="movieform-wrapper">
      <h2 className="movieform-step-title">영화 기록 - 게시글 작성 2단계</h2>

      <form className="movieform-card" onSubmit={handleSubmit}>
        {/* 한 줄 평 */}
        <div className="movieform-field">
          <label className="movieform-label">한 줄 평</label>
          <input
            type="text"
            className="movieform-input"
            placeholder="한 줄 평을 입력하세요"
          />
        </div>

        {/* 감상평 */}
        <div className="movieform-field">
          <label className="movieform-label">감상평</label>
          <textarea
            className="movieform-textarea"
            placeholder="감상평을 입력하세요"
          />
        </div>

        {/* 별점 */}
        <div className="movieform-field">
          <label className="movieform-label">별점</label>
          <div className="movieform-stars">
            <span className="star active">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
          </div>
        </div>

        {/* 업로드 버튼 */}
        <div className="movieform-footer">
          <button type="submit" className="movieform-submit-btn">
            업로드
          </button>
        </div>
      </form>
    </div>
  );
};

export default MovieForm;
