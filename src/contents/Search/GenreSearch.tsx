import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Search.css";

interface MovieVO {
  num: number;
  title: string;
  director: string;
  actor: string;
  genre: string;
  poster: string;
  release_date: string;
  avg_rating?: number;
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

  const isGenre = location.pathname === "/Search";
  const isDirector = location.pathname === "/Search/Director";
  const isActor = location.pathname === "/Search/Actor";

  const [movies, setMovies] = useState<MovieVO[]>([]);
  const [originMovies, setOriginMovies] = useState<MovieVO[]>([]);
  const [loading, setLoading] = useState(true);


  const [searchType, setSearchType] = useState("2"); // 초기 드롭다운: 장르
  const [searchValue, setSearchValue] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("액션");

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const cardsPerPage = 9; // 페이지네이션 숫자 블록
  const pagePerBlock = 5; // 한 페이지당 카드 수

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACK_END_URL}/movie/movielist`
        );
        const list = res.data.movie || [];
        setMovies(list);
        setOriginMovies(list);
        setTotalPages(Math.ceil(list.length / cardsPerPage)); // 총 페이지 계산
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
    let filtered = originMovies.filter((movie) => {
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

    setMovies(filtered);
    setCurrentPage(1);
    setTotalPages(Math.ceil(filtered.length / cardsPerPage));
  };

  // 장르 버튼 필터 
  const genreFilteredMovies = movies.filter((movie) => {
    const genreConfig = GENRES.find((g) => g.label === selectedGenre);
    if (!genreConfig) return false;
    return genreConfig.values.some((v) => movie.genre?.includes(v));
  });

  // 페이지네이션 처리 
  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentMovies = genreFilteredMovies.slice(
    startIndex,
    startIndex + cardsPerPage
  );

  const block = Math.ceil(currentPage / pagePerBlock);
  const startPage = (block - 1) * pagePerBlock + 1;
  const endPage = Math.min(block * pagePerBlock, totalPages);

  return (
    <div className="filter-container">
      {/* 검색창 */}
      <div className="filter-header-right">
        <div className="search-box">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
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
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>

          <div className="search-btn-wrap">
            <button className="btn-search" onClick={handleSearch}>
              검색
            </button>
          </div>
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
            className={`genre-btn ${selectedGenre === genre.label ? "active" : ""
              }`}
            onClick={() => {
              setSelectedGenre(genre.label);
              setCurrentPage(1);
            }}
          >
            {genre.label}
          </button>
        ))}
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
                    onClick={() => navigate(`/MovieInfo/${movie.num}`)}
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
                    <div className="moive-rating">
                      ★ {movie.avg_rating?.toFixed(2) ?? '-'} 
                    </div>

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
        <nav className="movieLog-pagination-box">
          <ul className="pagination justify-content-center">
            {startPage > 1 && (
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(startPage - 1)}
                >
                  이전
                </button>
              </li>
            )}

            {Array.from(
              { length: endPage - startPage + 1 },
              (_, i) => startPage + i
            ).map((page) => (
              <li
                key={page}
                className={`page-item ${page === currentPage ? "active" : ""
                  }`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              </li>
            ))}

            {endPage < totalPages && (
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(endPage + 1)}
                >
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

export default GenreSearch;
