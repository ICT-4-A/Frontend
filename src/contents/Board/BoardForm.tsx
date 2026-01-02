import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from './board.module.css'
import axios from "axios";


interface BoardVO {
    num?: Number;
    title: string;
    content: string;
    hit?: number;
    reip?: string;
    bdate?: string;
}

const BoardForm: React.FC = () => {
    const [formData, setFormData] = useState<BoardVO>({
        title: '',
        content: '',
    },);
    const formChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value });
    };

    const navigate = useNavigate();
    const myFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('content', formData.content);
        try {
            const url = `${process.env.REACT_APP_BACK_END_URL}/board/boardAdd`;
            await axios.post(url, {
                title: formData.title,
                content: formData.content
            },{
                withCredentials: true
            });
            navigate('/board/list');
        } catch (error) {
            console.log(`Error => ${error}`)
        }
    };
     const [errors, setErrors] = useState({
            title: false,
            content: false
        });


    return (
        <div className={style.containeer}>
            <h3>글쓰기</h3>
            <form onSubmit={myFormSubmit}>
                <table>
                    <tbody>
                {/* 제목 입력 */}
                <tr>
                    <th>제목</th>
                    <td>
                        <input
                            id="title" name="title" type="text" className={style.title}
                            placeholder="제목을 입력하세요."
                            value={formData.title}
                            onChange={formChange} required maxLength={50} />
                        {/* 글자 수 카운터 */}
                        <span className={style.counter}>
                            {formData.title.length}/50
                        </span>
                    </td>
                    {/* 에러 안내문 (UI만) */}
                    {errors.title && (
                        <p className={style.errormsg}>※ 제목을 입력해주세요.</p>)}
                </tr>
                {/* 내용 입력 */}
                <tr>
                    <th>내용</th>
                    <td>
                    <textarea
                        id="content" name="content" className={style.content}
                        placeholder="내용을 입력하세요." value={formData.content}
                        onChange={formChange}/>
                    {/* 에러 안내문 (UI만) */}
                    {errors.content && (
                        <p className={style.errormsg}>※ 내용을 입력해주세요.</p>)}
                        </td>
                </tr>
                </tbody>
                {/* 버튼 */}
                 <tfoot>
                <tr className={style.buttongroup}>
                    <th colSpan={2}>
                    <button type="submit" className={style.button1}>등록하기</button>
                    <button type="button" className={style.button2}
                        onClick={() => navigate(-1)}>취소</button>
                        </th>
                </tr>
                </tfoot>
                </table>
            </form>
        </div>


    );
};


export default BoardForm;