import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  let location = useLocation();
  let navigate = useNavigate();

  const handlelogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  }

  return (
    <>
      <style>{`
        .custom-navbar {
          background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
          padding: 0.8rem 0;
          position: sticky;
          top: 0;
          z-index: 1050;
        }

        .custom-navbar .navbar-brand {
          font-size: 1.6rem;
          font-weight: 900;
          letter-spacing: 2px;
          background: linear-gradient(90deg, #e94560, #f5a623);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-transform: uppercase;
        }

        .custom-navbar .nav-link {
          color: rgba(255, 255, 255, 0.7) !important;
          font-weight: 500;
          font-size: 0.95rem;
          padding: 0.45rem 1rem !important;
          border-radius: 8px;
          transition: all 0.2s ease;
          position: relative;
        }

        .custom-navbar .nav-link:hover {
          color: #ffffff !important;
          background: rgba(255, 255, 255, 0.08);
        }

        .custom-navbar .nav-link.active {
          color: #ffffff !important;
          background: rgba(233, 69, 96, 0.15);
        }

        .custom-navbar .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 2px;
          background: linear-gradient(90deg, #e94560, #f5a623);
          border-radius: 2px;
        }

        .auth-btn {
          padding: 0.4rem 1.2rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.88rem;
          letter-spacing: 0.4px;
          transition: all 0.25s ease;
          border: none;
          text-decoration: none;
        }

        .btn-login {
          background: transparent;
          border: 1.5px solid rgba(233, 69, 96, 0.7);
          color: #e94560 !important;
        }

        .btn-login:hover {
          background: rgba(233, 69, 96, 0.12);
          border-color: #e94560;
          color: #e94560 !important;
          transform: translateY(-1px);
        }

        .btn-signup {
          background: linear-gradient(135deg, #e94560, #f5a623);
          color: #fff !important;
          box-shadow: 0 0 14px rgba(233, 69, 96, 0.35);
        }

        .btn-signup:hover {
          transform: translateY(-1px);
          box-shadow: 0 0 22px rgba(233, 69, 96, 0.55);
          color: #fff !important;
        }

        .btn-logout {
          background: transparent;
          border: 1.5px solid rgba(255, 255, 255, 0.25);
          color: rgba(255, 255, 255, 0.8) !important;
          padding: 0.4rem 1.2rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.88rem;
          transition: all 0.25s ease;
          cursor: pointer;
        }

        .btn-logout:hover {
          border-color: #e94560;
          color: #e94560 !important;
          background: rgba(233, 69, 96, 0.08);
        }

        .user-icon {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #e94560, #f5a623);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 0 12px rgba(233, 69, 96, 0.35);
        }

        .user-icon:hover {
          transform: scale(1.1);
          box-shadow: 0 0 20px rgba(233, 69, 96, 0.55);
        }

        .user-icon i {
          color: #fff;
          font-size: 0.9rem;
        }

        .custom-navbar .navbar-toggler {
          border-color: rgba(255, 255, 255, 0.2);
        }

        .custom-navbar .navbar-toggler-icon {
          filter: invert(1);
          opacity: 0.8;
        }

        .custom-navbar .navbar-toggler:focus {
          box-shadow: 0 0 0 2px rgba(233, 69, 96, 0.4);
        }
      `}</style>

      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid px-4">

          <Link className="navbar-brand" to="/">iNote</Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-1">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
              </li>
            </ul>

            {!localStorage.getItem('token') ? (
              <div className="d-flex gap-2 align-items-center">
                <Link className="auth-btn btn-login" to="/Login">Login</Link>
                <Link className="auth-btn btn-signup" to="/Signup">Sign Up</Link>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-3">
                <button onClick={handlelogout} className="btn-logout">Log Out</button>
               
              </div>
            )}

          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;