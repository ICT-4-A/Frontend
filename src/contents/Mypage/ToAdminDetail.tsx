// src/contents/Mypage/ToAdminDetail.tsx (경로는 프로젝트 구조에 맞게)
import React from "react";
import { Link } from "react-router-dom";
import "../Board/BoardDetail.css";

const ToAdminDetail: React.FC = () => {
  return (
    <div className="detail-wrapper">
      <h2 className="board-title">관리자 문의 상세보기</h2>

      <div className="detail-box">
        <div className="detail-row">
          <span className="detail-label">제목</span>
          <span className="detail-value">
            서비스 이용 중 오류가 발생했습니다
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">닉네임</span>
          <span className="detail-value">테스트1</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">날짜</span>
          <span className="detail-value">2025-11-29</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">상태</span>
          <span className="detail-value">답변 대기</span>
        </div>

        <div className="detail-content-area">
          <p>서비스 이용 도중 특정 페이지에서 오류가 발생했습니다.</p>
          <p>새로고침을 해도 같은 문제가 반복되고 있어서 문의드립니다.</p>
          <p>확인 후 조치 방법 안내 부탁드립니다.</p>
        </div>

        <div className="detail-buttons">
          <Link to="/mypage" className="btn-gray">
            목록
          </Link>
        </div>
      </div>

      {/* 관리자 답변 영역 (더미 데이터) */}
      <div className="comment-list">
        <h3>관리자 답변</h3>

        <div className="comment-item">
          <div className="comment-nick">관리자</div>
          <div className="comment-content">
            제보 감사합니다. 말씀해주신 오류를 확인 중입니다. 브라우저 캐시 삭제
            후에도 같은 현상이 지속되면 다시 알려주세요.
          </div>
          <div className="comment-date">2025-11-30</div>
        </div>
      </div>
    </div>
  );
};

export default ToAdminDetail;
