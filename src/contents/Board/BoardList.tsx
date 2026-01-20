import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './BoardList.css'

interface BoardVO {
    num: number;
    title: string;
    bnickname: string;
    content: string;
    hit: number;
    reip: string;
    bdate: string;
}

const HOT_COUNT = 3
const PAGE_SIZE = 10

const BoardList: React.FC = () => {
    const [boardList, setBoardList] = useState<BoardVO[]>([])
    const [allBoards, setAllBoards] = useState<BoardVO[]>([])

    const [totalItems, setTotalItems] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [startPage, setStartPage] = useState(1)
    const [endPage, setEndPage] = useState(1)

    const [searchType, setSearchType] = useState('1')
    const [searchValue, setSearchValue] = useState('')

    /* 🔥 전체 게시물 전부 가져오기 (HOT + 1페이지 구성용) */
    const fetchAllBoards = async () => {
        try {
            let page = 1
            let total = 1
            let all: BoardVO[] = []

            while (page <= total) {
                const res = await axios.get(
                    `${process.env.REACT_APP_BACK_END_URL}/board/list`,
                    {
                        params: {
                            cPage: page,
                            searchType,
                            searchValue: '',
                        },
                    }
                )

                all.push(...(res.data.data ?? []))
                total = res.data.totalPages
                page++
            }

            setAllBoards(all)
            setTotalItems(all.length)
            setTotalPages(Math.ceil(all.length / PAGE_SIZE))
        } catch (e) {
            console.error('전체 게시물 로딩 실패', e)
        }
    }

    /* 🔹 페이지별 게시글 구성 */
    const fetchBoardList = async (page: number) => {
        try {
            /* 🔍 검색 중이면 서버 페이징 그대로 사용 */
            if (searchValue !== '') {
                const res = await axios.get(
                    `${process.env.REACT_APP_BACK_END_URL}/board/list`,
                    {
                        params: {
                            cPage: page,
                            searchType,
                            searchValue,
                        },
                    }
                )

                setBoardList(res.data.data ?? [])
                setTotalItems(res.data.totalItems)
                setTotalPages(res.data.totalPages)
                setCurrentPage(res.data.currentPage)
                setStartPage(res.data.startPage)
                setEndPage(res.data.endPage)
                return
            }

            /* 🔥 1페이지 (HOT 적용) */
            if (page === 1 && allBoards.length > 0) {
                const hotList = [...allBoards]
                    .sort((a, b) => b.hit - a.hit)
                    .slice(0, HOT_COUNT)

                const hotNums = new Set(hotList.map(h => h.num))

                const normalList = allBoards.filter(
                    item => !hotNums.has(item.num)
                )

                const pageList = normalList.slice(
                    0,
                    PAGE_SIZE - HOT_COUNT
                )

                setBoardList([...hotList, ...pageList])
                setCurrentPage(1)
                setStartPage(1)
                setEndPage(Math.min(5, totalPages))
                return
            }

            /* 🔹 2페이지 이상 (HOT 제외한 순수 페이징) */
            const startIdx =
                (page - 1) * PAGE_SIZE - HOT_COUNT
            const endIdx = startIdx + PAGE_SIZE

            const hotNums = new Set(
                [...allBoards]
                    .sort((a, b) => b.hit - a.hit)
                    .slice(0, HOT_COUNT)
                    .map(h => h.num)
            )

            const normalList = allBoards.filter(
                item => !hotNums.has(item.num)
            )

            setBoardList(normalList.slice(startIdx, endIdx))
            setCurrentPage(page)
            setStartPage(Math.floor((page - 1) / 5) * 5 + 1)
            setEndPage(
                Math.min(
                    Math.floor((page - 1) / 5) * 5 + 5,
                    totalPages
                )
            )
        } catch (e) {
            console.error('게시글 조회 실패', e)
            setBoardList([])
        }
    }

    /* 최초 전체 데이터 */
    useEffect(() => {
        fetchAllBoards()
    }, [])

    /* 페이지 변경 */
    useEffect(() => {
        if (allBoards.length === 0) return
        fetchBoardList(currentPage)
    }, [currentPage, allBoards])

    /* 검색 */
    const searchFunction = () => {
        setCurrentPage(1)
        fetchBoardList(1)
    }

    /* 날짜 포맷 */
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        const y = date.getFullYear()
        const m = String(date.getMonth() + 1).padStart(2, '0')
        const d = String(date.getDate()).padStart(2, '0')
        return `${y}.${m}.${d}`
    }

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
                    <select onChange={e => setSearchType(e.target.value)}>
                        <option value="1">작성자</option>
                        <option value="2">제목</option>
                        <option value="3">내용</option>
                    </select>
                    <input
                        type="text"
                        onChange={e => setSearchValue(e.target.value)}
                    />
                    <button className="bl-searchButton" onClick={searchFunction}>
                        검색
                    </button>

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
            <nav className="bl-paginationBox">
                <ul className="pagination">
                    {startPage > 1 && (
                        <li>
                            <button
                                className="bl-pageBtn"
                                onClick={() => setCurrentPage(startPage - 1)}
                            >
                                이전
                            </button>
                        </li>
                    )}

                    {Array.from(
                        { length: endPage - startPage + 1 },
                        (_, i) => i + startPage
                    ).map(page => (
                        <li key={page}>
                            <button
                                className={`bl-pageBtn ${page === currentPage ? 'active' : ''
                                    }`}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </button>
                        </li>
                    ))}

                    {endPage < totalPages && (
                        <li>
                            <button
                                className="bl-pageBtn"
                                onClick={() => setCurrentPage(endPage + 1)}
                            >
                                다음
                            </button>
                        </li>
                    )}
                </ul>
            </nav>

        </div>
    )
}

export default BoardList
