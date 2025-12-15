// src/components/MyPage/MyPage.tsx
import React, { useState } from "react";
import "./MyPage.css";
import { Link } from "react-router-dom";

type MenuKey = "profile" | "movies" | "posts" | "inquiry" | "stats";

const MyPage: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<MenuKey>("movies");

  return (
    <div className="mypage-wrapper">
      {/* 왼쪽 사이드바 */}
      <aside className="mypage-sidebar">
        <div className="mypage-profile">
          <div className="mypage-avatar">
            <span>JS</span>
          </div>
          <div className="mypage-name">테스트1</div>
        </div>

        <nav className="mypage-menu">
          <button
            className={`menu-item ${
              selectedMenu === "profile" ? "active" : ""
            }`}
            onClick={() => setSelectedMenu("profile")}
          >
            <span className="menu-icon">👤</span>
            <span>회원정보 수정</span>
          </button>

          <button
            className={`menu-item ${selectedMenu === "movies" ? "active" : ""}`}
            onClick={() => setSelectedMenu("movies")}
          >
            <span className="menu-icon">🎬</span>
            <span>작성한 영화 기록</span>
          </button>

          <button
            className={`menu-item ${selectedMenu === "posts" ? "active" : ""}`}
            onClick={() => setSelectedMenu("posts")}
          >
            <span className="menu-icon">📝</span>
            <span>작성한 게시글</span>
          </button>

          <button
            className={`menu-item ${
              selectedMenu === "inquiry" ? "active" : ""
            }`}
            onClick={() => setSelectedMenu("inquiry")}
          >
            <span className="menu-icon">💬</span>
            <span>관리자 문의</span>
          </button>

          <button
            className={`menu-item ${selectedMenu === "stats" ? "active" : ""}`}
            onClick={() => setSelectedMenu("stats")}
          >
            <span className="menu-icon">📊</span>
            <span>장르 통계</span>
          </button>
        </nav>
      </aside>

      {/* 오른쪽 메인 영역: 선택된 메뉴에 따라 내용 변경 */}
      <section className="mypage-main">
        {selectedMenu === "profile" && <ProfileSection />}
        {selectedMenu === "movies" && <MovieListSection />}
        {selectedMenu === "posts" && <PostListSection />}
        {selectedMenu === "inquiry" && <InquirySection />}
        {selectedMenu === "stats" && <StatsSection />}
      </section>
    </div>
  );
};

export default MyPage;

/* ====== 아래는 같은 파일 안에 서브 컴포넌트들 ====== */

const ProfileSection: React.FC = () => (
  <>
    <h2 className="mypage-title">마이페이지</h2>

    <div className="profile-card">
      <p className="profile-desc">회원정보를 수정할 수 있는 페이지입니다.</p>

      <form className="profile-form">
        {/* 비밀번호 변경 */}
        <div className="profile-field">
          <label htmlFor="newPassword" className="profile-label">
            바꿀 비밀번호
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            className="form-control profile-input"
            placeholder="새 비밀번호를 입력해주세요."
          />
        </div>

        {/* 비밀번호 확인 */}
        <div className="profile-field">
          <label htmlFor="newPasswordConfirm" className="profile-label">
            비밀번호 확인
          </label>
          <input
            type="password"
            id="newPasswordConfirm"
            name="newPasswordConfirm"
            className="form-control profile-input"
            placeholder="새 비밀번호를 한 번 더 입력해주세요."
          />
        </div>

        {/* 선호 장르 변경 */}
        <div className="profile-field">
          <label htmlFor="favoriteGenreEdit" className="profile-label">
            선호 영화 장르
          </label>
          <select
            id="favoriteGenreEdit"
            name="favoriteGenreEdit"
            className="form-select profile-input"
            defaultValue="액션"
          >
            <option value="액션">액션</option>
            <option value="코미디">코미디</option>
            <option value="로맨스">로맨스</option>
            <option value="공포/스릴러">공포/스릴러</option>
            <option value="SF/판타지">SF/판타지</option>
            <option value="애니메이션">애니메이션</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary profile-save-btn">
          변경사항 저장
        </button>
      </form>
    </div>
  </>
);

