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
            <button key={t1} className="tag">
              {t1}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default DirectorFilter;
