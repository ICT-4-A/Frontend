// src/contents/Auth/Login.tsx
import React, { useState } from "react";
import "./Login.css";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../components/AuthProvider";

const Login: React.FC = () => {
  const [loginMode, setLoginMode] = useState<'normal' | 'passwordless'>('normal');
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();
  const [password, setpassword] = useState();

  const [showPwlessRegisterForm, setShowPwlessRegisterForm] = useState(false); // 가입 폼 표시

  const [searchParams] = useSearchParams();
  const [qrImageUrl, setQrImageUrl] = useState('');
  let from = '/';
  const state = location.state as { from?: Location | string };


  if (state?.from) {
    if (typeof state.from === 'string') {
      from = state.from;
    } else if (typeof state.from === 'object') {
      from = (state.from as Location).pathname;
    }
  } else if (searchParams.get('from')) {
    from = searchParams.get('from')!;
  }

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 기존 로그인 함수
  const submitNormalLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setMessage('이메일과 비밀번호를 입력하세요');
      return;
    }

    const result = await login(formData.email, formData.password);
    if (result === 'success') {
      setMessage('로그인 성공');
      navigate(from, { replace: true });
    } else {
      setMessage('아이디 또는 비밀번호가 틀렸습니다.');
    }
  };



  // 패스워드 리스 함수 qr 생성 및 등록
  const startPasswordless = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setMessage('Passwordless를 위해 이메일과 비밀번호를 입력하세요');
      return;
    }
    setLoginMode('passwordless');
    setMessage('Passwordless 인증을 시작합니다...');


    try {
      setMessage('Passwordless 인증을 시작합니다');
      //ID 체크
      const idCheckRes = await fetch(`${process.env.REACT_APP_BACK_END_URL}/api/login/passwordlessManageCheck`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ email: formData.email.trim(), pw: formData.password.trim() }) // properties에서
      });

      if (!idCheckRes.ok) throw new Error('ID 체크 실패');



      const idCheckData = await idCheckRes.json();
      console.log('ID 체크 응답:', idCheckData);

      const passwordlessToken = idCheckData.PasswordlessToken.trim(); // 전달받아서 날아온 token 값


      //QR 생성
      console.log('📤 QR 생성 요청...', formData.email, passwordlessToken);

      const qrRes = await fetch(`${process.env.REACT_APP_BACK_END_URL}/api/login/passwordlessCallApi`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          url: 'joinApUrl',
          params: `userId=${formData.email.trim()}&token=${passwordlessToken}`
        })
      });

      console.log('📥 QR 상태:', qrRes.status);
      const qrtext = await qrRes.text();
      const qrdata = JSON.parse(qrtext)
      console.log('QR 체크 응답 ', qrdata);


      const qrUrl = qrdata.data.qr;
      setQrImageUrl(qrUrl);
      setMessage(`QR 코드를 앱에서 스캔하세요`);
      console.log('serverUrl :', qrdata.data.serverUrl);
      console.log('pushConnectorUrl :', qrdata.data.pushConnectorUrl);

    } catch (error: any) {
      setMessage(`오류: ${error.message}`);
    }

  };




  // ===== Passwordless 로그인 핸들러 (기존 startPasswordless 변형) =====
  const handlePwlessLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      setMessage('이메일을 입력하세요');
      return;
    }

    setMessage('Passwordless 로그인 중...');

    const isApRes = await fetch(`${process.env.REACT_APP_BACK_END_URL}/api/login/passwordlessCallApi`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        url: 'isApUrl',
        params: `userId=${formData.email.trim()}`
      })
    });

    const isApText = await isApRes.text();
    const isApData = JSON.parse(isApText);
    console.log(isApData.data.exist);

    if (isApData.data.exist) {
      // 일회용 토큰 생성하기
      const oneTimeRes = await fetch(`${process.env.REACT_APP_BACK_END_URL}/api/login/passwordlessCallApi`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          url: 'getTokenForOneTimeUrl',
          params: `userId=${formData.email.trim()}`
        })
      });

      const tokenData = JSON.parse(await oneTimeRes.text());
      console.log('isAp 값 :', tokenData);
      console.log('onetimeToken :', tokenData.oneTimeToken);


      // sessionId, servicePassword 생성하기
      const getSpRes = await fetch(`${process.env.REACT_APP_BACK_END_URL}/api/login/passwordlessCallApi`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          url: 'getSpUrl',
          params: `userId=${formData.email.trim()}&token=${tokenData.oneTimeToken}`
        })
      });

      const getSptext = await getSpRes.text()
      const getSpData = JSON.parse(getSptext);

      console.log('SpData :', getSpData);

      setMessage(getSpData.data.servicePassword)

      const pollResult = setInterval(async () => {
        try {
          const resultRes = await fetch(`${process.env.REACT_APP_BACK_END_URL}/api/login/passwordlessCallApi`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              url: 'resultUrl',
              params: `userId=${formData.email.trim()}&sessionId=${getSpData.sessionId}`
            })
          });

          const resulttext = await resultRes.text();
          const resultData = JSON.parse(resulttext);

          if (resultData.data && resultData.data.auth === 'Y') {
            clearInterval(pollResult);
            setMessage('✅ Passwordless 로그인 성공!');

            navigate(from, { replace: true });
            return;
          }
        } catch (error) {

        }
      }, 2000)


    } else {
      setMessage('이메일을 확인해주세요')
    }

  };


  return (
    <div className="login-wrapper">
      <h1 className="login-title">Login</h1>

      {/* 탭 */}
      <div className="login-tabs">
        <button
          type="button"
          className={`login-tab ${loginMode === 'normal' ? 'active' : ''}`}
          onClick={() => setLoginMode('normal')}
        >
          일반 로그인
        </button>
        <button
          type="button"
          className={`login-tab ${loginMode === 'passwordless' ? 'active' : ''}`}
          onClick={() => setLoginMode('passwordless')}
        >
          Passwordless 로그인
        </button>
      </div>

      <form className="login-form">
        {/* 일반 로그인 탭 */}
        {loginMode === 'normal' && (
          <div className="login-tab-content active">
            <div className="login-field">
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={inputChange}
                placeholder="이메일을 입력하세요"
                required
              />
            </div>

            <div className="login-field">
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={inputChange}
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>

            <div className="login-buttons">
              <button
                type="button"
                className="btn btn-primary login-btn"
                onClick={submitNormalLogin}
              >
                Log In
              </button>
            </div>

            {/* 메시지 */}
            {message && <div className="login-message">{message}</div>}

            {/* 아이디/비밀번호 찾기 링크 */}
            <div className="login-find-links">
              <a href="/Find">아이디 찾기 | 비밀번호 재설정</a>
            </div>

            {/* 모든 하단 링크 + 소셜 */}
            <p className="login-footer">
              아직 계정이 없으신가요?{" "}
              <a href="/signup" className="login-link">
                Sign Up
              </a>
            </p>

            <div className="login-divider">
              <span>또는 소셜 계정으로 로그인</span>
            </div>

            <div className="social-login-group">
              <button type="button" className="social-btn kakao">
                <img src="/icons/Kakao.png" alt="Kakao" className="social-icon" />
              </button>
              <button type="button" className="social-btn google">
                <img src="/icons/Google.png" alt="Google" className="social-icon" />
              </button>
              <button type="button" className="social-btn twitter">
                <img src="/icons/Twitter.png" alt="Twitter" className="social-icon" />
              </button>
            </div>
          </div>
        )}

        {/* Passwordless 탭 */}
        {loginMode === 'passwordless' && (
          <div className="login-tab-content active">

            {/* ===== 1. 기본 상태: 이메일 + 두 버튼 ===== */}
            {!showPwlessRegisterForm && !qrImageUrl && (
              <div>
                <div className="login-field">
                  <label>이메일</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={inputChange}
                    placeholder="이메일을 입력하세요"
                  />
                </div>

                {message && <div className="login-message">{message}</div>}

                <div className="login-buttons">
                  {/* 가입하기 클릭 → 비번 폼 표시 */}
                  <button
                    type="button"
                    className="btn btn-success login-btn pwless-register-btn"
                    onClick={() => setShowPwlessRegisterForm(true)}
                  >
                    🔐 Passwordless 가입하기
                  </button>

                  {/* 로그인 버튼 */}
                  <button
                    type="button"
                    className="btn btn-primary login-btn pwless-login-btn"
                    onClick={handlePwlessLogin}
                  >
                    🚀 Passwordless 로그인
                  </button>
                </div>
              </div>
            )}

            {/* ===== 2. 가입 폼: 이메일 + 비번 + QR 생성 버튼 ===== */}
            {showPwlessRegisterForm && !qrImageUrl && (
              <div>
                <div className="login-field">
                  <label>이메일</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={inputChange}
                    placeholder="이메일을 입력하세요"
                  />
                </div>

                <div className="login-field">
                  <label>비밀번호</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={inputChange}
                    placeholder="비밀번호를 입력하세요"
                    required
                  />
                </div>

                <div className="login-buttons">
                  {/* 취소 */}
                  <button
                    type="button"
                    className="btn btn-secondary login-btn"
                    onClick={() => {
                      setShowPwlessRegisterForm(false);
                      setFormData({ email: '', password: '' });
                    }}
                  >
                    취소
                  </button>

                  {/* QR 생성 (기존 startPasswordless 호출) */}
                  <button
                    type="button"
                    className="btn btn-success login-btn pwless-register-btn"
                    onClick={startPasswordless}
                    disabled={!formData.email.trim() || !formData.password.trim()}
                  >
                    QR 생성하기
                  </button>
                </div>
              </div>
            )}

            {/* ===== 3. QR 생성 후 ===== */}
            {qrImageUrl && (
              <div>
                {message && <div className="login-message">{message}</div>}

                <div className="qr-container">
                  <img src={qrImageUrl} alt="QR 코드" />
                  <p>앱으로 QR 코드를 스캔하세요</p>
                </div>

                <div className="login-buttons">
                  <button
                    type="button"
                    className="btn btn-success login-btn scan-complete-btn"
                    onClick={async () => {
                      // 일회용 토큰 발급하기
                      const tokenRes = await fetch(`${process.env.REACT_APP_BACK_END_URL}/api/login/passwordlessCallApi`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: new URLSearchParams({
                          url: 'getTokenForOneTimeUrl',
                          params: `userId=${formData.email.trim()}`
                        })
                      });

                      const tokentext = await tokenRes.text();
                      const tokenData = JSON.parse(tokentext);
                      const oneTimeToken = tokenData.oneTimeToken;

                      //qr 스캔 했는 지 확인하기
                      const isApRes = await fetch(`${process.env.REACT_APP_BACK_END_URL}/api/login/passwordlessCallApi`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: new URLSearchParams({
                          url: 'isApUrl',
                          params: `userId=${formData.email.trim()}`
                        })
                      });

                      const isApData = JSON.parse(await isApRes.text());
                      console.log(isApData.data)
                      if (isApData.data.exist) {
                        setMessage('🎉 Passwordless 가입 완료!');
                        setTimeout(() => {
                          setLoginMode('passwordless');
                          setQrImageUrl('');
                          setMessage('');
                          setFormData({ email: '', password: '' });
                        }, 1500);
                      } else {
                        setMessage('다시 시도하세요')
                      }
                    }}
                  >
                    스캔 완료
                  </button>

                </div>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );


};

export default Login;
