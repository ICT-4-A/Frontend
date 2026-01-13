import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import "./MovieDetail.css";
import MovieComm from './MovieComm';

interface MovieDetailVO{
    num: number;
    title: string;
    poster: string;
    genre: string;

    writer_num: number;
    writer_name: string;
    toge_writer_name: string;

    simple_review: string;
    review: string;
    rate: number;
    hit: number;
    created_at: string;
    
}



const MovieDetail: React.FC = () => {
  const {num} = useParams<{num: string}>();
  console.log(`num => ${num}`);
  const [movie, setMovie] = useState<MovieDetailVO | null>(null);
  const [loading, setLoaing] = useState(true);


  useEffect(() => {
    const detailServer = async () => {
      try{
      const url = `${process.env.REACT_APP_BACK_END_URL}/movie/detail?num=${num}`;
      const resp = await axios.get(url);

      console.log("detail response: ", resp.data);
      console.log(resp.data);
      setMovie(resp.data);
    }catch(err){
      console.error("Movie detail load error", err);
    }finally{
      setLoaing(false);
    }
  };
  detailServer();
  },[num]);

  if (loading) return <div>로딩중</div>
  if (!movie) return <div>데이터가 없습니다.</div>
  return (
    <div className='movieDetail-wrapper'>
      {/* 상단 영역 */}
     <section className='movieDetail-header'>
  <img
    src={movie.poster}
    alt={movie.title}
    className='movieDetail-poster'
  />

  <div className='movieDetail-info'>
    <h2>{movie.title}</h2>

    <div className='movieDetail-genre'>{movie.genre}</div>

    <div className='movieDetail-writer'>
      <span>작성자: {movie.writer_name}</span>
      {movie.toge_writer_name && (
        <span> / 공동 작성자: {movie.toge_writer_name}</span>
      )}
    </div>

    <div className='movieDetail-rate'>★ {movie.rate}</div>

    <div className='movieDetail-simpleReview'>
      <h4>한줄평</h4>
      <p>{movie.simple_review}</p>
    </div>

    <div className='movieDetail-review'>
      <h4>리뷰</h4>
      <p>{movie.review}</p>
    </div>
  </div>
</section>
        <hr />
        <MovieComm comment_num={num}/>
    </div>
  );
};

export default MovieDetail