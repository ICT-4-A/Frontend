// src/contents/Auth/Login.tsx
import React, { useState } from "react";
import "./Login.css";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../components/AuthProvider";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({email: '', password: ''});
  const [messag, setMessage] = useState('');
  const navigate = useNavigate();
  const {login} = useAuth();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  let from = '/';
  const state = location.state as {from?: Location | string};


  if (state?.from){
    if(typeof state.from === 'string'){
      from = state.from;
    }else if(typeof state.from === 'object'){
      from = (state.from as Location).pathname;
    }
  }else if (searchParams.get('from')){
    from = searchParams.get('from')!;
  }

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const submitLogin = async (e:React.MouseEvent<HTMLButtonElement>) => {
   e.preventDefault();
    const result = await login(formData.email, formData.password);
    if (result === 'success'){
      setMessage('로그인 성공');
      navigate(from, {replace:true});
    }else if (result === 'fail'){
      setMessage('아이디 또는 비밀번호가 틀렸습니다.');
    }else{
      setMessage('서버 오류');
    }
  };
  return (
    <div className="login-wrapper">
      <h1 className="login-title">Login</h1>

      <form className="login-form">
        {/* 아이디 */}
        <div className="login-field">
          <label htmlFor="loginId" className="login-label">
            이메일
          </label>
          <input
            type="text"
            id="email"
            name="email"
            className="form-control login-input"
            placeholder="이메일을 입력하세요"
            onChange={inputChange}
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
              id="password"
              name="password"
              className="form-control login-input"
              placeholder="비밀번호를 입력하세요"
              onChange={inputChange}
            />
            <span className="login-eye">👁</span>
          </div>
        </div>

        {/* 로그인 버튼 */}
        <button type="submit" className="btn btn-primary login-btn"
        onClick={submitLogin}> 
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
