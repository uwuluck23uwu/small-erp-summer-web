import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "~/contexts/AuthContext";
import logo from "../assets/images/hugcode.png";

export default function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-container responsive-padding-layout py-3">
        <Link to="/" className="header-image-container">
          <img src={logo} alt="HUGCODE" />
        </Link>

        <div className="header-user-container">
          {isLoggedIn ? (
            <>
              <h3 className="pr-2">ชื่อผู้ใช้งาน :</h3>
              <h3 className="text-steel font-bold text-end">
                นายสุรชัย ภูสิทธิ์โชติการ
              </h3>
            </>
          ) : (
            <h3 className="text-steel font-bold text-end">
              ยังไม่ได้เข้าสู่ระบบ
            </h3>
          )}
        </div>

        <div className="header-btn-container">
          {!isLoggedIn ? (
            <>
              <Link to="/login">
                <button type="button">
                  <div className="btn-logout text-sky-main">
                    <div className="icon-circle text-center">
                      <i className="fa-solid fa-right-to-bracket"></i>
                    </div>
                    <p>เข้าสู่ระบบ</p>
                  </div>
                </button>
              </Link>
              <Link to="/register">
                <button type="button">
                  <div className="btn-logout text-sky-main">
                    <div className="icon-circle text-center">
                      <i className="fa-solid fa-user-plus"></i>
                    </div>
                    <p>ลงทะเบียน</p>
                  </div>
                </button>
              </Link>
            </>
          ) : (
            <button type="button" onClick={handleLogout}>
              <div className="btn-logout text-sky-main">
                <div className="icon-circle text-center">
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </div>
                <p>ออกจากระบบ</p>
              </div>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
