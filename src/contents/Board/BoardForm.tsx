import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Board/BoardForm.css";

const BoardForm = () => {
    const [title,setTitle] = useState("");

    return(
        <div className="boardform-container">
            <h3 className="boardform-title">글쓰기</h3>
            {/* 제목 입력 */}
            <div className="form-group">
                <label htmlFor="title">제목</label>
                <div className="with-counter">
                <input
                id="title" type="text" className="form-control input-title"
                placeholder="제목을 입력하세요."
                value={title}
                onChange={(e) => setTitle(e.target.value)} maxLength={50}/>
                {/* 글자 수 카운터 */}
                <span className="title-counter">
                    {title.length}/50
                </span>
                </div>
                {/* 에러 안내문 (UI만) */}
                <p className="error-msg">※ 제목을 입력해주세요.</p>
            </div>
            {/* 내용 입력 */}
            <div className="form-group">
                <label htmlFor="content">내용</label>
                <textarea
                id="content" className="form-control input-content"
                placeholder="내용을 입력하세요."></textarea>
                {/* 에러 안내문 (UI만) */}
                <p className="error-msg">※ 내용을 입력해주세요.</p>
            </div>
            {/* 버튼 */}
            <div className="button-group">
                <button className="btn btn-secondary temp-btn">임시 저장</button>
                <button className="btn btn-primary submit-btn">등록하기</button>
                <button className="btn btn-danger cancel-btn">취소</button>
            </div>
        </div>


    );
};


export default BoardForm;