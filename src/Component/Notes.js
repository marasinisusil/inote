import React, { useContext, useRef, useState ,useEffect} from "react";
import Notecontext from "../context/Notes/notecontext";
import Notesitem from "./Notesitem";
import Addnote from "./Addnote";
import { Modal as BootstrapModal } from "bootstrap"; // Import Modal from bootstrap
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const navigate=useNavigate();
  const context = useContext(Notecontext);

  const { notes,editnote,getallnote} = context;
  useEffect(() => {
    if(localStorage.getItem("token")){
      getallnote();
    }
    else{
      navigate("/login")
    }
    
  }, []);
  

  // References for the modal and note being updated
  const modalRef = useRef(null);

const closeref=useRef(null);
  const [note, setNote] = useState({
    etitle: "", // Editing title
    edescription: "", // Editing description
    etag: "", // Editing tag
  });



  // Function to handle modal opening and set the current note
  const updatenote = (currentNote) => {
    // Populate the state with the details of the selected note
    setNote({
      id:currentNote._id,
      etitle: currentNote.title || "", // Safely set the title
      edescription: currentNote.description || "", // Safely set the description
      etag: currentNote.tag || "", // Safely set the tag
    });

    // Show the modal
    const modalInstance = new BootstrapModal(modalRef.current); // Initialize the modal
    modalInstance.show(); // Show the modal

  };

  const handleclick = (e) => {
    e.preventDefault();
    console.log("Note updated:", note);
    editnote(note.id,note.etitle,note.edescription,note.etag);
closeref.current.click();
props.showalert(" Updated sucessfully","success")

    // Add functionality to update the note in the backend (use note state)
  };

  const onchange = (e) => {
    // Dynamically update the state for each input field
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Addnote showalert={props.showalert}/>

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        ref={modalRef} // Reference for the modal element
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    value={note.etitle} // Bind state to the input field
                    name="etitle" // Name must match the key in state
                    aria-describedby="emailHelp"
                    onChange={onchange} // Update state on change
                 minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    value={note.edescription} // Bind state to the input field
                    name="edescription" // Name must match the key in state
                    onChange={onchange} // Update state on change
                    minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    value={note.etag} // Bind state to the input field
                    name="etag" // Name must match the key in state
                    onChange={onchange} // Update state on change
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
              ref={closeref}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button disabled={note.etitle.length <5||note.edescription.length<5}
                type="button"
                className="btn btn-primary"
                onClick={handleclick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      {/* <div className="row my-3">
        <h1>Your Notes</h1>
        <div className="container mx-2">
        {notes.length===0 && "note are here "}
        </div>
        {notes.map((note) => {
          return (
            <Notesitem
              note={note}
              key={note._id}
              updatenote={updatenote} // Pass the update function
           showalert={props.showalert} />
          );
        })}
      </div> */}
      <div className="row my-3">
        <h1>Your Notes</h1>
        {notes.length === 0 ? (
          <div className="container mx-2">No notes available</div>
        ) : (
          notes.map((note) => (
            <Notesitem
              note={note}
              key={note._id}
              updatenote={updatenote}
              showalert={props.showalert}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Notes;

