import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './board.module.css';

interface BoardVO {
    num: number;
    title: string;
    nickname: string;
    content: string;
    hit: number;
    reip: string;
    bdate: string;
}

const BoardList: React.FC = () => {
    const [boardList, setBoardList] = useState<BoardVO[]>([]);
    const [totalItems, setTotalitems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [startPage, setStartPage] = useState(1);
    const [endPage, setEndPage] = useState(1);
    const [searchType, setSearchType] = useState('1');
    const [searchValue, setSearchValue] = useState('');

    const pagePerBlock = 5;

    const fetchBoardList = async (page: number) => {
        try {
            const urls = `${process.env.REACT_APP_BACK_END_URL}/board/list`;
            const response = await axios.get(urls, {
                params: { 
                    cPage: page,
                    searchType: searchType,
                    searchValue: searchValue 
                }
            });
            let list: BoardVO[] = response.data.data;
            list.sort((a,b) => b.hit - a.hit);
            const hotNums = list.slice(0, 3).map(item => item.num);

            console.log(response.data.data);
            setBoardList(response.data.data);
            setTotalitems(response.data.totalItems);
            setTotalPages(response.data.totalPages);
            setCurrentPage(response.data.currentPage);
            setStartPage(response.data.startPage);
            setEndPage(response.data.endPage);
        } catch (error) {
            console.error("데이터 가져오기 실패: ", error);
        }
    };

    useEffect(() => {
        fetchBoardList(currentPage);
    }, [currentPage]);

    const pageChange = (page: number) => {
        setCurrentPage(page);
    };

    const searchFunction = () => {
        fetchBoardList(1);
    };

    return (
        <div>
            <div className={style.header}>
                <h2>게시판</h2>
                <div className={style.searchBox}>
                    <select onChange={(e) => setSearchType(e.target.value)}>
                        <option value="1">작성자</option>
                        <option value="2">제목</option>
                        <option value="3">내용</option>
                    </select>
                    <input type="text" onChange={(e) => setSearchValue(e.target.value)} />
                    <button className={style.searchButton} onClick={searchFunction}>검색</button>
                </div>
            </div>

            <table className={style.boardTable}>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>조회수</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {boardList.map((item, index) => (
                        <tr key={item.num} className={index < 3 ? style.hotPost : ''}>
                            <td className={index < 3 ? style.hotPostRow : ''}>
                                {index < 3 ? "HOT" : item.num}</td>
                            <td>
                                <Link to={`/board/detail/${item.num}`} className={style.titleLink}>
                                    {item.title}
                                </Link>
                            </td>
                            <td>{item.nickname}</td>
                            <td>{item.hit}</td>
                            <td>{item.bdate}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={5} style={{ textAlign: "center" }}>
                            <nav>
                                <ul className="pagination justify-content-center">
                                    {startPage > 1 && (
                                        <li className="page-item">
                                            <button className="page-link" onClick={() => pageChange(startPage - 1)}>
                                                이전
                                            </button>
                                        </li>
                                    )}

                                    {Array.from({ length: endPage - startPage + 1 }, (xx, i) => i + startPage).map((page) => (
                                        <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                                            <button className="page-link" onClick={() => pageChange(page)}>
                                                {page}
                                            </button>
                                        </li>
                                    ))}

                                    {endPage < totalPages && (
                                        <li className="page-item">
                                            <button className="page-link" onClick={() => pageChange(endPage + 1)}>
                                                다음
                                            </button>
                                        </li>
                                    )}
                                </ul>
                            </nav>
                            <Link to="/board/form" className={style.button}>글쓰기</Link>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default BoardList;
