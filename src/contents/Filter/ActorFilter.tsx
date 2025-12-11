// src/contents/Filter/ActorFilter.tsx
import React from "react";
import FilterTab from "./FilterTab";
import "./Filter.css"


const actorList = [
  "이동휘", "이병헌", "한효주", "마동석", "유해진", "전지현"
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
            <button key={t2} className="tag">
              {t2}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ActorFilter;