const MovieListSection: React.FC = () => (
  <>
    <h2 className="mypage-title">마이페이지</h2>

    <table className="table mypage-table align-middle">
      <thead>
        <tr>
          <th style={{ width: "60px" }}>No</th>
          <th>영화</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>3</td>
          <td>
            <div className="mypage-movie-row">
              <img
                src="/images/poster2.jpg"
                className="mypage-poster"
                alt="위키드"
              />
              <div className="mypage-movie-info">
                <div className="mypage-movie-title">
                  <Link to="/movielog/detail"> 위키드: 포 굿 </Link>
                  <span className="year">2025</span>
                  <button className="badge-btn">판타지</button>
                </div>
                <div className="mypage-movie-desc">
                  시즌1보다 아쉽지만 그래도 재밌었어요
                </div>
              </div>
            </div>
          </td>
        </tr>

        <tr>
          <td>2</td>
          <td>
            <div className="mypage-movie-row">
              <img
                src="/images/poster3.jpg"
                className="mypage-poster"
                alt="주토피아 2"
              />
              <div className="mypage-movie-info">
                <div className="mypage-movie-title">
                  주토피아 2 <span className="year">2025</span>
                  <button className="badge-btn">애니메이션</button>
                </div>
                <div className="mypage-movie-desc">
                  남녀노소를 불문하고 즐길 수 있는 영화
                </div>
              </div>
            </div>
          </td>
        </tr>

        <tr>
          <td>1</td>
          <td>
            <div className="mypage-movie-row">
              <img
                src="/images/poster1.jpg"
                className="mypage-poster"
                alt="겨울왕국 2"
              />
              <div className="mypage-movie-info">
                <div className="mypage-movie-title">
                  겨울왕국 2 <span className="year">2025</span>
                  <button className="badge-btn">애니메이션</button>
                </div>
                <div className="mypage-movie-desc">
                  노래도 좋고, 너무 재밌게 봤다
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </>
);

const PostListSection: React.FC = () => (
  <>
    <h2 className="mypage-title">마이페이지</h2>

    <table className="table mypage-table align-middle">
      <thead>
        <tr>
          <th style={{ width: "60px" }}>No</th>
          <th>제목</th>
          <th style={{ width: "140px" }}>날짜</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>3</td>
          <td>
            <Link to="/board/detail1">
              주말에 보기 좋은 영화 추천 부탁드려요
            </Link>
          </td>
          <td>2025-11-29</td>
        </tr>
        <tr>
          <td>2</td>
          <td>인생 영화 하나만 추천해주세요</td>
          <td>2025-11-23</td>
        </tr>
        <tr>
          <td>1</td>
          <td>주말에 가볍게 볼 영화 찾습니다, 추천 좀!</td>
          <td>2025-11-19</td>
        </tr>
      </tbody>
    </table>
  </>
);

const InquirySection: React.FC = () => (
  <>
    <div className="mypage-main-header">
      <h2 className="mypage-title">마이페이지</h2>

      {/* 글쓰기 버튼 */}
      <Link to="/mypage/toadminform">
        <button className="mypage-write-btn">글쓰기</button>
      </Link>
    </div>

    <table className="table mypage-table align-middle">
      <thead>
        <tr>
          <th style={{ width: "60px" }}>No</th>
          <th>제목</th>
          <th style={{ width: "100px" }}>상태</th>
          <th style={{ width: "140px" }}>등록일</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>3</td>

          <td>
            <Link to="/mypage/toadmindetail">
              서비스 이용 중 오류가 발생했습니다
            </Link>
          </td>

          <td className="text-success">답변 완료</td>
          <td>2025-11-29</td>
        </tr>
        <tr>
          <td>2</td>
          <td>계정 또는 로그인 관련 문의</td>
          <td className="text-danger">답변 대기</td>
          <td>2025-11-23</td>
        </tr>
        <tr>
          <td>1</td>
          <td>기타 시스템 사용 관련 문의</td>
          <td className="text-success">답변 완료</td>
          <td>2025-11-19</td>
        </tr>
      </tbody>
    </table>
  </>
);

const StatsSection: React.FC = () => (
  <>
    <h2 className="mypage-title">마이페이지</h2>

    <div className="stats-card">
      <div className="stats-chart">
        <div className="stats-bar">
          <div
            className="stats-bar-inner bg-primary"
            style={{ height: "55px" }}
          />
          <span className="stats-label">액션</span>
        </div>
        <div className="stats-bar">
          <div
            className="stats-bar-inner bg-success"
            style={{ height: "30px" }}
          />
          <span className="stats-label">코미디</span>
        </div>
        <div className="stats-bar">
          <div className="stats-bar-inner bg-info" style={{ height: "75px" }} />
          <span className="stats-label">로맨스</span>
        </div>
        <div className="stats-bar">
          <div
            className="stats-bar-inner bg-warning"
            style={{ height: "45px" }}
          />
          <span className="stats-label">공포/스릴러</span>
        </div>
        <div className="stats-bar">
          <div
            className="stats-bar-inner bg-danger"
            style={{ height: "90px" }}
          />
          <span className="stats-label">SF/판타지</span>
        </div>
        <div className="stats-bar">
          <div
            className="stats-bar-inner bg-secondary"
            style={{ height: "50px" }}
          />
          <span className="stats-label">애니메이션</span>
        </div>
      </div>
    </div>
  </>
);
