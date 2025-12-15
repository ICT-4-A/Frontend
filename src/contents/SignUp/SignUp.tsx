import React from 'react'

const SignUp: React.FC = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <div>닉네임</div>
      <div>
        <input type="text" name="username" id="username"
          placeholder="닉네임를 입력하세요"/></div>
          <div>아이디</div>
        <div>
        <input type="text" name="username" id="username"
          placeholder="아이디를 입력하세요"/>
          <div>비밀번호</div>
          <div>
        <input type="text" name="username" id="username"
          placeholder="비밀번호를 입력하세요"/></div>
        <div>선호 영화 장르</div>
        <div></div>
        <input type="text" name="username" id="username"
          placeholder="액션"/></div>
  <button type="submit" >회원가입</button>      
  <div>이미 계정이 있으신가요? login</div>
    </div>
  )
}

export default SignUp