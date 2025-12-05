// src/components/Navbar/Navbar.tsx
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">

        <Link className="navbar-brand" to="/">MOVIE</Link>

        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
            style={{ "--bs-scroll-height": "100px" } as React.CSSProperties}
          >
            <li className="nav-item">
              <Link className="nav-link" to="/MovieLog">영화 기록</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/genre">장르</Link>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarScrollingDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                감독/배우
              </a>

              <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                <li><Link className="dropdown-item" to="/director">감독별 영화 기록</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/actor">배우별 영화 기록</Link></li>
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/board">게시판</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/mypage">마이페이지</Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
