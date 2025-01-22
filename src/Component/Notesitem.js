import { useContext } from "react"
import React from 'react'
import Notecontext from "../context/Notes/notecontext"

const Notesitem = (props) => {
  const context = useContext(Notecontext);
  const {deletenote}=context;
    const {note,updatenote}=props
  return (
    <div className='col-md-3'>
        
        <div className="card my-3">
  <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description} 
    </p>
    <i className="fa-solid fa-trash mx-2" onClick={()=>{deletenote(note._id); props.showalert(" Delete successfully","success")}}></i>
    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updatenote(note)}}></i>

  </div>
</div>
    </div>
  )
}

export default Notesitem