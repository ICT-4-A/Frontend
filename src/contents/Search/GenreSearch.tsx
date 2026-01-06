import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Search.css";
import axios from "axios";


interface MovieVO{
  num: number;
  title: string;
  director: string;
  actor: string;
  genre: string;
  poster: string;
  release_date: string;
}

const GenreSearch: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [movies,setMovies] = useState<MovieVO[]>([]);
  const [loading,setLoading] = useState(true);

  const isGenre = location.pathname === "/Search";
  const isDirector = location.pathname === "/Search/Director";
  const isActor =
    location.pathname === "/Search/Actor" || location.pathname === "/actor";

  useEffect (() => {
    const loadMovies = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACK_END_URL}/movie/movielist`);
        setMovies(response.data.movie || []);
      } catch (error) {
        console.log('실패', error);
      }finally{
        setLoading(false);
      }
    };
    loadMovies();
    
  },[])

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

      {/* 장르 필터 버튼 */}
      <div className="genre-buttons">
        <button className="genre-btn active">액션</button>
        <button className="genre-btn">코미디</button>
        <button className="genre-btn">로맨스</button>
        <button className="genre-btn">공포/스릴러</button>
        <button className="genre-btn">SF/판타지</button>
        <button className="genre-btn">애니메이션</button>
      </div>

      {/* 하단 카드 그리드 영역 */}
<section className="movie-grid">
        <div className="row g-4">
          {loading ? (
            <div className="col-12 text-center">로딩중...</div>
          ) : movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.num} className="col-md-4">
                <div className="card movie-card h-100">
                  <img
                    src={movie.poster}
                    className="card-img-top movie-poster"
                    alt={movie.title}
                    onError={(e) => {
                      e.currentTarget.src = '/images/no-poster.png';
                    }}
                  />
                  <div className="card-body">
                    <h5 className="movie-title">
                      <Link to={`/MovieInfo/${movie.num}`}>{movie.title} {movie.release_date?.substring(0,4) || ''}<br/>
                      </Link>
                    </h5>
                    <button className="badge genre-badge">{movie.genre}</button>
                    <div className="moive-rating">★ 5.0</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">등록된 영화가 없습니다.</div>
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
