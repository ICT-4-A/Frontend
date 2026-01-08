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


const ActorSearch: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 URL 기준으로 어떤 탭이 활성인지 판별
  const isGenre = location.pathname === "/Search";
  const isDirector = location.pathname === "/Search/Director";
  const isActor = location.pathname === "/Search/Actor" || location.pathname === "/actor";

  // 배우 탭 좌우 스크롤
  const actorRef = useRef<HTMLDivElement>(null);

  const [movies, setMovies] = useState<MovieVO[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedActor, setSelectedActor] = useState<string | null>(null);

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

  // 배우 목록
  const actors = Array.from(
    new Set(movies
              .flatMap(movie => movie.actor?.split(","))
              .map(actor => actor.trim())
              .filter(Boolean)
            )
  );

  // 배우 선택 후 해당 배우 영화만, 선택 전이면 전체 영화 표시
  const filteredMovies = selectedActor
  ? movies.filter(movie => movie.actor?.includes(selectedActor))
  : movies;


  return (
    <div className="filter-container">
      <div className="filter-header-right">
        <div className="search-box">
          <img src="/icons/search.png" className="search-icon" alt="search" />
          <input className="form-control" placeholder="Search..." />
        </div>
      </div>

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

      {/* 배우 태그 가로 스크롤 */}
      <div className="actor-scroll-wrap">
        <button onClick={() => actorRef.current?.scrollBy({ left: -200, behavior: "smooth" })}>
          &lt;
        </button>

        <div className="actor-line" ref={actorRef}>
          {actors.map(actor => (
            <button
              key={actor}
              className={`genre-btn ${selectedActor === actor ? "active" : ""}`}
              onClick={() => setSelectedActor(actor)}>
              {actor}
            </button>
          ))}
        </div>

        <button onClick={() => actorRef.current?.scrollBy({ left: 200, behavior: "smooth" })}>
          &gt;
        </button>
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
              등록된 영화가 없습니다.
            </div>
          )}
        </div>
      </section>

      <footer className="movieLog-footer">
        {/* 페이지네이션 */}
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

export default ActorSearch;
