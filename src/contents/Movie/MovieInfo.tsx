import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MovieInfo.css";
import { Link } from "react-router-dom";

interface MovieVO {
  num: number;
  title: string;
  year?: number;
  genre: string;
  release_date: string;
  director: string;
  actor: string;
  poster: string;
  avg_rating?: number;
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
  created_at?: string;
  updated_at?: string;
}

const MovieInfo: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<MovieVO | null>(null);
  const [reviews, setReviews] = useState<MovieFormVO[]>([]);
  const [loading, setLoading] = useState(true);
  const [avgRate, setAvgRate] = useState<number | null>(null);


  useEffect(() => {
    const fetchMovie = async () => {
      if (!movieId) return;

      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACK_END_URL}/movie/movieInfo`,
          { params: { num: movieId }, withCredentials: true }
        );
        setMovie(res.data);


      } catch (e: any) {
        console.error("영화 상세 조회 실패", e.response?.status, e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  // 영화 기록 가져오기
  useEffect(() => {
    if (!movieId) return;

    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACK_END_URL}/movie/movieFormsByMovie`,
          { params: { num: movieId }, withCredentials: true }
        );
        console.log("리뷰 응답:", res.data.forms);
        const fetchedReviews: MovieFormVO[] = res.data.forms || [];
        setReviews(fetchedReviews);

        // ★ 추가: 평균 평점 계산
        if (fetchedReviews.length > 0) {
          const sum = fetchedReviews.reduce((acc, cur) => acc + cur.rate, 0);
          setAvgRate(parseFloat((sum / fetchedReviews.length).toFixed(1)));
        } else {
          setAvgRate(null);
        }
      } catch (err) {
        console.error("리뷰 불러오기 실패", err);
        setAvgRate(null);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (loading) return <div className="movieinfo-wrapper">로딩중...</div>;
  if (!movie) return <div className="movieinfo-wrapper">영화를 찾을 수 없습니다.</div>;

  return (
    <div className="movieinfo-wrapper">
      {/* 영화 정보 카드 */}
      <div className="movieinfo-card">
        <div className="movieinfo-top">
          <div className="movieinfo-poster-box">
            <img src={movie.poster} alt={movie.title} className="movieinfo-poster" />
          </div>
          <div className="movieinfo-main">
            <div className="movieinfo-title-row">
              <h2 className="movieinfo-title">{movie.title}</h2>
              <span className="movieinfo-year">{movie.release_date?.substring(0, 4)}</span>
            </div>
            <button className="badge movieinfo-genre-badge">{movie.genre}</button>
            <div className="movieinfo-meta">
              <div>개봉: {movie.release_date?.substring(0, 4)}</div>
              <div>감독: {movie.director}</div>
              <div>배우: {movie.actor}</div>
              <div>
                평점: ★ {movie.avg_rating?.toFixed(2) ?? avgRate ?? "-"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 영화 기록(한줄평/리뷰) */}
      <div className="movieinfo-bottom">
        <h3 className="movieinfo-subtitle">한줄평 / 리뷰</h3>
        {reviews.length > 0 ? (

          <div className="movieinfo-review-list">
            {reviews.map((r) => (
              <div className="movieinfo-review-card" key={r.num}>
                <Link to={`/movie/detail/${r.num}`}>
                  <div className="review-header">
                    <div className="review-avatar">{r.writer.charAt(0)}</div>
                    <div className="review-name">{r.writer}</div>
                    <div className="review-rate">★ {r.rate}</div>
                  </div>
                  <p className="review-text">{r.simple_review || r.review}</p>
                  <div className="review-date">
                    {r.created_at?.substring(0, 10)}
                  </div>
                </Link>
              </div>

            ))}
          </div>
        ) : (
          <div className="no-review">등록된 리뷰가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default MovieInfo;
