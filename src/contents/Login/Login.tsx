// src/contents/Auth/Login.tsx (경로는 프로젝트 구조에 맞게)
import React from "react";
import "./Login.css";

const Login: React.FC = () => {
  return (
    <div className="login-wrapper">
      <h1 className="login-title">Login</h1>

      <form className="login-form">
        {/* 아이디 */}
        <div className="login-field">
          <label htmlFor="loginId" className="login-label">
            아이디
          </label>
          <input
            type="text"
            id="loginId"
            name="loginId"
            className="form-control login-input"
            placeholder="아이디를 입력하세요"
          />
        </div>

        {/* 비밀번호 */}
        <div className="login-field">
          <label htmlFor="loginPw" className="login-label">
            비밀번호
          </label>
          <div className="login-password-wrapper">
            <input
              type="password"
              id="loginPw"
              name="loginPw"
              className="form-control login-input"
              placeholder="비밀번호를 입력하세요"
            />
            <span className="login-eye">👁</span>
          </div>
        </div>
      
        {/* 로그인 버튼 */}
        <button type="submit" className="btn btn-primary login-btn">
          Log In
        </button>

         {/* 아이디 비밀번호 찾기 링크 */}
              
        <a>아이디 찾기 / 비밀번호 재설정</a>       
        

        {/* 하단 링크 */}
        <p className="login-footer">
          아직 계정이 없으신가요?{" "}
          <a href="/signup" className="login-link">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
