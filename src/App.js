import './App.css';
import Navbar from './Component/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Component/Home'; // Correct path
import About from './Component/About'; // Correct path
import Notestate from './context/Notes/Notestate';
import Alert from './Component/Alert';
import Login from './Component/Login';
import Signup from './Component/Signup';
import { useState } from 'react';


function App() {
  const [alerttt, setAlerttt] = useState(null);

  const showalert = (message, type) => {
    setAlerttt({ msg: message, type: type });
    setTimeout(() => {
      setAlerttt(null);
    }, 1500);
  };
  return (
    <>
   
       <Router>
       <Notestate>
      <Navbar />
      <Alert alert={alerttt} />
      <div className="container"> {/* Navbar that will be visible on all pages */}
      <Routes>
        <Route path="/" element={<Home showalert={showalert}/>} />  {/* Home page route */}
        <Route path="/about" element={<About />}/>
        <Route path="/Login" element={<Login showalert={showalert}/>}/>
          <Route path="/Signup" element={<Signup showalert={showalert}/>}/>
           {/* About page route */}
      </Routes>
      </div> 
      </Notestate>
    </Router>
    
    </>
  );
}

export default App;
