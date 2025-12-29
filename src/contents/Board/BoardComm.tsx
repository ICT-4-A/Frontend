import axios from 'axios';
import React, { useEffect, useState } from 'react'
import style from './board.module.css'

interface BoardCommProps {
  num?: string;
}
interface BoardCommVO{
    num: number;
    ucode: number;
    unickname: string;
    ucontent: string;
    reip: string;
    uregdate: string;
}

const BoardComm: React.FC<BoardCommProps> = ({num}) => {
    const [comments, setComments] = useState<BoardCommVO[]>([]);
    const getComments = async () => {
        try{
            const url =`${process.env.REACT_APP_BACK_END_URL}/board/commList?num=${num}`;
            const response = await axios.get<BoardCommVO[]>(url);
            console.log("==============");
            console.log(response.data);
            setComments(response.data);
        }catch (error){
            console.error("데이터 로딩 실패", error);
        }
    }
    useEffect(() => {
        console.log("Num => " + num);
        getComments();
    },[num]);
    const [nickname, setNickname] = useState("");
    const [content, setContent] = useState("");
    const commentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(`Nickname => ${nickname}`);
        console.log(`Content ${content}`);

        const commentData = {
            ucode: Number(num),
            unickname: nickname,
            ucontent: content,
            reip: '192.168.0.21'
        };
        try {
            await axios.post(`${process.env.REACT_APP_BACK_END_URL}/board/commAdd`, commentData,
                {headers: {'Content-Type': 'application/json'}}
            )
            setNickname("");
            setContent("");
            getComments();
        } catch (error) {
            console.log("전송 실패", error);
        }
    }
  return (
    <div className={style.commWrapper}>
  <h4 className={style.commTitle}>Comments</h4>
  <form className={style.commForm} onSubmit={commentSubmit}>
    <input
      type="text"
      placeholder="작성자"
      className={style.commInput}
      value={nickname}
      onChange={(e) => setNickname(e.target.value)}
    />
    <textarea
      placeholder="댓글을 남겨보세요."
      className={style.commTextarea}
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />
    <div className="text-center">
      <button type="submit" className={style.commButton}>
        댓글 등록
      </button>
    </div>
  </form>
  <ul className={style.commList}>
    {comments.map((vo) => (
      <li key={vo.num} className={style.commListItem}>
        <strong>{vo.unickname}</strong>
        <span>{vo.uregdate}</span>
        <p>{vo.ucontent}</p>
      </li>
    ))}
  </ul>
</div>

  )
}

export default BoardComm