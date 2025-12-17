// src/contents/Movie/MovieInfo.tsx (원하는 경로에 생성)
import React from "react";
import "./MovieInfo.css";
import { Link } from "react-router-dom";

const MovieInfo: React.FC = () => {
  // TODO: 실제로는 useParams 등으로 id 받아서 데이터 조회
  const movie = {
    title: "어벤져스 엔드게임 2019",
    year: 2025,
    genre: "액션",
    release: "2025년 11월",
    director: "어벤져스",
    actors: "토르, 헐크, 등",
    poster: "/images/poster4.jpg", // 실제 포스터 경로로 교체
    rating: 4.5,
  };

  return (
    <div className="movieinfo-wrapper">
      <div className="movieinfo-card">
        {/* 상단: 포스터 + 기본 정보 */}
        <div className="movieinfo-top">
          <div className="movieinfo-poster-box">
            <img
              src={movie.poster}
              alt={movie.title}
              className="movieinfo-poster"
            />
          </div>

          <div className="movieinfo-main">
            <div className="movieinfo-title-row">
              <h2 className="movieinfo-title">{movie.title}</h2>
              <span className="movieinfo-year">{movie.year}</span>
            </div>

            <button className="badge movieinfo-genre-badge">
              {movie.genre}
            </button>

            <div className="movieinfo-meta">
              <div>개봉: {movie.release}</div>
              <div>감독: {movie.director}</div>
              <div>배우: {movie.actors}</div>
            </div>
          </div>
        </div>

        {/* 하단: 별점 + 한줄평 박스 영역 */}
        <div className="movieinfo-bottom">
          {/* 좌측: 별점 박스 (더미) */}
          <div className="movieinfo-rating-box">
            <h3 className="movieinfo-subtitle">사용자 별점</h3>
            <div className="movieinfo-score-line">
              <span className="movieinfo-stars">★★★★☆</span>
              <span className="movieinfo-score">{movie.rating} / 5</span>
            </div>

            <div className="movieinfo-bar-list">
              {/* 더미 비율 */}
              <div className="movieinfo-bar-row">
                <span className="bar-label">5★</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: "50%" }} />
                </div>
                <span className="bar-percent">50%</span>
              </div>
              <div className="movieinfo-bar-row">
                <span className="bar-label">4★</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: "25%" }} />
                </div>
                <span className="bar-percent">25%</span>
              </div>
              <div className="movieinfo-bar-row">
                <span className="bar-label">3★</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: "24%" }} />
                </div>
                <span className="bar-percent">24%</span>
              </div>
              <div className="movieinfo-bar-row">
                <span className="bar-label">2★</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: "0%" }} />
                </div>
                <span className="bar-percent">0%</span>
              </div>
              <div className="movieinfo-bar-row">
                <span className="bar-label">1★</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: "1%" }} />
                </div>
                <span className="bar-percent">1%</span>
              </div>
            </div>
          </div>

          {/* 우측: 한줄평 카드 리스트 (더미) */}
          <div className="movieinfo-review-list">
            <div className="movieinfo-review-card">
              <div className="review-header">
                <div className="review-avatar">👤</div>
                <div>
                  <div className="review-name">
                    <Link to="/movielog/detail2">테스트 1</Link>
                  </div>
                  <div className="review-tag">선호 장르1</div>
                </div>
              </div>
              <p className="review-text">
                뜨거운 안녕의 끝에서 열렬한 환영의 시작으로
              </p>
            </div>

            <div className="movieinfo-review-card">
              <div className="review-header">
                <div className="review-avatar">👤</div>
                <div>
                  <div className="review-name">테스트 2</div>
                  <div className="review-tag">선호 장르2</div>
                </div>
              </div>
              <p className="review-text">
                음악, 연출, 배우 연기 모두 완벽했습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
