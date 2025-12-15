import React from 'react'

const Login: React.FC = () => {
    
  return (
    <div>
      <h1>회원가입 페이지입니다.</h1>
      <h3>아이디</h3>
      <div>
          <input type="text" name="username" id="username"
          placeholder="아이디를 입력하세요"/></div>
      <h3>비밀번호</h3>
      <div>
          <input type="text" name="username" id="username"
          placeholder="비밀번호를 입력하세요."/></div>
      <button type="submit" >등록</button>
      <div>아직 계정이 없으신가요? singup</div>
    </div>
  )
}

export default Login