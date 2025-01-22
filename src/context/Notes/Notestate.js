import React from "react";
import NoteContext from "./notecontext";
import { useState,useEffect } from "react";

const Notestate=(props)=>{
  
  const host = "http://localhost:5000";
   const notesinitial=[];
    
   
  
  
 const [notes, setNotes] = useState(notesinitial);
//  get all note
const getallnote= async ()=>{
  // todo api calls
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method:'GET',
    headers: {
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem('token')
    }
  });
  const json=  await response.json()
  console.log(json)
  // setNotes(json);
  if (Array.isArray(json)) {
    setNotes(json);
  } else {
    console.error("Expected an array but got:", json);
  }
}
//  add note
const addnote = async(title,description,tag)=>{
  // todo api calls
  const response = await fetch(`${host}/api/notes/addnotes/`, {
    method:'POST',
    headers: {
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem('token')
    },
    body:JSON.stringify({title,description,tag}),
   
  });
  const json = await response.json(); // Await JSON parsing

 

  // Update the state with the new note
  setNotes((prevNotes) => [...prevNotes, json]);
}
// delete note
const deletenote=async (id)=>{
  // todo:api calls
  const response = await fetch(`${host}/api/notes/delete/${id}`, {
    method:'DELETE',
    headers: {
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem('token')
    }
  });
  const newnote = notes.filter((note)=>{return note._id!==id})
  setNotes(newnote)
}
// edit note
const editnote= async(id,title,description,tag)=>{
  // api call
  const response = await fetch(`${host}/api/notes/update/${id}`, {
    method:'PUT',
    headers: {
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem('token'),
    },
    body:JSON.stringify({title,description,tag})
   
  });
 
  const json = await response.json();
  console.log("Note updated:", json);

  // Logic for editing the note in the state
  setNotes((prevNotes) => prevNotes.map((note) =>
    note._id === id ? { ...note, title, description, tag } : note
));


  // logic for edit the note
// for (let index = 0; index < notes.length; index++) {
//   const element = notes[index];
//   if(element._id===id){
//     element.title=title;
//     element.description=description;
//     element.tag=tag;

// }

// }
};

// useEffect(() => {
//     getallnote();
  
//    // Fetch all notes when the component mounts
// }, []);
    return(
<NoteContext.Provider value={{notes,addnote,deletenote,editnote,getallnote}}>
{props.children}
</NoteContext.Provider>
    )
}
export default Notestate;