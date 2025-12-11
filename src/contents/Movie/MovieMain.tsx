// src/components/MovieLog/MovieLog.tsx
import React from "react";
import "./MovieMain.css";
import { Link } from "react-router-dom";

const MovieLog = () => {
  return (
    <div className="movieLog-wrapper">
      <section className="movieLog-top">
        {/* 검색 폼 */}
        <div className="movieLog-search">
          <input
            type="text"
            className="movieLog-search-input"
            placeholder="Search ..."
          />
          <button className="movieLog-search-btn" aria-label="검색">
            🔍
          </button>
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
                <h5 className="card-title">
                  <a href="/movielog/detail">위키드2: 포 굿 2025</a>
                </h5>
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
                <h5 className="card-title">나우유씨미3</h5>
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
        {/* 가운데 페이지네이션 */}
        <nav
          aria-label="Page navigation"
          className="movieLog-pagination-wrapper"
        >
          <ul className="pagination">
            <li className="page-item">
              <button className="page-link" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
            <li className="page-item active">
              <button className="page-link">1</button>
            </li>
            <li className="page-item">
              <button className="page-link">2</button>
            </li>
            <li className="page-item">
              <button className="page-link">3</button>
            </li>
            <li className="page-item">
              <button className="page-link" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* 오른쪽 + 버튼 */}

        <Link to="/movieform">
          <button className="fab-btn" aria-label="영화 기록 작성">
            +
          </button>
        </Link>
      </footer>
    </div>
  );
};

export default MovieLog;
