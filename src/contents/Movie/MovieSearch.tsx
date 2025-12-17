// src/contents/Movie/MovieSearch.tsx
import React, { useState } from "react";
import "./MovieSearch.css";
import { Link, useNavigate } from "react-router-dom";

const MovieSearch: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // 메뉴 열림 여부
  const [type, setType] = useState("영화 제목"); // 선택된 항목

  const handleNext = () => {
    navigate("/movieform"); // 예시
  };

  const handleSelect = (value: string) => {
    setType(value);
    setIsOpen(false);
  };
  // TODO: 실제로는 검색 결과에서 선택된 영화 정보로 대체
  const movie = {
    title: "위키드: 포 굿",
    year: 2025,
    genre: "판타지",
    release: "2025. 11",
    director: "존 추",
    actors: "신시아 에리보, 아리아나 그란데",
    poster: "/images/poster_sample_wicked.jpg",
  };

  return (
    <div className="movieSearch-wrapper">
      <h2 className="movieSearch-step-title">영화 기록 - 게시글 작성 1단계</h2>

      <div className="movieSearch-top">
        {/* 드롭다운 */}
        <div className="movieSearch-type-select">
          <button
            type="button"
            className="movieSearch-type-btn"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {type}
            <span className="caret">{isOpen ? "▲" : "▼"}</span>
          </button>

          {isOpen && (
            <div className="movieSearch-type-menu">
              <div
                className="menu-item"
                onClick={() => handleSelect("영화 제목")}
              >
                영화 제목
              </div>
              <div
                className="menu-item"
                onClick={() => handleSelect("영화 장르")}
              >
                영화 장르
              </div>
              <div
                className="menu-item"
                onClick={() => handleSelect("영화 감독")}
              >
                영화 감독
              </div>
              <div
                className="menu-item"
                onClick={() => handleSelect("영화 배우")}
              >
                영화 배우
              </div>
            </div>
          )}
        </div>

        {/* 검색창 */}
        <div className="movieSearch-input-box">
          <input
            className="form-control movieSearch-input"
            placeholder="Search ..."
          />
          <button className="movieSearch-search-btn" type="button">
            <span className="search-icon">🔍</span>
          </button>
        </div>
      </div>

      {/* 선택된 영화 카드 */}
      <div className="movieSearch-card">
        <div className="movieSearch-poster-wrap">
          <img
            src="/images/poster2.jpg"
            alt="위키드: 포 굿"
            className="movieSearch-poster"
          />
        </div>

        <div className="movieSearch-info">
          <div className="movieSearch-title-row">
            <h3 className="movieSearch-title">{movie.title}</h3>
            <span className="movieSearch-year">{movie.year}</span>
          </div>

          <button className="badge movieSearch-genre-badge">
            {movie.genre}
          </button>

          <div className="movieSearch-meta">
            <div>개봉: {movie.release}</div>
            <div>감독: {movie.director}</div>
            <div>배우: {movie.actors}</div>
          </div>
        </div>
      </div>

      {/* 다음 버튼 */}
      <div className="movieSearch-footer">
        <button className="movieSearch-next-btn" onClick={handleNext}>
          다음
        </button>
      </div>
    </div>
  );
};

export default MovieSearch;
