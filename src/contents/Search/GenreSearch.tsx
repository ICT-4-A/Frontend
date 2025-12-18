import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Search.css";

const GenreSearch: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isGenre = location.pathname === "/Search";
  const isDirector = location.pathname === "/Search/Director";
  const isActor =
    location.pathname === "/Search/Actor" || location.pathname === "/actor";

  return (
    <div className="genre-container">
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

      {/* 장르 필터 버튼 */}
      <div className="genre-buttons">
        <button className="genre-btn active">액션</button>
        <button className="genre-btn">코미디</button>
        <button className="genre-btn">로맨스</button>
        <button className="genre-btn">공포/스릴러</button>
        <button className="genre-btn">SF/판타지</button>
        <button className="genre-btn">애니메이션</button>
      </div>

      {/* 하단 카드 그리드 영역 */}
      <section className="movie-grid">
        <div className="row g-4">
          {/* 카드 1 */}
          <div className="col-md-4">
            <div className="card movie-card h-100">
              <img
                src="/images/poster4.jpg"
                className="card-img-top movie-poster"
                alt="어벤져스 엔드게임"
              />
              <div className="card-body">
                <h5 className="movie-title">
                  <a href="/MovieInfo">어벤져스 엔드게임 2019<br/></a>
                </h5>
                <button className="badge genre-badge">액션</button>
                <div className="moive-rating">★ 5.0</div>
              </div>
            </div>
          </div>

          {/* 카드 2 */}
          <div className="col-md-4">
            <div className="card movie-card h-100">
              <img
                src="/images/poster1.jpg"
                className="card-img-top movie-poster"
                alt=""
              />
              <div className="card-body">
                <h5 className="movie-title">아바타: 불과 재 <br/>2025</h5>
                <button className="badge genre-badge">액션</button>
                <div className="moive-rating">★ 4.5</div>
              </div>
            </div>
          </div>

          {/* 카드 3 */}
          <div className="col-md-4">
            <div className="card movie-card h-100">
              <img
                src="/images/poster5.jpg"
                className="card-img-top movie-poster"
                alt="스파이더맨 파 프롬 홈"
              />
              <div className="card-body">
                <h5 className="movie-title">스파이더맨 파 프롬 홈 2019</h5>
                <button className="badge genre-badge">액션</button>
                <div className="moive-rating">★ 5.0</div>
              </div>
            </div>
          </div>

          {/* 카드 4 */}
          <div className="col-md-4">
            <div className="card movie-card h-100">
              <img
                src="/images/poster3.jpg"
                className="card-img-top movie-poster"
                alt="나우유씨미3"
              />
              <div className="card-body">
                <h5 className="movie-title">나우유씨미3 <br/> 2025</h5>
                <button className="badge genre-badge">액션</button>
                <div className="moive-rating">★ 4.5</div>
              </div>
            </div>
          </div>

          {/* 카드 5 */}
          <div className="col-md-4">
            <div className="card movie-card h-100">
              <img
                src="/images/poster11.jpg"
                className="card-img-top movie-poster"
                alt="나우유씨미3"
              />
              <div className="card-body">
                <h5 className="movie-title">닥터스트레인지<br/> 대혼돈의 멀티버스 <br/> 2017</h5>
                <button className="badge genre-badge">액션</button>
                <div className="moive-rating">★ 2.5</div>
              </div>
            </div>
          </div>

          {/* 카드 6 */}
          <div className="col-md-4">
            <div className="card movie-card h-100">
              <img
                src="/images/poster12.jpg"
                className="card-img-top movie-poster"
                alt="나우유씨미3"
              />
              <div className="card-body">
                <h5 className="movie-title">가디언즈오브 갤럭시 <br/> 2018</h5>
                <button className="badge genre-badge">액션</button>
                <div className="moive-rating">★ 3.0</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 페이지네이션 */}
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

export default GenreSearch;
