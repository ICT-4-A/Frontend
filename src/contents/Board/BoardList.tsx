import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './BoardList.css';
//import "./Board.css";


interface BoardVO {
    num: number;
    title: string;
    bnickname: string;
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
            const hotPosts = [...list]
            .sort((a,b) => b.hit - a.hit)
            .slice(0, 3);
            const hotNums = hotPosts.map(item => item.num);

            const otherPosts = list
            .filter(item => !hotNums.includes(item.num))
            .sort((a, b) => new Date(b.bdate).getTime() - new Date(a.bdate).getTime());

            setBoardList([...hotPosts, ...otherPosts]);

            console.log(response.data.data);
            
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

    // 작성일을 'YYYY.MM.DD' 형식으로 변환
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}.${month}.${day}`;
    };

    return (
        <div className="bl-container">
            <div className="bl-header">
                <h3 className="bl-pageName">게시판</h3>
                <div className="bl-searchBox">
                    <select onChange={(e) => setSearchType(e.target.value)}>
                        <option value="1">작성자</option>
                        <option value="2">제목</option>
                        <option value="3">내용</option>
                    </select>
                    <input type="text" onChange={(e) => setSearchValue(e.target.value)} />
                    <button className="bl-searchButton" onClick={searchFunction}>검색</button>
                </div>
            </div>

            <table className="bl-boardTable">
                <colgroup>
                    <col style={{width:"12%"}} /> 
                    <col style={{width:"44%"}} /> 
                    <col style={{width:"15%"}} /> 
                    <col style={{width:"10%"}} /> 
                    <col style={{width:"13%"}} /> 
                </colgroup>
            
                <thead>
                    <tr>
                        <th>No</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>조회수</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {boardList.map((item, index) => (
                        <tr key={item.num} className={index < 3 ? "bl-hotPost" : ""}>
                            <td className={index < 3 ? "bl-hotPostRow" : ""}>
                                {index < 3 ? "HOT" : item.num}
                            </td>
                            <td>
                                <Link to={`/board/detail/${item.num}`} className="bl-titleLink">
                                    {item.title}
                                </Link>
                            </td>
                            <td>{item.bnickname}</td>
                            <td>{item.hit}</td>
                            <td>{formatDate(item.bdate)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {/* 글쓰기 버튼 */}
            <div className="bl-writeWrapper">
            <Link to="/board/form" className="bl-button">
                글쓰기
            </Link>
            </div>

            {/* 페이지네이션 */}
            <nav className="bl-paginationBox">
            <ul className="pagination justify-content-center">
                {startPage > 1 && (
                <li className="page-item">
                    <button
                    className="page-link"
                    onClick={() => pageChange(startPage - 1)}
                    >
                    이전
                    </button>
                </li>
                )}

                {Array.from(
                { length: endPage - startPage + 1 },
                (_, i) => i + startPage
                ).map((page) => (
                <li
                    key={page}
                    className={`page-item ${page === currentPage ? "active" : ""}`}
                >
                    <button
                    className="page-link"
                    onClick={() => pageChange(page)}
                    >
                    {page}
                    </button>
                </li>
                ))}

                {endPage < totalPages && (
                <li className="page-item">
                    <button
                    className="page-link"
                    onClick={() => pageChange(endPage + 1)}
                    >
                    다음
                    </button>
                </li>
                )}
            </ul>
            </nav>

        </div>
    );
};
export default BoardList;
