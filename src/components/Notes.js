import React, { useContext, useEffect, useRef, useState } from 'react'
import contextvalue from "../context/notes/noteContext"
import NoteItem from './NoteItem'
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = () => {

    const context = useContext(contextvalue)
    const { notes, getNotes, editNote } = context
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token') != null) {
            getNotes()
        }
        else {
            navigate('/login')
        }
    })
    const ref = useRef("")
    const refClose = useRef("")
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const updatenote = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }
    const onChange = (e) => {

        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click()
        e.preventDefault();
    }
    return (
        <>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3 my-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" value={note.etitle} id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="sescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" value={note.edescription} id="edescription" name="edescription" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" value={note.etag} id="etag" name="etag" onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <AddNote />
            <div className="row my-3">

                <h4>{notes.length === 0 ? "No notes to display" : "Your Notes"}</h4>
                {notes.map((note) => {
                    return <NoteItem note={note} key={note._id} updatenote={updatenote} />
                    // return <NoteItem note={note} key={note._id} updatenote={updatenote} notesrc={`https://source.unsplash.com/1600x1000/?${note.title.split(' ')[0]}`}/>
                })}


            </div>
        </>
    )
}
export default Notes