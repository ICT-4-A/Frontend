// src/contents/Auth/Login.tsx
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

        {/* 아이디/비밀번호 찾기 링크 */}
        <div className="login-find-links">
          <a href="/Find">아이디 찾기 | 비밀번호 재설정</a>
        </div>

        {/* 하단 링크 */}
        <p className="login-footer">
          아직 계정이 없으신가요?{" "}
          <a href="/signup" className="login-link">
            Sign Up
          </a>
        </p>

        {/* 소셜 로그인 구분선 */}
        <div className="login-divider">
          <span>또는 소셜 계정으로 로그인</span>
        </div>

        {/* 소셜 로그인 버튼들 */}
        <div className="social-login-group">
          <button
            type="button"
            className="social-btn kakao"
            aria-label="카카오톡으로 로그인"
          >
            <img src="/icons/Kakao.png" alt="Kakao" className="social-icon" />
          </button>
          <button
            type="button"
            className="social-btn google"
            aria-label="Google로 로그인"
          >
            <img src="/icons/Google.png" alt="Google" className="social-icon" />
          </button>
          <button
            type="button"
            className="social-btn twitter"
            aria-label="Twitter로 로그인"
          >
            <img
              src="/icons/Twitter.png"
              alt="Twitter"
              className="social-icon"
            />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
