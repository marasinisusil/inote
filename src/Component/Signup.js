import React from 'react'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = (props) => {
  let navigate = useNavigate();
  const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  const { name, email, password } = credentials

  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      navigate("/");
      props.showalert("Signup successfully", "success")
    } else {
      props.showalert("Invalid credentials", "danger")
    }
  }

  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <>
      <style>{`
        .signup-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .signup-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2.5rem;
          width: 100%;
          max-width: 440px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        }

        .signup-logo {
          font-size: 1.8rem;
          font-weight: 900;
          letter-spacing: 2px;
          background: linear-gradient(90deg, #e94560, #f5a623);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-transform: uppercase;
          text-align: center;
          margin-bottom: 0.3rem;
        }

        .signup-subtitle {
          text-align: center;
          color: rgba(255, 255, 255, 0.45);
          font-size: 0.88rem;
          margin-bottom: 2rem;
        }

        .signup-card .form-label {
          color: rgba(255, 255, 255, 0.75);
          font-size: 0.88rem;
          font-weight: 500;
          margin-bottom: 0.4rem;
        }

        .signup-card .form-control {
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          color: #ffffff;
          padding: 0.65rem 1rem;
          padding-right: 2.5rem;
          font-size: 0.95rem;
          transition: all 0.2s ease;
        }

        .signup-card .form-control:focus {
          background: rgba(255, 255, 255, 0.1);
          border-color: #e94560;
          box-shadow: 0 0 0 3px rgba(233, 69, 96, 0.2);
          color: #ffffff;
          outline: none;
        }

        .signup-card .form-control::placeholder {
          color: rgba(255, 255, 255, 0.25);
        }

        .input-icon-wrapper {
          position: relative;
        }

        .input-icon-wrapper i {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.25);
          font-size: 0.9rem;
          pointer-events: none;
        }

        .btn-signup-submit {
          width: 100%;
          padding: 0.7rem;
          border: none;
          border-radius: 50px;
          background: linear-gradient(135deg, #e94560, #f5a623);
          color: #fff;
          font-weight: 700;
          font-size: 1rem;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 0 18px rgba(233, 69, 96, 0.4);
          margin-top: 0.5rem;
        }

        .btn-signup-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 28px rgba(233, 69, 96, 0.6);
        }

        .btn-signup-submit:active {
          transform: translateY(0);
        }

        .password-hint {
          color: rgba(255, 255, 255, 0.3);
          font-size: 0.78rem;
          margin-top: 0.3rem;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin: 1.5rem 0;
        }

        .divider::before,
        .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
        }

        .divider span {
          color: rgba(255, 255, 255, 0.35);
          font-size: 0.8rem;
        }

        .login-link {
          text-align: center;
          color: rgba(255, 255, 255, 0.45);
          font-size: 0.88rem;
        }

        .login-link a {
          color: #e94560;
          font-weight: 600;
          text-decoration: none;
          transition: opacity 0.2s;
        }

        .login-link a:hover {
          opacity: 0.8;
          text-decoration: underline;
        }
      `}</style>

      <div className="signup-page">
        <div className="signup-card">

          {/* Logo */}
          <div className="signup-logo">iNote</div>
          <p className="signup-subtitle">Create your account and start taking notes!</p>

          <form onSubmit={handlesubmit}>

            {/* Name */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Full Name</label>
              <div className="input-icon-wrapper">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  onChange={onchange}
                  required
                />
                <i className="fa-solid fa-user"></i>
              </div>
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <div className="input-icon-wrapper">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  onChange={onchange}
                  required
                />
                <i className="fa-solid fa-envelope"></i>
              </div>
            </div>

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-icon-wrapper">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Min. 5 characters"
                  onChange={onchange}
                  minLength={5}
                  required
                />
                <i className="fa-solid fa-lock"></i>
              </div>
              <p className="password-hint">Must be at least 5 characters long</p>
            </div>

            {/* Confirm Password — kept commented out like your original */}
            {/* <div className="mb-3">
              <label htmlFor="cpassword" className="form-label">Confirm Password</label>
              <div className="input-icon-wrapper">
                <input type="password" className="form-control" id="cpassword"
                  name="cpassword" onChange={onchange} minLength={5} required />
                <i className="fa-solid fa-lock"></i>
              </div>
            </div> */}

            <button type="submit" className="btn-signup-submit">
              Create Account
            </button>

          </form>

          <div className="divider"><span>or</span></div>

          <p className="login-link">
            Already have an account? <Link to="/Login">Sign In</Link>
          </p>

        </div>
      </div>
    </>
  )
}

export default Signup