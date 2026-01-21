import React, { useEffect, useState } from 'react'
import HTMLFlipBook from 'react-pageflip'
import { useAuth } from '../../components/AuthProvider'
import axios from 'axios'
import './Diary.css'

interface MovieLogVO {
  num: number;
  title: string;
  poster: string;
  genre: string;

  writer_num: number;
  writer_name: string;

  toge_writer_num?: number;
  toge_writer_name?: string;

  simple_review: string;
  review: string;
  rate: number;
  hit: number;
  created_at: string;
}

const Diary: React.FC = () => {
  const { member } = useAuth()
  const [movieLogs, setMovieLogs] = useState<MovieLogVO[]>([])

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
    <div className="diary-wrapper">
      <div className="diary-title">
        <span className="dot" />
        <h2>My Diary</h2>
        <p>{member?.nickname}’s private archive</p>
      </div>

      <div className="book-container">
        <HTMLFlipBook
          {...({
            width: 450,
            height: 600,
            showCover: true,
            maxShadowOpacity: 0.15
          } as any)}
        >
          {/* 표지 */}
          <div className="cover-page">
            <div className="cover-inner">
              <h1>Movie</h1>
              <p className="sub">Review diary</p>
              <span className="line" />
              <p className="owner">{member?.nickname}</p>
            </div>
          </div>

          {/* 페이지 */}
          {movieLogs.map((log, idx) => (
            <div className="diary-page" key={idx}>
              {/* 상단: 포스터 + 제목/작성자 */}
              <div className="top-area">
                <div className="poster-area">
                  <img src={log.poster} alt={log.title} />
                </div>

                <div className="meta-area">
                  <h3>{log.title}</h3>

                  <div className="genre-tags">
                    {log.genre?.split('/').map(g => (
                      <span key={g} className="genre-tag">{g}</span>
                    ))}
                  </div>

                  {log.rate != null && (
                    <div className="rating">
                      {'★'.repeat(log.rate)}
                      {'☆'.repeat(5 - log.rate)}
                    </div>
                  )}
                  <span className="writer">
                    {log.writer_name}
                    <div>
                    {log.toge_writer_num && (
                      <span className="together"> 👤➕{log.toge_writer_name}</span>
                    )}
                    </div>
                  </span>
                </div>
              </div>

              {/* 하단: 리뷰 */}
              <div className="bottom-area">
                <p className="simple">{log.title || '—'}</p>
                <div className="review">{log.review}</div>
              </div>
            </div>
          ))}
        </HTMLFlipBook>
      </div>
    </div>
  )
}

export default Diary