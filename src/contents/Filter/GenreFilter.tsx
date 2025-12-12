import React from "react";
import "../Filter/Filter.css";

const GenreFilter = () => {
  return (
    <div className="genre-container">

      {/* 검색창 */}
      <div className="search-box">
        <img src="/icons/search.png" alt="검색" className="search-icon" />
        <input 
          type="text"
          placeholder="Search..."
          className="form-control"/>
      </div>
      
      {/* 장르 필터링 버튼 */}
      <div className="genre-buttons">
        <button className="genre-btn active">액션</button>
        <button className="genre-btn">코미디</button>
        <button className="genre-btn">로맨스</button>
        <button className="genre-btn">공포/스릴러</button>
        <button className="genre-btn">SF/판타지</button>
        <button className="genre-btn">애니메이션</button>
      </div>


      {/* 하단 카드 리스트 영역 */}
      <section className="movieLog-list">
        {/* 카드 1 */}
        <div className="card movieLog-card">
          <div className="row g-0">
            <div className="col-md-3">
              <img
                src="/images/poster4.jpg"
                className="img-fluid rounded-start poster-img"
                alt="포스터4"
              />
            </div>
            <div className="col-md-9">
              <div className="card-body">
                <div className="movie-title-row">
                  <h5 className="card-title">
                    <a href="/movielog/detail2">어벤져스 엔드게임 2019</a>
                  </h5>
                  <button className="movieDetail-genreTag">액션</button>
                </div>
                <p className="card-text">
                  뜨거운 안녕의 끝에서 열렬한 환영의 시작으로
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
                src="/images/poster5.jpg"
                className="img-fluid rounded-start poster-img"
                alt="포스터5"
              />
            </div>
            <div className="col-md-9">
              <div className="card-body">
                <div className="movie-title-row">
                  <h5 className="card-title">
                    <a>스파이더맨 파 프롬 홈 2019</a>
                  </h5>
                  <button className="movieDetail-genreTag">액션</button>
                </div>
                <p className="card-text">
                  <small className="text-muted">★ 5.0</small>
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

export default GenreFilter;
