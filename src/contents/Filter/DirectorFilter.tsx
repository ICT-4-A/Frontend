// src/contents/Filter/DirectorFilter.tsx
import React from "react";
import FilterTab from "./FilterTab";
import "./Filter.css"


const directorList = [
  "준추", "봉준호", "박찬욱", "제임스 카메론",
  "리치 무어", "스티븐 스필버그", "크리스토퍼 놀란"
];

const DirectorFilter = () => {
  return (
    <div className="filter-container">

      <FilterTab active="director" />

      <div className="filter-header-right">
        <div className="search-box">
          <img src="/icons/search.png" className="search-icon" alt="search" />
          <input className="form-control" placeholder="Search..." />
        </div>
      </div>

      <div className="tag-scroll-box">
        <div className="tag-list">
          {directorList.map((t1) => (
            <button key={t1} className={t1 === "봉준호" ? "tag active" : "tag"}>
              {t1}
            </button>
          ))}
        </div>
      </div>

      {/* 하단 카드 리스트 영역 */}
      <section className="movieLog-list">
        {/* 카드 1 */}
        <div className="card movieLog-card">
          <div className="row g-0">
            <div className="col-md-3">
              <img
                src="/images/poster7.jpg"
                className="img-fluid rounded-start poster-img"
                alt="포스터7"
              />
            </div>
            <div className="col-md-9">
              <div className="card-body">
                <div className="movie-title-row">
                  <h5 className="card-title">
                    <a href="/movielog/detail3">옥자 2017</a>
                  </h5>
                  <button className="movieDetail-genreTag">코미디</button>
                </div>
                <p className="card-text">
                  사회 비판적 메시지와 우화적인 풍자, 재미까지!
                </p>
                <p className="card-text">
                  <small className="text-muted">★ 4.0</small>
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
                src="/images/poster6.jpg"
                className="img-fluid rounded-start poster-img"
                alt="포스터6"
              />
            </div>
            <div className="col-md-9">
              <div className="card-body">
                <div className="movie-title-row">
                  <h5 className="card-title">기생충 2019</h5>
                  <button className="movieDetail-genreTag">공포/스릴러</button>
                </div>
                <p className="card-text">
                  재밌네요. 배우들이 연기를 잘해요
                </p>
                <p className="card-text">
                  <small className="text-muted">★ 3.0</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

        <footer className="movieLog-footer">
        {/* 페이지네이션 */}
        <nav aria-label="Page navigation example" className="movieLog-pagination-box">
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className="page-item"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
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

export default DirectorFilter;
