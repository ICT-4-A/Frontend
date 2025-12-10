// comp/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ padding: '0 0 8px 0' }}>
      <div className="container-fluid" style={{ paddingLeft: 0, paddingRight: 0 }}>
        <div className="collapse navbar-collapse justify-content-center" id="navbarScroll">
          <ul
            className="navbar-nav mx-auto my-2 my-lg-0 navbar-nav-scroll"
            style={{ maxHeight: '100px' , display:'flex', justifyContent:'center', gap:'150px', fontSize:'20px'}}
          >
            <li className="nav-item">
              <Link className="nav-link" to="/MovieLog">
                영화 기록
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/genre">
                장르
              </Link>
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
                <li>
                  <Link className="dropdown-item" to="/director">
                    감독별 영화 기록
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="/actor">
                    배우별 영화 기록
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/board">
                게시판
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/mypage">
                마이페이지
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
