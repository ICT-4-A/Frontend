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
        <button className="genre-btn">액션</button>
        <button className="genre-btn">코미디</button>
        <button className="genre-btn">로맨스</button>
        <button className="genre-btn">공포/스릴러</button>
        <button className="genre-btn active">SF/판타지</button>
        <button className="genre-btn">애니메이션</button>
      </div>

    </div>
  );
};

export default GenreFilter;
