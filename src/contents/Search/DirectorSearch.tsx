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
  const isActor = location.pathname === "/Search/Actor" || location.pathname === "/actor";

  const directorRef = useRef<HTMLDivElement>(null);

  const [movies, setMovies] = useState<MovieVO[]>([]); 
  const [loading, setLoading] = useState(true);
  const [searchType, setSearchType] = useState("3"); // 초기 드롭다운: 감독
  const [searchValue, setSearchValue] = useState(""); 
  const [selectedDirector, setSelectedDirector] = useState<string | null>(null);

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pagePerBlock = 5; // 페이지네이션 숫자 블록
  const cardsPerPage = 9; // 한 페이지당 카드 수

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACK_END_URL}/movie/movielist`);
        const movieList: MovieVO[] = res.data.movie || [];
        setMovies(movieList);
        setTotalPages(Math.ceil(movieList.length / cardsPerPage)); // 총 페이지 계산
      } catch (e) {
        console.error("영화 로딩 실패", e);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  // 검색 
  const handleSearch = () => {
    setSelectedDirector(null); // 검색 시 감독 필터 초기화
    const filtered = movies.filter((movie) => {
      switch (searchType) {
        case "1":  // 제목
          return movie.title.toLowerCase().includes(searchValue.toLowerCase());
        case "2":  // 장르
          return movie.genre.toLowerCase().includes(searchValue.toLowerCase());
        case "3":  // 감독
          return movie.director.toLowerCase().includes(searchValue.toLowerCase());
        case "4":  // 배우
          return movie.actor.toLowerCase().includes(searchValue.toLowerCase());
        default:
          return true;
      }
    });

    if (filtered.length === 0) {
      alert("검색 결과가 없습니다.");
    }

    setCurrentPage(1);
    setTotalPages(Math.ceil(filtered.length / cardsPerPage));
    setMovies(filtered);
  };

  // 페이지 변경
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 감독 목록 추출
  const directors = Array.from(new Set(movies.map((m) => m.director).filter(Boolean)));

  // 감독 필터링
  const filteredMovies = selectedDirector
    ? movies.filter((m) => m.director === selectedDirector)
    : movies;

  // 현재 페이지 영화
  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentMovies = filteredMovies.slice(startIndex, startIndex + cardsPerPage);

  // 페이지네이션 블록 계산
  const block = Math.ceil(currentPage / pagePerBlock);
  const startPage = (block - 1) * pagePerBlock + 1;
  const endPage = Math.min(block * pagePerBlock, totalPages);

  return (
    <div className="filter-container">
      {/* 검색창 */}
      <div className="filter-header-right">
        <div className="search-box"> 
            <select value={searchType} onChange={(e) => setSearchType(e.target.value)}> 
              <option value="1">제목</option> 
              <option value="2">장르</option> 
              <option value="3">감독</option> 
              <option value="4">배우</option> 
            </select> 

          <div className="search-input-wrap">
            <input
              className="form-control"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}/>
          </div>
            
          <div className="search-btn-wrap">
            <button className="btn-search" onClick={handleSearch}>
              검색
            </button>
          </div>

        </div>
      </div>

      {/* 상단 필터링 탭 */}
      <div className="filter-tab-btn">
        <button className={`tab ${isGenre ? "active" : ""}`} onClick={() => navigate("/Search")}>
          장르
        </button>
        <button className={`tab ${isDirector ? "active" : ""}`} onClick={() => navigate("/Search/Director")}>
          감독
        </button>
        <button className={`tab ${isActor ? "active" : ""}`} onClick={() => navigate("/Search/Actor")}>
          배우
        </button>
      </div>

      {/* 감독 태그 가로 스크롤 */}
      <div className="actor-scroll-wrap">
        <button onClick={() => directorRef.current?.scrollBy({ left: -200, behavior: "smooth" })}>
          &lt;
        </button>
        <div className="actor-line" ref={directorRef}>
          {directors.map((director) => (
            <button
              key={director}
              className={`genre-btn ${selectedDirector === director ? "active" : ""}`}
              onClick={() => setSelectedDirector(director)}
            >
              {director}
            </button>
          ))}
        </div>
        <button onClick={() => directorRef.current?.scrollBy({ left: 200, behavior: "smooth" })}>
          &gt;
        </button>
      </div>

      {/* 영화 카드 */}
      <section className="movie-grid">
        <div className="row g-4">
          {loading ? (
            <div className="col-12 text-center">로딩중...</div>
          ) : currentMovies.length > 0 ? (
            currentMovies.map((movie) => (
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
        <nav aria-label="Page navigation example" className="movieLog-pagination-box">
          <ul className="pagination justify-content-center">
            {startPage > 1 && (
              <li className="page-item">
                <button className="page-link" onClick={() => handlePageChange(startPage - 1)}>
                  이전
                </button>
              </li>
            )}
            {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
              <li key={page} className={`page-item ${page === currentPage ? "active" : ""}`}>
                <button className="page-link" onClick={() => handlePageChange(page)}>
                  {page}
                </button>
              </li>
            ))}
            {endPage < totalPages && (
              <li className="page-item">
                <button className="page-link" onClick={() => handlePageChange(endPage + 1)}>
                  다음
                </button>
              </li>
            )}
          </ul>
        </nav>
      </footer>
    </div>
  );
};

export default DirectorSearch;
