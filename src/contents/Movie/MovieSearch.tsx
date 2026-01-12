import React, { useEffect, useState } from "react";
import "./MovieSearch.css";
import { useNavigate } from "react-router-dom";
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

const MovieSearch: React.FC = () => {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState('1');
  const [searchValue, setSearchValue] = useState('');
  const [movieList, setMovieList] = useState<MovieVO[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieVO | null>(null);



  const searchFunction = async () => {
    if (!searchValue.trim()) {
      alert("검색어를 입력해주세요!");
      return;
    }
    
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACK_END_URL}/movie/search`, {
        params: {
          searchType: parseInt(searchType),
          searchValue: searchValue.trim()
        }
      });
      setMovieList(response.data.movie || []);
      setSelectedMovie(null);
    } catch (error) {
      console.error("검색 실패:", error);
      setMovieList([]);
    }
  };

  const selectMovie = (movie: MovieVO) => {
    setSelectedMovie(movie);
  };

  const handleNext = () => {
    if (!selectedMovie) {
      alert("영화를 선택해주세요!");
    } 
    navigate(`/movieform/${selectedMovie?.num}`,{state: {movie: selectedMovie}})
  };



  return (
    <div className="movie-search-container">
      <div className="movie-search-header">
        <h2>영화 선택</h2>
        <p>검색 후 원하는 영화를 선택하세요</p>
      </div>

      {/* 검색 영역 */}
      <div className="search-section">
        <div className="search-inputs">
          <select 
            value={searchType} 
            onChange={(e) => setSearchType(e.target.value)}
            className="search-select"
          >
            <option value="1">제목</option>
            <option value="2">장르</option>
            <option value="3">감독</option>
            <option value="4">배우</option>
          </select>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && searchFunction()}
            placeholder="영화 검색..."
            className="search-input"
          />
          <button onClick={searchFunction} className="search-btn">
            🔍 검색
          </button>
        </div>
      </div>

      {/* 검색 결과 */}
      {movieList.length > 0 && (
        <div className="results-section">
          <div className="results-header">
            <h3>검색결과 <span className="result-count">{movieList.length}건</span></h3>
          </div>
          <div className="movies-grid">
            {movieList.map((movie) => (
              <div
                key={movie.num}
                className={`movie-card ${selectedMovie?.num === movie.num ? 'selected' : ''}`}
                onClick={() => selectMovie(movie)}
              >
                <div className="movie-poster">
                  <img
                    src={`${movie.poster}`}
                    alt={movie.title}
                    onError={(e) => {
                      e.currentTarget.src = '/images/no-poster.png';
                    }}
                  />
                </div>
                <div className="movie-details">
                  <h4>{movie.title}</h4>
                  <p className="movie-meta">{movie.director} | {movie.genre}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 선택된 영화 미리보기 */}
      <div className="preview-section">
        <div className="preview-card">
          {selectedMovie ? (
            <>
              <div className="preview-poster">
                <img
                  src={`${selectedMovie.poster}`}
                  alt={selectedMovie.title}
                  onError={(e) => {
                    e.currentTarget.src = '/images/no-poster.png';
                  }}
                />
              </div>
              <div className="preview-info">
                <h3>{selectedMovie.title}</h3>
                <div className="genre-badge">{selectedMovie.genre}</div>
                <div className="meta-info">
                  <div>📅 {selectedMovie.release_date}</div>
                  <div>👨‍🎬 {selectedMovie.director}</div>
                  <div>👥 {selectedMovie.actor}</div>
                </div>
              </div>
            </>
          ) : (
            <div className="no-selection">
              <div className="placeholder-poster">📺</div>
              <h3>영화를 선택해주세요</h3>
              <p>위 목록에서 원하는 영화를 클릭하세요</p>
            </div>
          )}
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="action-section">
        <button 
          className={`next-btn ${selectedMovie ? 'active' : ''}`}
          onClick={handleNext}
          disabled={!selectedMovie}
        >
          다음 단계
        </button>
      </div>
    </div>
  );
};

export default MovieSearch;