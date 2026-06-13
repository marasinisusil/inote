import React, { useContext, useRef, useState, useEffect } from "react";
import Notecontext from "../context/Notes/notecontext";
import Notesitem from "./Notesitem";
import Addnote from "./Addnote";
import { Modal as BootstrapModal } from "bootstrap";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const navigate = useNavigate();
  const context = useContext(Notecontext);
  const { notes, editnote, getallnote } = context;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getallnote();
    } else {
      navigate("/login");
    }
  }, []);

  const modalRef = useRef(null);
  const closeref = useRef(null);

  const [note, setNote] = useState({
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updatenote = (currentNote) => {
    setNote({
      id: currentNote._id,
      etitle: currentNote.title || "",
      edescription: currentNote.description || "",
      etag: currentNote.tag || "",
    });
    const modalInstance = new BootstrapModal(modalRef.current);
    modalInstance.show();
  };

  const handleclick = (e) => {
    e.preventDefault();
    editnote(note.id, note.etitle, note.edescription, note.etag);
    closeref.current.click();
    props.showalert("Updated successfully", "success");
  };

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <style>{`
        .notes-section {
          background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
          min-height: 100vh;
          padding: 2rem 1rem;
        }

        .notes-heading {
          font-size: 1.6rem;
          font-weight: 900;
          letter-spacing: 1px;
          background: linear-gradient(90deg, #e94560, #f5a623);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1.5rem;
        }

        .empty-notes {
          color: rgba(255, 255, 255, 0.35);
          font-size: 1rem;
          text-align: center;
          padding: 3rem 0;
          width: 100%;
        }

        .empty-notes i {
          font-size: 2.5rem;
          display: block;
          margin-bottom: 0.75rem;
          opacity: 0.3;
        }

        /* ── Modal ── */
        .dark-modal .modal-content {
          background: #16213e;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        .dark-modal .modal-header {
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 1.25rem 1.5rem;
        }

        .dark-modal .modal-title {
          font-size: 1.1rem;
          font-weight: 800;
          letter-spacing: 0.5px;
          background: linear-gradient(90deg, #e94560, #f5a623);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .dark-modal .btn-close {
          filter: invert(1);
          opacity: 0.5;
        }

        .dark-modal .btn-close:hover {
          opacity: 1;
        }

        .dark-modal .modal-body {
          padding: 1.5rem;
        }

        .dark-modal .modal-footer {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding: 1rem 1.5rem;
        }

        .dark-modal .form-label {
          color: rgba(255, 255, 255, 0.75);
          font-size: 0.88rem;
          font-weight: 500;
          margin-bottom: 0.4rem;
        }

        .dark-modal .form-control {
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          color: #ffffff;
          padding: 0.65rem 1rem;
          font-size: 0.92rem;
          transition: all 0.2s ease;
        }

        .dark-modal .form-control:focus {
          background: rgba(255, 255, 255, 0.1);
          border-color: #e94560;
          box-shadow: 0 0 0 3px rgba(233, 69, 96, 0.2);
          color: #ffffff;
          outline: none;
        }

        .dark-modal .form-control::placeholder {
          color: rgba(255, 255, 255, 0.2);
        }

        .btn-modal-close {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: rgba(255, 255, 255, 0.6);
          border-radius: 50px;
          padding: 0.45rem 1.2rem;
          font-size: 0.88rem;
          font-weight: 500;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .btn-modal-close:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }

        .btn-modal-update {
          background: linear-gradient(135deg, #e94560, #f5a623);
          border: none;
          color: #fff;
          border-radius: 50px;
          padding: 0.45rem 1.4rem;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 0 14px rgba(233, 69, 96, 0.35);
        }

        .btn-modal-update:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 0 22px rgba(233, 69, 96, 0.55);
        }

        .btn-modal-update:disabled {
          opacity: 0.35;
          cursor: not-allowed;
          box-shadow: none;
        }
      `}</style>

      {/* Add Note */}
      <div className="notes-section">
        <Addnote showalert={props.showalert} />

        {/* Your Notes */}
        <div className="container mt-4">
          <h2 className="notes-heading">📋 Your Notes</h2>
          <div className="row">
            {notes.length === 0 ? (
              <div className="empty-notes">
                <i className="fa-solid fa-note-sticky"></i>
                No notes yet — add your first one above!
              </div>
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
        </div>
      </div>

      {/* Edit Modal */}
      <div
        className="modal fade dark-modal"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    placeholder="Note title..."
                    value={note.etitle}
                    onChange={onchange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    placeholder="Note description..."
                    value={note.edescription}
                    onChange={onchange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="etag" className="form-label">
                    Tag <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>(optional)</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    placeholder="e.g. work, personal..."
                    value={note.etag}
                    onChange={onchange}
                  />
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                ref={closeref}
                type="button"
                className="btn-modal-close"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={note.etitle.length < 5 || note.edescription.length < 5}
                type="button"
                className="btn-modal-update"
                onClick={handleclick}
              >
                Update Note
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Notes;