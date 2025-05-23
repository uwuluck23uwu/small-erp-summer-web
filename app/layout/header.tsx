import { Link, useNavigate } from "react-router";
import { useAuth } from "~/contexts/AuthContext";
import logo from "../assets/images/hugcode.png";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

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
          {user ? (
            <>
              <h3 className="pr-2">ชื่อผู้ใช้งาน :</h3>
              <h3 className="text-steel font-bold text-end">{user.fullName}</h3>
            </>
          ) : (
            <></>
          )}
        </div>

        <div className="header-btn-container">
          {!user ? (
            <>
              <Link to="/login">
                <button
                  type="button"
                  className="
                      bg-sky-500 hover:bg-sky-600 
                      text-white font-semibold
                      py-2 px-4
                      rounded-lg shadow-md
                      transition duration-300
                      flex items-center space-x-2
                      group"
                >
                  <span
                    className="
                      bg-white text-sky-600 
                      p-2 rounded-full 
                      shadow
                      transition-transform duration-200
                      group-hover:scale-110"
                  >
                    <i className="fa-solid fa-right-to-bracket"></i>
                  </span>
                  <span>เข้าสู่ระบบ</span>
                </button>
              </Link>
              <Link to="/register">
                <button
                  type="button"
                  className="
                      bg-gradient-to-r from-blue-500 to-teal-400 
                      hover:from-blue-600 hover:to-teal-500 
                      text-white font-semibold
                      py-2 px-4
                      rounded-lg shadow-md
                      transition duration-300
                      flex items-center space-x-2"
                >
                  <span
                    className="
                      bg-white text-blue-500 
                      p-2 rounded-full 
                      shadow
                      transition-transform duration-200
                      group-hover:scale-110"
                  >
                    <i className="fa-solid fa-user-plus"></i>
                  </span>
                  <span>ลงทะเบียน</span>
                </button>
              </Link>
            </>
          ) : (
            <button type="button" onClick={handleLogout}>
              <div className="btn-logout text-sky-main flex justify-center">
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
