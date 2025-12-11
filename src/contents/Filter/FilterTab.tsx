import React from "react";
import { useNavigate } from "react-router-dom";
import "./FilterTab.css";

const FilterTab = ({ active }: { active: "director" | "actor" }) => {
  const navigate = useNavigate();

  return (
    <div className="filter-tab-btn">
      <button className={active === "director" ? "tab active" : "tab"}
        onClick={() => navigate("/director")}>
        감독
      </button>

      <button className={active === "actor" ? "tab active" : "tab"}
        onClick={() => navigate("/actor")}>
        배우
      </button>
    </div>
  );
};

export default FilterTab;
