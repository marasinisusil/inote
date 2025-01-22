import React, { useContext } from 'react'

import Notecontext from "../context/Notes/notecontext"
import Notes from './Notes';


const Home = (props) => {
const {showalert}=props;
  return (
   
    <div>
     
      <Notes showalert={showalert}></Notes>
    </div>
  )
}

export default Home