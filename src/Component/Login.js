import React from 'react'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = (props) => {
    let navigate = useNavigate();
    const [credentials, setcredentials] = useState({ email: "", password: "" })

    const handlesubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            props.showalert("Login successfully", "success")
            navigate("/");
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
                .login-page {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                }

                .login-card {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 20px;
                    padding: 2.5rem;
                    width: 100%;
                    max-width: 420px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
                }

                .login-logo {
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

                .login-subtitle {
                    text-align: center;
                    color: rgba(255, 255, 255, 0.45);
                    font-size: 0.88rem;
                    margin-bottom: 2rem;
                }

                .login-card .form-label {
                    color: rgba(255, 255, 255, 0.75);
                    font-size: 0.88rem;
                    font-weight: 500;
                    margin-bottom: 0.4rem;
                }

                .login-card .form-control {
                    background: rgba(255, 255, 255, 0.07);
                    border: 1px solid rgba(255, 255, 255, 0.12);
                    border-radius: 10px;
                    color: #ffffff;
                    padding: 0.65rem 1rem;
                    font-size: 0.95rem;
                    transition: all 0.2s ease;
                }

                .login-card .form-control:focus {
                    background: rgba(255, 255, 255, 0.1);
                    border-color: #e94560;
                    box-shadow: 0 0 0 3px rgba(233, 69, 96, 0.2);
                    color: #ffffff;
                    outline: none;
                }

                .login-card .form-control::placeholder {
                    color: rgba(255, 255, 255, 0.25);
                }

                .btn-login-submit {
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

                .btn-login-submit:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 0 28px rgba(233, 69, 96, 0.6);
                }

                .btn-login-submit:active {
                    transform: translateY(0);
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

                .signup-link {
                    text-align: center;
                    color: rgba(255, 255, 255, 0.45);
                    font-size: 0.88rem;
                }

                .signup-link a {
                    color: #e94560;
                    font-weight: 600;
                    text-decoration: none;
                    transition: opacity 0.2s;
                }

                .signup-link a:hover {
                    opacity: 0.8;
                    text-decoration: underline;
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

                .input-icon-wrapper .form-control {
                    padding-right: 2.5rem;
                }
            `}</style>

            <div className="login-page">
                <div className="login-card">

                    {/* Logo */}
                    <div className="login-logo">iNote</div>
                    <p className="login-subtitle">Welcome back! Please sign in to continue.</p>

                    <form onSubmit={handlesubmit}>

                        {/* Email */}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <div className="input-icon-wrapper">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="you@example.com"
                                    value={credentials.email}
                                    onChange={onchange}
                                    name="email"
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
                                    placeholder="Enter your password"
                                    value={credentials.password}
                                    onChange={onchange}
                                    name="password"
                                    required
                                />
                                <i className="fa-solid fa-lock"></i>
                            </div>
                        </div>

                        <button type="submit" className="btn-login-submit">
                            Sign In
                        </button>

                    </form>

                    <div className="divider"><span>or</span></div>

                    <p className="signup-link">
                        Don't have an account? <Link to="/Signup">Sign Up</Link>
                    </p>

                </div>
            </div>
        </>
    )
}

export default Login