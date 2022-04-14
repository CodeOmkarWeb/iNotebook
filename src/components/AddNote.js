import React, { useContext, useState } from 'react'
import contextvalue from "../context/notes/noteContext"

function AddNote() {
    const context = useContext(contextvalue)
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const { addNote } = context


    const handleClick = (e) => {
            e.preventDefault();
            addNote(note.title, note.description, note.tag)
            setNote( {title: "", description: "", tag: "" })
        }
    const onChange = (e) => {

        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="container my-3">
                <h2 className="text-success">Add a Note</h2>
                <form>
                    <div className="mb-3 my-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} placeholder="Enter Title" autoComplete="on"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="sescription" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" onChange={onChange} placeholder="Take Note..." autoComplete="on"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} placeholder="Enter Tag" autoComplete="on"/>
                    </div>
                    <button disabled={note.title.length<=1 || note.description.length<=1 || note.tag.length<=1} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>

            </div>
        </>
    )
}
// 5:40

export default AddNote