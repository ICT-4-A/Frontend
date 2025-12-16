// src/contents/Auth/SignUp.tsx (경로는 프로젝트 구조에 맞게)
import React from "react";
import "./SignUp.css";
import { Button } from "react-bootstrap";

const SignUp: React.FC = () => {
  return (
    <div className="signup-wrapper">
      <h1 className="signup-title">Sign Up</h1>

      <form className="signup-form">
        {/* 닉네임 */}
        <div className="signup-field">
          <label htmlFor="nickname" className="signup-label">
            닉네임
          </label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            className="form-control signup-input"
            placeholder="닉네임을 입력해주세요."
          />
          {/* 예시 메시지: 중복일 때 */}
          {/* <span className="signup-msg error">이미 사용 중인 닉네임입니다.</span> */}
        </div>

        {/* 아이디 */}
        <div className="signup-field">
          <label htmlFor="userId" className="signup-label">
            아이디
          </label>
          <input
            type="text"
            id="userId"
            name="userId"
            className="form-control signup-input"
            placeholder="아이디를 입력해주세요."
          />
          {/* 사용 가능 예시 */}
          {/* <span className="signup-msg success">사용 가능한 아이디입니다.</span> */}
        </div>

        {/* 아이디 중복 확인 */}
        <div>
          <button>중복확인</button>       
        </div>

        {/* 비밀번호 */}
        <div className="signup-field">
          <label htmlFor="password" className="signup-label">
            비밀번호
          </label>
          <div className="signup-password-wrapper">
            <input
              type="password"
              id="password"
              name="password"
              className="form-control signup-input"
              placeholder="비밀번호를 입력해주세요."
            />
            {/* 아이콘 자리는 span으로 확보해 두기만 */}
            <span className="password-eye">👁</span>
          </div>
        </div>

        {/* 비밀번호 확인 */}
        <div className="signup-field">
          <label htmlFor="password" className="signup-label">
            비밀번호 확인
          </label>
          <div className="signup-password-wrapper">
            <input
              type="password"
              id="password"
              name="password"
              className="form-control signup-input"
              placeholder="비밀번호를 한번 더 입력해주세요."
            />
            {/* 아이콘 자리는 span으로 확보해 두기만 */}
            <span className="password-eye">👁</span>
          </div>
        </div>

        {/* 선호 영화 장르 */}
        <div className="signup-field">
          <label htmlFor="favoriteGenre" className="signup-label">
            선호 영화 장르
          </label>
          <select
            id="favoriteGenre"
            name="favoriteGenre"
            className="form-select signup-input"
            defaultValue="액션"
          >
            <option value="액션">액션</option>
            <option value="코미디">코미디</option>
            <option value="로맨스">로맨스</option>
            <option value="공포/스릴러">공포/스릴러</option>
            <option value="SF/판타지">SF/판타지</option>
            <option value="애니메이션">애니메이션</option>
          </select>
        </div>

        {/* 가입 버튼 */}
        <button type="submit" className="btn btn-primary signup-btn">
          회원가입
        </button>

        {/* 로그인 링크 */}
        <p className="signup-footer">
          이미 계정이 있으신가요?{" "}
          <a href="/login" className="login-link">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
