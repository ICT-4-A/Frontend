import React, { useRef } from "react";
import "./MovieForm.css";

const MovieForm = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 파일 첨부 버튼 클릭 → 숨겨진 input 작동
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="movie-form">

      {/* 제목 */}
      <label className="label">영화 제목</label>
      <input type="text" className="input-line" placeholder="영화 제목을 입력하세요" />

      {/* 장르 */}
      <label className="label">장르</label>
      <div className="row-flex">
        <select className="select-box">
          <option>액션</option>
          <option>코미디</option>
          <option>로맨스</option>
          <option>SF</option>
          <option>공포</option>
        </select>

        {/* 예시 태그 (정적 UI) */}
        <div className="tag-box">
          <span className="tag">코미디 ×</span>
          <span className="tag">로맨스 ×</span>
        </div>
      </div>

      {/* 감독 */}
      <label className="label">감독</label>
      <div className="tag-box">
        <span className="tag">이동필 ×</span>
      </div>

      {/* 배우 */}
      <label className="label">배우</label>
      <div className="tag-box">
        <span className="tag">이재훈 ×</span>
        <span className="tag">구교환 ×</span>
      </div>

      {/* 개봉일 */}
      <label className="label">개봉일</label>
      <div className="row-flex">
        <select className="select-box">
          <option>2025</option>
          <option>2024</option>
          <option>2023</option>
        </select>

        <select className="select-box">
          <option>1월</option>
          <option>2월</option>
          <option>3월</option>
          <option>12월</option>
        </select>
      </div>

      {/* 한 줄 평 */}
      <label className="label">한 줄 평</label>
      <input type="text" className="input-line" placeholder="한 줄 평가를 입력하세요" />

      {/* 감상평 */}
      <label className="label">감상평</label>
      <textarea className="textarea" placeholder="감상평을 입력하세요"></textarea>

      <label className="label">포스터 사진 첨부</label>

      {/* 파일 input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
      />

      {/* 첨부 박스 */}
      <div className="upload-box" onClick={handleUploadClick}>
        <span className="plus">+</span>
      </div>

      {/* 업로드 버튼 */}
      <button className="upload-btn">업로드</button>
    </div>
  );
};

export default MovieForm;
