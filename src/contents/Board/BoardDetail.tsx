import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import "../Board/BoardDetail.css"
import BoardComm from './BoardComm';

interface BoardVO {
    num: number;
    title: string;
    nickname: string;
    content: string;
    hit: number;
    bdate: string;
}

const BoardDetail: React.FC = () => {
    const [board, setBoard] = useState<BoardVO | null>(null);
    const { num } = useParams<{ num: string }>();
    console.log(`num => ${num}`);

    useEffect(() => {
        const detailServer = async () => {
            const url = `${process.env.REACT_APP_BACK_END_URL}/board/detail?num=${num}`;
            const resp = await axios.get(url);
            console.log(resp.data);
            setBoard(resp.data);
        }
        detailServer();
    },[num]);
    return (
        <div className="detail-wrapper">
            <h2 className="board-title">상세보기</h2>
            <table>
                <tbody>
                    <tr>
                    <th className="detail-label">번호</th>
                    <td>
                        {board?.num}
                    </td>
                    </tr>
                    <tr>
                        <th className="detail-label">제목</th>
                        <td>
                            {board?.title}
                        </td>
                    </tr>
                    <tr>
                        <th className="detail-label">작성자</th>
                        <td>
                            {board?.nickname}
                        </td>
                    </tr>
                    <tr>
                        <th className="detail-label">날짜</th>
                        <td>
                            {board?.bdate}
                        </td>
                    </tr>
                    <tr>
                        <th className="detail-label">내용</th>
                        <td>
                            {board?.content}
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={2} style={{textAlign:'center'}}>
                            {/* <button className='button1'>삭제</button>&nbsp; */}
                            <Link className='button2' to="/board/list">목록</Link>
                        </td>
                    </tr>
                </tfoot>
            </table>
            <hr/>
            <BoardComm num={num}/>
        </div>
    )
}

export default BoardDetail