import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Search.css";

interface MovieVO {
  num: number;
  title: string;
  director: string;
  actor: string;
  genre: string;
  poster: string;
  release_date: string;
}

const DirectorSearch: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isGenre = location.pathname === "/Search";
  const isDirector = location.pathname === "/Search/Director";
  const isActor =
    location.pathname === "/Search/Actor" || location.pathname === "/actor";

  // 감독 탭 좌우 스크롤
  const directorRef = useRef<HTMLDivElement>(null);

  const [movies, setMovies] = useState<MovieVO[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDirector, setSelectedDirector] = useState<string | null>(null);

  // 영화 목록 불러오기
  useEffect(() => {
    const loadMovies = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACK_END_URL}/movie/movielist`
        );
        setMovies(res.data.movie || []);
      } catch (e) {
        console.error("영화 로딩 실패", e);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []);

  // 감독 목록
  const directors = Array.from(
    new Set(movies.map(movie => movie.director).filter(Boolean))
  );

  // 감독 필터링
  const filteredMovies = selectedDirector
    ? movies.filter(movie => movie.director === selectedDirector)
    : movies;

  return (
    <div className="filter-container">
      {/* 검색창 */}
      <div className="filter-header-right">
        <div className="search-box">
          <img src="/icons/search.png" className="search-icon" alt="search" />
          <input className="form-control" placeholder="Search..." />
        </div>
      </div>

      {/* 상단 탭 */}
      <div className="filter-tab-btn">
        <button
          className={`tab ${isGenre ? "active" : ""}`}
          onClick={() => navigate("/Search")}
        >
          장르
        </button>
        <button
          className={`tab ${isDirector ? "active" : ""}`}
          onClick={() => navigate("/Search/Director")}
        >
          감독
        </button>
        <button
          className={`tab ${isActor ? "active" : ""}`}
          onClick={() => navigate("/Search/Actor")}
        >
          배우
        </button>
      </div>

      {/* 감독 태그 가로 스크롤 */}
      <div className="actor-scroll-wrap">
        <button
          onClick={() =>
            directorRef.current?.scrollBy({ left: -200, behavior: "smooth" })
          }
        >
          &lt;
        </button>

        <div className="actor-line" ref={directorRef}>
          {directors.map(director => (
            <button
              key={director}
              className={`genre-btn ${
                selectedDirector === director ? "active" : ""
              }`}
              onClick={() => setSelectedDirector(director)}
            >
              {director}
            </button>
          ))}
        </div>

        <button
          onClick={() =>
            directorRef.current?.scrollBy({ left: 200, behavior: "smooth" })
          }
        >
          &gt;
        </button>
      </div>

      {/* 영화 카드 */}
      <section className="movie-grid">
        <div className="row g-4">
          {loading ? (
            <div className="col-12 text-center">로딩중...</div>
          ) : filteredMovies.length > 0 ? (
            filteredMovies.map(movie => (
              <div key={movie.num} className="col-md-4">
                <div className="card movie-card h-100">
                  <img
                    src={movie.poster}
                    className="card-img-top movie-poster"
                    alt={movie.title}
                    onError={e => {
                      e.currentTarget.src = "/images/no-poster.png";
                    }}
                  />
                  <div className="card-body">
                    <h5 className="movie-title">
                      <Link to={`/MovieInfo/${movie.num}`}>
                        {movie.title} {movie.release_date?.substring(0, 4)}
                      </Link>
                    </h5>
                    <span className="genre-badge">{movie.genre}</span>
                    <div className="moive-rating">★ 5.0</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-movie">등록된 영화가 없습니다.</div>
          )}
        </div>
      </section>

      {/* 페이지네이션 */}
      <footer className="movieLog-footer">
        <nav
          aria-label="Page navigation example"
          className="movieLog-pagination-box"
        >
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">1</a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">2</a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">3</a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </footer>
    </div>
  );
};

export default DirectorSearch;
