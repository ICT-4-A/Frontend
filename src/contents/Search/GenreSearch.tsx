import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Search.css";
import axios from "axios";

interface MovieVO {
  num: number;
  title: string;
  director: string;
  actor: string;
  genre: string;
  poster: string;
  release_date: string;
}

const GENRES = [
  { label: "액션", values: ["액션"] },
  { label: "코미디", values: ["코미디"] },
  { label: "로맨스", values: ["로맨스"] },
  { label: "공포/스릴러", values: ["공포", "스릴러"] },
  { label: "SF/판타지", values: ["SF", "판타지"] },
  { label: "애니메이션", values: ["애니메이션"] },
];

const GenreSearch: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [movies, setMovies] = useState<MovieVO[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState("액션");

  const isGenre = location.pathname === "/Search";
  const isDirector = location.pathname === "/Search/Director";
  const isActor = location.pathname === "/Search/Actor";

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

  /* 선택된 장르 기준 영화 필터링 */
  const filteredMovies = movies.filter((movie) => {
    const genreConfig = GENRES.find((g) => g.label === selectedGenre);
    if (!genreConfig) return false;
    return genreConfig.values.some((value) =>
      movie.genre?.includes(value)
    );
  });

  return (
    <div className="genre-container">
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

      {/* 장르 버튼 */}
      <div className="genre-buttons">
        {GENRES.map((genre) => (
          <button
            key={genre.label}
            className={`genre-btn ${selectedGenre === genre.label ? "active" : ""}`}
            onClick={() => setSelectedGenre(genre.label)} >
            {genre.label}
          </button>
        ))}
      </div>

      {/* 영화 카드 */}
      <section className="movie-grid">
        <div className="row g-4">
          {loading ? (
            <div className="col-12 text-center">로딩중...</div>
          ) : filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <div key={movie.num} className="col-md-4">
                <div className="card movie-card h-100">
                  <img
                    src={movie.poster}
                    className="card-img-top movie-poster"
                    alt={movie.title}
                    onError={(e) => {
                      e.currentTarget.src = "/images/no-poster.png";
                    }}
                  />
                  <div className="card-body">
                    <h5 className="movie-title">
                      <Link to={`/MovieInfo/${movie.num}`}>
                        {movie.title}{" "}
                        {movie.release_date?.substring(0, 4)}
                      </Link>
                    </h5>
                    <span className="genre-badge">{movie.genre}</span>
                    <div className="moive-rating">★ 5.0</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-movie">
              해당 장르의 영화가 없습니다.
            </div>
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
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
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

export default GenreSearch;
