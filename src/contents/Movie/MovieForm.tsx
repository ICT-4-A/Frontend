import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./MovieForm.css";
import axios from "axios";

interface MovieVO {
  num: number;
  title: string;
  director: string;
  actor: string;
  genre: string;
  poster: string;
  release_date: string;
}

interface MemberVO {
  member_num: number;
  nickname: string;
  member_genre: string;
}

interface MovieFormVO {
  num: number;
  movie_id: number;
  writer: string;
  toge_writer: string | null;
  simple_review: string;
  review: string;
  rate: number;
  hit: number;
}

const MovieForm: React.FC = () => {
  const { num } = useParams<{ num: string }>();
  const location = useLocation();
  const state = location.state as { movie: MovieVO } | null;
  const navigate = useNavigate();

 
  const [currentUser, setCurrentUser] = useState<{ nickname: string } | null>(null); // 로그인 유저
  const [friends, setFriends] = useState<MemberVO[]>([]); // 친구 목록
  const [selectedFriend, setSelectedFriend] = useState<string>(""); // 선택된 친구
  const [starRating, setStarRating] = useState<number>(0); // 별점
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<MovieFormVO>({ // 폼 데이터
    num: 0,
    movie_id: state?.movie?.num || parseInt(num || "0"),
    writer: "", // 전송 시 currentUser.nickname으로 설정
    toge_writer: null,
    simple_review: "",
    review: "",
    rate: 0,
    hit: 0
  });

  // 로그인 유저 정보 
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACK_END_URL}/movie/me`, { withCredentials: true })
      .then(res => setCurrentUser(res.data))
      .catch(err => console.error("로그인 유저 정보 불러오기 실패:", err));
  }, []);

  // 친구 목록 불러오기 
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACK_END_URL}/api/friends/myfriends`, { withCredentials: true })
      .then(res => setFriends(res.data))
      .catch(err => console.error("friends load error", err));
  }, []);

  useEffect(() => {
    if (state?.movie?.num) {
      setFormData(prev => ({ ...prev, movie_id: state.movie.num }));
    }
  }, [state?.movie?.num]);

  // 별점 변경 
  const handleStarRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1");
    const numValue = parseFloat(inputValue) || 0;
    const clampedValue = Math.max(0, Math.min(5, numValue));

    setStarRating(clampedValue);
    setFormData(prev => ({ ...prev, rate: clampedValue }));
  };

  // 한 줄 평 
  const handleSimpleReviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, simple_review: e.target.value }));
  };

  // 감상평 
  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, review: e.target.value }));
  };

  // 공동 작업자(친구) 선택 
  const handleFriendChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nickname = e.target.value || null;
    setSelectedFriend(e.target.value);
    setFormData(prev => ({ ...prev, toge_writer: nickname })); // null 가능
  };

  // 별점 시각화 
  const renderStars = () => {
    const fullStars = Math.floor(starRating);
    const hasHalfStar = starRating % 1 !== 0;

    return Array.from({ length: 5 }, (_, i) => {
      if (i < fullStars) return <span key={i} className="star full">★</span>;
      if (i === fullStars && hasHalfStar) return <span key={i} className="star half">★</span>;
      return <span key={i} className="star empty">☆</span>;
    });
  };

  // 영화 기록 제출 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!currentUser?.nickname) {
      alert("로그인 유저 정보가 없습니다.");
      setIsSubmitting(false);
      return;
    }

    const updatedFormData = { ...formData, writer: currentUser.nickname }; 
    try {
      console.log("전송 데이터:", updatedFormData);
      await axios.post(
        `${process.env.REACT_APP_BACK_END_URL}/movie/movieformadd`,
        updatedFormData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" }
        }
      );

      alert("영화 기록이 등록되었습니다.");
      navigate("/movielog");
    } catch (error) {
      console.error("업로드 실패:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="movieform-wrapper">
      <h2 className="movieform-step-title">영화 기록 - 게시글 작성 2단계</h2>

      <form className="movieform-card" onSubmit={handleSubmit}>
        {state?.movie && (
          <div className="movieform-movie-info">
            <h3>{state.movie.title}</h3>
            <p>{state.movie.actor} | {state.movie.genre}</p>
          </div>
        )}

        {/* 작성자 */}
        <div className="movieform-field movieform-writer-row">
          <label className="movieform-label">작성자</label>
          <div className="movieform-writer-area">
            <div className="movieform-writer">
              <div className="movieform-writer-avatar">A</div>
              <span className="movieform-writer-name">
                {currentUser?.nickname}
                {formData.toge_writer ? `, ${formData.toge_writer}` : ""}
              </span>
            </div>

            <div className="movieform-coWriter">
              <select className="writer-select" value={selectedFriend} onChange={handleFriendChange}>
                <option value="">공동 작업자 선택</option>
                {friends.map(friend => (
                  <option key={friend.member_num} value={friend.nickname}>
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
            value={formData.simple_review}
            onChange={handleSimpleReviewChange}
            maxLength={100}
          />
        </div>

        {/* 감상평 */}
        <div className="movieform-field">
          <label className="movieform-label">감상평</label>
          <textarea
            className="movieform-textarea"
            value={formData.review}
            onChange={handleReviewChange}
            rows={5}
            maxLength={1000}
          />
        </div>

        {/* 별점 */}
        <div className="movieform-field">
          <label className="movieform-label">별점</label>
          <div className="movieform-stars-input">
            <div className="stars-visual">
              {renderStars()}
              <span className="rating-text">{starRating.toFixed(1)} / 5.0</span>
            </div>
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={starRating}
              onChange={handleStarRatingChange}
              className="star-input"
            />
          </div>
        </div>

        <div className="movieform-footer">
          <button type="submit" className="movieform-submit-btn" disabled={isSubmitting}>
            업로드
          </button>
        </div>
      </form>
    </div>
  );
};

export default MovieForm;
