import React, { useState, useContext } from 'react'
import Notecontext from "../context/Notes/notecontext"

const Addnote = (props) => {
    const context = useContext(Notecontext);
    const { addnote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleclick = (e) => {
        e.preventDefault();
        addnote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        props.showalert("Added successfully", "success")
    }

    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <style>{`
                .addnote-section {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
                    padding: 3rem 1rem;
                }

                .addnote-card {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 20px;
                    padding: 2.5rem;
                    width: 100%;
                    max-width: 560px;
                    margin: 0 auto;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
                }

                .addnote-title {
                    font-size: 1.6rem;
                    font-weight: 900;
                    letter-spacing: 1px;
                    background: linear-gradient(90deg, #e94560, #f5a623);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    margin-bottom: 0.3rem;
                }

                .addnote-subtitle {
                    color: rgba(255, 255, 255, 0.35);
                    font-size: 0.85rem;
                    margin-bottom: 2rem;
                }

                .addnote-card .form-label {
                    color: rgba(255, 255, 255, 0.75);
                    font-size: 0.88rem;
                    font-weight: 500;
                    margin-bottom: 0.4rem;
                }

                .addnote-card .form-control {
                    background: rgba(255, 255, 255, 0.07);
                    border: 1px solid rgba(255, 255, 255, 0.12);
                    border-radius: 10px;
                    color: #ffffff;
                    padding: 0.65rem 1rem;
                    padding-right: 2.5rem;
                    font-size: 0.95rem;
                    transition: all 0.2s ease;
                }

                .addnote-card .form-control:focus {
                    background: rgba(255, 255, 255, 0.1);
                    border-color: #e94560;
                    box-shadow: 0 0 0 3px rgba(233, 69, 96, 0.2);
                    color: #ffffff;
                    outline: none;
                }

                .addnote-card .form-control::placeholder {
                    color: rgba(255, 255, 255, 0.2);
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

                .btn-addnote {
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

                .btn-addnote:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 0 28px rgba(233, 69, 96, 0.6);
                }

                .btn-addnote:disabled {
                    opacity: 0.4;
                    cursor: not-allowed;
                    box-shadow: none;
                }

                .char-hint {
                    color: rgba(255, 255, 255, 0.25);
                    font-size: 0.75rem;
                    margin-top: 0.3rem;
                }
            `}</style>

            <div className="addnote-section">
                <div className="addnote-card">

                    <h2 className="addnote-title">Add a Note</h2>
                    <p className="addnote-subtitle">Fill in the details below to save your note.</p>

                    <form>
                        {/* Title */}
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <div className="input-icon-wrapper">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    name="title"
                                    placeholder="Note title..."
                                    value={note.title}
                                    onChange={onchange}
                                    minLength={5}
                                    required
                                />
                                <i className="fa-solid fa-heading"></i>
                            </div>
                            {note.title.length > 0 && note.title.length < 5 &&
                                <p className="char-hint">At least 5 characters required</p>
                            }
                        </div>

                        {/* Description */}
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <div className="input-icon-wrapper">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    placeholder="Write your note here..."
                                    value={note.description}
                                    onChange={onchange}
                                    minLength={5}
                                    required
                                />
                                <i className="fa-solid fa-align-left"></i>
                            </div>
                            {note.description.length > 0 && note.description.length < 5 &&
                                <p className="char-hint">At least 5 characters required</p>
                            }
                        </div>

                        {/* Tag */}
                        <div className="mb-4">
                            <label htmlFor="tag" className="form-label">Tag <span style={{color:'rgba(255,255,255,0.3)', fontSize:'0.8rem'}}>(optional)</span></label>
                            <div className="input-icon-wrapper">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="tag"
                                    name="tag"
                                    placeholder="e.g. work, personal..."
                                    value={note.tag}
                                    onChange={onchange}
                                />
                                <i className="fa-solid fa-tag"></i>
                            </div>
                        </div>

                        <button
                            disabled={note.title.length < 5 || note.description.length < 5}
                            type="submit"
                            className="btn-addnote"
                            onClick={handleclick}
                        >
                            Add Note
                        </button>

                    </form>
                </div>
            </div>
        </>
    )
}

export default Addnote