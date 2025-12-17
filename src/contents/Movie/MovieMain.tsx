// src/components/MovieLog/MovieLog.tsx
import React from "react";
import "./MovieMain.css";
import { Link } from "react-router-dom";

const MovieLog = () => {
  return (
    <div className="movieLog-wrapper">
      <section className="movieLog-top">
        {/* 검색 폼 */}
        <div className="filter-header-right">
          <div className="search-box">
            <img src="/icons/search.png" className="search-icon" alt="search" />
            <input className="form-control" placeholder="Search..." />
          </div>
        </div>
        {/* 1. 상단 캐러셀 영역 */}

        <div
          id="carouselExampleInterval"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="2000"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/images/poster1.jpg" alt="포스터1" />
            </div>

            <div className="carousel-item">
              <img src="/images/poster2.jpg" alt="포스터2" />
            </div>

            <div className="carousel-item">
              <img src="/images/poster3.jpg" alt="포스터3" />
            </div>
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
        {/* 카드 1 */}
        <div className="card movieLog-card">
          <div className="row g-0">
            <div className="col-md-3">
              <img
                src="/images/poster2.jpg"
                className="img-fluid rounded-start poster-img"
                alt="포스터2"
              />
            </div>
            <div className="col-md-9">
              <div className="card-body">
                <div className="movie-title-row">
                  <h5 className="card-title">
                    <a href="/movielog/detail">위키드2: 포 굿 2025</a>
                  </h5>
                  <button className="movieDetail-genreTag">판타지</button>
                </div>
                {/* 유저 프로필 */}
                <div className="movieDetail-user">
                  <div className="movieDetail-user-avatar">A</div>
                  <div className="movieDetail-user-info">
                    <div className="movieDetail-user-name">테스트1</div>
                    <span className="movieDetail-tag">애니메이션</span>
                  </div>
                </div>

                <p className="card-text">
                  최고의 명작! 시간 가는 줄 모르고 봤어요.
                </p>
                <p className="card-text">
                  <small className="text-muted">★ 5.0</small>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 카드 2 */}
        <div className="card movieLog-card">
          <div className="row g-0">
            <div className="col-md-3">
              <img
                src="/images/poster3.jpg"
                className="img-fluid rounded-start poster-img"
                alt="포스터3"
              />
            </div>
            <div className="col-md-9">
              <div className="card-body">
                <div className="movie-title-row">
                  <h5 className="card-title">나우유씨미3</h5>
                  <button className="movieDetail-genreTag">판타지</button>
                </div>

                {/* 유저 프로필 */}
                <div className="movieDetail-user">
                  <div className="movieDetail-user-avatar">B</div>
                  <div className="movieDetail-user-info">
                    <div className="movieDetail-user-name">필름러버</div>
                    <span className="movieDetail-tag">SF/판타지</span>
                  </div>
                </div>

                <p className="card-text">
                  시즌1보다 아쉽지만 그래도 재밌었어요.
                </p>
                <p className="card-text">
                  <small className="text-muted">★ 4.0</small>
                </p>
              </div>
            </div>
          </div>
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

        {/* 오른쪽 + 버튼 */}
        <Link to="/moviesearch">
          <button className="fab-btn" aria-label="영화 기록 작성">
            +
          </button>
        </Link>
      </footer>
    </div>
  );
};

export default MovieLog;
