// comp/Layout.tsx
import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{ maxWidth: 'auto', margin: '0 auto' }}>
      <header
        style={{
          background: '#f8f9fa',
          padding: '10px 20px 0',
          borderBottom: '1px solid #ddd',
        }}
      >
        {/* 1줄: 로고 + 로그인/회원가입 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px',
          }}
        >
          <Link
            className="navbar-brand"
            to="/"
            style={{ fontSize: '24px', textDecoration: 'none', color: 'black' }}
          >
            LOGO ( 사이트 제목 )
          </Link>

          <div>
            <Link
              to="/login"
              style={{ marginRight: '10px', color: 'black', fontSize: '13px' }}
            >
              로그인
            </Link>
            <Link to="/signup" style={{ color: 'black', fontSize: '13px' }}>
              회원
            </Link>
          </div>
        </div>

        {/* 2줄: 메뉴 네브바 */}
        <Navbar />
      </header>

      <main style={{ padding: '20px' }}>{children}</main>

      <footer
        style={{
          backgroundColor: '#343a40',
          color: 'white',
          padding: '10px',
          textAlign: 'center',
          marginTop: '40px',
        }}
      >
      </footer>
    </div>
  );
};

export default Layout;
