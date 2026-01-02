// src/contents/Auth/SignUp.tsx
import React, { useState } from "react";
import "./SignUp.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

interface MemberForm {
  email: string;
  password: string;
  nickname: string;
  genre: string[];
}

const SignUp: React.FC = () => {

  const [nicknameMessage, setNicknameMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [code, setCode] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const navigate = useNavigate();
  const [passwordMatch, setPasswordMatch] = useState(true);


  const [form, setForm] = useState<MemberForm>({
    email: '',
    password: '',
    nickname: '',
    genre: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(e.target.selectedOptions).map(option => option.value);
    setForm(prev => ({ ...prev, genre: options }));
  };


  const nicknameCheck = async () => {

    try {
      const res = await axios.get(`${process.env.REACT_APP_BACK_END_URL}/member/nicknameCheck?nickname=${form.nickname}`);

      if (res.data === 0) {
        alert('사용 가능한 닉네임입니다.');
        setNicknameMessage('사용 가능한 닉네임입니다.');

      } else {
        alert('이미 사용중인 닉네임입니다.');
        setNicknameMessage('이미 사용중인 닉네임 입니다.');

      }
    } catch (error) {
      alert('닉네임 중복 확인 실패');
      console.error(error);
    }
  }

  const emailCheck = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACK_END_URL}/api/auth/emailCheck`,
        { email: form.email, });
      if (res.data === 0) {
        alert("인증번호가 발송되었습니다.")
        setEmailMessage('인증번호가 발송되었습니다.')
        setIsEmailVerified(false);
      } else {
        setEmailMessage('이미 사용중인 이메일입니다.')
      }
    } catch (error) {
      alert('이메일 인증 중 오류 발생');
      console.log(error);
    }
  }

  const checkEmailCode = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACK_END_URL}/api/auth/emailCheck/certification`,
        { email: form.email, code: code }
      );
      const result = res.data;
      if (result.success) {
        alert('이메일 인증 성공!');
        setIsEmailVerified(true);
      } else {
        if (result.reaon === 'exceeded') {
          alert('3회 이상 인증번호를 틀려 더 이상 시도할 수 없습니다.\n다시 인증번호를 요청하세요.');
        } else if (result.reason === 'expired') {
          alert('인증번호 유효시간이 만료되었습니다.\n다시 인증번호를 요청하세요.');
        } else if (result.reason === 'wrong') { alert('인증번호가 일치하지 않습니다.'); }
      }
    } catch (error) {
      alert('인증번호 확인 오류'); console.error(error);
    }
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isEmailVerified) {
      alert('이메일 인증을 먼저 완료해주세요.');
      return;
    }

    if (form.password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.')
      setPasswordMatch(false);
      return;
    }

    if (!form.email || !form.password || !form.nickname || !form.genre) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    try {
      const formData = new FormData();
      await axios.post(`${process.env.REACT_APP_BACK_END_URL}/member/signup`, {
        email: form.email,
        password: form.password,
        nickname: form.nickname,
        genre: form.genre.join(',')

      });
      alert('회원가입 완료')
      navigate('/');
    } catch (error) {
      console.log(error);
      alert('회원 가입 실패')
    }
  }


  return (
    <div className="signup-wrapper">
      <h1 className="signup-title">Sign Up</h1>

      <form className="signup-form" onSubmit={handleSubmit}>
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
              placeholder="닉네임을 입력해주세요."
              value={form.nickname}
              onChange={handleChange}


            />
            <button type="button" className="email-check-btn" onClick={nicknameCheck}>
              중복확인
            </button>
          </div>
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
              onChange={handleChange}
              value={form.email}
            />
            <button type="button" className="email-check-btn" onClick={emailCheck}>
              중복확인
            </button>
          </div>
        </div>

        {/* 이메일 인증코드 */}
        <div className="signup-field">
          <label htmlFor="code" className="signup-label">
            인증번호
          </label>
          <div className="signup-row">
            <input
              type="text"
              id="code"
              name="code"
              className="form-control signup-input"
              placeholder="인증번호를 입력해주세요."
              value={code}
              onChange={e => setCode(e.target.value)}
            />
            <button type="button" className="email-check-btn" onClick={checkEmailCode}>
              확인
            </button>
          </div>
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
              value={form.password}
              onChange={handleChange}
              required
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
              value={passwordConfirm}
              onChange={e => {
                setPasswordConfirm(e.target.value);
                setPasswordMatch(form.password === e.target.value);
              }}
            />
            {!passwordMatch && (
              <span className="signup-msg error">비밀번호가 일치하지 않습니다.</span>
            )}
          </div>
        </div>

        {/* 선호 영화 장르 */}
        <div className="signup-field">
          <label htmlFor="favoriteGenre" className="signup-label">
            선호 영화 장르 ( Ctrl + 클릭 !! )
          </label>
          <select
            id="favoriteGenre"
            name="genre"
            className="form-select signup-input"
            multiple
            onChange={handleGenreChange}
            size={6}
          >
            <option value="액션">액션</option>
            <option value="코미디">코미디</option>
            <option value="로맨스">로맨스</option>
            <option value="공포/스릴러">공포/스릴러</option>
            <option value="SF/판타지">SF/판타지</option>
            <option value="애니메이션">애니메이션</option>
          </select>
          {/* 선택된 장르 표시 */}
          {form.genre.length > 0 && (
            <div className="selected-genres">
              선택됨: {form.genre.join(', ')}
            </div>
          )}
        </div>

        {/* 가입 버튼 */}
        <button type="submit" className="btn btn-primary signup-btn">
          가입하기
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
