// src/contents/Movie/MovieForm.tsx
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

interface MovieFormVO {
  num: number;
  movie_id: number;
  writer: number;
  toge_writer: number;
  simple_review: string;
  review: string,
  rate: number;
  hit: number;
}

const MovieForm: React.FC = () => {
  const { num } = useParams<{ num: string }>();
  const location = useLocation();
  const state = location.state as { movie: MovieVO } | null;
  const navigate = useNavigate();

  // TODO: 실제 로그인 유저 / 친구 목록은 props나 API로 대체
  const currentUser = { writer: 3, nickname: "사용자" };
  const friends = [
    { toge_writer: 4, nickname: "성우" },

  ];


  // 기본 폼 값 입력, 전 페이지에서 넘어오는 영화 id 값 넣어주기
  const [formData, setFormData] = useState<MovieFormVO>({
    num: 0,
    movie_id: state?.movie?.num || parseInt(num || '0'),
    writer: currentUser.writer, // 추후에 로그인 하면 그 때 마다 바꾸게 설정
    toge_writer: 4,
    simple_review: '',
    review: '',
    rate: 0,
    hit: 0
  });


  const [selectedFriendId, setSelectedFriendId] = useState<number>(0); // 0 이면 친구 미선택
  const [starRating, setStarRating] = useState<number>(0); // 별점 상태 추가
  const [isSubmitting, setIsSubmitting] = useState(false); // false면 버튼 활성화, true면 비활성화

  //movie_id 자동 설정 해주기
  useEffect(() => {
    if (state?.movie?.num) {
      setFormData(prev => ({ ...prev, movie_id: state.movie.num }));
    }
  }, [state?.movie?.num]);

  // 별점 변경하기 ( 0~5 소수점 1자리)
  const handleStarRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 정규식 이용하기
    const inputValue = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
    const numValue = parseFloat(inputValue) || 0;
    const clampedValue = Math.max(0, Math.min(5, numValue));
    setStarRating(clampedValue);
    setFormData(prev => ({ ...prev, rate: clampedValue }));
  };

  // 한줄평 변경
  const handleSimpleReviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, simple_review: e.target.value }));
  };

  // 감상평 변경
  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, review: e.target.value }));
  };

  // 친구 선택 변경
  const handleFriendChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const friendId = e.target.value === "" ? 0 : Number(e.target.value);
    setSelectedFriendId(friendId);
    setFormData(prev => ({ ...prev, toge_writer: friendId }));
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

  // handleSubmit에서 별점 포함
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log('전송 데이터 :', formData);
      const response = await axios.post(`${process.env.REACT_APP_BACK_END_URL}/movie/movieformadd`,
        formData,
        {
          
          headers: { 'Content-Type': 'application/json' }
        }
      );
      console.log('업로드 성공', response.data)
      alert('영화 기록이 등록되었습니다.')
      navigate('/movielog')
    } catch (error) {
      console.log('업로드 실패 :', error);
    } finally {
      setIsSubmitting(false);
    }
  };




  return (
    <div className="movieform-wrapper">
      <h2 className="movieform-step-title">영화 기록 - 게시글 작성 2단계</h2>

      <form className="movieform-card" onSubmit={handleSubmit}>

        {/* 선택된 영화 정보 표시 */}
        {state?.movie && (
          <div className="movieform-movie-info">
            <h3>{state.movie.title}</h3>
            <p>{state.movie.actor} | {state.movie.genre}</p>
          </div>
        )}

        {/* 작성자 영역 */}
        <div className="movieform-field movieform-writer-row">
          <label className="movieform-label">작성자</label>
          <div className="movieform-writer-area">
            <div className="movieform-writer">
              <div className="movieform-writer-avatar">A</div>
              <span className="movieform-writer-name">{currentUser.nickname}</span>
            </div>
            <div className="movieform-coWriter">
              <span className="writer-plus">,</span>
              <select
                className="writer-select"
                value={selectedFriendId}
                onChange={handleFriendChange}
              >
                {/* 임의 숫자 값을 입력해준다. 추후에 친구 기능과 합치기 */}
                <option value={41}>추가 작성자</option> 
                {friends.map((friend) => (
                  <option key={friend.toge_writer} value={friend.toge_writer}>
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
            placeholder="감상평을 입력하세요"
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
              placeholder="0.0"
            />
          </div>
        </div>


        {/* 업로드 버튼 */}
        <div className="movieform-footer">
          <button
            type="submit"
            className="movieform-submit-btn"
            disabled={isSubmitting}
            >
            업로드
          </button>

        </div>
      </form>
    </div>
  );
};

export default MovieForm;
