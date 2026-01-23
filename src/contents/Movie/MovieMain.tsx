import React, { useEffect, useState } from "react";
import "./MovieMain.css";
import { Link } from "react-router-dom";
import axios from "axios";

interface MovieLogVO {
  num: number;
  title: string;
  poster: string;
  genre: string;

  writer_num: number;
  writer_name: string;

  toge_writer_num?: number;
  toge_writer_name?: string;

  simple_review: string;
  review: string;
  rate: number;
  hit: number;
  created_at: string;
}

interface MovieVO {
  num: number;
  title: string;
  director: string;
  actor: string;
  genre: string;
  poster: string;
  release_date: string;
}

const MovieMain: React.FC = () => {

  const [movies, setMovies] = useState<MovieVO[]>([]);
  const [originMovies, setOriginMovies] = useState<MovieVO[]>([]);
  const [loading, setLoading] = useState(true);
  const [movieLogs, setMovieLogs] = useState<MovieLogVO[]>([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACK_END_URL}/movie/list`, { withCredentials: true })
      .then((res) => {
        setMovieLogs(res.data.data);

      })
      .catch((err) => console.error("MovinLog load error", err));
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACK_END_URL}/movie/movielist`
        );
        const list = res.data.movie || [];
        setMovies(list);
        setOriginMovies(list);
      } catch (e) {
        console.error("영화 로딩 실패", e);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="movieLog-wrapper">
      <section className="movieLog-top">

        {/* 1. 상단 캐러셀 영역 */}
        <div
          id="carouselExampleInterval"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="3000" //이미지 슬라이드 속도
          data-bs-wrap="true"  // 끝까지 가면 처음으로 다시 오기
        >
          <div className="carousel-inner">
            {loading ? (
              <div className="carousel-item active">
                <div className="d-block w-100 text-center p-5">로딩중...</div>
              </div>
            ) : (
              movies.map((movie, index) => (
                <div key={movie.num} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="d-block w-100"  // Bootstrap 전체 너비 채우기
                    style={{ height: '100%', objectFit: 'cover' }}  // 고정 높이, 비율 유지
                  />
                </div>
              ))
            )}
          </div>

          {/* 좌우 슬라이드 버튼 */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      {/* 2. 하단 카드 리스트 영역 */}
      <section className="movieLog-list">
        {movieLogs.map((log) => (
          <div key={log.num} className="card movieLog-card">
            <div className="row g-0">
              <div className="col-md-3">
                <img src={`${log.poster}`} alt={log.title} className="img-fluid rounded-start poster-img" />
              </div>
              <div className="col-md-9">
                <div className="card-body">
                  <div className="movie-title-row">
                    <h5 className="card-title">
                      <Link to={`/movie/detail/${log.num}`}>{log.title}</Link>
                    </h5>
                    <div className="movieDetail-genreTag">
                      {log.genre}
                    </div>
                  </div>

                  <div className="movieDetail-user">
                    {/* 작성자 */}
                    <div className="movieDetail-user-avatar">
                      {log.writer_name.charAt(0)}
                    </div>
                    <div className="movieDetail-user-info">
                      <div className="movieDetail-user-name">
                        {log.writer_name}
                      </div>
                    </div>

                    {/* 공동작업자가 있는 경우 */}
                    {log.toge_writer_name && (
                      <>
                        <div className="movieDetail-user-avatar">
                          {log.toge_writer_name.charAt(0)}
                        </div>
                        <div className="movieDetail-user-info">
                          <div className="movieDetail-user-name">
                            {log.toge_writer_name}
                          </div>
                        </div>
                      </>
                    )}
                  </div>


                  <p className="card-text">
                    {log.simple_review}
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      ★ {log.rate}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
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

        {/* 오른쪽 + 버튼 */}
        <div className="dropdown movieLog-fab-dropdown">
          <button
            className="fab-btn dropdown-toggle"
            type="button"
            id="movieLogFabDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            +
          </button>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="movieLogFabDropdown"
          >
            <li>
              <Link className="dropdown-item" to="/moviesearch">
                영화 기록하기
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/survey/surveyform">
                설문조사 등록하러 가기
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default MovieMain;
