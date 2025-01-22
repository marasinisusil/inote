
import React from 'react';
import { Link ,useLocation, useNavigate} from 'react-router-dom';
const Navbar = () => {
  let location = useLocation()
let navigate=useNavigate()
const handlelogout=()=>{
  localStorage.removeItem('token')
  navigate("/login")
}
const info=()=>{
  <h1>this is info</h1>
}
  return (
    <div>
      <nav className="navbar navbar-expand-lg  bg-warning">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Inote</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
        </li>
        
       
      </ul>
      {!localStorage.getItem('token')?<form className='d-flex'>
      <Link className="btn btn-primary mx-1" to="/Login" role="button">login</Link>
      <Link className="btn btn-primary mx-1" to="/Signup" role="button">Signup</Link>
      </form>
      :
      <div>
      <button onClick={handlelogout}className='btn btn-primary mx-4'>log out</button>
      <i class="fa-solid fa-user" onClick={info}></i>
</div>}
    </div>
  </div>
</nav>
    </div>
  );
};

export default Navbar;
