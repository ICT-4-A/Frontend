// src/contents/Auth/SignUp.tsx
import React, { useState } from "react";
import "./SignUp.css";
import axios from 'axios';

interface MemberForm{
  email: string;
  password: string;
  nickname: string;
  genre: string;
}

const SignUp: React.FC = () => {

  const [form,setForm] = useState<MemberForm>({
    email: '',
    password: '',
    nickname: '',
    genre: ''
  });
  const [nicknameMessage, setNicknameMessage] = useState('');

  const nicknameCheck = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACK_END_URL}/member/nicknameCheck?=${form.nickname}`);
      console.log(res)
      if(res.data === 0){
        alert('사용 가능한 닉네임입니다.');
        setNicknameMessage('사용 가능한 닉네임입니다.');
      }else{
        setNicknameMessage('이미 사용중인 닉네임 입니다.');
      }
    } catch (error) {
      alert('닉네임 중복 확인 실패');
      console.error(error);
    }
  }





  return (
    <div className="signup-wrapper">
      <h1 className="signup-title">Sign Up</h1>

      <form className="signup-form">
        {/* 닉네임 */}
        <div className="signup-field">
          <label htmlFor="nickname" className="signup-label">
            닉네임
          </label>
          <div className="signup-row">
            <input
              type="text"
              id="nickname"
              name="nickname"
              className="form-control signup-input"
              placeholder="이메일을 입력해주세요."
            />
            <button type="button" className="email-check-btn" onClick={nicknameCheck}>
              중복확인
            </button>
          </div>
          {/* <span className="signup-msg success">사용 가능한 이메일입니다.</span> */}
          {/* <span className="signup-msg error">이미 사용 중인 이메일입니다.</span> */}
        </div>
        {/* 이메일 + 중복 확인 */}
        <div className="signup-field">
          <label htmlFor="email" className="signup-label">
            이메일
          </label>
          <div className="signup-row">
            <input
              type="email"
              id="email"
              name="email"
              className="form-control signup-input"
              placeholder="이메일을 입력해주세요."
            />
            <button type="button" className="email-check-btn">
              중복확인
            </button>
          </div>
          {/* <span className="signup-msg success">사용 가능한 이메일입니다.</span> */}
          {/* <span className="signup-msg error">이미 사용 중인 이메일입니다.</span> */}
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
            <span className="password-eye">👁</span>
          </div>
        </div>

        {/* 비밀번호 확인 */}
        <div className="signup-field">
          <label htmlFor="passwordConfirm" className="signup-label">
            비밀번호 확인
          </label>
          <div className="signup-password-wrapper">
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              className="form-control signup-input"
              placeholder="비밀번호를 한 번 더 입력해주세요."
            />
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
