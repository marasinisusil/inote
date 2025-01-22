import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    let navigate=useNavigate();
    const [credentials, setcredentials] = useState({email:"",password:""})
    const handlesubmit=async(e)=>{
        e.preventDefault();
        const response =  await fetch("http://localhost:5000/api/auth/login", {
            method:'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
          });
          const json=await response.json();
          console.log(json);
          if(json.success){
            // save the auth token and redirect
            localStorage.setItem('token',json.authtoken);
            props.showalert(" Login successfully","success")
            navigate("/");
           
          }
          else{
            props.showalert(" Invalid credentials","danger")
          }
    }
    
  const onchange = (e) => {
    // Dynamically update the state for each input field
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  return (
    <div className='mt-3'>
      <h1>Login garam hai</h1>
        <form onSubmit={handlesubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" value={credentials.email} onChange={onchange}name="email" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control"value={credentials.password} onChange={onchange} name="password" id="password"/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Login