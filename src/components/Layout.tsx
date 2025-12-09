//comp/Layout.tsx 로 복사 해두기
import React from 'react'
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
interface LayoutProps {
    children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({children}) => {
  return (
    <div style={{ maxWidth: 'auto', margin: '0 auto', 
      padding: '20px' }}>
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', // 공간을 사이로 벌려놓기
        alignItems: 'center', //중앙 정렬
        backgroundColor: 'gray', 
        color: 'white', 
        padding: '10px 20px', 
        borderRadius: '8px' ,
        fontSize:'25px'
        }}>
        <Link className="navbar-brand" to="/">LOGO ( 사이트 제목 ) </Link>
        <div>
            <a href="/login" style={{ marginRight: '10px',
               color: 'white' , fontSize:'13px'}}>로그인</a>
            <a href="/signup" style={{ color: 'white' ,fontSize:'13px'} }>회원가입</a>
            
        </div>
        
      </header>
      <Navbar/>
      <main>{children}</main>
      <footer style={{
            backgroundColor: 'gray', 
            color: 'white', 
            padding: '10px', 
            borderRadius: '0 0 8px 8px',
            textAlign:'center'
        }}>
          <div> Hi ~ </div>
      </footer>
    </div>
  )
}

export default Layout