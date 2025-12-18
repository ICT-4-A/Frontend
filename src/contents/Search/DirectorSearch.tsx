import React from "react";
import "./Search.css";
import { useLocation, useNavigate } from "react-router-dom";

const directorList = [
  "준추",
  "봉준호",
  "박찬욱",
  "제임스 카메론",
  "리치 무어",
  "스티븐 스필버그",
  "크리스토퍼 놀란",
];

const DirectorSearch: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isGenre = location.pathname === "/Search";
  const isDirector = location.pathname === "/Search/Director";
  const isActor =
    location.pathname === "/Search/Actor" || location.pathname === "/actor";

  return (
    <div className="filter-container">
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

      {/* 감독 태그 리스트 */}
      <div className="tag-scroll-box">
        <div className="tag-list">
          {directorList.map((name) => (
            <button
              key={name}
              className={name === "준추" ? "tag active" : "tag"}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* 하단 카드 그리드 영역 */}
      <section className="movie-grid">
        <div className="row g-4">
          {/* 카드 1: 옥자 */}
          <div className="col-md-4">
            <div className="card movie-card h-100">
              <img
                src="/images/poster7.jpg"
                className="card-img-top movie-poster"
                alt="옥자"
              />
              <div className="card-body">
                <h5 className="movie-title">옥자 2017</h5>
                <button className="badge genre-badge">코미디</button>
                <div className="moive-rating">★ 3.5</div>
              </div>
            </div>
          </div>

          {/* 카드 2: 기생충 */}
          <div className="col-md-4">
            <div className="card movie-card h-100">
              <img
                src="/images/poster6.jpg"
                className="card-img-top movie-poster"
                alt="기생충"
              />
              <div className="card-body">
                <h5 className="movie-title">기생충 2019</h5>
                <button className="badge genre-badge">공포/스릴러</button>
                <div className="moive-rating">★ 3.5</div>
              </div>
            </div>
          </div>

          {/* 카드 3*/}
          <div className="col-md-4">
            <div className="card movie-card h-100">
              <img
                src="/images/poster13.jpg"
                className="card-img-top movie-poster"
                alt="설국열차"
              />
              <div className="card-body">
                <h5 className="movie-title">설국열차 2012</h5>
                <button className="badge genre-badge">SF/판타지</button>
                <div className="moive-rating">★ 3.5</div>
              </div>
            </div>
          </div>

          {/* 카드 4  */}
          <div className="col-md-4">
            <div className="card movie-card h-100">
              <img
                src="/images/poster8.jpg"
                className="card-img-top movie-poster"
                alt="기생충"
              />
              <div className="card-body">
                <h5 className="movie-title">탈주 2019</h5>
                <button className="badge genre-badge">공포/스릴러</button>
                <p className="movie-rating">★ 3.0</p>
              </div>
            </div>
          </div>

          {/* 카드 5  */}
          <div className="col-md-4">
            <div className="card movie-card h-100">
              <img
                src="/images/poster9.jpg"
                className="card-img-top movie-poster"
                alt="기생충"
              />
              <div className="card-body">
                <h5 className="movie-title">소주전쟁 2024</h5>
                <button className="badge genre-badge">공포/스릴러</button>
                <p className="movie-rating">★ 3.0</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 페이지네이션 그대로 */}
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

export default DirectorSearch;
