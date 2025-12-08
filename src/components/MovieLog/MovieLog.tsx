// src/components/MovieLog/MovieLog.tsx
import React from "react";
import "../MovieLog/MovieLog.css";

const MovieLog = () => {


  return (
    <div className="movieLog">
        <div id="carouselExampleInterval" className="carousel slide" data-bs-interval="1000">
        <div className="carousel-inner">
            <h1 style={{color: "white"}}> 하이 ~~</h1>
            {/* 좌우 이미지 슬라이드 버튼  */}
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
            <div className="carousel-item active">
                <img src="/images/poster1.jpg" alt="포스터1"/>
            </div>

            <div className="carousel-item">
                <img src="/images/poster2.jpg" alt="포스터2"/>
            </div>

            <div className="carousel-item">
                <img src="/images/poster3.jpg" alt="포스터3"/>
            </div>
        </div>

        {/* 하단 영화 기록 카드 1 */}
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <img src="/images/poster2.jpg" className="img-fluid rounded-start" alt="포스터3"/>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">위키드2: 포 굿</h5>
                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 영화 기록 카드 2 */}
                <div className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img src="/images/poster3.jpg" className="img-fluid rounded-start" alt="포스터3"/>
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">나우유씨미3</h5>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
      
    </div>
  );
};

export default MovieLog;
