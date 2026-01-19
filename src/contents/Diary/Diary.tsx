import React, { useEffect, useState } from 'react'
import HTMLFlipBook from 'react-pageflip'
import { useAuth } from '../../components/AuthProvider'
import axios from 'axios'
import './Diary.css'

interface DiaryVO {
  num: number
  movieId: number
  writer: number
  togeWriter: number
  simpleReview: string
  review: string
  title: string
  poster: string
  writerName: string
  togeWriterName: string
  rate: number;
  genre: string;
}

const Diary: React.FC = () => {
  const { member } = useAuth()
  const [myData, setMyData] = useState<DiaryVO[]>([])

  useEffect(() => {
    if (!member || member.num == null) return

    axios
      .get(`${process.env.REACT_APP_BACK_END_URL}/api/diary/my`, {
        params: { memberNum: member.num },
        withCredentials: true
      })
      .then(res => setMyData(res.data))
      .catch(err => console.error('Diary 불러오기 실패', err))
  }, [member])

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
          {myData.map((entry, index) => (
            <div className="diary-page" key={index}>
              {/* 상단: 포스터 + 제목/작성자 */}
              <div className="top-area">
                <div className="poster-area">
                  <img src={entry.poster} alt={entry.title} />
                </div>

                <div className="meta-area">
                  <h3>{entry.title}</h3>

                  <div className="genre-tags">
                    {entry.genre?.split('/').map(g => (
                      <span key={g} className="genre-tag">{g}</span>
                    ))}
                  </div>

                  {entry.rate != null && (
                    <div className="rating">
                      {'★'.repeat(entry.rate)}
                      {'☆'.repeat(5 - entry.rate)}
                    </div>
                  )}
                  <span className="writer">
                    {entry.writerName}
                    <div>
                    {entry.togeWriterName && (
                      <span className="together"> 👤➕{entry.togeWriterName}</span>
                    )}
                    </div>
                  </span>
                </div>
              </div>

              {/* 하단: 리뷰 */}
              <div className="bottom-area">
                <p className="simple">{entry.simpleReview || '—'}</p>
                <div className="review">{entry.review}</div>
              </div>
            </div>
          ))}
        </HTMLFlipBook>
      </div>
    </div>
  )
}

export default Diary
