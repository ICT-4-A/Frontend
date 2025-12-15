// src/contents/Filter/ActorFilter.tsx
import React from "react";
import FilterTab from "./FilterTab";
import "./Filter.css"


const actorList = [
  "이제훈", "송혜교", "이병헌", "송강호", "마동석", "유해진", "전지현", "설경구"
];

const ActorFilter = () => {
  return (
    <div className="filter-container">

      <FilterTab active="actor" />

      <div className="filter-header-right">
        <div className="search-box">
          <img src="/icons/search.png" className="search-icon" alt="search" />
          <input className="form-control" placeholder="Search..." />
        </div>
      </div>

      <div className="tag-scroll-box">
        <div className="tag-list">
          {actorList.map((t2) => (
            <button key={t2}  className={t2 === "이제훈" ? "tag active" : "tag"}>
              {t2}
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
                src="/images/poster9.jpg"
                className="img-fluid rounded-start poster-img"
                alt="포스터9"
              />
            </div>
            <div className="col-md-9">
              <div className="card-body">
                <div className="movie-title-row">
                  <h5 className="card-title">
                    <a href="/movielog/detail4">소주전쟁 2025</a>
                  </h5>
                  <button className="movieDetail-genreTag">코미디</button>
                </div>
                <p className="card-text">
                  1997년 외환위기 당시 '진로'와 골드만삭스 실화를 바탕으로 한 작품
                </p>
                <p className="card-text">
                  <small className="text-muted">★ 3.0</small>
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
                src="/images/poster8.jpg"
                className="img-fluid rounded-start poster-img"
                alt="포스터8"
              />
            </div>
            <div className="col-md-9">
              <div className="card-body">
                <div className="movie-title-row">
                  <h5 className="card-title">탈주 2025</h5>
                  <button className="movieDetail-genreTag">코미디</button>
                </div>
                <p className="card-text">
                  이제훈, 구교환 배우의 연기와 속도감 있는 전개
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
                src="/images/poster10.jpg"
                className="img-fluid rounded-start poster-img"
                alt="포스터10"
              />
            </div>
            <div className="col-md-9">
              <div className="card-body">
                <div className="movie-title-row">
                  <h5 className="card-title">건축학개론 2012</h5>
                  <button className="movieDetail-genreTag">로맨스</button>
                </div>
                <p className="card-text">
                  재밌네요. 배우들이 연기를 잘해요
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

export default ActorFilter;
