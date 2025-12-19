// src/contents/Movie/MovieForm.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MovieForm.css";

const MovieForm: React.FC = () => {
  const navigate = useNavigate();
  // TODO: 실제 로그인 유저 / 친구 목록은 props나 API로 대체
  const currentUser = { nickname: "사용자1" };
  const friends = [
    { id: 0, nickname: "개인" },
    { id: 1, nickname: "영화덕후99" },
    { id: 2, nickname: "애니좋아" },
    { id: 3, nickname: "스릴러매니아" },
  ];

  const [selectedFriendId, setSelectedFriendId] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedFriend =
      selectedFriendId === ""
        ? null
        : friends.find((f) => f.id === selectedFriendId);

    // 업로드 시 함께 작성자 정보 사용 예시
    const payload = {
      writer: currentUser.nickname,
      coWriter: selectedFriend ? selectedFriend.nickname : null,
      // 한줄평/감상평/별점 값은 추후 상태로 관리해서 같이 보냄
    };

    console.log("submit payload", payload);
    // 업로드 처리 로직 추가 예정

  };

  return (
    <div className="movieform-wrapper">
      <h2 className="movieform-step-title">영화 기록 - 게시글 작성 2단계</h2>

      <form className="movieform-card" onSubmit={handleSubmit}>
        {/* 작성자 영역 */}
        <div className="movieform-field movieform-writer-row">
          <label className="movieform-label">작성자</label>
          <div className="movieform-writer-area">
            {/* 기본: 로그인 사용자 */}
            <div className="movieform-writer">
              <div className="movieform-writer-avatar">A</div>
              <span className="movieform-writer-name">
                {currentUser.nickname}
              </span>
            </div>

            {/* 친구 선택 드롭다운 */}
            <div className="movieform-coWriter">
              <span className="writer-plus">,</span>
              <select
                className="writer-select"
                value={selectedFriendId}
                onChange={(e) =>
                  setSelectedFriendId(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
              >
                <option value="">추가 작성자</option>
                {friends.map((friend) => (
                  <option key={friend.id} value={friend.id}>
                    {friend.nickname}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 한 줄 평 */}
        <div className="movieform-field">
          <label className="movieform-label">한 줄 평</label>
          <input
            type="text"
            className="movieform-input"
            placeholder="한 줄 평을 입력하세요"
          />
        </div>

        {/* 감상평 */}
        <div className="movieform-field">
          <label className="movieform-label">감상평</label>
          <textarea
            className="movieform-textarea"
            placeholder="감상평을 입력하세요"
          />
        </div>

        {/* 별점 */}
        <div className="movieform-field">
          <label className="movieform-label">별점</label>
          <div className="movieform-stars">
            <span className="star active">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
          </div>
        </div>

        {/* 업로드 버튼 */}
        <div className="movieform-footer">
         <button
            type="button"
            className="movieform-submit-btn"
            onClick={() => navigate("/movielog")}>
            업로드
          </button>

        </div>
      </form>
    </div>
  );
};

export default MovieForm;
