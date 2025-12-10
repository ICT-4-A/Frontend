// src/components/MovieLog/MovieLog.tsx
import React from "react";
import "../MovieLog/MovieLog.css";
import { Link } from "react-router-dom";

const MovieLog = () => {
  return (
    <div className="movieLog">

      {/* 글쓰기 (+) 버튼 */}
      <Link to="/movieform">
        <button className="fab-btn">+</button>
      </Link>

      <div id="carouselExampleInterval" className="carousel slide" data-bs-interval="1000">
        <div className="carousel-inner">

          {/* 좌우 이미지 슬라이드 버튼 */}
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>

          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>

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

        {/* 카드 1 */}
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <img src="/images/poster2.jpg" className="img-fluid rounded-start" alt="포스터3" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">위키드2: 포 굿</h5>
                <p className="card-text">This is a wider card with supporting text below...</p>
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
          </div>
        </div>

        {/* 카드 2 */}
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <img src="/images/poster3.jpg" className="img-fluid rounded-start" alt="포스터3" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">나우유씨미3</h5>
                <p className="card-text">This is a wider card with supporting text below...</p>
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
          </div>
        </div>

        {/* 페이지네이션 */}
        <nav aria-label="Page navigation example">
          <ul className="pagination">
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

      </div>
    </div>
  );
};

export default MovieLog;
