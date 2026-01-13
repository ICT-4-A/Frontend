import React, { useEffect, useState } from 'react'
import { useAuth } from '../../components/AuthProvider';
import axios from 'axios';
import "./MovieDetail.css";

interface MovieCommProps {
  comment_num?: string;
}

interface MovieCommVO {
  comment_num: number;
  movie_form_num: number;
  content: string;
  commdate: string;
  writer: string;
}

const MovieComm: React.FC<MovieCommProps> = ({ comment_num }) => {
  const { member } = useAuth();
  const [comments, setComments] = useState<MovieCommVO[]>([]);
  const [content, setContent] = useState("");

  const getComments = async () => {
    try {
      const url = `${process.env.REACT_APP_BACK_END_URL}/movie/mcommList?num=${comment_num}`;
      const response = await axios.get<MovieCommVO[]>(url);
      setComments(response.data);
    } catch (error) {
      console.error("데이터 로딩 실패", error);
    }
  };

  useEffect(() => {
    getComments();
  }, [comment_num]);

  const commentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) return;

    const commentData = {
      movie_form_num: comment_num,
      writer: member?.nickname,
      content: content
    };

    try {
      await axios.post(
        `${process.env.REACT_APP_BACK_END_URL}/movie/mcommAdd`,
        commentData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      setContent("");
      getComments();
    } catch (error) {
      console.log("전송 실패", error);
    }
  };

  return (
    <div className="movieComm-wrapper">
      <h4 className="movieComm-title">Comments</h4>

      <form className="movieComm-form" onSubmit={commentSubmit}>
        <textarea
          className="movieComm-textarea"
          placeholder="댓글을 남겨보세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="movieComm-btnWrap">
          <button className="movieComm-submitBtn" type="submit">
            댓글 등록
          </button>
        </div>
      </form>

      <ul className="movieComm-list">
        {comments.map((vo) => (
          <li className="movieComm-item" key={vo.comment_num}>
            <div className="movieComm-header">
              <strong className="movieComm-writer">{vo.writer}</strong>
              <span className="movieComm-date">{vo.commdate}</span>
            </div>
            <p className="movieComm-content">{vo.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieComm;
