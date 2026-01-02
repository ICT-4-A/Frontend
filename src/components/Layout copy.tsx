// comp/Layout.tsx
import React from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const {member, logout} = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    alert('로그아웃 되었습니다.');
    navigate('/');
  };
  return (
    <div style={{ maxWidth: "auto", margin: "0 auto" }}>
      <header
        style={{
          background: "#f8f9fa",
          padding: "10px 20px 0",
          borderBottom: "1px solid #ddd",
        }}
      >
        {/* 1줄: 로고 + 로그인/회원가입 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <Link
            className="navbar-brand"
            to="/"
            style={{ fontSize: "24px", textDecoration: "none", color: "black" }}
          >
            LOGO ( 사이트 제목 )
          </Link>

          <div>
            <Link
              to="/login"
              style={{ marginRight: "10px", color: "black", fontSize: "13px" }}
            >
              로그인
            </Link>
            <Link to="/signup" style={{ color: "black", fontSize: "13px" }}>
              회원가입
            </Link>
          </div>
        </div>

        {/* 2줄: 메뉴 네브바 */}
        <Navbar />
      </header>

      <main style={{ padding: "20px" }}>{children}</main>

      <footer
        style={{
          backgroundColor: "#a6cef5ff",
          color: "white",
          padding: "10px",
          textAlign: "center",
          marginTop: "40px",
        }}
      >Copyright 2025.ICT-A.All rights reserved.</footer>
    </div>
  );
};

export default Layout;
