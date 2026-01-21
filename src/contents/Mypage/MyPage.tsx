// src/components/MyPage/MyPage.tsx
import React, { useEffect, useState } from "react";
import "./MyPage.css";
import { Link } from "react-router-dom";
import axios from "axios";


type MenuKey = "profile" | "friends" | "movies" | "boards" | "gallery" | "inquiry" | "stats";

const MyPage: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<MenuKey>("movies");
  const [nickname, setNickname] = useState<string>("");
  const [memberGenre, setMemberGenre] = useState<string | null>(null);
  
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACK_END_URL}/movie/me`, { withCredentials: true })
      .then((res) => {
        setNickname(res.data.nickname); // 유저 닉네임
        setMemberGenre(res.data.member_genre);
      })
      .catch((err) => console.error("유저 정보 로드 실패", err));
  }, []); 
  
  return (
    <div className="mypage-wrapper">
      {/* 왼쪽 사이드바 */}
      <aside className="mypage-sidebar">
        <div className="mypage-profile">
          <div className="mypage-avatar">
            <span>{nickname?.charAt(0).toUpperCase()}</span>
          </div>
          <div className="mypage-name">{nickname}</div>
          {/* 장르 버튼 */}
          {memberGenre && (
            <button className="mypage-genre-btn">{memberGenre}</button>
          )}
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

          {/* 친구 목록 탭  */}
          <button
            className={`menu-item ${
              selectedMenu === "friends" ? "active" : ""
            }`}
            onClick={() => setSelectedMenu("friends")}
          >
            <span className="menu-icon">👥</span>
            <span>친구 목록</span>
          </button>

          <button
            className={`menu-item ${selectedMenu === "movies" ? "active" : ""}`}
            onClick={() => setSelectedMenu("movies")}
          >
            <span className="menu-icon">🎬</span>
            <span>작성한 영화 기록</span>
          </button>

          <button
            className={`menu-item ${selectedMenu === "boards" ? "active" : ""}`}
            onClick={() => setSelectedMenu("boards")}
          >
            <span className="menu-icon">📝</span>
            <span>작성한 게시글</span>
          </button>

          <button
            className={`menu-item ${selectedMenu === "gallery" ? "active" : ""}`}
            onClick={() => setSelectedMenu("gallery")}
          >
            <span className="menu-icon">🖼️</span>
            <span>작성한 갤러리</span>
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
        {selectedMenu === "friends" && <FriendsSection />}
        {selectedMenu === "movies" && <MovieListSection />}
        {selectedMenu === "boards" && <BoardListSection />}
        {selectedMenu === "gallery" && <GalleryListSection />}
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
    <h2 className="mypage-title">회원정보 수정</h2>

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


// ========== 친구 목록 ==========
interface MemberVO {
  member_num: number;
  nickname: string;
  member_genre: string;
}

interface FriendRequestVO {
  id: number;             
  requester_id: string;  
  receiver_id: string;   
  status: string;  // pending, accept, reject     
  request_date: string;   
  nickname: string;     
  member_genre: string;  
}

const FriendsSection: React.FC = () => {
  const [requestFriends, setRequestFriends] = useState<FriendRequestVO[]>([]);
  const [myFriends, setMyFriends] = useState<MemberVO[]>([]);
  const [allMembersExceptMe, setAllMembersExceptMe] = useState<MemberVO[]>([]);

  React.useEffect(() => {
  axios
    .get(`${process.env.REACT_APP_BACK_END_URL}/api/friends/members`, { withCredentials: true }) // 세션 쿠키 포함
    .then(res => setAllMembersExceptMe(res.data))
    .catch(err => console.error("Members load error", err));

    axios
      .get(`${process.env.REACT_APP_BACK_END_URL}/api/friends/incoming`, { withCredentials: true })
      .then((res) => {
        console.log("친구 요청 데이터:", res.data);  
        setRequestFriends(res.data);
      })
      .catch((err) => console.error("Friend requests load error", err));

    axios
      .get(`${process.env.REACT_APP_BACK_END_URL}/api/friends/myfriends`, { withCredentials: true })
      .then((res) => {
        const sorted = res.data.sort((a: MemberVO, b: MemberVO) =>
          b.nickname.localeCompare(a.nickname)
        );
        setMyFriends(sorted);
      })
      .catch((err) => console.error("Friends load error", err));
  }, []);

  // 친구 추가 
  const sendFriendRequest = (receiverId:string) => {
  axios.post(
  `${process.env.REACT_APP_BACK_END_URL}/api/friends/request`,
      {receiver_id: receiverId },
      {withCredentials:true }
    )
    .then(() => {
      alert("친구 요청을 보냈습니다");
      // 목록에서 제거
      setAllMembersExceptMe(prev =>
            prev.filter(m => m.nickname !== receiverId)
          );
        })
        .catch(err =>console.error("Friend request error", err));
      };

  // 친구 요청 수락/거절
  const respondRequest = (id: number, action: "accept" | "reject") => {
    axios.post(
      `${process.env.REACT_APP_BACK_END_URL}/api/friends/respond`,
      { id, action },
      { withCredentials: true }
    )
    .then(() => {
        // alert 창으로 알림
        if (action === "accept") {
          alert("친구 요청을 수락했습니다.");
        } else {
          alert("친구 요청을 거절했습니다.");
        }

      // 성공 시 목록에서 제거
      setRequestFriends(prev => prev.filter(r => r.id !== id));

      // 수락할 경우
      if (action === "accept") {
        axios.get(
          `${process.env.REACT_APP_BACK_END_URL}/api/friends/myfriends`,
          { withCredentials: true }
        ).then(res => setMyFriends(res.data));
      }
    })
    .catch(err => console.error("Respond error", err));
  };


  return (
    <>
      <h2 className="mypage-title">친구 목록</h2>
      {/* 친구 추가 */}
      <div className="friends-card">
        <h3 className="friends-title">친구 신청</h3>
        <p className="friends-desc">아직 친구가 아닌 유저를 찾아 친구 신청할 수 있습니다.</p>

        <div className="friends-table-wrapper small">
          <table className="table mypage-table align-middle">
            <thead>
              <tr>
                <th style={{ width: "50px" }}>No</th>
                <th className="td-center">닉네임</th>
                <th style={{ width: "140px" }}>선호 장르</th>
                <th style={{ width: "140px" }}>관리</th>
              </tr>
            </thead>
            <tbody>
                    {allMembersExceptMe.map((f, idx) => (
                      <tr key={f.member_num}>
                        <td>{allMembersExceptMe.length - idx}</td>
                        <td>{f.nickname}</td>
                        <td>{f.member_genre}</td>
                        <td>
                          <button 
                            className="friend-btn"
                            onClick={() => sendFriendRequest(f.nickname)}
                          >친구 신청
                          </button>
                        </td>
                      </tr>
                    ))}
            </tbody>
          </table>
        </div>
      </div>


      {/* 친구 수락 */}
      <div className="friends-card">
        <h3 className="friends-title">친구 수락</h3>
        <p className="friends-desc">
          나에게 온 친구 신청을 확인하고 수락 또는 거절할 수 있습니다.
        </p>
        <div className="friends-table-wrapper small">
          <table className="table mypage-table align-middle">
            <thead>
              <tr>
                <th style={{ width: "50px" }}>No</th>
                <th className="td-center">닉네임</th>
                <th style={{ width: "140px" }}>선호 장르</th>
                <th style={{ width: "140px" }}>관리</th>
              </tr>
            </thead>
            <tbody>
              {requestFriends.map((f, idx) => (
                <tr key={f.id}>
                  <td>{requestFriends.length - idx}</td>
                  <td>{f.requester_id}</td>
                  <td>{f.member_genre}</td>
                  <td>
                    <button
                      className="friend-btn accept"
                      onClick={() => respondRequest(f.id, "accept")}>
                      수락
                    </button>

                    <button
                      className="friend-btn reject"
                      onClick={() => respondRequest(f.id, "reject")}>
                      거절
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      {/* 친구 목록 */}
      <div className="friends-card">
        <h3 className="friends-title">친구 목록</h3>
        <p className="friends-desc">
          내가 추가한 친구 목록입니다. 닉네임 기준 내림차순으로 정렬됩니다.
        </p>
        <div className="friends-table-wrapper large">
          <table className="table mypage-table align-middle">
            <thead>
              <tr>
                <th className="th-no">No</th>
                <th className="th-title">닉네임</th>
                <th className="th-status">선호 장르</th>
              </tr>
            </thead>
            <tbody>
              {myFriends.map((f, idx) => (
                <tr key={f.member_num}>
                  <td className="th-no">{myFriends.length - idx}</td>
                  <td className="th-title">{f.nickname}</td>
                  <td className="th-status">{f.member_genre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};



// ========== 작성한 영화 기록 ==========
interface MovieLogVO {
  num: number;
  title: string;
  poster: string;
  genre: string;
  simple_review: string;
  created_at: string;
}

const MovieListSection: React.FC = () => {
  const [movieLogs, setMovieLogs] = React.useState<MovieLogVO[]>([]);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACK_END_URL}/movie/mylist`, { withCredentials: true })
      .then((res) => {
        setMovieLogs(res.data.data);
      })
      .catch((err) =>
        console.error("MyPage movie list load error", err)
      );
  }, []);

  return (
    <>
      <h2 className="mypage-title">작성한 영화 기록</h2>
      <table className="table mypage-table align-middle">
        <colgroup><col style={{ width: "50px" }}/><col /><col /></colgroup>
        <thead>
          <tr>
            <th>No</th>
            <th>영화</th>
            <th>한줄평</th>
          </tr>
        </thead>

        <tbody>
          {movieLogs.map((log, idx) => (
            <tr key={log.num}>
              <td>{movieLogs.length - idx}</td>
              <td>
                <div className="mypage-movie-row">
                  <img
                    src={log.poster}
                    className="mypage-poster"
                    alt={log.title}/>

                  <div className="mypage-movie-info">
                    <div className="mypage-movie-title">
                      <Link to={`/movie/detail/${log.num}`}>
                        {log.title}
                      </Link>
                      <button className="badge-btn">
                        {log.genre}
                      </button>
                    </div>
                  </div>
                </div>

              </td>
              <td className="mypage-movie-desc">
                {log.simple_review}
              </td>
            </tr>
          ))}
          {movieLogs.length === 0 && (
            <tr>
              <td colSpan={2} className="text-center text-muted">
                작성된 영화 기록이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

// ========== 작성한 게시글 ==========
interface BoardVO {
  num: number;
  title: string;
  bnickname: string;
  content: string;
  hit: number;
  reip: string;
  bdate: string;
}


const BoardListSection: React.FC = () => {
  const [boardList, setBoardList] = React.useState<BoardVO[]>([]);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACK_END_URL}/board/mylist`, {
        withCredentials: true, 
      })
      .then((res) => {
        setBoardList(res.data); 
      })
      .catch((err) => {
        console.error("MyPage board list load error", err);
      });
  }, []);


  return(
  <>
    <h2 className="mypage-title">작성한 게시글</h2>
    <table className="table mypage-table align-middle">
      <colgroup><col style={{ width: "70px" }}/><col /><col style={{ width: "200px" }}/></colgroup>

      <thead>
        <tr>
          <th>No</th>
          <th>제목</th>
          <th>날짜</th>
        </tr>
      </thead>

      <tbody>
        {boardList.length === 0 ? (
          <tr>
            <td colSpan={3} style={{ textAlign: "center", padding: "20px" }}>
              작성한 게시글이 없습니다.
            </td>
          </tr>
        ) : (
          boardList.map((board, idx) => (
            <tr key={board.num}>
              <td>{boardList.length - idx}</td>
              <td>
                <Link to={`/board/detail/${board.num}`}>
                  {board.title}
                </Link>
              </td>
              <td>{board.bdate}</td>
            </tr>
          ))
        )}
      </tbody>


    </table>
  </>
);
};

// ========== 작성한 갤러리 ==========
const GalleryListSection: React.FC = () => (
  <>
    <h2 className="mypage-title">작성한 갤러리</h2>
    <table className="table mypage-table align-middle">
      <colgroup>
        <col style={{ width: "30px" }} /> {/* No */}
        <col />  {/* 게시글 */}
      </colgroup>

      <thead>
        <tr>
          <th>No</th>
          <th>게시글</th>
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
                시즌1보다 아쉽지만 그래도 재밌었어요
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </>
);

// ========== 관리자 문의 ==========
const InquirySection: React.FC = () => (
  <>
    <div className="mypage-main-header">
      <h2 className="mypage-title">관리자 문의</h2>

      {/* 글쓰기 버튼 */}
      <Link to="/mypage/toadminform">
        <button className="mypage-write-btn">글쓰기</button>
      </Link>
    </div>

    <table className="table mypage-table align-middle">
      <colgroup>
        <col style={{ width: "50px" }} /> {/* No */}
        <col style={{ width: "150px" }} />  {/* 제목 */}
        <col />  {/* 상태 */}
        <col />  {/* 등록일 */}
      </colgroup>

      <thead>
        <tr>
          <th className="th-no">No</th>
          <th className="th-title">제목</th>
          <th className="th-status">상태</th>
          <th className="th-date">등록일</th>
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

// ========== 장르 통계 ==========
type GenreStats = {
  [key: string]: number;
};

const genreClassMap: { [key: string]: string } = {
  "액션": "action",
  "코미디": "comedy",
  "로맨스": "romance",
  "공포/스릴러": "thriller",
  "SF/판타지": "sf",
  "애니메이션": "animation",
};

const StatsSection: React.FC = () => {
  const [genreStats, setGenreStats] = useState<GenreStats>({});

  useEffect(() => {
    axios
      .get("http://192.168.0.40/movie/movie/genre-stats", {
        withCredentials: true,
      })
      .then((res) => {
        setGenreStats(res.data);
      })
      .catch((err) => {
        console.error("장르 통계 조회 실패", err);
      });
  }, []);

  // 최대값 기준으로 막대 높이 계산
  const values = Object.values(genreStats);
  const maxValue = values.length > 0 ? Math.max(...values) : 0;

  const getHeight = (value: number) => {
    if (maxValue === 0) return 0;
    // 최소 높이 8px 보장 (값이 작아도 보이게)
    return Math.max((value / maxValue) * 180, 8);
  };

  return (
    <>
      <h2 className="mypage-title">영화 장르 통계</h2>
      <div className="stats-card">
        <div className="stats-chart">
          {Object.entries(genreStats).map(([genre, value]) => (
            <div className="stats-bar" key={genre}>
              <div
                className={`stats-bar-inner ${genreClassMap[genre] || ""}`}
                style={{ height: `${getHeight(value)}px` }}
                data-value={value}
              />
              <span className="stats-label">{genre}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
