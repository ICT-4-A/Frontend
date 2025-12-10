// src/components/Board.tsx
import React from "react";
import "../Board/Board.css";
import { Link } from "react-router-dom";

const Board = () => {
  return (
    <div>
        <h3>게시판</h3>

        <table className="table table-striped board-table">

            <thead>
                <tr>
                <th scope="col">No</th>
                <th scope="col">제목</th>
                <th scope="col">닉네임</th>
                <th scope="col">날짜</th>
                <th scope="col">댓글</th>
                </tr>
            </thead>  

            <tbody>
                <tr><td>Hi</td></tr>
                <tr><td>Hi</td></tr>
                <tr>
                    <th scope="row">1</th>
                    <td><Link to="/board/detail">주말에 보기 좋은 영화 추천 부탁드려요</Link></td>
                    <td>test1</td>
                    <td>2025-10-18</td>
                    <td>2</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>무서운 영화 추천해주세요</td>
                    <td>test2</td>
                    <td>2025-10-20</td>
                    <td>3</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>요즘 영화 재밌는 게 없어요</td>
                    <td>test3</td>
                    <td>2025-09-18</td>
                    <td>1</td>
                </tr>
            </tbody>  
        </table>
    </div>
  );
};

export default Board;
