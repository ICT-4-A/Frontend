import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Search.css";

const actorList = [
  "이제훈",
  "송혜교",
  "이병헌",
  "송강호",
  "마동석",
  "유해진",
  "전지현",
  "설경구",
];

const ActorSearch: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 URL 기준으로 어떤 탭이 활성인지 판별
  const isGenre = location.pathname === "/Search";
  const isDirector = location.pathname === "/Search/Director";
  const isActor =
    location.pathname === "/Search/Actor" || location.pathname === "/actor";

  return (
    <div className="filter-container">
      <div className="filter-header-right">
        <div className="search-box">
          <img src="/icons/search.png" className="search-icon" alt="search" />
          <input className="form-control" placeholder="Search..." />
        </div>
      </div>

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

      <div className="tag-scroll-box">
        <div className="tag-list">
          {actorList.map((t2) => (
            <button key={t2} className={t2 === "이제훈" ? "tag active" : "tag"}>
              {t2}
            </button>
          ))}
        </div>
      </div>

      {/* 하단 카드 그리드 영역 */}
      <section className="moive-grid">
        <div className="row g-4">
          {/* 카드 1 */}
          <div className="col-md-4">
            <div className="card moive-card h-100">
              <img
                src="/images/poster9.jpg"
                className="card-img-top moive-poster"
                alt="소주전쟁"
              />
              <div className="card-body">
                <h5 className="moive-title">소주전쟁 2025</h5>
                <button className="badge genre-badge">코미디</button>
                <div className="moive-rating">★ 3.0</div>
              </div>
            </div>
          </div>

          {/* 카드 2 */}
          <div className="col-md-4">
            <div className="card moive-card h-100">
              <img
                src="/images/poster8.jpg"
                className="card-img-top moive-poster"
                alt="탈주"
              />
              <div className="card-body">
                <h5 className="moive-title">탈주 2025</h5>
                <button className="badge genre-badge">코미디</button>
                <div className="moive-rating">★ 4.0</div>
              </div>
            </div>
          </div>

          {/* 카드 3 */}
          <div className="col-md-4">
            <div className="card moive-card h-100">
              <img
                src="/images/poster10.jpg"
                className="card-img-top moive-poster"
                alt="건축학개론"
              />
              <div className="card-body">
                <h5 className="moive-title">건축학개론 2012</h5>
                <button className="badge genre-badge">로맨스</button>
                <div className="moive-rating">★ 4.0</div>
              </div>
            </div>
          </div>

          {/* 카드 4 */}
          <div className="col-md-4">
            <div className="card moive-card h-100">
              <img
                src="/images/poster14.png"
                className="card-img-top moive-poster"
                alt="건축학개론"
              />
              <div className="card-body">
                <h5 className="moive-title">사냥의 시간 2020</h5>
                <button className="badge genre-badge">공포/스릴러</button>
                <div className="moive-rating">★ 3.5</div>
              </div>
            </div>
          </div>

          {/* 카드 5 */}
          <div className="col-md-4">
            <div className="card moive-card h-100">
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
      </footer>
    </div>
  );
};

export default ActorSearch;
